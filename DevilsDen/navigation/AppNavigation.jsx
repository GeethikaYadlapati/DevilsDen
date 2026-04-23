import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import MapScreen from '../screens/MapScreen';
import MatchingScreen from '../screens/MatchingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ChatScreen from '../screens/ChatScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMoreInfo from '../screens/ProfileMoreInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ExploreScreen from '../screens/Explore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const shadowStyle = {
  shadowColor: '#7F5DF0',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5
};

const number = 36;

const MessageStack = ({ navigation, route }) => {
  const user = route.params.user_id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOutNow}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((error) => {});
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chatsss"
        component={MessageScreen}
        initialParams={{ user_id: user }}
        options={{
          headerTitleStyle: {
            color: '#0D1B2A',
            fontFamily: 'HelveticaNeue',
            fontSize: 25,
          },
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: '#9a2046',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerTitleAlign: 'center',
          title: route.params.name,
          
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({ navigation, route }) => {
  const user = route.params.user_id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOutNow}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((error) => {});
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        initialParams={{ user_id: user }}
        options={{
          headerTitleStyle: {
            color: '#0D1B2A',
            fontFamily: 'HelveticaNeue',
            fontSize: 25,
          },
          headerStyle: { backgroundColor: '#ffffff' },
          headerTitleAlign: 'left',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ProfileMoreInfo"
        component={ProfileMoreInfo}
        options={() => ({
          headerStyle: {
            backgroundColor: '#1B263B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

const getTabBarIcon = ( color, size) => {

  return <IonIcons name={iconName} size={size} color={color} />;
};

export default function AppNavigation({ route }) {
  const user = route.params.user_id;

  const getTabBarVisibility = (route) => {
    const routeName = route.state ? route.state.routes[route.state.index].name : '';

    if (routeName === 'Chat') {
      return <Tab.Navigator style={{ display: 'none' }}></Tab.Navigator>;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName="ExploreScreen"
      screenOptions={({ route, navigation }) => {
        const routeName = navigation.getState().routes[navigation.getState().index].name;
        let tabBarStyle = { ...styles.tabBar };

        if (routeName === 'Messages' && navigation.getState().routes[navigation.getState().index].state) {
          const chatRoute = navigation.getState().routes[navigation.getState().index].state.routes.find(r => r.name === 'Chat');
          if (chatRoute) {
            tabBarStyle = { ...tabBarStyle, display: 'none' }; // Hide tab bar
          }
        }

        return {
          tabBarShowLabel: false,
          tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
          tabBarActiveTintColor: '#8C1D40',
          tabBarInactiveTintColor: 'lightgray',
        };
      }}
    >
      
      {/* <Tab.Screen name="ExploreScreen" component={ExploreScreen} initialParams={{user_id: user}}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
        tabBarLabel: 'Explore',
        tabBarIcon: ({focused, color, size }) => (
          // <MaterialIcons name="explore" color={color} size={size} />
          <IonIcons name={focused ?"person-add":"person-add-outline"} color={color} size={size} />
        ),
      })}/> */}
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        initialParams={{ user_id: user }}
        options={({ route }) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ focused, color, size }) => (
            <IonIcons 
            name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
            color={color} 
            size={size}
             />
          ),
        })}
      />
      <Tab.Screen
        name="Matching"
        component={MatchingScreen}
        initialParams={{ user_id: user }}
        options={() => ({
          headerShown: false,
          headerTitleStyle: {
            color: '#fbeaf3',
          },
          headerStyle: { backgroundColor: '#d46daf' },
          headerTitleAlign: 'left',
          tabBarIcon: ({color, size}) => (
            <Entypo
              name="chevron-with-circle-right"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        initialParams={{ user_id: user }}
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: '#fbeaf3',
          },
          headerStyle: { backgroundColor: '#d46daf' },
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size, focused}) => (
            <IonIcons 
             name={focused ? 'person' : 'person-outline'} 
             color={color} 
             size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

const styles = {
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    right: 10,
    elevation: 0,
    backgroundColor: '#fafafa',
    borderRadius: 15,
    height: 70,
    borderColor: 'lightgray', 
    borderWidth: 1,
    paddingVertical: 15,
  }
  // Other styles...
};