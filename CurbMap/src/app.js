import React from 'react';
import {
    Platform,
    Dimensions,
    View,
    StyleSheet,
    TouchableOpacity,
    Button,
    ScrollView,
    Text,
    Switch,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';


const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

let {height, width} = Dimensions.get('window');



class App extends React.Component{

    constructor(props){
       super(props);

       this.state = {
           Component: null,
           useGoogleMaps: ANDROID,
       };
   }

  render(){

        return(
          <MapView style={}/>




        );
  }

}



module.exports = App;