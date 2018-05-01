import firebase from 'firebase';
import {popLoader, pushLoader} from './loader.actions';
import Fetch from '../utils/Fetch';
import {ROOT_URL} from '../constants';
import {fetch} from './fetch.actions';
import {INIT_BOARD, ADD_MESSAGE} from '../constants/actions';

const initBoard = messages => ({
    type: INIT_BOARD,
    messages
});

const addMessage = message => ({
    type: ADD_MESSAGE,
    message
});

const createBoard = tableData => dispatch => {
    dispatch(pushLoader());
    firebase.database().ref(`boards/${tableData.id}`)
        .set(tableData, () => dispatch(popLoader()));
};

const getBoard = id => async dispatch => {
    const {body} = await dispatch(fetch(Fetch.fetching(`${ROOT_URL}/boards/${id}.json`)));
    const {messages = {}, name, description} = body || {};
    dispatch(initBoard(Object.keys(messages).map(key => ({
        ...messages[key],
        id: key
    }))));
    return {name, description};
};

export {
    createBoard,
    getBoard
};