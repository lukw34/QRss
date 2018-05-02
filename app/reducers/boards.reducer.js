import {createReducer} from '../utils/reducers';
import {INIT_BOARDS} from '../constants/actions';

const initState = [];

const initBoard = (state = initState, {boards}) => [
    ...state,
    ...boards
];


export default createReducer(initState, {
    [INIT_BOARDS]: initBoard
});