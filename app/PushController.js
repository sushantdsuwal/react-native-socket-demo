import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            },
        })

    }

    render() {
        return (
            <View styles={{ flex: 1 }}>
                <Text>PushNotification controller</Text>
            </View>
        )
    }
}