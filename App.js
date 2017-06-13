import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, StatusBar, TouchableWithoutFeedback } from 'react-native'
import Map from './Map'
import {isSignedIn} from './auth'
import { createRootNavigator } from "./routing";


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
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  render() {
    if (!this.state.checkedSignIn) {
      return null;
    }

    const FirstView = createRootNavigator(this.state.signedIn);
    return <FirstView />;
  }

  componentWillMount() {
    isSignedIn()
        .then(result => {
          this.setState({signedIn: true, checkedSignIn: true})
        })
        .catch(err => {
          alert('ERROR:' + err);
        })
  }

}

export default App;