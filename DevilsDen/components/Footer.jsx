import { View, Dimensions } from 'react-native'
import React from 'react'
import Button from './Button'

const COLORS = {
  like: '#1B263B',
  nope: '#1B263B',
}

const Footer = ({ handleChoice }) => {
  return (
    <View style={{
      marginTop: -5, position: 'absolute', top: Dimensions.get('window').height * 0.95 - 100,left:Dimensions.get('window').width*0.2 , width: 240,
      flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between', zIndex: -99999
        }}>
       
        <Button
          name="times"
          size={36}
          color={COLORS.nope}
          onPress={() => handleChoice(-1)}/>  
        <Button
          name="heart"
          size={36}
          color={COLORS.like}
          onPress={() => handleChoice(1)}/>
      </View>
  )
}

export default Footer