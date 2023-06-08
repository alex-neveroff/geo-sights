import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/core";

const CommentsScreen = () => {
  const {
    params: { comments, photo },
  } = useRoute();

  const [newComment, setNewComment] = useState({
    text: "",
    date: "",
    avatar: {
      uri: "",
    },
  });

  return (
    <View style={styles.container}>
      <Image source={photo} resizeMode="cover" style={styles.postImage} />
      <View style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <View style={styles.comment} key={index}>
            <Image
              source={comment.avatar}
              resizeMode="cover"
              style={styles.commentAvatar}
            />
            <View>
              <Text style={styles.commentNext}>{comment.text}</Text>
              <Text style={styles.commentDate}>{comment.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  postImage: { width: "100%", height: 240, borderRadius: 8, marginBottom: 8 },
});

export default CommentsScreen;
