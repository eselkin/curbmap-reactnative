import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, StatusBar, TouchableWithoutFeedback } from 'react-native'
import Map from './Map'
import Drawer from './Drawer'

//https://curbmap.com/oauth/token

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 20,
    width: 34,
    height: 34,
  },
  nav: {
    height: 20,
    backgroundColor: 'green',
  },
  full: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default Drawer
