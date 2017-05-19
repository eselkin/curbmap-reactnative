import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';

import App from './app';
import DrawerMenu from './src/views/Drawer/drawer-toolbar-ios';
import SettingsView from './src/views/settingsview';
import UserLogin from './src/views/loginview';

import { DrawerNavigator, StackNavigator } from 'react-navigation';


const stackNavigator = StackNavigator(
    {
        Login: {
            screen: UserLogin,

        },
        Settings: {
            screen: SettingsView,
        },

    }, {
        headerMode: 'none',
    }
);

const CurbmapRoot = DrawerNavigator({
        Home:{
            screen:App,
        },
        Stack:{
            screen: stackNavigator
        }
    }, {
        contentComponent: DrawerMenu, contentOptions:{
            activeTintColor:'#e91e63',
            style:{
                flex:1,
                paddingTop:15,
            }
        }
    }
);

AppRegistry.registerComponent('Curbmap', () => CurbmapRoot);