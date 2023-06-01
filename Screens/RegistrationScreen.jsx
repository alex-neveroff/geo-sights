import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import AvatarEmpty from "../assets/images/avatar-blanc.jpg";
import AddIcon from "../assets/images/add.png";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isFocused, setIsFocused] = useState(null);

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
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddPhoto}>
          <Image source={AddIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Реєстрація</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
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
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.registrationButton}
        onPress={handleRegister}
      >
        <Text style={styles.registrationButtonText}>Зареєстуватися</Text>
      </TouchableOpacity>

      <Text style={styles.registrationLink}>Вже є акаунт? Увійти</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 549,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
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
    marginTop: 92,
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
});

export default RegistrationScreen;
