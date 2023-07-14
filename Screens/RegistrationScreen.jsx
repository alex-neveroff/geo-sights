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
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import BackgroundImage from "../assets/images/background.jpg";
import AvatarImage from "../assets/images/avatarblanc.jpg";
import { useDispatch } from "react-redux";
import { userRegistration } from "../redux/auth/authOperations";
import { storage } from "../firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const RegistrationScreen = () => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const uploadAvatar = async (avatar, email) => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      const storageRef = ref(storage, `userAvatars/${email}`);
      await uploadBytes(storageRef, file);
      const link = await getDownloadURL(storageRef);
      return link;
    } catch (error) {
      alert("Аватар не завантажився на сервер");
    }
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleFocus = (inputKey) => {
    setIsFocused(inputKey);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      return alert("Будь ласка, заповніть усі поля");
    }
    const avatarURL = await uploadAvatar(avatar, email);
    console.debug("Avatar", avatar);
    console.debug("Avatar URL", avatarURL);

    dispatch(
      userRegistration({
        userName,
        email,
        password,
        avatar: avatarURL,
      })
    );
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
              <Image
                source={
                  avatar
                    ? {
                        uri: avatar,
                      }
                    : AvatarImage
                }
                resizeMode="cover"
                style={styles.avatarImage}
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPhoto}
              >
                <Ionicons name="add-circle-outline" size={25} color="#FF6C00" />
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
                onChangeText={setUserName}
                value={userName}
                onFocus={() => handleFocus("inputName")}
                onBlur={handleBlur}
              />

              <TextInput
                style={[
                  styles.input,
                  isFocused === "inputEmail" && styles.inputFocused,
                ]}
                placeholder="Адреса електронної пошти"
                onChangeText={setEmail}
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
                  onChangeText={setPassword}
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
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
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
