import React from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 20,
    width: 34,
    height: 34,
  },
})

const MenuIcon = props => (
  <TouchableWithoutFeedback
    onPress={props.onPress}
  >
    <Image
      source={require('./menu.png')}
      style={styles.icon}
    />
  </TouchableWithoutFeedback>
);

export default MenuIcon
