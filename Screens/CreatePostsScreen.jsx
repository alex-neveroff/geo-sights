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
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import {
  selectAvatar,
  selectUserId,
  selectUserName,
} from "../redux/auth/authSelectors";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const userId = useSelector(selectUserId);
  const user = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    city: "",
    country: "",
    location: {},
    photo: {
      uri: "",
    },
  });
  const isShowButton =
    newPost.title && newPost.country && newPost.photo.uri ? true : false;

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

  const getCityAndCountry = async () => {
    if (newPost.location) {
      try {
        const { latitude, longitude } = newPost.location;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=uk`
        );
        const data = await response.json();
        if (data.address) {
          const locationCity = data.address.city;
          const locationCountry = data.address.country;
          setNewPost((prevState) => ({
            ...prevState,
            city: locationCity,
            country: locationCountry,
          }));
        }
      } catch (error) {
        alert(`Місцезнаходження не визначене`);
      }
    }
  };

  const handleTitleChange = (text) => {
    setNewPost((prevState) => ({
      ...prevState,
      title: text,
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
      setNewPost((prevPost) => ({
        ...prevPost,
        photo: {
          uri: selectedAsset.uri,
        },
      }));
      setIsPreviewing(true);
    }
  };

  const uploadPhotoToServer = async () => {
    const postId = Date.now().toString();
    try {
      const response = await fetch(newPost.photo.uri);
      const file = await response.blob();
      const storageRef = ref(storage, `photos/${postId}.jpeg`);
      const metadata = {
        contentType: "image/jpeg",
      };
      await uploadBytes(storageRef, file, metadata);
      const photoLink = await getDownloadURL(storageRef);
      return photoLink;
    } catch (error) {
      alert("Фото не завантажилось на сервер");
    }
  };

  const handlePublish = async () => {
    const newPhoto = await uploadPhotoToServer();
    const uploadPost = {
      photo: newPhoto,
      title: newPost.title,
      location: newPost.location,
      city: newPost.city,
      country: newPost.country,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      comments: [],
      likes: 0,
      owner: {
        userId,
        user,
        avatar,
      },
    };

    try {
      await addDoc(collection(db, "posts"), uploadPost);
      resetPost();
    } catch (error) {
      alert("Пост не завантажився на сервер");
    } finally {
      navigation.navigate("Home", { screen: "PostsScreen" });
    }
  };

  const resetPost = () => {
    setIsPreviewing(false);

    setNewPost((prevPost) => ({
      ...prevPost,
      title: "",
      city: "",
      country: "",
      photo: {
        uri: "",
      },
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-50}
      >
        <View style={styles.createPostContainer}>
          <View style={styles.imageContainer}>
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
          <TouchableOpacity onPress={handleAddPhoto}>
            {!isPreviewing ? (
              <Text style={styles.title}>Завантажте фото</Text>
            ) : (
              <Text style={styles.title}>Редагувати фото</Text>
            )}
          </TouchableOpacity>

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
            <TouchableOpacity
              style={styles.areaButton}
              onPress={getCityAndCountry}
            >
              {newPost.country ? (
                <Text
                  style={styles.areaButtonText}
                >{`${newPost.city}, ${newPost.country}`}</Text>
              ) : (
                <Text style={styles.areaButtonText}>Місцевість</Text>
              )}
            </TouchableOpacity>
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
    borderTopColor: "#BDBDBD",
    borderTopWidth: 1,
  },
  createPostContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  imageContainer: {
    marginBottom: 9,
    height: 253,
    overflow: "hidden",
  },
  camera: { width: "100%", aspectRatio: 3 / 4, alignSelf: "center" },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: 95,
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
  areaButton: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingHorizontal: 44,
    marginBottom: 16,
    justifyContent: "center",
  },
  areaButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
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
