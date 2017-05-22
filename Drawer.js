import { DrawerNavigator } from 'react-navigation'
import Home from './Home'
import Settings from './Settings'

const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
})

export default Drawer
