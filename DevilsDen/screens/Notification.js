import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import React, { useEffect, useState, Fragment } from "react";
import { auth, db } from "../firebase";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  View,
} from "react-native";

const NotificationScreen = ({ navigation, route }) => {
  const [notiUsers, setNotiUsers] = useState([]);
  const dimensions = Dimensions.get("window");
  const imageWidth = dimensions.width;
  const userId = auth.currentUser.uid;

  const getUserContacts = () => {
    // const contactDetails = [];
    const q = query(doc(db, "users", userId));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const contactsObject = snapshot.data().req;
      const contactsSnap = await Promise.all(
        contactsObject.map((c) => getDoc(doc(db, "users", c)))
      );
      const contactDetails = contactsSnap.map((d) => ({
        id: d.uid,
        ...d.data(),
      }));

      setNotiUsers(contactDetails);
    });
  };

  useEffect(() => {
    getUserContacts();
  }, [navigation]);

  //accept
  const acceptAction = (uid) => {
    updateDoc(doc(db, "users", uid), {
      realFriend: arrayUnion(userId),
    });
    updateDoc(doc(db, "users", userId), {
      req: arrayRemove(uid),
      realFriend: arrayUnion(uid),
    });
  };

  const rejectAction = (uid) => {
    updateDoc(doc(db, "users", userId), {
      req: arrayRemove(uid),
      // "favorites.color": "Red"
    });
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#FAF8E7" }} />
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* {(notiUsers.length > 0)? */}

        <FlatList
          data={notiUsers}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemContent}>
                  <Text style={styles.itemName}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        // acceptAction(item.uid)
                        rejectAction(item.uid);
                      }}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => {
                        acceptAction(item.uid);
                        navigation.navigate("Chat", {
                          name: item.name,
                          uid: item.uid,
                        });
                      }}
                    >
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.uid}
        />

        {/* </View> */}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  Contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Container: {
    flex: 1,
    paddingBottom: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 10,
    marginLeft: 10,
  },
  textArea: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // padding: 5,
    // paddingLeft: 10,
    width: 300,
    backgroundColor: "transparent",
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "Verdana",
    // width: '80%',
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    // justifyContent: 'flex-start'
  },
  msgTime: {
    textAlign: "right",
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },

  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    width: "90%",
  },
  username: {
    color: "#20B2AA",
    fontSize: 20,
    alignSelf: "center",
    marginLeft: 10,
    width: "80%",
  },
  image: {
    width: 60,
    height: 60,
  },
  body: {
    padding: 30,
    backgroundColor: "#FF6C77",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 0, // Adjust for sharper corners if desired
    padding: 11, // Reduce padding for a smaller box
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 1, // Space between cards
    marginTop: 10, // Space from the top card to the view bar or the previous element
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 40,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#999",
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row-reverse",
  },
  acceptButton: {
    backgroundColor: "#a8234d",
    borderRadius: 2,
    paddingTop: 5, // Reduce the top and bottom padding to make it thinner
    paddingBottom: 5,
    paddingLeft: 20, // Increase the left and right padding to make it wider, or use width
    paddingRight: 20,
    marginRight: 5, // Adjusted marginRight for alignment, adjust as needed
    width: "50%", // Set specific width to make it wider, you might want to adjust this based on your layout
    alignSelf: "center", // This helps in centering the button if it's inside a flexible container
    height: 36,
    justifyContent: "center",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1, // Define the border width
    borderColor: "#808080",
    borderRadius: 2,
    paddingTop: 5, // Reduce the top and bottom padding to make it thinner
    paddingBottom: 5,
    paddingLeft: 20, // Increase the left and right padding to make it wider, or use width
    paddingRight: 20,
    marginRight: 5, // Adjusted marginRight for alignment, adjust as needed
    width: "50%", // Set specific width to make it wider, you might want to adjust this based on your layout
    alignSelf: "center", // This helps in centering the button if it's inside a flexible container
    height: 36,
    justifyContent: "center",
    marginTop: 5,
  },
  acceptButtonText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "#808080",
    fontWeight: "bold",
    alignSelf: "center",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});

export default NotificationScreen;
