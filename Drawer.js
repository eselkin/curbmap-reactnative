import { DrawerNavigator } from 'react-navigation'
import Home from './Home'
import Settings from './Settings'
import Login from './Login'

const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
  Login: {
    screen: Login
  }
});


export default Drawer
