/**
 * Created by  on 5/2/17.
 */
import React, { Component, TouchableOpacity, Text, StyleSheet } from 'react-native';
import reactMixin from 'react-mixin';
import ButtonCommon from './button.common';

class locationButton extends Component {
    render() {
        const buttonStyle = [styles.button];
        if (this.state.pressed) buttonStyle.push(styles.buttonPress);

        return (
            <TouchableOpacity onPress={this.handlePress.bind(this)} style={buttonStyle}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

reactMixin.onClass(Button, ButtonCommon);
export default locationButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        backgroundColor: '#0E7AFE',
        paddingHorizontal: 16,
        paddingVertical: 10,
        position: 'absolute',
        right: 16,
        bottom: 16
    },
    buttonPress: {
        backgroundColor: '#C7C7C7'
    },
    text: {
        color: '#fff'
    }
});