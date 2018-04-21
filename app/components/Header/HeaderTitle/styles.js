import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    headerTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleImage: {
        width: 34,
        height: 34,
        borderRadius: 17,
        margin: 5
    },
    headerTitle: {
        flex: 6,
        fontSize: 15,
        color: 'white',
        marginLeft: 20
    }
});