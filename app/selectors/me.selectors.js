import {createSelector} from 'reselect';
import {AVAILABLE_SUBSCRIPTIONS} from '../constants';

const getErrorMessage = ({me: {me}}) => me.err;
const errorMessageSelector = createSelector(
    getErrorMessage,
    err => (err || {}).message
);

const isErrorSelector = createSelector(
    getErrorMessage,
    err => !!err
);

const getBoards = ({me: {me: {boards}}}) => boards;

const subscriptionSelector = createSelector(
    getBoards,
    boards => Object.keys(boards).map(key => boards[key]).filter(val => !!val)
);

const getSubscriptionsCount = createSelector(
    subscriptionSelector,
    subscriptions => subscriptions.length
);

const getSubscriptionStatistics = createSelector(
    getSubscriptionsCount,
    count => ([{
        name: 'Your available subscription',
        value: AVAILABLE_SUBSCRIPTIONS - count,
        fill: '#1f77b4'
    }, {
        name: 'Number of subscribed boards',
        value: count,
        fill: '#ff7f0e'
    }])
);

const isAvailableSubscription = createSelector(
    getSubscriptionsCount,
    subscriptionCount => AVAILABLE_SUBSCRIPTIONS > subscriptionCount
);

const getBoardId = (_, {navigation: {state: {params: {id}}}}) => id;

const isBoardSubscribed = createSelector(
    getBoards,
    getBoardId,
    (boards, boardId) => !!boards[boardId]
);

export {
    getSubscriptionStatistics,
    isBoardSubscribed,
    isAvailableSubscription,
    subscriptionSelector,
    getSubscriptionsCount,
    errorMessageSelector,
    isErrorSelector
};