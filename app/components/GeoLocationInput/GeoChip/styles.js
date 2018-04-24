import {StyleSheet} from 'react-native';
import variables from '../../../variables';

export default StyleSheet.create({
    geoChipContainer: {
        flex: 1,
        margin: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    geoChipLabel: {
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        padding: 5,
        minHeight: 30,
        backgroundColor: variables.lightPrimary,
        flex: 1,
        textAlign: 'center',
        fontSize: 18
    },
    geoChipValue: {
        justifyContent: 'center',
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        flex: 1,
        padding: 5,
        minHeight: 30,
        backgroundColor: variables.darkPrimary,
        color: variables.accentColor,
        fontSize: 18
    }
});