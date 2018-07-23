import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';


export default class App extends React.Component {
    state = {
        name: 1,
    }

    constructor() {
        super();

        this.socket = io('http://localhost:8000', { jsonp: false });

        this.socket.on('update', () => this.setState({ name: this.state.name + 1 }))
        // this.socket.on('update', () => this.setState(prevState => { count: prevState.count + 1 }))
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