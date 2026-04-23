/* line 100     <Text className="text-[#1B263B] text-center text-3xl py-3 font-semibold ">
          Users Profile
        </Text> */
        import { View, Text, TouchableOpacity, style, StyleSheet } from "react-native";
        import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
        import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
       
        import { PanResponder, Animated , Dimensions } from 'react-native';
        import React, { useCallback, useEffect, useRef, useState } from "react";
        import Card from "../components/Card";
        import Footer from '../components/Footer'
        const { width, height } = Dimensions.get("screen");
        import { collection,
          addDoc,
          getDoc,
          getDocs,
          query,
          orderBy,
          onSnapshot,
          where,
          updateDoc,
          doc,
          arrayUnion,
          arrayRemove,
          collectionGroup, } from 'firebase/firestore';
        import { db } from '../firebase';
        
        function calculateDotProduct(vecA, vecB) {
          return vecA.map((x, i) => x * vecB[i]).reduce((sum, current) => sum + current, 0);
          
        }
        
        function calculateSimilarityScore(currentUser, otherUser) {
          
          const currentYear = new Date().getFullYear();

          const currentUserVec = [
            currentUser.messiness ? 1 : 0,
            currentUser.petFriendly ? 1 : 0,
            currentUser.smoking ? 1 : 0,
            currentUser.gender === 'male' ? 1 : currentUser.gender === 'female' ? 2 : 0, 
            (currentUser.graduationYear - currentYear) / 10,
          ];

          const otherUserVec = [
            otherUser.messiness ? 1 : 0,
            otherUser.petFriendly ? 1 : 0,
            otherUser.smoking ? 1 : 0,
            otherUser.gender === 'male' ? 1 : otherUser.gender === 'female' ? 2 : 0, 
            (otherUser.graduationYear - currentYear) / 10,
          ];
          
          const score = calculateDotProduct(currentUserVec, otherUserVec);
          return score; 
          
        }
        
        export default function MatchingScreen({route}) {
          //const [show, setShow] = useState(false);
          const [users, setUsers] = useState([]);
          const [realFriend, setRealFriend] = useState([]);
          // Animated values for swipe and tilt
          const swipe = useRef(new Animated.ValueXY()).current;
          const titlSign = useRef(new Animated.Value(1)).current;
        
          // useEffect(() => {
          //   const fetchUsers = async () => {
          //     const q = query(doc(db, "users", route.params.user_id));
          //     const unsubscribe = onSnapshot(q, async (snapshot) => {
          //     const user = snapshot.data();
        
          //     const contactsObject = await snapshot.data().realFriend;
          //     contactsObject.push(route.params.user_id);

          //     const q1 = query(
          //       collection(db, "users"),
          //       where("uid", "not-in", contactsObject)
          //     );
          //     const contactsSnap = await getDocs(q1);
          //     const contactDetails = contactsSnap.docs
          //     .filter((d) => {
          //       const score = calculateSimilarityScore(user, d.data());
          //       console.log(score)
          //       return score > 2.5;
          //     })
          //     .map((d) => ({
          //     ...d.data(),
          //     key: d.id,
          //     }));

          //     console.log(contactDetails);
          //     setUsers(contactDetails);
          //     });
          //   };
        
          //   fetchUsers();
          // }, []);

          // useEffect(() => {
          //   const fetchUsers = async () => {
          //     const currentUserRef = doc(db, "users", route.params.user_id);
          //     const unsubscribe = onSnapshot(currentUserRef, async (snapshot) => {
          //       const currentUserData = snapshot.data();
                
          //       const contactsObject = currentUserData.realFriend || [];
          //       contactsObject.push(route.params.user_id);
          
          //       // Fetch users who are not in the current user's friends list or themselves
          //       const excludeQuery = query(
          //         collection(db, "users"),
          //         where("uid", "not-in", contactsObject)
          //       );
          
          //       // Fetch all users including those who sent requests
          //       const includeReqQuery = query(
          //         collection(db, "users"),
          //         where("uid", "in", currentUserData.req || [])
          //       );
          
          //       const [excludeSnap, includeReqSnap] = await Promise.all([
          //         getDocs(excludeQuery),
          //         getDocs(includeReqQuery)
          //       ]);
          
          //       let users = excludeSnap.docs
          //         .filter(doc => {
          //           const otherUser = doc.data();
          //           const score = calculateSimilarityScore(currentUserData, otherUser);
          //           return score > 2.5;
          //         })
          //         .map(doc => ({
          //           ...doc.data(),
          //           key: doc.id,
          //         }));
          
          //       // Include users who sent friend requests without filtering by score
          //       const reqUsers = includeReqSnap.docs.map(doc => ({
          //         ...doc.data(),
          //         key: doc.id,
          //       }));
          
          //       // Combine and update the users state
          //       users = [...users, ...reqUsers];
          //       console.log(users); // Debug to see what users are included
          //       setUsers(users);
          //     });
          
          //     return () => unsubscribe(); // Clean up subscription on component unmount
          //   };
          
          //   fetchUsers();
          // }, []);  
          
          // useEffect(() => {
          //   const getUserContacts = () => {
          //     const q = query(doc(db, "users", route.params.user_id));
          //     const unsubscribe = onSnapshot(q, async (snapshot) => {
          //       const user = snapshot.data();
          //       // const userGraduationYear = user.graduationYear;
          //       const realFriendObject = await snapshot.data().realFriend;
          //       const reqObject = await snapshot.data().req;
          //       const contactsObject = realFriendObject.concat(reqObject);

          //       contactsObject.push(route.params.user_id);
        
          //       const q1 = query(
          //         collection(db, "users"),
          //         where("uid", "not-in", contactsObject)
          //       );
          //       const contactsSnap = await getDocs(q1);
          //       const contactDetails = contactsSnap.docs
          //         .map((d) => ({
          //           ...d.data(),
          //           key: d.id,
          //         }));
        
          //       console.log(contactDetails);
          //       setUsers(contactDetails);
          //     });
          //   };
        
          //   getUserContacts();
          // }, []);

          useEffect(() => {
            const getUserContacts = () => {
              const userDocRef = doc(db, "users", route.params.user_id);
        
              // Subscribe to user document changes
              const unsubscribe = onSnapshot(userDocRef, async (snapshot) => {
                const user = snapshot.data();
                const realFriendObject = user.realFriend || []; // Ensure it defaults to an array if undefined
                const contactsObject = [...realFriendObject, route.params.user_id];
        
                // Function to chunk the contactsObject array
                const chunkArray = (arr, size) =>
                  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
                    arr.slice(i * size, i * size + size)
                  );
        
                // Split contactsObject into chunks of 10
                const chunks = chunkArray(contactsObject, 10);
        
                // Query each chunk and collect results
                const contactsSnapshots = await Promise.all(
                  chunks.map(chunk => 
                    getDocs(query(collection(db, "users"), where("uid", "not-in", chunk)))
                  )
                );
        
                // Combine and filter results to avoid duplicates
                const combinedResults = new Map();
                contactsSnapshots.forEach(snapshot => {
                  snapshot.docs.forEach(doc => {
                    combinedResults.set(doc.id, { ...doc.data(), key: doc.id });
                  });
                });
        
                const contactDetails = Array.from(combinedResults.values());
                console.log(contactDetails);
                setUsers(contactDetails);
              });
        
              return () => unsubscribe(); // Cleanup the subscription on component unmount
            };
        
            getUserContacts();
          }, [db, route.params.user_id, setUsers]);

          // PanResponder configuration
          const panResponder = PanResponder.create({
             // Allow pan responder to activate
            onMoveShouldSetPanResponder: ()=>true,
        
             // Handle card movement while dragging
            onPanResponderMove: (_, {dx, dy, y0})=>{
              swipe.setValue({x: dx, y: dy});
              titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
            },
        
            // Handle card release after dragging
            onPanResponderRelease: (_, { dx, dy }) => {
              const direction = Math.sign(dx);
              const isActionActive = Math.abs(dx) > 100;
              if (isActionActive) {
                const user = users[0];
                handleSwipeAction(user.uid, direction);
                Animated.timing(swipe, {
                  toValue: { x: direction * 500, y: dy },
                  duration: 100,
                  useNativeDriver: true
                }).start();
              } else {
                Animated.spring(swipe, {
                  toValue: { x: 0, y: 0 },
                  useNativeDriver: true,
                  friction: 5
                }).start();
              }
            }
          })
        
          // remove the top card from the users array
          const removeTopCard = useCallback(()=>{
            setUsers((prevState)=>prevState.slice(1));
            swipe.setValue({ x: 0, y: 0});
          },[swipe]);
        
          // handle user choice (left or right swipe)
          const handleChoice = useCallback((direction, uid) => {
            const isActionActive = Math.abs(direction) > 100;
            if (isActionActive) {
              // Perform the action associated with the swipe
              handleSwipeAction(uid, Math.sign(direction));
              // Animate the swipe off the screen
              Animated.timing(swipe.x, {
                toValue: direction * 500, 
                duration: 400,
                useNativeDriver: true
              }).start(removeTopCard);
            } else {
              // If the swipe was not significant enough, return the card to the center
              Animated.spring(swipe, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true,
                friction: 5
              }).start();
            }
          }, [removeTopCard, handleSwipeAction, swipe.x]);


          // handle user choice (left or right swipe)
          // const handleChoice = useCallback((direction)=>{
          //   Animated.timing(swipe.x, {
          //     toValue: direction  * 500,
          //     duration: 400,
          //     useNativeDriver: true
          //   }).start(removeTopCard);
        
          // },[removeTopCard,swipe.x]);

          const handleSwipeAction = async (uid, direction) => {
            // Remove the swiped user from the list
            //removeUserFromList(uid);
            removeTopCard();
            const currentUserDocRef = doc(db, "users", route.params.user_id);
            const swipedUserDocRef = doc(db, "users", uid);
          
            // Get current and swiped user data simultaneously
            const [currentUserSnapshot, swipedUserSnapshot] = await Promise.all([
              getDoc(currentUserDocRef),
              getDoc(swipedUserDocRef)
            ]);
          
            const currentUserData = currentUserSnapshot.data();
            const swipedUserData = swipedUserSnapshot.data();
          
            if (direction > 0) { // Right swipe
              if (swipedUserData.req && swipedUserData.req.includes(route.params.user_id)) {
                // Accept friend request
                await Promise.all([
                  updateDoc(currentUserDocRef, {
                    realFriend: arrayUnion(uid),
                    req: arrayRemove(uid)
                  }),
                  updateDoc(swipedUserDocRef, {
                    realFriend: arrayUnion(route.params.user_id),
                    req: arrayRemove(route.params.user_id)
                  })
                ]);
              } else {
                // Send friend request
                await updateDoc(swipedUserDocRef, {
                  req: arrayUnion(route.params.user_id)
                });
              }
            } else if (direction < 0) { // Left swipe
              if (currentUserData.req && currentUserData.req.includes(uid)) {
                // Cancel the request and block the user
                await updateDoc(currentUserDocRef, {
                  req: arrayRemove(uid),
                  blocked: arrayUnion(uid)
                });
              } else {
                // Just block the user if no request was found
                await updateDoc(currentUserDocRef, {
                  blocked: arrayUnion(uid)
                });
              }
            }    
          };
          
          const removeUserFromList = (uid) => {
            setUsers(prevUsers => prevUsers.filter(user => user.uid !== uid));
          };
        
        
          return (
            <View className="flex-1 flex-col justify-start items-center ">
              <View className="bg-white w-full p-3 flex-row justify-between items-center relative z-10">
                <Text style={{color: '#1B263B', fontSize: 30, fontWeight: 'bold', marginTop: 45 }}>
                Devils' Den
                </Text>
               
              </View>
              {/*old styling: className="Users flex justify-center items-center"*/ }
              <View style={styles.card}>
                {/* Users Profile */}
             
                {users
                  .map((user, index) => {
                    const isFirst = index == 0;
                    const dragHandlers = isFirst ? panResponder.panHandlers : {};
        
                    return (
                      <Card
                        key={user.uid}
                        uid = {user.uid}
                        username={user.userName}
                        messiness={user.messiness}
                        graduationYear={user.graduationYear}
                        image={{uri: user.image}}
                        isFirst={isFirst}
                        swipe={swipe}
                        titlSign={titlSign}
                        {...dragHandlers}
                      />
                    );
                  })
                  .reverse()}
              </View>
        
              <Footer handleChoice={handleChoice} />
        {/* 
              <View>
                {users
                  .map(({ apartmentName,name, image, location, userImg, Rent }, index) => {
                    const isFirst = index == 0;
                    const dragHandlers = isFirst ? panResponder.panHandlers : {};
        
                    return (
                      <ApartmentCard
                        key={name}
                        name={name}
                        apartmentName={apartmentName}
                        Rent={Rent}
                        location={location}
                        userImg={userImg}
                        image={image}
                        isFirst={isFirst}
                        swipe={swipe}
                        titlSign={titlSign}
                        {...dragHandlers}
                      />
                    );
                  })
                  .reverse()}
              </View> */}
        
            </View>
          );
        } 
        const styles = StyleSheet.create({
            title: {
              left: Dimensions.get('window').width * 0.32,
            },
            card:{
              left: Dimensions.get('window').width * 0.004,
              top: Dimensions.get('window').height * 0.002,
              height: 2
            },
            icon:{
              //left: Dimensions.get('window').width * 0.004,
              bottom:0
            }
        });