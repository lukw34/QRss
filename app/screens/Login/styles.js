import {StyleSheet} from 'react-native';
import variables from '../../variables';


export default StyleSheet.create({
    loginScreenContainer: {
        backgroundColor: variables.primary,
        flex: 1,
        flexDirection: 'column'
    },
    signUpContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpContainerLabel: {
        fontSize: 18,
        color: variables.lightPrimary,
    },
    signUpButton: {
        fontSize: 20,
        color: 'white',
        textDecorationLine: 'underline'
    }
});