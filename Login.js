import React, { Component } from 'react'
import { StyleSheet, View, Image, TextInput, Dimensions, AsyncStorage} from 'react-native'
import { Card, Button } from "react-native-elements";
import MenuIcon from './MenuIcon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const {width, height} = Dimensions.get("window");


const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginbox: {
    marginTop: 10,
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,

  },
  buttonlogin: {
    marginTop: 10,
    borderRadius: 5
  },
  loginholder: {
    flexDirection: 'column',
    padding: 10,
    height: height * 0.7,
    width: width * 0.8
  },
  loginimageview: {
    alignItems: 'center',
  },
  loginimage: {
    height:150,
    width: 150
  },
  loginViewHolder: {
    marginTop: 100
  }
});


class Login extends Component {
  doLogin = () => {
    fetch('https://curbmap.com/token')
        .then((response) => response.text())
        .then((responseText) => {
          this.setState({XSRF: responseText})
        })
        .then(() => {
          fetch('https://curbmap.com/login', {
            method: 'post',
            mode: 'cors',
            headers: {
              "X-XSRF-TOKEN": this.state.XSRF,
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "username="+this.state.user+"&password="+this.state.pass
          })
              .then((responseLogin) => {
                fetch('https://curbmap.com/user', {
                  method: 'get',
                  mode: 'cors',
                  headers: {
                    "X-XSRF-TOKEN": this.state.XSRF
                  }
                })
                    .then((responseUser) => responseUser.json())
                    .then((responseUserJSON) => {
                      fetch('https://curbmap.com/oauth/token', {
                        method: 'post',
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                          "Authorization": "Basic YW5kcm9pZDFTOVdnYU05bHJJNnVqcXo0NDZ2Q3JQUktJNHA1MXFQOnJWZUI4NWhXVDN0REkxYU5LSVhiOTlyTTRLNDN0ME1B"
                        },
                        body: "username="+this.state.user+"&password="+this.state.pass+"&grant_type=password"
                      })
                          .then((oauthToken)=> oauthToken.json())
                          .then((oauthTokenJSON) => {
                            AsyncStorage.setItem(oauthTokenJSON['access_token'], "AUTH_TOKEN");
                            AsyncStorage.setItem(oauthTokenJSON['refresh_token'], "REFRESH_TOKEN");
                            AsyncStorage.setItem(new Date(new Date().getTime() + oauthTokenJSON['expires_in'] * 1000).toISOString(), "EXPIRES_AT");
                            AsyncStorage.setItem(this.stateValues.user, "USERNAME");
                            AsyncStorage.setItem(this.stateValues.pass, "PASSWORD"); // if user needs to request a new oauth token
                            this.props.navigation.navigate('DrawerOpen');

                          })
                    })
                    .catch((e) => {console.log("Error in login: "+ e)})
              })
        })
  };

  constructor(props, context) {
    super(props, context);
    this.stateValues = {};
  }

  componentDidMount() {
  }

  static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: ({tintColor}) => (
        <Image
            style={[styles.icon, {tintColor}]}
        />
    ),
  };

  _submit = () => {
    this.doLogin();
  };

  render() {
    return (
        <View style={styles.full}>
          <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />
          <View style={styles.loginViewHolder}>
            <Card wrapperStyle={{marginTop: 20}}>
              <KeyboardAwareScrollView style={styles.loginholder} ref={(scrollObj) => {this.scrollView = scrollObj}}>
                <View style={styles.loginimageview}>
                  <Image
                      style={styles.loginimage}
                      source={require('./assets/img/curbmap.png')}
                  />
                </View>
                <TextInput
                    ref="userInput"
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.loginbox}
                    onChangeText={(text) => this.setState({user: text})}
                    placeholder='username'
                    placeholderTextColor='lightgray'
                    value={this.stateValues.user}
                     />

                <TextInput
                    ref="passInput"
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.loginbox}
                    onChangeText={(text) => this.setState({pass: text})}
                    placeholder="password"
                    placeholderTextColor='lightgray'
                    secureTextEntry={true}
                    value={this.stateValues.pass}
                    />

                <Button
                    title="Login"
                    onPress={() => this._submit()}
                    color="#fcfcfc"
                    backgroundColor="#6147d0"
                    fontSize={20}
                    buttonStyle={styles.buttonlogin}
                >
                  Login
                </Button>
              </KeyboardAwareScrollView>
            </Card>
            </View>
        </View>
    )
  }
}

export default Login
