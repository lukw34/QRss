import {createReducer} from '../utils/reducers';
import {INIT_MESSAGES, ADD_MESSAGE} from '../constants/actions';

const initState = [];

const initBoard = (state = initState, {messages}) => [
    ...state,
    ...messages
];

const addMessage = (state = initState, {message}) => [...state, message];

export default createReducer(initState, {
    [INIT_MESSAGES]: initBoard,
    [ADD_MESSAGE]: addMessage
});