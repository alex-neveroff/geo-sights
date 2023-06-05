import React, { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import BackgroundImage from "../assets/images/background.jpg";
import users from "../users";

const LoginScreen = () => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  const handlePasswordChange = (text) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      password: text,
    }));
  };

  const handleEmailChange = (text) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      email: text,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (inputKey) => {
    setIsFocused(inputKey);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const handleLogin = () => {
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === currentUser.email.toLowerCase()
    );
    if (!existingUser) {
      return Alert.alert(`Такого користувача немає. Зареєструйтесь`);
    } else if (existingUser && existingUser.password !== currentUser.password) {
      return Alert.alert(`Невірний пароль`);
    }
    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: {
        user: existingUser,
      },
    });
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={-255}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "inputEmail" && styles.inputFocused,
                ]}
                placeholder="Адреса електронної пошти"
                onChangeText={handleEmailChange}
                value={currentUser.email}
                onFocus={() => handleFocus("inputEmail")}
                onBlur={handleBlur}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    isFocused === "inputPassword" && styles.inputFocused,
                  ]}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  onChangeText={handlePasswordChange}
                  value={currentUser.password}
                  onFocus={() => handleFocus("inputPassword")}
                  onBlur={handleBlur}
                />
                <TouchableOpacity
                  onPress={handleTogglePasswordVisibility}
                  style={styles.showPasswordButton}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.loginLink}>
              Немає акаунту?&nbsp;
              <Text
                style={styles.loginLinkUnderline}
                onPress={() => navigation.navigate("Registration")}
              >
                Зареєструватися
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: { width: "100%", height: "100%" },
  formContainer: {
    paddingTop: 32,
    paddingBottom: 144,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 43,
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  passwordContainer: {
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 4,
  },
  showPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  loginButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  loginButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  loginLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
  loginLinkUnderline: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
