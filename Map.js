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

function template (strings, ...keys) {
  return (function (...values) {
    var dict = values[values.length - 1] || {}
    var result = [strings[0]]
    keys.forEach(function (key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key]
      result.push(value, strings[i + 1])
    })
    return result.join('')
  })
}


let LATITUDE_DELTA = 0.1922
let LONGITUDE_DELTA = 0.121

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
      //this.watcher()
    }
  }

  onRegionChange = (region) => {
    this.setState({ region })
  }

  onRegionChangeComplete = (region) => {
    if (region.latitudeDelta < 10) {
      LATITUDE_DELTA = region.latitudeDelta
      LONGITUDE_DELTA = region.longitudeDelta  // from the zoom level at resting
    }
    this.setState({region})
    if (this.props.session) {
      if (2 * LONGITUDE_DELTA < 0.4) {
        // temporary fix for huge amounts of data, adding the user=... attribute
        const urlstring = template`https://curbmap.com:50003/areaPolygon?lat1=${0}&lng1=${1}&lat2=${2}&lng2=${3}&user=${4}`
        const urlstringfixed = urlstring((this.state.region.latitude - LATITUDE_DELTA),
          (this.state.region.longitude - LONGITUDE_DELTA),
          (this.state.region.latitude + LATITUDE_DELTA),
          (this.state.region.longitude + LONGITUDE_DELTA),
          this.props.username,
        )
        // This is a little slow, will find a way to speed it up...
        // maybe compression is not being applied
        // Maybe the DB is too slow
        fetch(urlstringfixed, {
          method: 'get',
          headers: {
            session: this.props.session,
          }
        }).then(lines => {console.log(lines); return lines.json() })
          .then((linesJSON) => {
            console.log(linesJSON)
            // do something with data!
          }).catch((e) => {
            console.log(e)
        })
      }
    }
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
  };

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
        loadingEnabled
        showsUserLocation
      />
    )
  }
}

export default Map
