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
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [newPost, setNewPost] = useState({
    title: "",
    location: "",
    photo: {
      uri: "",
    },
  });
  const [isPreviewing, setIsPreviewing] = useState(false);
  const isShowButton = newPost.title && newPost.location ? true : false;

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
  const handleLocationChange = (text) => {
    setNewPost((prevState) => ({
      ...prevState,
      location: text,
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
        console.debug(newPost.photo.uri);
      });
    }
  };

  const handlePublish = () => {
    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: {
        user: newPost,
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
          <TextInput
            style={styles.input}
            placeholder="Місцевість"
            onChangeText={handleLocationChange}
            value={newPost.location}
          />
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
});

export default CreatePostsScreen;
