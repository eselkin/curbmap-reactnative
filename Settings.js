import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import MenuIcon from './MenuIcon'
import {onSignOut} from './auth'

const styles = (hidden) => StyleSheet.create({
  hidden: {
    display: hidden ? 'none' : 'block',
  },
});

class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Image
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={styles(this.props.authenticated).hidden}>
        <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />
        <View>
          <Button title="Signout" onPress={() => onSignOut().then(() => this.props.navigation.navigate('SignedOut'))}>
            Signout
          </Button>
        </View>
      </View>
    )
  }
}

export default Settings
