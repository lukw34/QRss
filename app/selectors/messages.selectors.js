import {createSelector} from 'reselect';

const getMessages = state => state.messages;
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