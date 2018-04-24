import {createSelector} from 'reselect';

const getErrorMessage = ({me}) => me.err;
const getMe = ({me: {me = {}}}) => me;
const errorMessageSelector = createSelector(
    getErrorMessage,
    err => (err || {}).message
);

const isErrorSelector = createSelector(
    getErrorMessage,
    err => !!err
);

const isLogged = createSelector(
    getMe,
    me => !!me.id
);

export {
    errorMessageSelector,
    isErrorSelector,
    isLogged
};