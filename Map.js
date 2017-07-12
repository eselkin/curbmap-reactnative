import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { Permissions, IntentLauncherAndroid, Location } from 'expo'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

function template(strings, ...keys) {
  return ((...values) => {
    const dict = values[values.length - 1] || {}
    const result = [strings[0]]
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key]
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
    polylineList: [],
  }

  componentWillMount() {
    if (this.canGetLocation()) {
      this.watchLocation()
    }
  }

  componentWillUnmount() {
    if (this.watcher) {
      // this.watcher()
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
    this.setState({ region })
    if (this.props.session) {
      if (2 * LONGITUDE_DELTA < 0.4) {
        // temporary fix for huge amounts of data, adding the user=... attribute
        const urlstring = template`https://curbmap.com:50003/areaPolygon?lat1=${0}&lng1=${1}&lat2=${2}&lng2=${3}&user=${4}`
        const urlstringfixed = urlstring((this.state.region.latitude - LATITUDE_DELTA),
          (this.state.region.longitude - LONGITUDE_DELTA),
          (this.state.region.latitude + LATITUDE_DELTA),
          (this.state.region.longitude + LONGITUDE_DELTA),
          this.props.username)
        fetch(urlstringfixed, {
          method: 'get',
          mode: 'cors',
          headers: {
            session: this.props.session,
          },
        })
          .then(lines => lines.json())
          .then((linesJSON) => {
            this.state.polylineList = []
            linesJSON.forEach((line) => {
              const lineObj = { coordinates: [], color: '#000' }
              line.coordinates.forEach((point) => {
                const LatLng = { longitude: point[0], latitude: point[1] }
                lineObj.coordinates.push(LatLng)
              })
              if (line.restrs.length > 0) {
                lineObj.color = this.constructColorFromLineRestrs(line.restrs)
              }
              this.state.polylineList.push(lineObj)
            })
          }).catch((e) => {
          console.log(e)
        })
      }
    }
  }

  constructColorFromLineRestrs = (lineRestrs) => {
    let color = '#000'
    lineRestrs.forEach((lineRestr) => {
      switch (lineRestr[0]) {
        case 'red':
        case 'np':
        case 'hyd':
          color = '#f00'
          break
        case 'sweep':
          color = '#c0c'
          break
        case 'ppd':
          color = '#ccc'
          break
        case 'dis':
          color = '#00f'
          break
        case 'yellow':
          color = '#ff0'
          break
        case 'white':
          color = '#fff'
          break
        default:
          color = '#000'
          break
      }
    })
    return color
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
        onRegionChangeComplete={this.onRegionChangeComplete}
        loadingEnabled
        showsUserLocation
      >
        { this.state.polylineList.map(
          polyline =>
            (<MapView.Polyline
              coordinates={polyline.coordinates}
              strokeColor={polyline.color}
            />),
        )}
      </MapView>
    )
  }
}

Map.propTypes = {
  username: PropTypes.string,
  session: PropTypes.string,
}

Map.defaultProps = {
  username: 'curbmaptest',
  session: '',
}

export default Map
