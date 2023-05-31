import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Тут потім буде логіка входу
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Увійти</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
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
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 489,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
    marginTop: 32,
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
