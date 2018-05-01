import {createReducer} from '../utils/reducers';
import {INIT_BOARD, ADD_MESSAGE} from '../constants/actions';

const initState = [];

const initBoard = (state = initState, {messages}) => [
    ...state,
    ...messages
];

const addMessage = (state = initState, {message}) => [...state, message];

export default createReducer(initState, {
    [INIT_BOARD]: initBoard,
    [ADD_MESSAGE]: addMessage
});