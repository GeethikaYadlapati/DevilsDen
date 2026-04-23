import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  //Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import ChatScreen from "./ChatScreen";
{
  /*
import { useState } from "react";

const [name, SetName] = useState("");
const [submitted, SetSubmitted] = useState(false);
const onPressHandler = () => {
  SetSubmitted(!submitted);
};
*/
}

const BottomTabView = () => {
  const Tab = createMaterialTopTabNavigator();

  const RoomieSwipes = ({navigation}) => {
    const handleChatPress = () => { navigation.navigate('ChatScreen');};
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --------------------------------------------------------------------Starting for Roomie Swipes------------------------------------------------ */}

        <View>
          <View style={styles.rowContainer}>
            <View style={styles.smallProfileImage}>
              <Image
                source={require("../assets/johnpic.jpg")}
                style={styles.Image}
                resizeMode="center"
              ></Image>
            </View>
            <Text
              style={[
                styles.text,
                { color: "#41444B", fontWeight: "300", fontSize: 20 },
              ]}
            >
              mr_johnathon
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                onPress={handleChatPress}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Chat
              </Button>
            </View>
            {/*<View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Anonymous Chat
              </Button>
            </View> */}
          </View>

          {/* ------------------line breaker for both the roomie user profiles------------------------- */}
          <View style={styles.rowContainer}>
            <View style={styles.smallProfileImage}>
              <Image
                source={require("../assets/johnpic.jpg")}
                style={styles.Image}
                resizeMode="center"
              ></Image>
            </View>
            <Text
              style={[
                styles.text,
                { color: "#41444B", fontWeight: "300", fontSize: 20 },
              ]}
            >
              jacob543
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Chat
              </Button>
            </View>
           {/* <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Anonymous Chat
              </Button>
            </View> */}
          </View>
        </View>

        {/* --------------------------------------------------------------------Ending for Roomie Swipes------------------------------------------------ */}
      </ScrollView>
    );
  };
  const HousingSwipes = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --------------------------------------------------------------------Starting for Housing Swipes------------------------------------------------ */}

        <View>
          <View style={styles.rowContainer}>
            <View style={styles.smallProfileImage}>
              <Image
                source={require("../assets/johnpic.jpg")}
                style={styles.Image}
                resizeMode="center"
              ></Image>
            </View>
            <Text
              style={[
                styles.text,
                { color: "#41444B", fontWeight: "300", fontSize: 20 },
              ]}
            >
              ryan34
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Chat
              </Button>
            </View>
            <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Anonymous Chat
              </Button>
            </View>
          </View>

          {/* ------------------line breaker for both the housing user profiles------------------------- */}
          <View style={styles.rowContainer}>
            <View style={styles.smallProfileImage}>
              <Image
                source={require("../assets/johnpic.jpg")}
                style={styles.Image}
                resizeMode="center"
              ></Image>
            </View>
            <Text
              style={[
                styles.text,
                { color: "#41444B", fontWeight: "300", fontSize: 20 },
              ]}
            >
              benjamin78
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Chat
              </Button>
            </View>
            <View style={[styles.button]}>
              <Button
                //mode="contained"
                //onPress={navigateToLogin}
                theme={{ colors: { primary: "#778DA9" } }}
              >
                Anonymous Chat
              </Button>
            </View>
          </View>
        </View>

        {/* --------------------------------------------------------------------Ending for Housing Swipes------------------------------------------------ */}
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Matches" component={RoomieSwipes} />
     {/* <Tab.Screen name="HousingSwipes" component={HousingSwipes} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    margin: 10,
  },

  profileImage: {
    width: 230,
    height: 300,
    margin: 0,
    marginLeft: 10,
    //resizeMode : 'contain',
    // borderRadius: 100,
    overflow: "hidden",
  },
  Image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },

  rowContainer: {
    flexDirection: "row",
  },
  smallProfileImage: {
    width: 44,
    height: 44,
    margin: 3,
    marginLeft: 10,
    borderRadius: 100,
    resizeMode: "cover",
    overflow: "hidden",
  },
  button: {
    width: 175,
    height: 40,
    margin: 3,
    marginLeft: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "000000",
    alignItems: "center",
  },
});

export default BottomTabView;
