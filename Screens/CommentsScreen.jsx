import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectAvatar } from "../redux/auth/authSelectors";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const CommentsScreen = () => {
  const avatar = useSelector(selectAvatar);
  const {
    params: { comments, photo, postId },
  } = useRoute();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState({
    text: "",
    date: "",
    userAvatar: avatar,
    id: postId,
  });

  useEffect(() => {
    if (comments && comments.length > 0) {
      setAllComments(comments);
    }
  }, [comments]);

  const keyBoardHide = () => {
    Keyboard.dismiss();
  };

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

  const handlePublishComment = async () => {
    if (newComment.text) {
      keyBoardHide();
      setAllComments((prevState) => [...prevState, newComment]);

      try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
          comments: [...comments, newComment],
        });
      } catch (error) {
        console.error("Помилка додавання коментаря:", error);
        alert("Помилка додавання коментаря");
      }

      setNewComment((prevState) => ({
        ...prevState,
        text: "",
        date: "",
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo }}
        resizeMode="cover"
        style={styles.postImage}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={allComments}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          const commentStyle = isEven ? styles.commentEven : styles.commentOdd;

          return (
            <View style={styles.commentsList}>
              <View style={[styles.comment, commentStyle]}>
                {isEven ? (
                  <Image
                    source={{ uri: item.userAvatar }}
                    resizeMode="cover"
                    style={styles.commentAvatar}
                  />
                ) : null}
                <View style={styles.commentWrap}>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <Text
                    style={[
                      styles.commentDate,
                      isEven ? styles.commentDateRight : null,
                    ]}
                  >
                    {item.date}
                  </Text>
                </View>
                {!isEven ? (
                  <Image
                    source={{ uri: item.userAvatar }}
                    resizeMode="cover"
                    style={styles.commentAvatar}
                  />
                ) : null}
              </View>
            </View>
          );
        }}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? -200 : -200}
      >
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
      </KeyboardAvoidingView>
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
  commentEven: {
    justifyContent: "flex-end",
  },
  commentOdd: {
    justifyContent: "flex-start",
  },
  postImage: { width: "100%", height: 240, borderRadius: 50, marginBottom: 32 },
  commentsContainer: { paddingBottom: 24 },
  commentsList: {
    marginBottom: 24,
  },
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
    paddingLeft: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 16,
  },

  commentButton: { position: "absolute", top: 8, right: 8 },
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
