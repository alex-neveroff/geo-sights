import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
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
    // Тут потім буде логіка входу
    console.debug("E-mail: ", email);
    console.debug("Password: ", password);
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        isFocused === "inputEmail"
          ? -300
          : isFocused === "inputPassword"
          ? -260
          : 0
      }
      style={styles.container}
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Увійти</Text>
        </TouchableOpacity>
        <Text style={styles.loginLink}>
          Немає акаунту?{" "}
          <Text style={styles.loginLinkUnderline}>Зареєструватися</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
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
