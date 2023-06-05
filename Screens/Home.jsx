import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator screenOptions={styles.tabOptions}>
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Публікації</Text>,

          headerRight: () => (
            <TouchableOpacity style={styles.logOutButton}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color="#BDBDBD"
                onPress={() => navigation.navigate("Login")}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-grid-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Створити публікацію</Text>
          ),

          headerLeft: () => (
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#212121" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.logOutButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="log-out-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutButton: { marginRight: 16, marginBottom: 10, marginTop: 11 },
  arrowButton: { marginLeft: 16, marginBottom: 10, marginTop: 11 },
  headerTitle: {
    marginBottom: 11,
    marginTop: 11,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },
  tabOptions: {
    headerTitleAlign: "center",
    tabBarShowLabel: false,
    tabBarActiveBackgroundColor: "#FF6C00",
    tabBarActiveTintColor: "#ffffff",
    tabBarInactiveTintColor: "#212121",
    tabBarStyle: {
      height: 70,
      paddingTop: 9,
      paddingBottom: 22,
      paddingHorizontal: 82,
      borderTopWidth: 1,
      borderColor: "#E5E5E5",
    },
    tabBarItemStyle: {
      borderRadius: 20,
    },
  },
});

export default Home;
