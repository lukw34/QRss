import React from 'react';
import {MapView, Location, Permissions} from 'expo';
import {ToastAndroid} from "react-native";

class Map extends React.Component {
    state = {
        latitude: 50.049683,
        longitude: 19.944544
    };

    componentDidMount() {
        try {
            this._getLocationAsync();
        } catch (e) {
            console.log(e);
            ToastAndroid.showWithGravityAndOffset(
                e.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150
            );
        }
    }

    _getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied')
        }

        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
        this.setState({
            latitude,
            longitude
        });
    };

    render() {
        const {latitude, longitude} = this.state;
        return (<MapView
            style={{flex: 1}}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />);
    }
}

export default Map;