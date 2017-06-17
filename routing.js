import { DrawerNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import Settings from './Settings'
import Login from './Login'
import SignedInDrawer from './SignedInDrawer'

const SignedOut = DrawerNavigator({
  Home: {
    screen: Home,
    passProps: {loggedIn: false}
  },
  Login: {
    screen: Login
  }
});

const SignedIn = DrawerNavigator({
  Home: {
    screen: Home,
    passProps: {loggedIn: true}
  },
  Settings: {
    screen: Settings
  }
  }, {
  contentComponent: SignedInDrawer,
  contentOptions: {
    activeTintColor: "#e06e63",
    style: {
      flex: 1,
      paddingTop: 20
    }
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
      {
        SignedIn: {
          screen: SignedIn,
          navigationOptions: {
            gesturesEnabled: false
          }
        },
        SignedOut: {
          screen: SignedOut,
          navigationOptions: {
            gesturesEnabled: false
          }
        }
      },
      {
        headerMode: "none",
        mode: "modal",
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
  );
};