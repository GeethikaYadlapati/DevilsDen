import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RadioButton, Card, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
{
  /* Housing Preferences */
}
const HousingPreferences = ({ navigation, route }) => {
  const userId = route.params.user_id;

  const [smoking, setSmoking] = useState("");
  const [petFriendly, setPetFriendly] = useState("");
  const [messiness, setMessiness] = useState("");

  const [loggedinUser, setLoggedinUser] = useState({}); // Store a single user object
  // Assume userId is obtained from authentication or passed as a prop
  console.log(route.params.user_id);

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
  const handleUpdate = async () => {
    const userDocRef = doc(db, "users", route.params.user_id);
    const randomImage = selectRandomPhoto(route.params.gender);

    try {
      
      await updateDoc(userDocRef, {
        smoking: smoking,
        messiness: messiness,
        petFriendly: petFriendly,
        createdProfile: true,
        image: randomImage
      });
      console.log("Profile updated successfully!");
      navigation.navigate("AppNavigation", { user_id: userId }); // Or any other navigation as needed
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  function selectRandomPhoto(gender) {

    let maleImages = [
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage0.jpg?alt=media&token=3e0ecb78-d0fb-4ba1-841a-e094a595aec6",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage07.jpg?alt=media&token=fbc712a8-40c0-474d-94be-bdb865311f16",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage08.jpg?alt=media&token=5be556b1-f919-473f-b132-3f3a54726205",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage09.jpg?alt=media&token=dfce2464-2a63-4688-abd7-aa24ebf47989",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage1.jpg?alt=media&token=178f41ca-8135-425d-8b05-eb191729469f",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage10.jpg?alt=media&token=a95ada4b-4bf5-46bb-91d3-b05f180ae017",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage11.jpg?alt=media&token=1c2bf05f-1722-4424-883b-8ffc744ef039",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage12.jpg?alt=media&token=df3d7e5f-a400-4321-ac2f-73c8f14d1406",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage13.jpg?alt=media&token=7edc1c68-958a-4b1a-a0cd-2ff1efd842d0",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage14.jpg?alt=media&token=b51b1d6d-347b-4bd4-a02e-0ec1649b7fca",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage2.jpg?alt=media&token=ca0dab51-f575-455e-b591-0812d79317a6",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage3.jpg?alt=media&token=3071e7c0-bca6-4671-a88a-66535976885b",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage4.jpg?alt=media&token=712ab62b-4164-49a2-8c91-8462fdfaee09",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage5.jpg?alt=media&token=13957d24-578c-478a-9f26-d2608727add8",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/males%2Fimage6.jpg?alt=media&token=c785306e-61c3-43ec-b371-bbaee3bcaa2a",
    ]

    let femaleImages = [
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3335.JPG?alt=media&token=c3120717-0972-4156-8104-4b5df5779246",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3336.JPG?alt=media&token=0da80e13-cbde-4ea1-ad99-241d00ea6ef8",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3337.JPG?alt=media&token=6fb7eb96-f434-45e6-9127-ca20b3cb206c",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3338.JPG?alt=media&token=0c065910-ecde-4dcb-a33b-e1d13b5a48e7",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3339.JPG?alt=media&token=ed58238d-0835-48ff-b702-f1995ceacb72",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3340.JPG?alt=media&token=2cab3e4c-0f4e-444d-92f2-7fa9b19c31b6",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3341.JPG?alt=media&token=5854ff19-547e-4ab3-ae88-0a0144b82ee0",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3342.JPG?alt=media&token=76869171-ff23-4916-ba19-b7691f867268",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3345.JPG?alt=media&token=0637f119-01f5-4ba2-9eab-3fe48696862e",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3346.JPG?alt=media&token=56e5586b-6ef1-4154-8464-3809db108109",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3347.JPG?alt=media&token=d588397e-034a-428c-9a5f-c8ab8cdb680f",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3348.JPG?alt=media&token=8f063ab5-1325-4efa-836f-7bee3b1a10a6",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3349.JPG?alt=media&token=2425a7da-84d1-4d35-99ba-034f2fb68804",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3350.JPG?alt=media&token=73b7c459-12a1-4f05-8cf0-c47edaa8816e",
      "https://firebasestorage.googleapis.com/v0/b/devilsden-b47ab.appspot.com/o/females%2FIMG_3351.JPG?alt=media&token=a0016e57-e41a-47d5-87b3-295622aab8f9",
    ]

    combinedList = maleImages.concat(femaleImages);
    randomImage = combinedList[Math.floor(Math.random() * combinedList.length)];

    if (gender.toLowerCase() == "male") {
      randomImage = maleImages[Math.floor(Math.random() * maleImages.length)];
    } else {
      randomImage = femaleImages[Math.floor(Math.random() * femaleImages.length)];
    }

    return randomImage
  }

  return (
    <View style={styles.background}>
      <Card style={styles.card}>
        <Text style={styles.header}>Your Living Habits</Text>

        <View style={styles.questionSection}>
          <MaterialCommunityIcons name="broom" size={24} />
          <Text style={styles.question}>
            Do you maintain your living area in a clean manner?
          </Text>
        </View>
        <RadioButton.Group onValueChange={setMessiness} value={messiness}>
          <RadioButton.Item label="Yes" value="yes" color="#8c1d40" />
          <RadioButton.Item label="No" value="no" color="#8c1d40" />
        </RadioButton.Group>

        <View style={styles.questionSection}>
          <MaterialCommunityIcons name="paw" size={24} />
          <Text style={styles.question}>Are you pet friendly?</Text>
        </View>
        <RadioButton.Group onValueChange={setPetFriendly} value={petFriendly}>
          <RadioButton.Item label="Yes" value="yes" color="#8c1d40" />
          <RadioButton.Item label="No" value="no" color="#8c1d40" />
        </RadioButton.Group>

        <View style={styles.questionSection}>
          <MaterialCommunityIcons name="smoking" size={24} />
          <Text style={styles.question}>Do you smoke?</Text>
        </View>
        <RadioButton.Group onValueChange={setSmoking} value={smoking}>
          <RadioButton.Item label="Yes" value="yes" color="#8c1d40" />
          <RadioButton.Item label="No" value="no" color="#8c1d40" />
        </RadioButton.Group>
      </Card>

      <Button
        mode="contained"
        onPress={handleUpdate}
        theme={{ colors: { primary: "#415A77" } }}
        style={styles.button}
      >
        Create Profile
      </Button>
    </View>
  );
};

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
    width: 400,
    alignContent: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
    height: 45,
  },
  background: {
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    elevation: 4,
    width: "100%",
    height: 550,
    borderRadius: 30,
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    marginBottom: 30,
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
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  questionSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
export default HousingPreferences;