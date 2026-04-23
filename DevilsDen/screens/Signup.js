import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Model,
  Pressable,
  ImageBackground,
  Dimensions,
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
import Toast from "react-native-toast-message";
//import { navigateToLogin } from './Home.js'
//import { signUp } from '../AccountServices.js';
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;
const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const navigateToPersonalInformation = () => {
    navigation.navigate("PersonalInformation");
  };
  const checkASUEmail = (email) => {
    if (email.endsWith("@asu.edu")) {
      return true;
    }
    return false;
  };
  const checkPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleSignup = () => {
    if (!checkASUEmail(email)) {
      alert("Please use an asu.edu email address.");
      return;
    }

    if (!checkPasswordMatch(password, confirmPassword)) {
      alert("Passwords don't match. Please try again!");
      return;
    }
    console.log([email, password, confirmPassword])
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), { uid:user.uid, email:email, req:[], realFriend:[], createdProfile: false });
            alert('Registered, please login.');
            navigation.navigate('Login');
          // updateProfile(user, {
          //     displayName: email
          // })
          
          // .then(() => {
          //     alert('Registered, please login.');
          //     navigation.navigate('Login');
          // })
          // .catch((error) => {
          //     alert(error.message);
          // })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    //<Text>Sign Up</Text>
    <View style={styles.fullPage}>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={styles.imageBackground}
        resizeMode="contain"
      ></ImageBackground>

      <Card style={styles.card}>
        <Text style={styles.welcome}>Welcome </Text>
        <Pressable onPress={navigateToLogin}>
          <Text style={styles.signupText}>
            Already a user?
            <Text style={styles.signupLink}> Login</Text>
          </Text>
        </Pressable>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          style={[styles.textInput]}
          underlineColor="transparent"
          theme={{ colors: { primary: "#8c1d40" } }}
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
            theme={{ colors: { primary: "#8c1d40" } }}
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

        <View style={styles.inputContainer}>
          <TextInput
            label="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="flat"
            style={styles.textInput}
            underlineColor="transparent"
            theme={{ colors: { primary: "#8c1d40" } }}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={confirmPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorMessage}>{passwordError}</Text>
        ) : null}

        <View style={styles.cardContentSeparator}></View>
        <Button
          mode="elevated"
          onPress={handleSignup}
          labelStyle={{ color: "#E0E1DD" }}
          style={styles.button}
        >
          Sign up
        </Button>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  welcome: {
    fontSize: 34,
  },
  textInputContainer: {
    marginTop: 300,
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
  imageBackground: {
    top: 0,
    width: "100%",
    height: screenHeight * 0.3,
    position: "absolute",
    zIndex: -1,
    marginTop: screenHeight * 0.04,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
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
});

export default Signup;
