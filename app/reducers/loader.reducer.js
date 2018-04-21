import {createReducer} from '../utils/reducers';

const loaderPush = (loaderState = []) => [true, ...loaderState];
const loaderPop = (loaderState = []) => [...loaderState.slice(1, loaderState.length)];
const loaderClear = () => [];

export default createReducer([], {
    LOADER_PUSH: loaderPush,
    LOADER_POP: loaderPop,
    LOADER_CLEAR: loaderClear
});