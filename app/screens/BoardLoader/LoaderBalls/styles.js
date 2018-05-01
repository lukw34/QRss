import {StyleSheet} from 'react-native';
import variables from '../../../variables';

const size = 25;

export default StyleSheet.create({
    circle: {
        margin: 4,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: variables.accentColor
    }
});