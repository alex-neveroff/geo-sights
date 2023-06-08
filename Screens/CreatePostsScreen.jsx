import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const {
    params: { user },
  } = useRoute();

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [newPost, setNewPost] = useState({
    title: "",
    area: "",
    location: {},
    comments: [],
    photo: {
      uri: "",
    },
  });
  const [isPreviewing, setIsPreviewing] = useState(false);
  const isShowButton =
    newPost.title && newPost.area && newPost.photo.uri ? true : false;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("У доступі до місцезнаходження відмовлено");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setNewPost((prevState) => ({
        ...prevState,
        location: coords,
      }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери</Text>;
  }

  const handleTitleChange = (text) => {
    setNewPost((prevState) => ({
      ...prevState,
      title: text,
    }));
  };
  const handleAreaChange = (text) => {
    setNewPost((prevState) => ({
      ...prevState,
      area: text,
    }));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri).then((asset) => {
        setNewPost((prevPost) => ({
          ...prevPost,
          photo: {
            uri: asset.uri,
          },
        }));
        setIsPreviewing(true);
      });
    }
  };

  const handlePublish = () => {
    user.posts.push(newPost);
    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: {
        user: user,
      },
    });
    resetPost();
  };

  const resetPost = () => {
    setIsPreviewing(false);
    setNewPost({
      title: "",
      location: "",
      area: "",
      comments: [],
      photo: {
        uri: "",
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-50}
      >
        <View style={styles.createPostContainer}>
          <View style={styles.cameraContainer}>
            {isPreviewing ? (
              <Image
                source={{ uri: newPost.photo.uri }}
                style={styles.camera}
                resizeMode="cover"
              />
            ) : (
              <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                ref={cameraRef}
              >
                <View style={styles.photoView}>
                  <TouchableOpacity onPress={takePicture}>
                    <View style={styles.iconOut}>
                      <Ionicons
                        name="camera-outline"
                        size={24}
                        color="#BDBDBD"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </View>
          {!isShowButton ? (
            <Text style={styles.title}>Завантажте фото</Text>
          ) : (
            <Text style={styles.title}>Редагувати фото</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Назва"
            onChangeText={handleTitleChange}
            value={newPost.title}
          />
          <View>
            <Ionicons
              name="location-outline"
              size={24}
              color="#BDBDBD"
              style={styles.areaIcon}
            />
            <TextInput
              style={[styles.input, styles.inputArea]}
              placeholder="Місцевість"
              onChangeText={handleAreaChange}
              value={newPost.area}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.publishButton,
              !isShowButton && styles.disabledButton,
            ]}
            onPress={handlePublish}
            disabled={!isShowButton}
          >
            <Text
              style={[
                styles.publishButtonText,
                !isShowButton && styles.disabledText,
              ]}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.trashButton}
          onPress={resetPost}
        >
          <View style={styles.trashOut}>
            <Ionicons
              name="trash-outline"
              size={24}
              color="#BDBDBD"
              style={styles.trashIcon}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopColor: "#808080",
    borderTopWidth: 1,
  },
  createPostContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  cameraContainer: { marginBottom: 9, height: 253 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  iconOut: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 18,
  },

  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 16,
  },
  inputArea: { paddingHorizontal: 44 },
  areaIcon: { position: "absolute", top: 12, left: 16 },
  publishButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },

  publishButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  disabledButton: { backgroundColor: "#F6F6F6" },
  disabledText: { color: "#BDBDBD" },
  trashButton: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  trashOut: {
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
