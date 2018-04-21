import {StyleSheet} from 'react-native';
import variables from '../../variables';

export default StyleSheet.create({
    iconInputContainer: {
        flex: 1,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    iconInputIcon: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variables.lightPrimary,
        flexDirection: 'column'
    },
    iconInputTextInput: {
        flex: 7,
        padding: 20,
        fontSize: 15
    }
});