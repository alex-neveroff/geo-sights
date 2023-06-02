import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

const PostsScreen = () => {
  const navigation = useNavigation();
  const {
    params: { email },
  } = useRoute();
  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>

      <Text>E-mail: {email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostsScreen;
