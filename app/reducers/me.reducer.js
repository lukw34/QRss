import {createReducer} from '../utils/reducers';
import {AUTHORIZATION_FAILURE, AUTHORIZATION_SUCCESS, SIGN_OUT} from '../constants/actions';

const initState = {
    me: {},
    err: null
};
const onAuthorizationSuccess = (state = initState, {me}) => ({
    ...state,
    me,
    err: null
});
const onAuthorizationFailure = () => (state = initState, {err}) => ({
    ...state,
    me: {},
    err
});
const signOut = () => ({
    ...initState
});
export default createReducer(initState, {
    [AUTHORIZATION_FAILURE]: onAuthorizationFailure,
    [AUTHORIZATION_SUCCESS]: onAuthorizationSuccess,
    [SIGN_OUT]: signOut
});