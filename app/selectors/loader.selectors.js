import {createSelector} from 'reselect';

const getLoader = state => state.loader;
const isLoaderSelector = createSelector(
    getLoader,
    loader => loader.length > 1
);

export {
    isLoaderSelector
};