import {createReducer} from '../utils/reducers';
import {
    AUTHORIZATION_FAILURE,
    AUTHORIZATION_SUCCESS,
    SIGN_OUT,
    SUBSCRIBE_BOARD,
    UNSUBSCRIBE_BOARD,
    UPDATE_MESSAGE_COUNTER
} from '../constants/actions';

const initState = {
    me: {},
    err: null
};
const onAuthorizationSuccess = (state = initState, {me}) => ({
    ...state,
    me: {
        boards: {},
        ...me
    },
    err: null
});
const onAuthorizationFailure = (state = initState, {err}) => ({
    ...state,
    me: {},
    err
});

const boardSubscriptions = (state = initState, {board}) => ({
    ...state,
    me: {
        ...state.me,
        boards: {
            ...state.me.boards,
            ...board
        }
    }
});

const unsubscribeBoard = (state = initState, {boardId}) => ({
    ...state,
    me: {
        ...state.me,
        boards: {
            ...state.me.boards,
            [boardId]: undefined
        }
    }
});

const updateBoardMessageCounter = (state = initState, {boardId, messageCounter}) => ({
    ...state,
    me: {
        ...state.me,
        boards: {
            ...state.me.boards,
            [boardId]: {
                ...(state.me.boards[boardId] || {}),
                messageCounter
            }
        }
    }
});

const signOut = () => ({
    ...initState
});
export default createReducer(initState, {
    [UPDATE_MESSAGE_COUNTER]: updateBoardMessageCounter,
    [AUTHORIZATION_FAILURE]: onAuthorizationFailure,
    [AUTHORIZATION_SUCCESS]: onAuthorizationSuccess,
    [SUBSCRIBE_BOARD]: boardSubscriptions,
    [SIGN_OUT]: signOut,
    [UNSUBSCRIBE_BOARD]: unsubscribeBoard
});