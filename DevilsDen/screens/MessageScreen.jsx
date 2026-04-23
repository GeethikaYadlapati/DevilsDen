import React, { useEffect, useState, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { collection, orderBy, query, doc, onSnapshot, getDocs, getDoc,limit } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure your Firebase setup file path is correct
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationScreen from './Notification';
const getLastMessageBetween = async (userId1, userId2) => {
  // Construct chat ID in the same way as in your ChatScreen
  const chatId = userId1 > userId2 ? `${userId2}-${userId1}` : `${userId1}-${userId2}`;
  // Query for the last message
  const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    // Assuming there's at least one message, return the first one as the last message
    const lastMessageDoc = snapshot.docs[0];
    return { text: lastMessageDoc.data().text, createdAt: lastMessageDoc.data().createdAt };
  } else {
    // Return a placeholder if no messages exist
    return { text: "No messages yet", createdAt: null };
  }
};

// Chatting component handles the display of user contacts and messaging
const Chatting = ({ navigation, route }) => {
  const [notiUsers, setNotiUsers] = useState([]);

  useEffect(() => {
    const getUserContacts = async () => {
      const userDocSnap = await getDoc(doc(db, "users", route.params.user_id));
      if (!userDocSnap.exists()) return;
      
      const contactsObject = userDocSnap.data().realFriend || [];
      const contactsDetailsPromises = contactsObject.map(async (contactId) => {
        const contactDocSnap = await getDoc(doc(db, "users", contactId));
        if (!contactDocSnap.exists()) return null;
  
        const lastMessage = await getLastMessageBetween(route.params.user_id, contactId);
        return {
          id: contactId,
          ...contactDocSnap.data(),
          lastMessage: lastMessage.text,
        };
      });
  
      Promise.all(contactsDetailsPromises).then(contactsDetails => {
        // Filter out any null entries in case a contact doesn't exist
        setNotiUsers(contactsDetails.filter(Boolean));
      });
    };
  
    getUserContacts();
  }, [route.params.user_id]);
  

  return (
    <FlatList
      data={notiUsers}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: item.name, uid: item.id, avatar: item.avatar })}>
          <View style={styles.card}>
            <Image style={styles.userImageST} source={{ uri: item.image }} />
            <View style={styles.textArea}>
              <Text style={styles.nameText}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.msgContent}>{item.lastMessage || "No messages yet"}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

// RoomieRequests component prepared for future implementation
const RoomieRequests = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Roomie Requests</Text>
    </View>
  );
};

// MessageScreen container for the top tab navigator
const MessageScreen = ({ navigation, route }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#F8AF00' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#a8234d', // Active tab color
            tabBarInactiveTintColor: 'gray', // Inactive tab color
            tabBarIndicatorStyle: {
              backgroundColor: '#a8234d', // Color of the indicator line
              height: 2, // Height of the indicator line
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: 'white', // Tab bar background color
            },
          }}>
          <Tab.Screen name="Chats" children={() => <Chatting navigation={navigation} route={route} />} />
          <Tab.Screen name="Roomie Requests" component={NotificationScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </Fragment>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textArea: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  nameText: {
    fontWeight: 'bold',
  },
  msgContent: {
    color: '#666',
  },
});

export default MessageScreen;
