import {createSelector} from 'reselect';

const getErrorMessage = ({me}) => me.err;
const errorMessageSelector = createSelector(
    getErrorMessage,
    err => (err || {}).message
);

const isErrorSelector = createSelector(
    getErrorMessage,
    err => !!err
);

export {
    errorMessageSelector,
    isErrorSelector
};