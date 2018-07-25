import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, AppState } from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';
import PushNotification from 'react-native-push-notification';

import PushController from './PushController';


export default class App extends React.Component {
    state = {
        count: 1,
        message: 'a',
        chatMessage: []
    }

    constructor() {
        super();

        this.socket = io('http://localhost:8000', { jsonp: false });

        this.socket.on('update', () => this.setState({ count: this.state.count + 1 }))
        this.socket.on('chat message', (msg) => {
            const newMessage = this.state.chatMessage.concat(msg);
            this.setState({ chatMessage: newMessage })
        });

    }

    message = (text) => {
        this.setState({ message: text })
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

    }

    componentWillUnmount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUpdate = (nextProps, nextState) => {

    };

    _handleAppStateChange(appState) {
        if (appState === 'background') {
            PushNotification.localNotification({
                message: "My notification message",
                date: new Date(Date.now() + (5 * 1000).toString())
            })
        }

    }

    sndMessage = () => {
        const socket = io('http://localhost:8000', { jsonp: false });

        socket.emit('chat message', this.state.message);
        if (this.state.message == '') {
            return false;
        }
    };

    _renderItem = ({ item }) => (
        <Text>{item}</Text>
    );

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Count, {this.state.count}</Text>

                    <PushController />

                    <FlatList
                        data={this.state.chatMessage}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />

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
        marginTop: 50,
        margin: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
});