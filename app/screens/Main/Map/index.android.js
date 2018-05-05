import React from 'react';
import {MapView, Location, Permissions} from 'expo';
import {ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getAllBoards} from '../../../actions/boards.actions';
import {geolocationSelector} from '../../../selectors/board.selectors';

const mapStateToProps = state => ({
    locations: geolocationSelector(state)
});

const mapDispatchToProps = dispatch => ({
    getLisOfBoards: () => dispatch(getAllBoards())
});

class Map extends React.Component {
    static propTypes = {
        locations: PropTypes.arrayOf(PropTypes.shape({})),
        getLisOfBoards: PropTypes.func
    };

    state = {
        latitude: 50.049683,
        longitude: 19.944544
    };

    componentDidMount() {
        try {
            this._getLocationAsync();
            this.props.getLisOfBoards();
        } catch (e) {
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
            throw new Error('Permission to access location was denied');
        }

        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
        this.setState({
            latitude,
            longitude
        });
    };

    render() {
        const {latitude, longitude} = this.state;
        const {locations} = this.props;
        return (
            <MapView
                style={{flex: 1}}
                showsUserLocation
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

            >
                {locations.map((coordinate, index) => (
                    <MapView.Marker
                        key={`marker-${index}`}
                        coordinate={coordinate}
                    />))}
            </MapView>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);