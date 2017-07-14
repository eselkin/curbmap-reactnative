import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import MenuIcon from './MenuIcon'
import Map from './Map'
import { isSignedIn } from './auth'

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
    drawerIcon: ({ tintColor }) => <Image style={[styles.icon, { tintColor }]} />,
  }

  render() {
    let map
    if (this.props.navigation.state.params === undefined) {
      map = <Map
        username='curbmaptest'
        password='TestCurbm@p1'
        session='x'
      />
    } else {
      map = (
        <Map
          username={this.props.navigation.state.params.username}
          password={this.props.navigation.state.params.password}
          session={this.props.navigation.state.params.session}
        />
      )
    }
    return (
      <View style={styles.full}>
        <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />
        {map}
      </View>
    )
  }
}

export default Home
