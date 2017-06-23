import React, { Component } from 'react'
import {DrawerNavigator, DrawerItems, DrawerView} from 'react-navigation';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { StyleSheet, View, Image, Text, Dimensions, StatusBar, AsyncStorage} from 'react-native'
import { Button } from "react-native-elements";
const {width, height} = Dimensions.get("window");

const uiTheme = {
  palette: {
    primaryColor: COLOR.greenA700,
    accentColor: COLOR.pinkA400,
  },
  toolbar: {
    container: {
      height: 50,
      paddingTop: 0,
    },
  },
  avatar: {
    container: {
      backgroundColor: '#333'
    }
  }
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#101010',
    marginTop: 30
  },
  headerContainer: {
    height: height * 0.25,
    flexDirection: 'row',
    flex: 1
  },
  header: {
    marginTop: 30,
    backgroundColor: "#707070",
  },
  bodySection: {
    height: height * 0.7,
    backgroundColor: "#4e2e2e",
    marginTop: 3
  },
  avatar: {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    zIndex: 0,
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'column'
  },
  userinfo: {
    height: height * 0.5,
    marginTop: 30,
    backgroundColor: "#707070",
    flex: 1
  },
  username: {
    color: 'white',
    fontSize: 20
  },
  userscore: {
    fontSize: 14,
    color: 'white',
    marginTop: 5
  },
  menuitem: {
    marginTop: 5
  },
  menubutton: {
    backgroundColor: 'rgba(200,200,200,0.0)'
  }
});



export default class SignedOutDrawer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  _onPress(value, props) {
    this.props.navigation.navigate(value, props);
  }

  render() {
    let badge = <Image source={require("./assets/img/undefined.png")} />;
    return (
        <ThemeProvider uiTheme={uiTheme}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.avatar}>
                  {badge}
                </View>
              </View>
              <View style={styles.userinfo}>
                <Text style={styles.username}> </Text>
                <Text style={styles.username}>Welcome</Text>
                <Text style={styles.userscore}>You'll have a score if you log in</Text>
              </View>
            </View>
            <View style={styles.bodySection}>
              <Button
                  raised
                  large
                  containerViewStyle={styles.menuitem}
                  buttonStyle={styles.menubutton}
                  color='rgba(255,255,255,1)'
                  onPress={() => this._onPress('Home')}
                  title='Home'
                  fontSize={20}
                  icon={{name: 'home', size: 32}}
              >
                Home
              </Button>
              <Button
                  raised
                  large
                  containerViewStyle={styles.menuitem}
                  buttonStyle={styles.menubutton}
                  color='rgba(255,255,255,1)'
                  onPress={() => this._onPress('Login')}
                  title='Login'
                  fontSize={20}
                  icon={{name: 'keyboard-arrow-right', size: 32}}
              >
                Login
              </Button>
              <Button
                  raised
                  large
                  containerViewStyle={styles.menuitem}
                  buttonStyle={styles.menubutton}
                  color='rgba(255,255,255,1)'
                  onPress={() => this._onPress('Signup')}
                  title='Signup'
                  fontSize={20}
                  icon={{name: 'check-circle', size: 32}}
              >
                Signup
              </Button>
            </View>

          </View>
        </ThemeProvider>
    );
  }
}