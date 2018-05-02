import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {subscriptionSelector} from '../../../selectors/me.selectors';
import SubscriptionComponent from './Subscriptions.component';

const mapStateToProps = state => ({
    subscriptions: subscriptionSelector(state)
});

class Subscriptions extends React.Component {

    static propTypes = {
        rootNavigateTo: PropTypes.func,
        subscriptions: PropTypes.arrayOf(PropTypes.shape({}))
    };

    onItemPress = boardId => this.props.rootNavigateTo('BoardLoader', {boardId});

    goToScanner = () => this.props.rootNavigateTo('Scanner');

    render() {
        const {subscriptions} = this.props;
        const props = {
            goToScanner: this.goToScanner,
            subscriptions,
            onItemPress: this.onItemPress
        };
        return (<SubscriptionComponent {...props} />);
    }
}

export default connect(mapStateToProps)(Subscriptions);