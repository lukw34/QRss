import {StyleSheet} from 'react-native';
import variables from '../../variables';

export default StyleSheet.create({
    iconInputContainer: {
        flex: 1,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    iconInput: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        minHeight: 57,
        maxHeight: 65
    },
    iconInputError: {
        padding: 5,
        backgroundColor: variables.lightPrimary,
        color: 'red',
        textAlign: 'center'
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