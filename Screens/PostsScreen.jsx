import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectUserName,
} from "../redux/auth/authSelectors";

const PostsScreen = () => {
  const navigation = useNavigation();

  const avatar = useSelector(selectAvatar);
  const username = useSelector(selectUserName);
  const email = useSelector(selectEmail);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        {avatar && (
          <Image
            source={avatar}
            resizeMode="cover"
            style={styles.avatarImage}
          />
        )}
        <View style={styles.userDescription}>
          {username && <Text style={styles.userName}>{username}</Text>}
          {email && <Text style={styles.userEmail}>{email}</Text>}
        </View>
      </View>
      {/* {user.posts.length > 0 && (
        <View style={styles.postList}>
          {user.posts.map((post, index) => (
            <View style={styles.post} key={index}>
              <Image
                source={post.photo}
                resizeMode="cover"
                style={styles.postImage}
              />
              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={styles.postDescription}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      comments: post.comments,
                      photo: post.photo,
                      user: user,
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
                      location: post.location,
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
                  >{`${post.city}, ${post.country}`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )} */}
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
