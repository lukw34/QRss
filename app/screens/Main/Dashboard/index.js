import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';

import DashboardComponent from './Dasboard.component';
import {getSubscriptionStatistics} from '../../../selectors/me.selectors';

const mapStateToProps = state => ({
    subscriptionStatistics: getSubscriptionStatistics(state)
});

class Dashboard extends React.Component {

    static propTypes = {
        screenProps: PropTypes.shape({
            rootNavigateTo: PropTypes.func
        }),
        subscriptionStatistics: PropTypes.arrayOf(PropTypes.shape({})),

    };

    readBarCode = () => this.props.screenProps.rootNavigateTo('Scanner');

    pressPremium = () => Alert.alert(
        'Try premium',
        'This service will be available in the future'
    );

    render() {
        const {subscriptionStatistics: graphData} = this.props;
        const props = {
            graphData,
            readBarCode: this.readBarCode,
            pressPremium: this.pressPremium
        };
        return <DashboardComponent {...props} />;
    }
}

export default connect(mapStateToProps)(Dashboard);