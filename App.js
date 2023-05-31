import { ImageBackground, StyleSheet, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import BackgroundImage from "./assets/images/background.jpg";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "SFProDisplay-Light": require("./assets/fonts/SFProDisplay-Light.ttf"),
    "SFProDisplay-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.background}
      >
        <RegistrationScreen />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { width: "100%", height: "100%" },
});
