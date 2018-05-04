import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {subscriptionSelector} from '../../../selectors/me.selectors';
import SubscriptionComponent from './Subscriptions.component';
import {getSubscribeBoardMessagesCounter, deleteBoardFromMe} from '../../../actions/boards.actions';

const mapStateToProps = state => ({
    subscriptions: subscriptionSelector(state)
});

const mapDispatchToProps = dispatch => ({
    getMessagesCounters: id => dispatch(getSubscribeBoardMessagesCounter(id)),
    removeSubscriptions: id => dispatch(deleteBoardFromMe(id))
});

class Subscriptions extends React.Component {

    static propTypes = {
        screenProps: PropTypes.shape({
            rootNavigateTo: PropTypes.func
        }),
        subscriptions: PropTypes.arrayOf(PropTypes.shape({})),
        getMessagesCounters: PropTypes.func,
        removeSubscriptions: PropTypes.func
    };

    componentDidMount() {
        const {subscriptions, getMessagesCounters} = this.props;
        try {
            subscriptions.forEach(({id}) => getMessagesCounters(id))
        } catch (e) {
            //handle catch
        }
    }

    onItemPress = boardId => this.props.screenProps.rootNavigateTo('BoardLoader', {boardId});

    goToScanner = () => this.props.screenProps.rootNavigateTo('Scanner');

    render() {
        const {subscriptions, removeSubscriptions} = this.props;
        const props = {
            goToScanner: this.goToScanner,
            subscriptions,
            onDeletePress: removeSubscriptions,
            onItemPress: this.onItemPress
        };
        return (<SubscriptionComponent {...props} />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);