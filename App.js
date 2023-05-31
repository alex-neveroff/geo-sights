import { ImageBackground, StyleSheet, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import BackgroundImage from "./images/background.jpg";

export default function App() {
  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: { width: "100%", height: "100%" },
});
