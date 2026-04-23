import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';


const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const t_uid = route.params.uid;
  const c_uid = auth?.currentUser.uid;

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    const chatid = t_uid > c_uid ? c_uid + "-" + t_uid : t_uid + "-" + c_uid;
    const q = query(collection(db, 'chats', chatid, 'messages'), orderBy('createdAt', "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), createdAt: doc.data().createdAt.toDate() })))
    );
  };


  const onSendMsg = async (msgArray) => {
    const msg = msgArray[0];
    const time = new Date();
    const userMsg = {
      ...msg,
      sentBy: c_uid,
      sentTo: t_uid,
      createdAt: time,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, userMsg));
    const chatid = t_uid > c_uid ? c_uid + "-" + t_uid : t_uid + "-" + c_uid;
    const docRef = collection(db, 'chats', chatid, 'messages');
    await addDoc(docRef, { ...userMsg, createdAt: time });
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
     <View className='my-1'>
          <View style={{
          backgroundColor: '#a8234d',
          borderRadius: 20,
          padding: 8,
          justifyContent: 'center',
          alignItems: 'center',}}>
          <FontAwesome 
            name="paper-plane"
            style={{marginBottom: 5, marginRight: 5, padding:1}}
            size={14}
            color="#ffffff"
          /></View>
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#a8234d',
          },
          left: { backgroundColor :'#E0E1DD',
        }
        }}
        textStyle={{
          right: {
            color: '#E0E1DD',
          },
          left:{
            color:'#000'}
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      className="bg-white"
      style={{ flex: 1, backgroundColor: '#001973' }}
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSendMsg(messages)}
      user={{
        _id: c_uid,
        avatar: auth?.currentUser?.photoURL,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

