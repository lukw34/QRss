import {createSelector} from 'reselect';

const getMessages = state => state.board;
const messagesSelector = createSelector(
    getMessages,
    messages => messages
);
const messagesCount = createSelector(
    getMessages,
    messages => messages.length
);

export {
    messagesCount,
    messagesSelector
};