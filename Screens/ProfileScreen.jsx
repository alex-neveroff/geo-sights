import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectUserId,
  selectUserName,
} from "../redux/auth/authSelectors";
import {
  collection,
  onSnapshot,
  where,
  updateDoc,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import BackgroundImage from "../assets/images/background.jpg";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const username = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectUserId);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getUserPosts();
    }
  }, []);

  const getUserPosts = async () => {
    try {
      const myQuery = query(
        collection(db, "posts"),
        where("owner.userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      onSnapshot(myQuery, (data) => {
        const allPosts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserPosts(allPosts);
      });
    } catch (error) {
      console.debug(error.message);
      alert(`Не вдалося завантажити пости`);
    }
  };

  const handleLiked = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const postLikes = postSnapshot.data().likes;
      const updatedLikes = Number(postLikes + 1);
      await updateDoc(postRef, {
        likes: updatedLikes,
      });
    } catch (error) {
      console.error("Помилка додавання лайка:", error);
      alert("Помилка додавання лайка");
    }
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: avatar,
              }}
              resizeMode="cover"
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.userName}>{username}</Text>

          {userPosts.length === 0 ? (
            <View style={styles.postList}>
              <Text style={styles.postDescription}>
                Ще не опублікувано жодного фото
              </Text>
            </View>
          ) : (
            <FlatList
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const postColor =
                  item.comments.length > 0
                    ? styles.postNoZeroColor
                    : styles.postZeroColor;
                const likeColor =
                  item.likes > 0
                    ? styles.postNoZeroColor
                    : styles.postZeroColor;
                return (
                  <View style={styles.postList}>
                    <Image
                      source={{ uri: item.photo }}
                      resizeMode="cover"
                      style={styles.postImage}
                    />
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <View style={styles.postDescription}>
                      <View style={styles.likesWrapper}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Comments", {
                              comments: item.comments,
                              photo: item.photo,
                              user: item.owner.user,
                              postId: item.id,
                            })
                          }
                        >
                          <Ionicons
                            name={
                              item.comments.length > 0
                                ? "chatbubble-sharp"
                                : "chatbubble-outline"
                            }
                            size={24}
                            color={
                              item.comments.length > 0 ? "#FF6C00" : "#BDBDBD"
                            }
                            style={styles.commentIcon}
                          />
                          <Text style={[styles.postComments, postColor]}>
                            {item.comments.length}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.postLikesWrapper}
                          activeOpacity={0.7}
                          onPress={() => handleLiked(item.id)}
                        >
                          <Ionicons
                            name="md-thumbs-up-outline"
                            size={24}
                            style={styles.commentIcon}
                            color={item.likes > 0 ? "#FF6C00" : "#BDBDBD"}
                          />
                          <Text style={[styles.postLikes, likeColor]}>
                            {item.likes}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                          })
                        }
                      >
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#BDBDBD"
                          style={styles.areaIcon}
                        />
                        <Text style={styles.postArea}>{`${item.country}`}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { width: "100%", height: "100%" },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 150,
  },
  profileContainer: {
    paddingTop: 75,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },

  userContainer: { flexDirection: "row", gap: 8, marginBottom: 32 },
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
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
  postList: { flex: 1, marginBottom: 32 },
  postImage: { width: "100%", height: 240, borderRadius: 8, marginBottom: 8 },
  postTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  postDescription: { flexDirection: "row", justifyContent: "space-between" },
  likesWrapper: { flexDirection: "row", alignItems: "center" },
  postComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
    paddingLeft: 30,
  },
  postLikesWrapper: { marginLeft: 24 },
  postLikes: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8,
    paddingLeft: 30,
  },
  postZeroColor: { color: "#BDBDBD" },
  postNoZeroColor: { color: "#212121" },
  postArea: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  areaIcon: { position: "absolute", top: -2, left: -28 },
  commentIcon: { position: "absolute", top: -3, left: 0 },
});

export default ProfileScreen;
