import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addDoc, onSnapshot, doc, getDocs, query, collection, where, updateDoc } from 'firebase/firestore';
import {auth, db, storage } from '../firebase'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = ({ navigation, route }) => {
  // State setup for user data
  const [users, setUsers] = useState([]); // Presumably for storing user contacts/friends
  const [loggedinUser, setLoggedinUser] = useState({}); // Store a single user object
  const [avatarUrl, setAvatarUrl] = useState(null);
  // Assume userId is obtained from authentication or passed as a prop
  const userId = route.params.userId; // Adjusted for consistency
  
  
  useEffect(() => {
    

    const q = query(doc(db, "users", route.params.user_id));
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const user = snapshot.data();
        
        setLoggedinUser(user)
      });
   

      const fetchUsers = async () => {
        // Combine realFriend and req arrays, ensuring no duplicates
        const uniqueUserIds = Array.from(new Set([
          ...(loggedinUser.realFriend || []),
          ...(loggedinUser.req || [])
        ]));
      
        if (uniqueUserIds.length > 0) {
          try {
            // Map over the combined uniqueUserIds to fetch user documents
            const userPromises = uniqueUserIds.map(uid =>
              getDocs(query(collection(db, 'users'), where("uid", "==", uid)))
            );
      
            // Wait for all promises to resolve
            const results = await Promise.all(userPromises);
      
            // Flatten the array of QuerySnapshot to get the documents' data
            const contactDetails = results.flatMap(snap =>
              snap.docs.map(doc => ({
                ...doc.data(),
                key: doc.id  // Use document ID as a key for list rendering in React
              }))
            );
      
            // Update state with the fetched users
            setUsers(contactDetails);
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        }
      };
      
      // Call fetchUsers
      fetchUsers();
   
  }, [userId, loggedinUser.realFriend]); // Dependency on loggedinUser.realFriend for re-fetching contacts

  
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false); //for profile header
  const [showLogoutConfirmationModal, setShowLogoutConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempUserEdits, setTempUserEdits] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUR, setDownloadUR] = useState(null);




  const [editedData, setEditedData] = useState({
    name: loggedinUser.username,
    gender: loggedinUser.gender,
    major: 'Computer Science',
    yearInCollege: 'Senior',
    graduationYear: '2026',
    bio: "Hello! I'm on the lookout for like-minded roommates who are easy-going and tidy. Let's make our living space a cozy and fun place!",
  });
  const [showRoommateEditModal, setShowRoommateEditModal] = useState(false);
  const [editedRoommateData, setEditedRoommateData] = useState({
    messiness: 'yes',
    smokingPreferences: 'Non-smoker',
    petFriendly: 'Yes',
  });

  const nameOptions = ['Sally']
  const genderOptions = ['male', 'female', 'other'];
  const major = ['Computer Science'];
  const yearOptions = ['freshman', 'sophomore', 'junior', 'senior', 'Graduate Student'];
  const graduationYearOptions = ['2028', '2027', '2026', '2025', '2024', '2023']


  
  const smokingOptions = ['Yes', 'No'];
  const petOptions = ['Yes', 'No'];
  const messinessOptions = ['Messy', 'Clean'];

  const handleEditSave = () => {
    
    setShowEditModal(false);
  };

  const handleRoommateEditSave = () => {
    setShowRoommateEditModal(false);
  };

  const handleProfileEditSave = () => {
    setShowProfileEditModal(false);
  };
  const updateUserGender = async (userId, newGender) => {
    const userRef = doc(db, "users", userId);
  
    try {
      await updateDoc(userRef, {
        gender: newGender,
      });
      console.log("User gender updated successfully");
    } catch (error) {
      console.error("Error updating user gender: ", error);
    }
  };
  
  const handleSave = async () => {
  
  await uploadImage(); 

  setShowEditModal(false);
    // Prepare an object for updates
  /*const updates = Object.keys(tempUserEdits).reduce((acc, key) => {
    // Check if the value has changed
    if (tempUserEdits[key] !== loggedinUser[key] && tempUserEdits[key] !== "" && tempUserEdits[key] !== null ) {
      setIsLoading(true);
      acc[key] = tempUserEdits[key]; // Add to updates if changed
    }
    return acc;
  }, {});
  console.log(updates)
  // Check if there are any updates to be made
  if (Object.keys(updates).length > 0) {
    const userRef = doc(db, "users", route.params.user_id); // Ensure userId is correct
    try {
      //console.log("stuck hereee")
      await updateDoc(userRef, updates);
      console.log("Profile updated successfully.");

      // Update local state to reflect changes
      setLoggedinUser(prev => ({ ...prev, ...updates }));

      // Reset temporary edits
      setTempUserEdits({});
      
      // Close the modal or indicate success as needed
      setIsLoading(false);
      setShowEditModal(false); // Assuming this closes your modal
    } catch (error) {
      console.log("errrorrr")
      console.error("Error updating profile: ", error);
    }
  } 
  else {
    // Handle case when no changes were made or only irrelevant changes exist
    setShowEditModal(false);
  }*/
  
    
 
  };
  
 
  // Personal photos data
  const personalPhotos = [
    require("../assets/sallyprofilepic.jpg"),
    require("../assets/sally2.jpg"),
  ];


    const openImage = (image) => {
      setCurrentImage(image);
      setModalVisible(true);
    };

    const onMatchPress = (match, event) => {
      const { pageX, pageY } = event.nativeEvent;
      setShowOptions(true);
      setOverlayPosition({ x: pageX, y: pageY });
      setSelectedMatch(match);
    };

    const handleBioChange = (text) => {
      setEditedData(prevData => ({
        ...prevData,
        bio: text
      }));
    };
    
    const pickImage = async () => {

      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
      });
  
      if (!result.canceled) {
          setImage(result.assets[0].uri);
      }
    };
  
    const uploadImage = async () => {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
      
        const filename = new Date().getTime() + ".jpg";
        const storageRef = ref(storage, 'profileimages/' + filename);
      
        const snapshot = await uploadBytes(storageRef, blob);
        console.log('Uploaded a blob or file!');
      
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        
        const userRef = doc(db, "users", route.params.user_id);
        await updateDoc(userRef, { image: downloadURL});
        console.log("Document successfully updated!");

      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
    
    
    
    const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
      });
  
      if (!result.canceled) {
          setImage(result.uri);
      }
    };
    // Function to handle profile image changes
    const handleProfileImageChange = (option) => {
      if (option === 'gallery') {
        pickImage();
      } else if (option === 'camera') {
        takePhoto();
      } else if (option === 'remove') {
        setImage(null);
      }
  // Implement logic based on option
    };
    

    const navigateToProfileMoreInfo = () => {
      if (selectedMatch) {
        setShowOptions(false);
        navigation.navigate('ProfileMoreInfo', { userProfile: selectedMatch });
      }
    };

    const handleLogout = () => {
      
      signOut(auth)
        .then(() => {
          
          // After signing out, reset the navigation to show the Login screen
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }).catch((error) => {
          console.error('Error signing out:', error);
        });
        
    
      // Close the logout confirmation modal
      setShowLogoutConfirmationModal(false);
    };
    
    const handleLogoutPress = () => {
      
      setShowLogoutConfirmationModal(true); // Show the confirmation modal
    };


  return (

    
    <SafeAreaView style={styles.container}>
   

      <ScrollView style={styles.scrollView}>

      <View style={styles.profileHeader}>
        <Image
          source={{uri: loggedinUser.image}}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.username}>{loggedinUser.username}</Text>
        <Text style={styles.bio}>{editedData.bio}</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => setShowProfileEditModal(true)}
         >
    <Text style={styles.colorm}>Edit Profile</Text>
  </TouchableOpacity>
      </View>


      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personal Photos</Text>
        <View style={styles.infoCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
          {personalPhotos.map((photo, index) => (
                    <TouchableOpacity key={`photo-${index}`} onPress={() => openImage(photo)}>
                    <Image source={photo} style={styles.photo} />
                  </TouchableOpacity>

                  
          ))}
          
        </ScrollView>
       </View>
      </View>

       <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Swipes</Text>
        <View style={styles.infoCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.matchesContainer}>
          {users.map((match) => (
            <TouchableOpacity key={match.uid} style={styles.match} onPress={(event) => onMatchPress(match, event)}>
              
              <Text style={styles.matchName}>{match.username}</Text>
            </TouchableOpacity>
            
          ))}
          
        </ScrollView>
        </View>
        </View>
        <View style={styles.sectionContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
         <Text style={styles.sectionTitle}>About Your Life</Text>
           <TouchableOpacity style={styles.editButtonSmall} onPress={() => setShowEditModal(true)}>
         <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View> 
          <View style={styles.infoCard}>
          <Text style={styles.infoText}>First Name: {loggedinUser.firstName}</Text>
          <Text style={styles.infoText}>Last Name: {loggedinUser.lastName}</Text>
            <Text style={styles.infoText}>gender: {loggedinUser.gender}</Text>
            <Text style={styles.infoText}>major: {loggedinUser.major}</Text>
            <Text style={styles.infoText}>Year in College: {loggedinUser.yearInCollege}</Text>
            <Text style={styles.infoText}>Graduation Year: {loggedinUser.graduationYear}</Text>
            
          </View>
        </View>
          {/* roomie prefrences */}
        <View style={styles.sectionContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
    <Text style={styles.sectionTitle}>Your Living Habits</Text>
    <TouchableOpacity style={styles.editButtonSmall} onPress={() => setShowRoommateEditModal(true)}>
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
       </View>
          <View style={styles.infoCard}>
        
          <Text style={styles.infoText}>How do you maintain your living space?: {loggedinUser.messiness ? 'Messy' : 'Clean'}</Text>
          <Text style={styles.infoText}>Do you smoke?: {loggedinUser.smoking ? 'Yes' : 'No'}</Text>
          <Text style={styles.infoText}>Pet Friendly?: {loggedinUser.petFriendly ? 'Yes' : 'No'}</Text>

          </View>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton} 
          
          onPress={handleLogoutPress}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
        {/* editing about ur life section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalScrollView}>
            <Text style={styles.modalTitle}>Edit About Your Life</Text>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>First Name:</Text>
              <Picker
                selectedValue={loggedinUser.firstName}
                onValueChange={(value) => setEditedData({ ...editedData, name: value })}
              >
                {nameOptions.map((option) => (
                  <Picker.Item label={option} value={option} key={option} />
                ))}
              </Picker>
              <Text style={styles.modalLabel}>Last Name:</Text>
              <Picker
                selectedValue={loggedinUser.lastName}
                onValueChange={(value) => setEditedData({ ...editedData, name: value })}
              >
                {nameOptions.map((option) => (
                  <Picker.Item label={option} value={option} key={option} />
                ))}
              </Picker>
              <Text style={styles.modalLabel}>gender:</Text>
              <Picker
  selectedValue={tempUserEdits.gender || loggedinUser.gender}
  onValueChange={(itemValue, itemIndex) => {
    //console.log(itemValue)
    setTempUserEdits(prev => ({ ...prev, gender: itemValue }));
  }}
>
  {genderOptions.map((option, index) => (
    <Picker.Item key={index} label={option} value={option} />
  ))}
</Picker>





        <Text style={styles.modalLabel}>major:</Text>
        <Picker
          selectedValue={editedData.major}
          onValueChange={(value) => setEditedData({ ...editedData, major: value })}
        >
          {major.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Text style={styles.modalLabel}>Year in College:</Text>
        <Picker
  selectedValue={tempUserEdits.yearInCollege || loggedinUser.yearInCollege}
  onValueChange={(itemValue, itemIndex) => {
    //console.log(itemValue)
    setTempUserEdits(prev => ({ ...prev, yearInCollege: itemValue }));
  }}
>
  {yearOptions.map((option, index) => (
    <Picker.Item key={index} label={option} value={option} />
  ))}
</Picker>

        <Text style={styles.modalLabel}>Graduation Year:</Text>
        <Picker
          selectedValue={editedData.graduationYear}
          onValueChange={(value) => setEditedData({ ...editedData, graduationYear: value })}
        >
          {graduationYearOptions.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
            {isLoading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.saveButtonText}>Save</Text>
  )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      

    {/* editing roomie prefrences */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={showRoommateEditModal}
        onRequestClose={() => setShowRoommateEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalScrollView}>
            <Text style={styles.modalTitle}>Edit Living Habits </Text>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Messiness:</Text>
              <Picker
                selectedValue={editedRoommateData.messiness}
                onValueChange={(value) => setEditedRoommateData({ ...editedRoommateData, messiness: value })}
              >
                {messinessOptions.map((option) => (
                  <Picker.Item label={option} value={option} key={option} />
                ))}
              </Picker>
         

        <Text style={styles.modalLabel}>Smoking Preferences:</Text>
        <Picker
          selectedValue={editedRoommateData.smokingPreferences}
          onValueChange={(value) => setEditedRoommateData({ ...editedRoommateData, smokingPreferences: value })}
        >
          {smokingOptions.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Text style={styles.modalLabel}>Pet Friendly:</Text>
        <Picker
          selectedValue={editedRoommateData.petFriendly}
          onValueChange={(value) => setEditedRoommateData({ ...editedRoommateData, petFriendly: value })}
        >
          {petOptions.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
     {/* edit profile header */}
     <Modal
  animationType="slide"
  transparent={true}
  visible={showProfileEditModal}
  onRequestClose={() => setShowProfileEditModal(false)}
>
  <View style={styles.modalContainer}>
    <ScrollView style={styles.modalScrollView}>
      <Text style={styles.modalTitle}>Edit Profile</Text>
      <Text style={styles.modalLabel}>Change Picture:</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => handleProfileImageChange('camera')}
          style={styles.iconContainer}>
            <FontAwesome name="camera" size={24} color="black"/>
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProfileImageChange('gallery')}
          style={styles.iconContainer}>
            <FontAwesome name="photo" size={24} color="black"/>
            <Text>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProfileImageChange('remove')}
          style={styles.iconContainer}>
            <FontAwesome name="trash" size={24} color="black"/>
            <Text>Remove</Text>
          </TouchableOpacity>
         </View>

      <Text style={styles.modalLabel}>Bio:</Text>
      <TextInput
  style={styles.input}
  multiline
  numberOfLines={4}
  onChangeText={handleBioChange}
  value={editedData.bio}
/>


      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>

</Modal>
      
      {/* expand imges */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <Image source={currentImage} style={styles.expandedImage} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    {/* modal for logout alert */}
    <Modal
  animationType="slide"
  transparent={true}
  visible={showLogoutConfirmationModal}
  onRequestClose={() => setShowLogoutConfirmationModal(false)}
>
  <View style={styles.centeredModalView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Are you sure you want to log out?</Text>
      <View style={styles.logoutOptionsContainer}>
        <Button
          
          title="Yes, Log me out"
          color="#1b263b"
          style={styles.logoutButtonStyle}
          onPress={handleLogout}
        />
        <Button
          
          title="No, I changed my mind"
          color="gray"
          style={styles.logoutButtonStyle}
          onPress={() => setShowLogoutConfirmationModal(false)}
        />
      </View>
    </View>
  </View>
</Modal>
    
    {/* options for matches */}
    {showOptions && (
        <TouchableOpacity
          style={styles.overlayContainer}
          onPress={() => setShowOptions(false)}
          activeOpacity={1}
        >
          <View style={[styles.overlay, { top: overlayPosition.y, left: overlayPosition.x }]}>
            <Text style={styles.overlayOption} onPress={() => {
              setShowOptions(false);
              navigation.navigate('ProfileMoreInfo', { userId: selectedMatch.uid });
            }}>
              Profile
            </Text>
            <Text style={styles.overlayOption} onPress={() => {
              setShowOptions(false);
              navigation.navigate('Chat', { userId: selectedMatch.id});
            }}>
             Chat
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <View style={{marginBottom:70}}/>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff', 
    overflow: 'hidden',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  bio: {
    fontSize: 14,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor:'#fafafa',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
    color: '#8c1d40',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 }, // Border offset
    textShadowRadius: 1,
  },
  infoCard: {
    backgroundColor: '#fafafa', 
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
  matchesContainer: {
    flexDirection: 'row',
  },
  match: {
    alignItems: 'center',
    marginRight: 10,
  },
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  matchName: {
    marginTop: 5,
    fontWeight: '300',
    color: '#41444B',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  expandedImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
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
  infoContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  overlayContainer: {
    position: 'absolute',
    start: -60,
    end: 0,
    top: -30,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },
  overlayOption: {
    fontSize: 18,
    color: '#000000',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '40%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#8c1d40',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  editButtonSmall: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#8c1d40',
    padding: 7,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  textInputStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',      
    justifyContent: 'space-evenly', 
    padding: 10,               
  },
  iconContainer: {
    alignItems: 'center',      
    padding: 10,              
  },
  colorm:{
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#8c1d40', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10, 
    marginHorizontal: 40, 
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutOptionsContainer: {
    padding: 10,
    alignItems: 'center',
  },
  logoutButtonStyle: {
    marginTop: 10, 
    width: '80%',
  },
});

export default ProfileScreen;