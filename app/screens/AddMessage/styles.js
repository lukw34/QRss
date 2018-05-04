import {StyleSheet} from 'react-native';
import variables from '../../variables';

export default StyleSheet.create({
    addMessageContainer: {
        flex: 1,
        backgroundColor: variables.primary
    },
    addMessageFormContainer: {
        marginTop: 25,
        flex: 6
    },
    addMessageNavigatorHeaderStyle: {
        backgroundColor: variables.darkPrimary,
        borderBottomWidth: 4,
        borderColor: variables.divider
    },
});