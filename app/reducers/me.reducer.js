import {createReducer} from '../utils/reducers';
import {AUTHORIZATION_FAILURE, AUTHORIZATION_SUCCESS, SIGN_OUT, SUBSCRIBE_BOARD} from '../constants/actions';

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

const signOut = () => ({
    ...initState
});
export default createReducer(initState, {
    [AUTHORIZATION_FAILURE]: onAuthorizationFailure,
    [AUTHORIZATION_SUCCESS]: onAuthorizationSuccess,
    [SUBSCRIBE_BOARD]: boardSubscriptions,
    [SIGN_OUT]: signOut
});