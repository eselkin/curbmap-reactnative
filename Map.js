import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Permissions, IntentLauncherAndroid, Location } from 'expo'
import PropTypes from 'prop-types'
import { isSignedIn } from './auth'

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
    username: 'curbmaptest',
    session: ''
  }

  componentWillMount() {
    if (this.canGetLocation()) {
      this.watchLocation()
    }
    if (this.props.session !== undefined) {
      this.setState({
        username: this.props.username,
        session: this.props.session,
      })
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
    isSignedIn().then((result) => {
      if (result) {
        AsyncStorage.multiGet(['USERNAME', 'SESSION'])
          .then((stores) => {
            stores.map((result, i, store) => {
              switch (store[i][0]) {
                case 'USERNAME':
                  this.setState({username: store[i][1]})
                  break
                case 'SESSION':
                  this.setState({session: store[i][1]})
                  break
              }
            })
          })
          .catch((err) => {
            console.log(`ERROR:${err}`)
          })
      } else {
        // on signout and redirect here, the user should become curbmap
        this.setState({
          username: 'curbmaptest',
          session: 'x',
        })
      }
    })
    this.setState({region})
    if (this.state.session) {
      // temporary fix for huge amounts of data, adding the user=... attribute
      const urlstring = template`https://curbmap.com:50003/areaPolygon?lat1=${0}&lng1=${1}&lat2=${2}&lng2=${3}`
      let urlstringfixed;
      if (LONGITUDE_DELTA < 0.012) {
        urlstringfixed = urlstring((this.state.region.latitude - LATITUDE_DELTA),
          (this.state.region.longitude - LONGITUDE_DELTA),
          (this.state.region.latitude + LATITUDE_DELTA),
          (this.state.region.longitude + LONGITUDE_DELTA))
      } else {
        urlstringfixed = urlstring((this.state.region.latitude - 0.012),
          (this.state.region.longitude - 0.012),
          (this.state.region.latitude + 0.012),
          (this.state.region.longitude + 0.012))
      }
      console.log('fetching with u: ' + this.state.username + ' session: ' + this.state.session)
      fetch(urlstringfixed, {
        method: 'get',
        mode: 'cors',
        headers: {
          session: this.state.session,
          username: this.state.username,
        },
      })
        .then(lines => lines.json())
        .then((linesJSON) => {
          const start = new Date().getTime()
          console.log("Got json lines:"+ linesJSON.length)
          this.state.polylineList = []
          linesJSON.forEach((line) => {
            const lineObj = {coordinates: [], color: '#000'}
            line.coordinates.forEach((point) => {
              const LatLng = {longitude: point[0], latitude: point[1]}
              lineObj.coordinates.push(LatLng)
            })
            if (line.restrs.length > 0) {
              lineObj.color = this.constructColorFromLineRestrs(line.restrs)
            }
            this.state.polylineList.push(lineObj)
          })
          this.setState({})
          console.log(new Date().getTime() - start)
        }).catch((e) => {
        console.log("ERROR:   "+e)
      })
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
