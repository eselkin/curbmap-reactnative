import React, {
    Component
} from 'react'
import MapView from 'react-native-maps'
import {
    StyleSheet
} from 'react-native'
import {
    Permissions
} from 'expo';

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
const LATITUDE_DELTA = 0.1922;
const LONGITUDE_DELTA = 0.1421;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    _onRegionChange = (region) => {
        this.setState({
            region: region
        });
    };

    componentDidMount() {
        //https://stackoverflow.com/questions/38122649/how-to-create-maps-which-detect-automatic-location-in-react-native
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const newRegion = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };

            this._onRegionChange(newRegion);
        });
    }

    getInitialState() {
        return {
            region: {
                latitude: 34.0928,
                longitude: -118.3587,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
    }

    render() {
        return ( <MapView style={ styles.map }
                          region={ this.state.region }
                          onRegionChange={ this._onRegionChange }
                          loadingEnabled
                          showsUserLocation/>
        )
    }
}

export default Map
