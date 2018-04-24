import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import {Location, Permissions} from 'expo';

import styles from './styles';
import GeoChip from './GeoChip';

class GeoLocationInput extends React.Component {

    getLocation = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
        }

        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});

        this.props.input.onChange({latitude, longitude});
    };

    render() {
        const {input: {value}, meta: {touched, error}} = this.props;
        const {latitude, longitude} = value || {};
        return (
            <View style={{
                flex: 2,
                flexDirection: 'column'
            }}
            >
                <View style={styles.geoInputContainer}>
                    <View style={{
                        flex: 3
                    }}
                    >
                        <GeoChip
                            label='lat'
                            value={latitude}
                        />
                        <GeoChip
                            label='long'
                            value={longitude}
                        />
                    </View>
                    <View style={{
                        flex: 1
                    }}
                    >
                        <ActionButton
                            onPress={this.getLocation}
                            icon='add-location'
                        />
                    </View>
                </View>
                {touched && error && <Text style={styles.inputError}>{error}</Text>}
            </View>
        );
    }
}


GeoLocationInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func
    }),
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    })
};

export default GeoLocationInput;