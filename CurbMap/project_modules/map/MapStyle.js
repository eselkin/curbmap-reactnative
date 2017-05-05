import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const customStyle = [
    {
        featureType: 'poi',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'road.highway',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'transit',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit.station.airport',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'transit.station.airport',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
];
class MapStyle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          customMapStyle={customStyle}
        />
      </View>
    );
  }
}

MapStyle.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = MapStyle;
