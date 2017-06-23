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
    drawerIcon: ({ tintColor }) => <Image style={[styles.icon, { tintColor }]} />,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      username: '',
      password: '',
      authtoken: '',
      expiresat: '',
    }
  }

  render() {
    console.log(this.props.navigation.state.params) // has all the data required for update and send to backend nd you seem to only be able to get them in the render
    let map
    if (this.props.navigation.state.params === undefined) {
      map = <Map />
    } else {
      console.log('giving params')
      map = (
        <Map
          username={this.props.navigation.state.params.username}
          password={this.props.navigation.state.params.password}
          authtoken={this.props.navigation.state.params.authtoken}
          expiresat={this.props.navigation.state.params.expiresat}
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
