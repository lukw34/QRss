import {StyleSheet} from 'react-native';
import variables from '../../../variables';

export default StyleSheet.create({
    dashboardComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: variables.primary
    },
    dashboardComponentLogoContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dashboardComponentLogo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dashboardComponentLogoTextContainer: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor: variables.lightPrimary,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 10
    },
    dashboardComponentLogoText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'serif',
        fontSize: 25
    },
    dashboardComponentGraphContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: variables.lightPrimary,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        padding: 5,
        borderBottomColor: variables.lightPrimary
    },
    dashboardComponentGraph: {
        flexDirection: 'row'
    },
    dashboardComponentPremiumContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    dashboardButtonContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    dashboardComponentLegendText: {
        flex: 1,
        margin: 2,
        maxHeight: 25,
        color: 'white',
        textAlign: 'center',
        fontSize: 11,
    }
});