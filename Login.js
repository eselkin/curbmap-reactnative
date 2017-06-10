import React, { Component } from 'react'
import { StyleSheet, View, Image, TextInput, Button } from 'react-native'
import MenuIcon from './MenuIcon'

const styles = StyleSheet.create({
    full: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});


class Login extends Component {
    getToken = () => {
        fetch('https://curbmap.com/token')
            .then((response) => response.text()).then((responseText) => { this.setState({XSRF: responseText}) })
    };
    constructor(props) {
        super(props);
        this.XSRFTOKEN = null;
        this.state = {};
    }

    componentDidMount() {
        const value = this.getToken();
        console.log("XSRF:" + this.state.XSRF);
    }

    static navigationOptions = {
        drawerLabel: 'Login',
        drawerIcon: ({tintColor}) => (
            <Image
                style={[styles.icon, {tintColor}]}
            />
        ),
    };

    _submit = () => {

    };

    render() {
        return (
            <View style={styles.full}>
                <MenuIcon onPress={() => this.props.navigation.navigate('DrawerOpen')} />

                <TextInput style={{position: 'absolute', left: 30, top: 100, padding: 10, width: 300, height: 50, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={(text) => this.setState({user: text})}
                           placeholder="username"
                           value={this.state.user} />


                <TextInput style={{position: 'absolute', left: 30, top:200, padding: 10, width: 300, height: 50, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={(text) => this.setState({pass: text})}
                           placeholder="password"
                           value={this.state.pass} />
                
                <Button title="Login" onPress={this._submit} title="Login" style={{background: 'darkslategray', position: 'absolute', left: 30, top: 300, width:200, height: 100}}/>
            </View>
        )
    }
}

export default Login
