import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Subheader} from 'react-native-material-ui';

import styles from './styles';
import variables from '../../../variables';
import Logo from '../../../components/Logo';
import DonutGraph from '../../../components/DonutGraph';
import SubmitButton from '../../../components/SubmitButton';

const DashboardComponent = ({graphData, readBarCode, pressPremium}) => (
    <View style={styles.dashboardComponent}>
        <View style={styles.dashboardComponentLogoContainer}>
            <Logo
                style={styles.dashboardComponentLogo}
            />
            <View style={{justifyContent: 'center', flex: 1}}>
                <Subheader
                    text='QRss'
                    style={{
                        container: styles.dashboardComponentLogoTextContainer,
                        text: styles.dashboardComponentLogoText
                    }}
                />
            </View>
        </View>
        <View style={styles.dashboardComponentGraphContainer}>
            <View style={styles.dashboardComponentGraph}>
                <DonutGraph
                    style={{flex: 1}}
                    data={graphData}
                />
                <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                    {graphData.map(({name, fill: backgroundColor}) => (
                        <Text key={name} style={[styles.dashboardComponentLegendText, {backgroundColor}]}>{name}</Text>
                    ))}
                </View>
            </View>
            <SubmitButton
                color={variables.lightPrimary}
                text='Try premium'
                icon='extension'
                onPress={pressPremium}
                style={{
                    container: styles.dashboardComponentPremiumContainer
                }}
            />
        </View>
        <View style={styles.dashboardButtonContainer}>
            <SubmitButton
                color={variables.accentColor}
                text='Go to scanner'
                icon='camera'
                onPress={readBarCode}
            />
        </View>
    </View>
);

DashboardComponent.propTypes = {
    graphData: PropTypes.arrayOf(PropTypes.shape({})),
    readBarCode: PropTypes.func,
    pressPremium: PropTypes.func
};

export default DashboardComponent;