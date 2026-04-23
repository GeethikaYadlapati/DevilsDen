import React, {useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { RadioButton, Card, Button } from 'react-native-paper';
import { fetchPersonalPrefs, updatePersonalPrefs } from '../../AccountServices';
const PersonalPreferences = ({ navigation }) => {
    const [personalPreferences, setPersonalPreferences] = useState({
        cleanliness: '',
        studyTime: '',
        petFriendly: '',
        gender: '',
        smoking: '',
        drinking: '',
        sleepingHabits: '',
        okayWithFriendsOver: '',

    });
    
    // useEffect(() => {
    //     const fetchInfo = async () =>{
    //         try {
    //             const info = fetchPersonalPrefs();
    //             setPersonalPreferences(info);
    //         } catch (error) {
    //             console.error(error);
    //         }
            
    //     };
    //     fetchInfo();
        
    //   }, []);
      
    
    const handleUpdate = async () => {
        try {
            await updatePersonalPrefs(personalPreferences);
            console.log("Info update success!")
        } catch (error) {
            console.error(error);
        }
    };
    
      const handlePersonalPreferences = () => {
        navigateToRoommatePreferences();
    }
    const navigateToRoommatePreferences = () => {
        navigation.navigate('RoommatePreferences');
    };
    const changeComponent = () => {
        const [selectedOption, setSelectedOption] = useState(null);
    };
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Text style={styles.header}>About your life</Text>
                    <View style={styles.section}>
                        <RadioButton
                            label="Male"
                            //selectedOption="Male"
                            onSelect={() => setSelectedOption("Male")}
                        />
                        <RadioButton
                            label="Female"
                            //selectedOption = "Female"
                            onSelect={() => setSelectedOption("Female")}
                        />
                        <RadioButton
                            label="Other"
                            //selectedOption = "Other"
                            onSelect={() => setSelectedOption("Other")}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Gender"
                            value={personalPreferences.gender}
                            onChangeText={(text) =>
                                setPersonalPreferences({ ...personalPreferences, gender: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="College"
                            value={personalPreferences.college}
                            onChangeText={(text) =>
                                setPersonalPreferences({ ...personalPreferences, college: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Year in College"
                            value={personalPreferences.gender}
                            onChangeText={(text) =>
                                setPersonalPreferences({ ...personalPreferences, yearInCollege: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Smoking Preference"
                            value={personalPreferences.smoking}
                            onChangeText={(text) =>
                                setPersonalPreferences({ ...personalPreferences, smoking: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Pet Friendly"
                            value={personalPreferences.petFriendly}
                            onChangeText={(text) =>
                                setPersonalPreferences({
                                    ...personalPreferences,
                                    petFriendly: text,
                                })
                            }
                        />
                        
                        <Button mode="contained" onPress={navigateToRoommatePreferences} theme={{ colors: { primary: "#415A77" } }} style={styles.button}  >
                            Continue
                        </Button>
                    </View>


                </Card>
            </View>
        </View>
    );
};
//Was above continue button
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
        fontFamily: 'Helvetica'
    },
    section: {
        marginTop: -100,
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
        bottom: Dimensions.get('window').height/2,
        right: Dimensions.get('window').width - 40,
        width: 300,
        height: 375

    },
    button: {
        width: 200,
        left: 25,
        marginTop: 0,
    },
    separator: {
        padding: 50
    }
});
export default PersonalPreferences;