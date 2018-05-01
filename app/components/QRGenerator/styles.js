import {StyleSheet} from 'react-native';
import variables from '../../variables';


export default StyleSheet.create({
    QRImageContainer: {
        width: 250,
        height: 250
    },
    QRButtonContainer: {
        marginBottom: 20,
        minHeight: 50,
        minWidth: 250,
        borderWidth: 2
    },
    QRCloseButton: {
        borderColor: variables.accentColor
    },
    QRSaveButton: {
        borderColor: variables.primary
    }
});