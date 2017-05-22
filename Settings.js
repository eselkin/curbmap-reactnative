import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import MenuIcon from './MenuIcon'

const styles = (hidden) => StyleSheet.create({
  hidden: {
    display: hidden ? 'none' : 'block',
  },
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
      <View style={styles(this.props.authenticated).hidden}>
        <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />
      </View>
    )
  }
}

export default Settings
