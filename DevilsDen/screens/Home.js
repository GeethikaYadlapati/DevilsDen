import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import { PaperProvider, Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

const Home = ({ navigation }) => {
  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const handleGetStarted = () => {
    setIsWelcomeVisible(false);
  };

  const theme = useTheme();

  return (
    <PaperProvider>
      <View style={[styles.container, { backgroundColor: "#d0d0d0" }]}>
        <ImageBackground
          source={require("../assets/logo.png")}
          style={styles.backgroundImage}
        >
          {/* Background Image */}
        </ImageBackground>

        {/* Login Button */}
        <View style={styles.loginContainer}>
          <Button
            mode="contained"
            onPress={navigateToSignup}
            theme={{ colors: { primary: "#8c1d40" } }}
          >
            Get Started
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Adjusts the image to cover the entire container
    width: "100%", // Set the width to fill the screen
    height: 400, // Set the height to cover the top two-thirds of the screen
    alignSelf: "center",
    marginTop: Dimensions.get("window").height - 400 - 255 - 58,
  },
  loginContainer: {
    flexDirection: "row", // Align button horizontally with signup text
    justifyContent: "center", // Center the button horizontally
    marginBottom: 275, // Adds space at the bottom for the button
    shadowOpacity: 0.3, // adds shadow for depth
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
  },
});

export default Home;
