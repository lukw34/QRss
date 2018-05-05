import firebase from 'firebase';
import {Facebook} from 'expo';

import {AUTHORIZATION_SUCCESS, AUTHORIZATION_FAILURE, SIGN_OUT} from '../constants/actions';
import {fetch} from './fetch.actions';
import Fetch from '../utils/Fetch';
import {ROOT_URL, FACEBOOK_APP_ID} from '../constants';

const onAuthorizationFailure = (err) => ({
    type: AUTHORIZATION_FAILURE,
    err
});

const onAuthorizationSuccess = (me) => ({
    type: AUTHORIZATION_SUCCESS,
    me
});

const signOut = () => ({
    type: SIGN_OUT
});

const updateDBUserInfo = (id, userData, callback) => firebase.database().ref(`users/${id}`).set(userData, callback);
const getUserInfo = id => Fetch.fetching(`${ROOT_URL}/users/${id}.json`);
const updateDataIfUserNotExist = ({email, id, photoURL}, callback) => getUserInfo(id).then(({body}) => {
    if (body) {
        callback(body);
        return Promise.resolve(body);
    }

    updateDBUserInfo(id, {email, id, photoURL}, callback);
    return Promise.resolve({email, id, photoURL});
});

const getUserInfoWithFetch = id => dispatch => dispatch(fetch(getUserInfo(id)));
const setActiveUser = id => dispatch => dispatch(getUserInfoWithFetch(id))
    .then(({body: user}) => dispatch(onAuthorizationSuccess(user)));

const signInWithFacebook = () => dispatch => dispatch(fetch(Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ['public_profile', 'email']
})
    .then(({type, token}) => {
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            return firebase.auth().signInWithCredential(credential);
        }

        return Promise.reject(new Error('The user cancelled the request'));

    })
    .then(({email, uid: id, photoURL}) => updateDataIfUserNotExist(
        {id, email, photoURL},
        () => dispatch(onAuthorizationSuccess({id, email, photoURL}))))))
    .catch(err => dispatch(onAuthorizationFailure(err)));


const signInWithEmailAndPassword = ({email, password}) => dispatch => dispatch(fetch(
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({uid}) => Fetch.fetching(`${ROOT_URL}/users/${uid}.json`))))
    .catch(err => {
        dispatch(onAuthorizationFailure(err));
        return Promise.reject(err);
    });

const signOutCurrentUser = () => async dispatch => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        dispatch(signOut());
    }
};

const createUserWithEmailAndPassword = ({email, password, photoURL = ' '}) => dispatch => dispatch(fetch(
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({uid}) => updateDBUserInfo(uid, {id: uid, email, photoURL, rss: []},
            () => dispatch(onAuthorizationSuccess({id: uid, email, photoURL}))))));

export {
    setActiveUser,
    getUserInfoWithFetch,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithFacebook,
    signOutCurrentUser,
    onAuthorizationSuccess
};