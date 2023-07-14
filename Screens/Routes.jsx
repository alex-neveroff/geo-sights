import CommentsScreen from "./CommentsScreen";
import Home from "./Home";
import LoginScreen from "./LoginScreen";
import MapScreen from "./MapScreen";
import RegistrationScreen from "./RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet } from "react-native";

const MainStack = createStackNavigator();

export const currentRouter = (isAuth) => {
  console.debug("isAuth Router: ", isAuth);
  if (!isAuth) {
    return (
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={styles.tabOptions}
      >
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={styles.tabOptions}
    >
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Мапа</Text>,
        }}
      />
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Коментарі</Text>,
        }}
      />
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabOptions: { headerTitleAlign: "center" },
  headerTitle: {
    marginBottom: 11,
    marginTop: 11,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },
});
