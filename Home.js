import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import MenuIcon from './MenuIcon'
import Map from './Map'

const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Map Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        style={[styles.icon, { tintColor }]}
      />
    ),
  }

  render() {
    return (
      <View style={styles.full}>
        <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />
        <Map />
      </View>
    )
  }
}

export default Home
