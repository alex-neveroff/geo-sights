import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = () => {
  const {
    params: { comments, photo, user },
  } = useRoute();

  const [newComment, setNewComment] = useState({
    text: "",
    date: "",
    userAvatar: user.avatar,
  });

  const handleCommentChange = (text) => {
    dateCommentChange();
    setNewComment((prevState) => ({
      ...prevState,
      text: text,
    }));
  };
  const dateCommentChange = () => {
    const months = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedDate = `${day} ${months[monthIndex]}, ${year} | ${hours}:${minutes}`;
    setNewComment((prevState) => ({
      ...prevState,
      date: formattedDate,
    }));
  };

  const handlePublishComment = () => {
    if (newComment.text) {
      comments.unshift(newComment);
      setNewComment((prevState) => ({
        ...prevState,
        text: "",
        date: "",
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-140}
    >
      <Image source={photo} resizeMode="cover" style={styles.postImage} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.commentsContainer}>
          {comments.map((comment, index) => {
            const isEven = index % 2 === 0;
            const commentStyle = isEven
              ? styles.commentEven
              : styles.commentOdd;
            return (
              <View style={[styles.comment, commentStyle]} key={index}>
                {isEven ? (
                  <Image
                    source={comment.userAvatar}
                    resizeMode="cover"
                    style={styles.commentAvatar}
                  />
                ) : null}
                <View style={styles.commentWrap}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text
                    style={[
                      styles.commentDate,
                      isEven ? styles.commentDateRight : null,
                    ]}
                  >
                    {comment.date}
                  </Text>
                </View>
                {!isEven ? (
                  <Image
                    source={comment.userAvatar}
                    resizeMode="cover"
                    style={styles.commentAvatar}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.commentFooter}>
        <TextInput
          style={[styles.commentInput]}
          placeholder="Коментувати..."
          onChangeText={handleCommentChange}
          value={newComment.text}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.commentButton}
          onPress={handlePublishComment}
        >
          <View style={styles.commentButtonOut}>
            <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  commentEven: {
    justifyContent: "flex-end",
  },
  commentOdd: {
    justifyContent: "flex-start",
  },
  postImage: { width: "100%", height: 240, borderRadius: 50, marginBottom: 8 },
  commentsContainer: { paddingTop: 32, paddingBottom: 80, gap: 24 },
  comment: { flexDirection: "row", gap: 16 },
  commentAvatar: { width: 28, height: 28, borderRadius: 50 },
  commentWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  commentDateRight: { textAlign: "right" },
  commentFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  commentInput: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  commentButton: { position: "absolute", top: 18, right: 32 },
  commentButtonOut: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default CommentsScreen;
