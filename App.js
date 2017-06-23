import React, { Component } from 'react'
import {
  StyleSheet,
  StatusBar,
} from 'react-native'
import { isSignedIn } from './auth'
import { createRootNavigator } from './routing'

// https://curbmap.com/oauth/token

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#101010',
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

class App extends Component {
  state = {
    signedIn: false,
    checkedSignIn: false,
  }

  componentWillMount() {
    isSignedIn()
      .then((result) => {
        this.setState({ signedIn: result, checkedSignIn: true })
      })
      .catch((err) => {
        console.error(`ERROR:${err}`)
      })
  }

  render() {
    if (!this.state.checkedSignIn) {
      return null
    }

    const FirstView = createRootNavigator(this.state.signedIn)
    return <FirstView />
  }
}

export default App
