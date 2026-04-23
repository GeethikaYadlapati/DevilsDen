import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  PaperProvider,
  DefaultTheme,
  Card,
} from "react-native-paper";
//import { navigateToSignup } from './Home.js'
//import { login } from '../AccountServices.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, onSnapshot,where,updateDoc,doc,arrayUnion,collectionGroup} from 'firebase/firestore';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  //implement handlers to request API?
  const handleLogin = async () => {
    let screenName = null;
    let uid = null;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user.uid);
  
      const q1 = query(collection(db, "users"), where("uid", "==", userCredential.user.uid));
      const contactsSnap = await getDocs(q1);
      let createdProfile = false;
  
      contactsSnap.forEach((documentSnapshot) => {
        createdProfile = documentSnapshot.data().createdProfile;
        uid = documentSnapshot.data().uid;
        console.log(documentSnapshot.data())
      });
  
      screenName = createdProfile ? 'AppNavigation' : 'PersonalInformation';
      navigation.navigate(screenName, {user_id: userCredential.user.uid});
    } catch (error) {
      alert(error.message);
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "0D1B2A",
    },
  };
  return (
    //
    <View style={styles.fullPage}>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={styles.imageBackground}
        resizeMode="contain"
      ></ImageBackground>

      <Card style={styles.card}>
        <Text style={styles.welcome}>Welcome </Text>
        <Pressable onPress={navigateToSignup}>
          <Text style={styles.signupText}>
            Don't have an account?
            <Text style={styles.signupLink}> Sign up</Text>
          </Text>
        </Pressable>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          style={styles.textInput}
          underlineColor="transparent"
          theme={{
            colors: { primary: "#8c1d40", underlineColor: "transparent" },
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            mode="flat"
            style={styles.textInput}
            underlineColor="transparent"
            theme={{
              colors: { primary: "#8c1d40", underlineColor: "transparent" },
            }}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContentSeparator}></View>
        <Button
          mode="elevated"
          onPress={handleLogin}
          labelStyle={{ color: "#E0E1DD" }}
          style={styles.button}
        >
          Login
        </Button>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    margin: 15,
    borderWidth: 2,
    backgroundColor: "#E0E1DD",
  },
  card: {
    elevation: 4,
    width: "100%",
    height: 550,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fafafa",
  },
  cardContentSeparator: {
    height: 50,
  },
  textInput: {
    alignContent: "center",
    margin: 15,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#D3D3D3",
    paddingHorizontal: 0,
    paddingVertical: 10,
    fontSize: 18,
    paddingRight: 40,
    position: "relative",
    flexGrow: 1,
  },
  separator: {
    width: 60,
    padding: 100,
  },
  fullPage: {
    backgroundColor: "#8c1d40",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    width: 150,
    left: 25,
    marginTop: -20,
    backgroundColor: "#8c1d40",
    alignSelf: "center",
    marginRight: 50,
  },
  welcome: {
    fontSize: 34,
  },
  signupText: {
    textAlign: "left",
    color: "#484848",
  },
  signupLink: {
    textDecorationLine: "underline",
    color: "#8c1d40",
    fontWeight: "bold",
  },
  imageBackground: {
    top: 0,
    width: "100%",
    height: screenHeight * 0.3,
    position: "absolute",
    zIndex: -1,
    marginTop: screenHeight * 0.04,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  inputContainer: {
    flexDirection: "column",
    width: "100%",
  },

  eyeIcon: {
    alignSelf: "flex-end",
    marginTop: -50,
  },
});
export default Login;
