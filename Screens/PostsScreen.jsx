import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
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
  onSnapshot,
  orderBy,
  query,
  where,
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
  }, []);

  const getPosts = async () => {
    try {
      const myQuery = query(
        collection(db, "posts"),
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

  return (
    <View style={styles.container}>
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
            return (
              <View style={styles.postList}>
                <Image
                  source={{ uri: item.photo }}
                  resizeMode="cover"
                  style={styles.postImage}
                />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.postDescription}>
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
                      color={item.comments.length > 0 ? "#FF6C00" : "#BDBDBD"}
                      style={styles.commentIcon}
                    />
                    <Text style={[styles.postComments, postColor]}>
                      {item.comments.length}
                    </Text>
                  </TouchableOpacity>

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
                    <Text
                      style={styles.postArea}
                    >{`${item.city}, ${item.country}`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
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
  userContainer: { flexDirection: "row", gap: 8, marginBottom: 32 },
  avatarImage: { width: 60, height: 60, borderRadius: 16 },
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
  postComments: {
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

export default PostsScreen;
