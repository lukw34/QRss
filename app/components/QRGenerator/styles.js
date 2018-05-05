import {StyleSheet} from 'react-native';
import variables from '../../variables';


export default StyleSheet.create({
    QRContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
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
        borderColor: 'red'
    },
    QRSaveButton: {
        borderColor: variables.primary
    },
    QRGoButton: {
        borderColor: variables.accentColor
    }
});