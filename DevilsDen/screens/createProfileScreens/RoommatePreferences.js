import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { RadioButton, Card, Button } from 'react-native-paper';
import MatchingScreen from '../MatchingScreen';
import { fetchRoomiePrefs, updateRoomiePrefs } from '../../AccountServices';
const RoommatePreferences = ({ navigation }) => {
    const [roommatePreferences, setRoommatePreferences] = useState({
        college: '',
        yearInCollege: '',
        cleanliness: '',
        studyTime: '',
        petFriendly: '',
        gender: '',
        smoking: '',
        drinking: '',
        sleepingHabits: '',
        okayWithFriendsOver: '',

    });
    
    useEffect(() => {
        const fetchInfo = async () =>{
            try {
                const info = fetchRoomiePrefs();
                setRoommatePreferences(info);
            } catch (error) {
                console.error(error);
            }
            
        };
        fetchInfo();
        
      }, []);
      
    
      const handleUpdate = async () => {
        try {
            await updateRoomiePrefs(roommatePreferences);
            console.log("Info update success!")
        } catch (error) {
            console.error(error);
        }
    };
    const handleRoommatePreferences = () => {
        navigateToMatchingScreen();
    }
    const navigateToMatchingScreen = () => {
        navigation.navigate( 'AppNavigation', { screen: 'Matching' });
    };
    return (
        <View style={styles.background}>


            <View style={styles.section}>
                <Card style={styles.card}>
                    <Text style={styles.header}>Roommate Preferences</Text>
                    <View style={styles.section}> 
                    <TextInput
                        style={styles.input}
                        placeholder="Gender"
                        value={roommatePreferences.gender}
                        onChangeText={(text) =>
                            setRoommatePreferences({ ...roommatePreferences, gender: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="College"
                        value={roommatePreferences.college}
                        onChangeText={(text) =>
                            setRoommatePreferences({ ...roommatePreferences, college: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Year in College"
                        value={roommatePreferences.gender}
                        onChangeText={(text) =>
                            setRoommatePreferences({ ...roommatePreferences, yearInCollege: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Smoking Preference"
                        value={roommatePreferences.smoking}
                        onChangeText={(text) =>
                            setRoommatePreferences({ ...roommatePreferences, smoking: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Pet Friendly"
                        value={roommatePreferences.petFriendly}
                        onChangeText={(text) =>
                            setRoommatePreferences({
                                ...roommatePreferences,
                                petFriendly: text,
                            })
                        }
                    />
                    {/* Save Button */}
                    
                    <Button mode="contained" onPress={navigateToMatchingScreen} theme={{ colors: { primary: "#415A77" } }} style={styles.button}  >
                            Continue
                        </Button>
                    </View>
                </Card>
                </View>
            </View>
       

    );

};
//Was above Continue button line
//<Button mode="contained" onPress={handleUpdate} theme={{colors: {primary:"#415A77"}}} style={styles.button}>Update Information</Button>
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1
    },
    radiobutton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'gray',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Helvetica',
        marginTop:10
    },
    section: {
        marginTop: 0,
        width: 250,
        left: 25
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 15,
        height: 45
    },
    background: {
        backgroundColor: '#1B263B',
        flex: 1
    },
    card: {
        bottom: Dimensions.get('window').height/50 - 165,
        right: Dimensions.get('window').width/20 - 40,
        width: 300,
        height: 400

    },
    button: {
        width: 200,
        left: 25,
        marginTop: 5,
    },
    separator: {
        padding: 50
    }
});
export default RoommatePreferences;
