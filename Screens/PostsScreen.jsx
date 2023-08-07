import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectUserName,
} from "../redux/auth/authSelectors";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const PostsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const username = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const email = useSelector(selectEmail);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getPosts();
    }
  }, [userPosts]);

  const getPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const allPosts = [];
      snapshot.forEach((doc) =>
        allPosts.push({ id: doc.id, data: doc.data() })
      );
      setUserPosts(allPosts);
    } catch (error) {
      console.debug(error.message);
      alert(`Не вдалося завантажити пости`);
    }
  };

  // const onLike = async (postId) => {
  //   try {
  //     const postRef = doc(db, "posts", postId);
  //     const postSnapshot = await getDoc(postRef);
  //     const postLikes = postSnapshot.data().likes;
  //     const updatedLikes = Number(postLikes + 1);
  //     await updateDoc(postRef, {
  //       likes: updatedLikes,
  //     });
  //   } catch (error) {
  //     console.debug(error.message);
  //     alert(`Лайк не додано`);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        {avatar && (
          <Image
            source={{
              uri: avatar,
            }}
            resizeMode="cover"
            style={styles.avatarImage}
          />
        )}

        <View style={styles.userDescription}>
          {username && <Text style={styles.userName}>{username}</Text>}
          {email && <Text style={styles.userEmail}>{email}</Text>}
        </View>
      </View>

      {userPosts.length > 0 && (
        <View style={styles.postList}>
          {userPosts.map((post, index) => (
            <View style={styles.post} key={index}>
              <Image
                source={post.data.photo}
                resizeMode="cover"
                style={styles.postImage}
              />
              <Text style={styles.postTitle}>{post.data.title}</Text>
              <View style={styles.postDescription}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      comments: post.data.comments,
                      photo: post.data.photo,
                      user: username,
                    })
                  }
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color="#BDBDBD"
                    style={styles.commentIcon}
                  />
                  <Text style={styles.postComments}>
                    {post.comments.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: post.data.location,
                    })
                  }
                >
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color="#BDBDBD"
                    style={styles.areaIcon}
                  />
                  <Text
                    style={styles.postArea}
                  >{`${post.data.city}, ${post.data.country}`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
      {userPosts.length === 0 && (
        <View style={styles.postList}>
          <Text style={styles.postDescription}>
            Ви ще не опублікували жодного фото
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopColor: "#BDBDBD",
    borderTopWidth: 1,
  },
  userContainer: { flexDirection: "row", gap: 8 },
  avatarImage: { width: 120, height: 120, borderRadius: 16 },
  userDescription: { flex: 1, justifyContent: "center" },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postList: { paddingTop: 32, flex: 1, gap: 32, marginBottom: 32 },
  postImage: { width: "100%", height: 240, borderRadius: 8, marginBottom: 8 },
  postTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  postDescription: { flexDirection: "row", justifyContent: "space-between" },
  postComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 8,
    paddingLeft: 30,
  },
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

export default PostsScreen;
