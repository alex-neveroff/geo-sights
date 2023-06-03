import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

const PostsScreen = () => {
  const navigation = useNavigation();
  const {
    params: { user },
  } = useRoute();
  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>
      <Image
        source={user.avatar}
        resizeMode="cover"
        style={styles.avatarImage}
      />
      <Text>E-mail: {user.username}</Text>
      <Text>E-mail: {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: { width: 120, height: 120, borderRadius: 16 },
});

export default PostsScreen;
