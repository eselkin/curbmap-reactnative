import React, { Component } from 'react'
import {DrawerNavigator, DrawerItems, DrawerView} from 'react-navigation';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import { StyleSheet, View, Image, Text, Dimensions, StatusBar, AsyncStorage} from 'react-native'

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
  drawer: {
    marginTop: 50,
    height: 600
  },
  account: {
    height: 600,
    backgroundColor: COLOR.greenA700
  }
});

export default class SignedInDrawer extends Component {
  constructor(props, context) {
    super(props, context);
    AsyncStorage.multiGet(['USERNAME', 'PASSWORD', 'AUTH_TOKEN', 'EXPIRES_AT', 'BADGE', 'SCORE']).then((stores) => {
      stores.map((result, i, store) => {
        switch (store[i][0]){
          case "USERNAME":
            this.username = store[i][1];
            break;
          case "PASSWORD":
            this.password=store[i][1];
            break;
          case "AUTH_TOKEN":
            this.authtoken = store[i][1];
            break;
          case "EXPIRES_AT":
            this.expiresat = store[i][1];
            break;
          case "BADGE":
            this.badge = store[i][1];
            break;
          case "SCORE":
            this.score = store[i][1];
            break;
        }
      })
    }).catch((err) => {
      console.log("ERROR:"+ err);
    })
  }

  render() {
    let badge;
    switch(this.badge) {
      case "beginner":
        badge = <Image source={require("./assets/img/beginner.png")} />;
        break;
      case default:
        badge = <Image source={require("./assets/img/undefined.png")} />;
        break;
    }
    return (
        <ThemeProvider uiTheme={uiTheme}>
        <View>
          <View style={styles.drawer}>
            <Drawer>
              <Drawer.Header>
                <Drawer.Header.Account
                    style={{container: styles.account}}
                    avatar={<Avatar
                        image={badge}
                    />}
                    footer={{
                      dense: true,
                      centerElement: {
                        primaryText: this.username,
                        secondaryText: this.score,
                      }
                    }}
                />
              </Drawer.Header>
              <Drawer.Section
                  style={{
                    label: {color: '#0000ff'}
                  }}
                  divider
                  items={[
                    {
                      icon: 'home', value: 'Home',
                      onPress: () => {
                        this.setState({active: 'Home'});
                        this.props.navigation.navigate('Home');
                      },
                    },
                    {
                      icon: 'settings', value: 'Settings',
                      onPress: () => {
                        this.setState({active: 'Settings'});
                        this.props.navigation.navigate('Settings');
                      },
                    }
                  ]}
              />
            </Drawer>
          </View>
        </View>
        </ThemeProvider>
    );
  }
}