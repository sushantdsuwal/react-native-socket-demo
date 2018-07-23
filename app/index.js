import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';


export default class App extends React.Component {
    state = {
        name: 'bod',
    }

    constructor() {
        super();

        this.socket = io('http://localhost', { jsonp: false });

        this.socket.on('update', () => this.setState({ name: 'new name' }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello, {this.state.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});