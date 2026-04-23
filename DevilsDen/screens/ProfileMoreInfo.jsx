import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { onSnapshot, doc, getDocs, query, collection, where, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 


export default function ProfileMoreInfo({ navigation, route }) {
 
 const { userId } = route.params;
  const [loggedinUser, setLoggedinUser] = useState({}); // Store a single user object
  // Assume userId is obtained from authentication or passed as a prop
  

  useEffect(() => {
    
    const q = query(doc(db, "users", userId));
    
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const user = snapshot.data();
        
        setLoggedinUser(user)
      });
  
      
    // This needs to be called after loggedinUser is set, so we'll call fetchUsers here
    // Note: You might need additional logic to handle timing and dependencies correctly
    

    // Cleanup function to unsubscribe from onSnapshot listener when component unmounts
   
  }, []); 

const [isImageModalVisible, setImageModalVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

const handleImagePress = (image) => {
  setSelectedImage(image);
  setImageModalVisible(true);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text
            style={[
              styles.text,
              { color: "white", fontWeight: "300", fontSize: 25 },
            ]}
          >
            {loggedinUser.username} 
          </Text>
        </View>
        <View>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeaderContainer}>
          <View style={styles.profileHeader}>
            <Image
              source={require("../assets/users/user-3.jpg")}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.profileDetails}>
              <Text style={styles.username}>{loggedinUser.firstName} {loggedinUser.lastName}</Text>
              <View style={styles.bioContainer}>
                <Text style={styles.bio}>
                Hello! I'm on the lookout for like-minded roommates who are easy-going and tidy. Let's make our living space a cozy and fun place!
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Photos</Text>
          <View style={styles.infoCard}>
          <ScrollView
             horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photosContainer}
          >
  <TouchableOpacity onPress={() => handleImagePress(require('../assets/users/user-3.jpg'))}>
    <Image
      source={require('../assets/users/user-3.jpg')}
      style={styles.photo}
    />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleImagePress(require('../assets/users/user-3.jpg'))}>
    <Image
      source={require('../assets/users/user-3.jpg')}
      style={styles.photo}
    />
  </TouchableOpacity>
</ScrollView>
          </View>
          </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About My Life</Text>
          <View style={styles.infoCard}>
          <Text style={styles.infoText}>First Name: {loggedinUser.firstName}</Text>
          <Text style={styles.infoText}>Last Name: {loggedinUser.lastName}</Text>
            <Text style={styles.infoText}>gender: {loggedinUser.gender}</Text>
            <Text style={styles.infoText}>major: {loggedinUser.major}</Text>
            <Text style={styles.infoText}>Year in College: {loggedinUser.yearInCollege}</Text>
            <Text style={styles.infoText}>Graduation Year: {loggedinUser.graduationYear}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Living Habits</Text>
          <View style={styles.infoCard}>
          <Text style={styles.infoText}>How do you maintain your living space?: {loggedinUser.messiness ? 'Messy' : 'Clean'}</Text>
          <Text style={styles.infoText}>Do you smoke?: {loggedinUser.smoking ? 'Yes' : 'No'}</Text>
          <Text style={styles.infoText}>Pet Friendly?: {loggedinUser.petFriendly ? 'Yes' : 'No'}</Text>
          </View>
        </View>
      </ScrollView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <Image source={selectedImage} style={styles.expandedImage} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setImageModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <View style={{marginBottom:70}}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9a2046",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9a2046",
    padding: 10,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    margin: 10,
  },
  profileHeaderContainer: {
    backgroundColor: "#9a2046",
    borderRadius: 15,
    
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 }, // Border offset
    textShadowRadius: 1,
  },
  bioContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    maxWidth: "80%",
    marginLeft: 5,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bio: {
    fontSize: 14,
    color: "#0D1B2A",
    fontWeight: "300",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 }, // Border offset
    textShadowRadius: 1,
  },
  infoCard: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  photosContainer: {
    paddingLeft: 10,
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
  centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
expandedImage: {
  width: '90%', // or a specific size you want
  height: '80%',
  resizeMode: 'contain'
},
button: {
  backgroundColor: '#8c1d40',
  padding: 10,
  elevation: 2,
  top: -110,
  borderRadius: 15,
  marginRight: 10,
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
});