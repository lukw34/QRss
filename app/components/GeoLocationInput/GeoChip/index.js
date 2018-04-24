import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const GeoChip = ({value, label}) => (
    <View style={styles.geoChipContainer}>
        <Text style={styles.geoChipLabel}>{label}</Text>
        <Text style={styles.geoChipValue}>{value}</Text>
    </View>
);

GeoChip.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string
};
export default GeoChip;