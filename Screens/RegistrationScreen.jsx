import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleRegister = () => {
    // Тут потім буде логіка переходу на потрібний екран
    console.log("Регистрация:", username, password, email);
  };

  return (
    <View style={styles.container}>
      <Text>Реєстрація</Text>
      <TextInput
        style={styles.input}
        placeholder="Логін"
        onChangeText={handleUsernameChange}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Адреса електронної пошти"
        onChangeText={handleEmailChange}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry={!showPassword}
        onChangeText={handlePasswordChange}
        value={password}
      />
      <TouchableOpacity onPress={handleTogglePasswordVisibility}>
        <Text style={styles.showPasswordText}>
          {showPassword ? "Приховати" : "Показати"}
        </Text>
      </TouchableOpacity>
      <Button title="Зареєстуватися" onPress={handleRegister} />
      <Text>Вже є акаунт? Увійти</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegistrationScreen;
