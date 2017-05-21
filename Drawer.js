import React from 'react'
import DrawerLayout from 'react-native-drawer-layout'
import { Text, View } from 'react-native'

const Drawer = () => {
  const navigationView = (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I&apos;m in the Drawer!</Text>
    </View>
  )
  return (
    <DrawerLayout
      drawerWidth={300}
      drawerPosition={DrawerLayout.positions.Left}
      renderNavigationView={() => navigationView}
    >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Hello</Text>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>World!</Text>
      </View>
    </DrawerLayout>
  )
}


export default Drawer
