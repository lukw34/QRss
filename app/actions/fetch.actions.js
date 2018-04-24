import {pushLoader, popLoader} from './loader.actions';

const fetch = request => dispatch => {
    dispatch(pushLoader());
    return request
        .then(resp => {
            dispatch(popLoader());
            return Promise.resolve(resp);
        })
        .catch(err => {
            dispatch(popLoader());
            return Promise.reject(err);
        });
};

export {
    fetch
};