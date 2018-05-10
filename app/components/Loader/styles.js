import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    loaderContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    loaderInnerContainer: {
        height: 100,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25,
        backgroundColor: 'white'
    },
    loaderText: {
        flex: 3,
        fontSize: 18,
        textAlign: 'center'
    }
});