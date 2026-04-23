import { DefaultTheme } from "react-native-paper";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import PersonalInformation from "./screens/createProfileScreens/PersonalInformation";
import HousingPreferences from "./screens/createProfileScreens/HousingPreferences";
import PersonalPreferences from "./screens/createProfileScreens/PersonalPreferences";
import RoommatePreferences from "./screens/createProfileScreens/RoommatePreferences";
import MessageScreen from "./screens/MessageScreen";
import ProfileMoreInfo from "./screens/ProfileMoreInfo";
import MatchingScreen from "./screens/MatchingScreen";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/AppNavigation";
import ProfileScreen from "./screens/ProfileScreen";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const theme = {
  ...DefaultTheme.colors,
  primary: "#0D1B2A", // Set your primary color
  accent: "#0D1B2A", // Set your accent color
  background: "#000000",
};

export default function App() {
  const Stack = createStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PersonalInformation"
              component={PersonalInformation}
            />
            <Stack.Screen
              name="HousingPreferences"
              component={HousingPreferences}
            />
            <Stack.Screen
              name="PersonalPreferences"
              component={PersonalPreferences}
            />
            <Stack.Screen
              name="RoommatePreferences"
              component={RoommatePreferences}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MatchingScreen"
              component={MatchingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="ProfileMoreInfo" component={ProfileMoreInfo} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              name="AppNavigation"
              options={{ headerShown: false }}
              component={AppNavigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
