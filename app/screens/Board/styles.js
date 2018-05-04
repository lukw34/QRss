import {StyleSheet} from 'react-native';
import variables from '../../variables';

export default StyleSheet.create({
    boardNavigatorHeaderStyle: {
        backgroundColor: variables.darkPrimary,
        borderBottomWidth: 4,
        borderColor: variables.divider
    },
    boardContainer: {
        flex: 1,
        backgroundColor: variables.primary
    },
    boardHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    boardHeaderButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boardHeaderButtonText: {
        color: 'white',
        fontSize: 20
    },
    boardSubheaderContainer: {
        flex: 7,
        justifyContent: 'center'
    },
    boardSubheaderText: {
        color: variables.accentColor,
        textAlign: 'center',
        fontSize: 18
    }
});
