import {StyleSheet} from 'react-native';
import variables from '../../variables';

export default StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20
    },
    inputError: {
        padding: 5,
        backgroundColor: variables.lightPrimary,
        color: 'red',
        textAlign: 'center'
    },
    textInput: {
        padding: 10,
        fontSize: 15,
        color: variables.lightPrimary
    }
});