import React, { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BackgroundImage from "../assets/images/background.jpg";
import AvatarEmpty from "../assets/images/avatar-blanc.jpg";
import AddIcon from "../assets/images/add.png";
import { useNavigation } from "@react-navigation/core";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isFocused, setIsFocused] = useState(null);
  const navigation = useNavigation();

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAddPhoto = () => {
    // Тут потім буде логіка додавання фото
  };

  const handleFocus = (inputKey) => {
    setIsFocused(inputKey);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const handleRegister = () => {
    // Тут потім буде логіка переходу на потрібний екран
    console.debug("Username: ", username);
    console.debug("E-mail: ", email);
    console.debug("Password: ", password);
    setUsername("");
    setEmail("");
    setPassword("");
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
          keyboardVerticalOffset={
            isFocused === "inputName" || isFocused === "inputEmail"
              ? -60
              : isFocused === "inputPassword"
              ? -125
              : 0
          }
        >
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  resizeMode="cover"
                  style={styles.avatarImage}
                />
              ) : (
                <Image
                  source={AvatarEmpty}
                  resizeMode="cover"
                  style={styles.avatarImage}
                />
              )}
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPhoto}
              >
                <Image source={AddIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "inputName" && styles.inputFocused,
                ]}
                placeholder="Логін"
                onChangeText={handleUsernameChange}
                value={username}
                onFocus={() => handleFocus("inputName")}
                onBlur={handleBlur}
              />
              <TextInput
                style={[
                  styles.input,
                  isFocused === "inputEmail" && styles.inputFocused,
                ]}
                placeholder="Адреса електронної пошти"
                onChangeText={handleEmailChange}
                value={email}
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
                  value={password}
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
            <TouchableOpacity
              style={styles.registrationButton}
              onPress={handleRegister}
            >
              <Text style={styles.registrationButtonText}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text style={styles.registrationLink}>
              Вже є акаунт?&nbsp;{" "}
              <Text
                style={styles.registrationLinkUnderline}
                onPress={() => navigation.navigate("Login")}
              >
                Увійти
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
    paddingTop: 92,
    paddingBottom: 45,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 132,
    height: 120,
  },
  avatarImage: { width: 120, height: 120, borderRadius: 16 },
  addButton: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 0,
    bottom: 14,
    zIndex: 10,
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
  registrationButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  registrationButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  registrationLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
  registrationLinkUnderline: {
    textDecorationLine: "underline",
  },
});

export default RegistrationScreen;
