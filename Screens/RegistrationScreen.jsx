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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import BackgroundImage from "../assets/images/background.jpg";
import AvatarEmpty from "../assets/images/avatar-blanc.jpg";
import AddIcon from "../assets/images/add.png";
import users from "../users";

const RegistrationScreen = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const navigation = useNavigation();

  const handleUsernameChange = (text) => {
    setNewUser((prevState) => ({
      ...prevState,
      username: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setNewUser((prevState) => ({
      ...prevState,
      password: text,
    }));
  };

  const handleEmailChange = (text) => {
    setNewUser((prevState) => ({
      ...prevState,
      email: text,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") return;

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const source = { uri: selectedAsset.uri };
      setNewUser((prevState) => ({
        ...prevState,
        avatar: source,
      }));
    }
  };

  const handleFocus = (inputKey) => {
    setIsFocused(inputKey);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const handleRegister = () => {
    if (users.some((user) => user.username === newUser.username)) {
      return Alert.alert(`Користувач ${newUser.username} вже існує`);
    } else if (users.some((user) => user.email === newUser.email)) {
      return Alert.alert(`Е-мейл ${newUser.email} вже зареєстрован`);
    }
    users.push(newUser);
    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: {
        user: newUser,
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
          keyboardVerticalOffset={
            isFocused === "inputName" || isFocused === "inputEmail"
              ? -150
              : isFocused === "inputPassword"
              ? -215
              : 0
          }
        >
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              {newUser.avatar ? (
                <Image
                  source={newUser.avatar}
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
                value={newUser.username}
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
                value={newUser.email}
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
                  value={newUser.password}
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
