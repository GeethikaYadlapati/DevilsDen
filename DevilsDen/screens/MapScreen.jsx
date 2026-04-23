import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function MapScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>MapScreen</Text>
    </View>
  )
}
