import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import MenuIcon from './MenuIcon'

const styles = StyleSheet.create({
  icon: {},
})

class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Image
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  render() {
    return (
      <View style={styles.full}>
        <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />
      </View>
    )
  }
}

export default Settings
