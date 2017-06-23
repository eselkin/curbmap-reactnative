import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { Permissions, IntentLauncherAndroid, Location } from 'expo'

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
const LATITUDE_DELTA = 0.1922
const LONGITUDE_DELTA = 0.1421

class Map extends Component {
  state = {
    region: {
      latitude: 34.0928,
      longitude: -118.3587,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  }

  componentWillMount() {
    if (this.canGetLocation()) {
      this.watchLocation()
    }
  }

  componentWillUnmount() {
    if (this.watcher) {
      this.watcher()
    }
  }

  onRegionChange = (region) => {
    this.setState({ region })
  }

  watchLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
      return
    }

    this.watcher = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 500,
        distanceInterval: 10,
      },
      ({ coords }) => {
        this.setState({
          region: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        })
      },
    )
  }

  canGetLocation = async () => {
    const { locationServicesEnabled } = await Location.getProviderStatusAsync()

    if (!locationServicesEnabled) {
      // Open location settings
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS,
      )
    }

    return locationServicesEnabled
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        loadingEnabled
        showsUserLocation
      />
    )
  }
}

export default Map
