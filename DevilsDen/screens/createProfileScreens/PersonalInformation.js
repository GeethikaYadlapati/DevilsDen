//someone had imported useEffect class from the 'react' library.
//I took it out for testing as it was throwing an error.
//This note is here in case I forget to put it back
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  RadioButton,
  Card,
  Button,
  TextInput,
  configureFonts,
  DefaultTheme,
} from "react-native-paper";
import { fetchUserProfile, updateUserProfile } from "../../AccountServices";
import { TextInput as PaperTextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import {
  onSnapshot,
  doc,
  getDocs,
  query,
  collection,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

//import {HeleveticaNeue-Regular} from './assets/fonts'
const genderOptions = ["Female", "Male", "Other"];
const cleanlinessOPtions = ["Messy", "Lived in", "Tidy", "Super clean"];

const PersonalInformation = ({ navigation, route }) => {
  const userId = route.params.user_id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [major, setMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");

  const [loggedinUser, setLoggedinUser] = useState({}); // Store a single user object

  useEffect(() => {
    const q = query(doc(db, "users", route.params.user_id));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const user = snapshot.data();

      console.log(user);
      setLoggedinUser(user);
    });

    // This needs to be called after loggedinUser is set, so we'll call fetchUsers here
    // Note: You might need additional logic to handle timing and dependencies correctly

    // Cleanup function to unsubscribe from onSnapshot listener when component unmounts
  }, [userId]);

  const fontConfig = {
    default: {
      regular: {
        fontFamily: "HelveticaNeue-Regular",
        fontWeight: "400",
      },
    },
  };
  // Generate age options
  const ageOptions = Array.from({ length: 30 - 18 }, (_, i) => 18 + i);

  const handleUpdate = async () => {
    const userDocRef = doc(db, "users", route.params.user_id);

    try {
      await updateDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        major: major,
        graduationYear: graduationYear,
        gender: gender,
        yearInCollege: year,
      });
      console.log("Profile updated successfully!");
      // Navigate and pass the userId
      navigateToHousingPreferences();
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const navigateToHousingPreferences = () => {
    navigation.navigate("HousingPreferences", { user_id: userId, gender: gender });
  };

  const changeComponent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
  };
  // const RadioButton = ({ label, selectedOption, onSelect }) => {
  //   return (
  //     <TouchableOpacity style={styles.radio} onPress={onSelect}>
  //       <View style={[styles.circle, selectedOption && styles.selectedCircle]}>
  //         {selectedOption && <View style={styles.innerCircle} />}
  //       </View>
  //       <Text style={styles.label}>{label}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const handlePersonalInformation = () => {
    navigateToHousingPreferences();
  };

  return (
    <View style={styles.background}>
      <Card style={styles.card}>
        <Text style={styles.header}>About you</Text>
        <ScrollView scollContainerStyle={styles.scrollContainer}>
          <View style={styles.section}>
            <PaperTextInput
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              theme={{
                colors: { primary: "#8C1D40", underlineColor: "transparent" },
              }}
              mode="flat"
            />
            {/* <PaperTextInput
                label="Middle Name (optional)"
                value={personalInfo.middleName}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, middleName: text })}
                style={styles.input}
                theme={{ colors: { primary: '#8C1D40', underlineColor: 'transparent' }}}
                mode="flat"
  /> */}
            <TextInput
              style={styles.input}
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              theme={{
                colors: { primary: "#8C1D40", underlineColor: "transparent" },
              }}
              mode="flat"
            />

            <TextInput
              style={styles.input}
              label="Username"
              value={userName}
              onChangeText={setUserName}
              theme={{
                colors: { primary: "#8C1D40", underlineColor: "transparent" },
              }}
              mode="flat"
            />

            <TextInput
              style={styles.input}
              label="Major"
              value={major}
              onChangeText={setMajor}
              theme={{
                colors: { primary: "#8C1D40", underlineColor: "transparent" },
              }}
              mode="flat"
            />

            <TextInput
              style={styles.input}
              label="Graduation Year"
              value={graduationYear.toString()} // Convert the number to a string for the text input display
              onChangeText={(text) => {
                // Convert the input text to a number before storing it
                const numericValue = parseInt(text, 10);
                if (!isNaN(numericValue)) {
                  // Check if the parsed value is a valid number
                  setGraduationYear(numericValue);
                } else {
                  setGraduationYear(""); // Reset or handle invalid input appropriately
                }
              }}
              keyboardType="numeric" // Ensure the keyboard is set to numeric to aid user input
              theme={{
                colors: { primary: "#8C1D40", underlineColor: "transparent" },
              }}
              mode="flat"
            />

            {/*} <TextInput
                style={styles.input}
                label="Phone Number"
                value={personalInfo.phoneNumber}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, phoneNumber: text })}
                  theme={{ colors: { primary: '#8C1D40', underlineColor: 'transparent' }}}
                mode="flat"
                
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={personalInfo.email}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, email: text })
                  
                }
              /> */}

            {/* Gender selection */}
            <Text style={styles.question}>Gender:</Text>
            <RadioButton.Group onValueChange={setGender} value={gender}>
              <View style={styles.radioButtonRow}>
                <RadioButton.Item
                  label="Female"
                  value="Female"
                  color="#8c1d40"
                />
                <RadioButton.Item label="Male" value="Male" color="#8c1d40" />
                <RadioButton.Item label="Other" value="Other" color="#8c1d40" />
              </View>
            </RadioButton.Group>

            {/* Year in College selection */}
            <Text style={styles.question}>Year in College:</Text>
            <RadioButton.Group onValueChange={setYear} value={year}>
              <View style={styles.radioButtonRow}>
                <RadioButton.Item
                  label="Freshman"
                  value="Freshman"
                  color="#8c1d40"
                />
                <RadioButton.Item
                  label="Sophomore"
                  value="Sophomore"
                  color="#8c1d40"
                />
                <RadioButton.Item
                  label="Junior"
                  value="Junior"
                  color="#8c1d40"
                />
                <RadioButton.Item
                  label="Senior"
                  value="Senior"
                  color="#8c1d40"
                />
              </View>
            </RadioButton.Group>
          </View>
        </ScrollView>
      </Card>
      <Button
        mode="contained"
        onPress={handleUpdate}
        theme={{ colors: { primary: "#415A77" } }}
        style={styles.button}
      >
        Continue
      </Button>
    </View>
  );
};
//Was above continue button
//<Button mode="contained" onPress={handleUpdate} theme={{colors: {primary:"#415A77"}}} style={styles.button}>Update Information</Button>

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  radiobutton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "gray",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
    width: 400,
    alignContent: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    alignContent: "center",
    margin: 15,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#b4b4b4",
    paddingHorizontal: 0,
    paddingVertical: 10,
    fontSize: 18,
    paddingRight: 40,
    position: "relative",
    flexGrow: 1,
  },
  background: {
    backgroundColor: "#fafafa",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    elevation: 4,
    width: "100%",
    height: 650,
    borderRadius: 30,
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  button: {
    borderWidth: 2,
    width: 150,
    left: 25,
    marginTop: -10,
    backgroundColor: "#8c1d40",
    alignSelf: "center",
    marginRight: 50,
  },
  separator: {
    padding: 50,
  },
  radioButtonRow: {
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 20,
    marginLeft: 22,
  },
  radioButtonLabel: {
    marginRight: 15,
    fontSize: 16,
  },
  question: {
    marginTop: 20,
    marginLeft: 14,
    flex: 1,
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  picker: {
    width: "100%",
    height: 50,
  },
});

export default PersonalInformation;
