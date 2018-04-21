import firebase from 'firebase'
import {Facebook, Google} from 'expo';

import {AUTHORIZATION_SUCCESS, AUTHORIZATION_FAILURE, SIGN_OUT} from '../constants/actions';
import {fetch} from './fetch.actions';
import Fetch from '../utils/Fetch';
import {ROOT_URL, FACEBOOK_APP_ID, ANDROID_CLIENT_ID} from '../constants';

const onAuthorizationSuccess = (me) => ({
    type: AUTHORIZATION_SUCCESS,
    me
});

const onAuthorizationFailure = (err) => ({
    type: AUTHORIZATION_FAILURE,
    err
});

const signOut = () => ({
    type: SIGN_OUT
});

const signInWithFacebook = () => dispatch => dispatch(fetch(Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ['public_profile', 'email']
})
    .then(({type, token}) => {
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            return firebase.auth().signInWithCredential(credential);
        }

        return Promise.reject(new Error('The user cancelled the request'));

    })))
    .then(({uid: id, email, photoURL}) => dispatch(onAuthorizationSuccess({
        id,
        email,
        photoURL
    })))
    .catch(err => dispatch(onAuthorizationFailure(err)));


const signInWithEmailAndPassword = ({email, password}) => dispatch => dispatch(fetch(firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({uid}) => Fetch.fetching(`${ROOT_URL}/users/${uid}.json`))))
    .then(({body: {id, email, photoURL}} = {}) => dispatch(onAuthorizationSuccess({
        id,
        email,
        photoURL
    })))
    .catch(err => dispatch(onAuthorizationFailure(err)));

const signInWithGoogle = () => dispatch => dispatch(fetch(Google
    .logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: '',
        scopes: ['profile', 'email'],
    })
    .then(({accessToken, idToken}) => {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        return firebase.auth().signInWithCredential(credential);
    })))
    .then(({uid: id, email, photoURL}) => dispatch(onAuthorizationSuccess({
        id,
        email,
        photoURL
    })))
    .catch(err => {
        console.log(err);
        dispatch(onAuthorizationFailure(err))
    });

const signOutCurrentUser = () => async dispatch => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        dispatch(signOut());
    }
};

export {
    signInWithEmailAndPassword,
    signInWithFacebook,
    signInWithGoogle,
    signOutCurrentUser,
    onAuthorizationSuccess
};