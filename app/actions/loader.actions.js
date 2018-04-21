import {LOADER_POP, LOADER_CLEAR, LOADER_PUSH} from '../constants/actions';

const pushLoader = () => ({
        type: LOADER_PUSH
    }), clearLoader = () => ({
        type: LOADER_CLEAR
    }), popLoader = () => ({
        type: LOADER_POP
    });

export {
    popLoader,
    pushLoader,
    clearLoader
};

