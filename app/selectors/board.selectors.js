import {createSelector} from 'reselect';

const getBoards = state => state.boards;

const geolocationSelector = createSelector(
    getBoards,
    boards => boards.map(({geolocation}) => geolocation).filter(location => !!location)
);


export {
    geolocationSelector
};