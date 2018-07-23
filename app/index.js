import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';


export default class App extends React.Component {
    state = {
        count: 1,
        message: 'a',
    }

    constructor() {
        super();

        this.socket = io('http://localhost:8000', { jsonp: false });

        this.socket.on('update', () => this.setState({ count: this.state.count + 1 }))
        // this.socket.on('update', () => this.setState(prevState => { count: prevState.count + 1 }))
    }

    message = (text) => {
        this.setState({ message: text })
    }

    componentDidMount() {

    }

    sndMessage = () => {
        const socket = io('http://localhost:8000', { jsonp: false });

        socket.emit('chat message', this.state.message);
        if (this.state.message == '') {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Count, {this.state.count}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: '75%', justifyContent: 'center' }}>
                            <TextInput
                                placeholder="Type Your Message"
                                onChangeText={(text) => this.message(text)}
                            />
                        </View>

                        <View style={{ width: '25%' }}>
                            <Button
                                title="send"
                                onPress={() => this.sndMessage()}
                            />
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});