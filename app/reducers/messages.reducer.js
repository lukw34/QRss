import {createReducer} from '../utils/reducers';
import {INIT_MESSAGES, ADD_MESSAGE} from '../constants/actions';

const initState = [];

const initBoard = (_, {messages}) => [
    ...messages
];

const addMessage = (state = initState, {message}) => [message, ...state];

export default createReducer(initState, {
    [INIT_MESSAGES]: initBoard,
    [ADD_MESSAGE]: addMessage
});