import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";
import Home from "./Home";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/authSelectors";

const MainStack = createStackNavigator();

export default function Main() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <NavigationContainer>
      {!isAuth ? (
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
      ) : (
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
              headerTitle: () => (
                <Text style={styles.headerTitle}>Коментарі</Text>
              ),
            }}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabOptions: { headerTitleAlign: "center" },
  headerTitle: {
    marginBottom: 11,
    marginTop: 11,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },
});
