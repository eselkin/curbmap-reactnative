import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { Permissions } from 'expo';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

class Map extends Component {

  componentWillMount() {
    Permissions.askAsync(Permissions.LOCATION)
  }

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.0928,
          longitude: -118.3587,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.1421,
        }}
        loadingEnabled
        showsUserLocation
      />
    )
  }
}

export default Map
