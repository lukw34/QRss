import firebase from 'firebase';
import {popLoader, pushLoader} from './loader.actions';
import Fetch from '../utils/Fetch';
import {ROOT_URL} from '../constants';
import {fetch} from './fetch.actions';
import {INIT_MESSAGES, ADD_MESSAGE, SUBSCRIBE_BOARD,INIT_BOARDS} from '../constants/actions';
import {generateId, setDataToFirebase} from '../utils/utils';

const initMessages = messages => ({
    type: INIT_MESSAGES,
    messages
});

const initBoards = boards => ({
    type: INIT_BOARDS,
    boards
});

const updateBoardSubscriptionsToMe = board => ({
    type: SUBSCRIBE_BOARD,
    board
});

const addMessage = message => ({
    type: ADD_MESSAGE,
    message
});


const createBoard = boardData => dispatch => {
    dispatch(pushLoader());
    firebase.database().ref(`boards/${boardData.id}`)
        .set(boardData, () => dispatch(popLoader()));
};

const getBoard = id => async dispatch => {
    const {body} = await dispatch(fetch(Fetch.fetching(`${ROOT_URL}/boards/${id}.json`)));
    const {messages = {}, name, description} = body || {};
    dispatch(initMessages(Object.keys(messages).map(key => ({
        ...messages[key],
        id: key,
        key
    }))));
    return {name, description, id};
};

const updateBoardMessages = (boardId, message) => (dispatch, getState) => {
    const {me: {me: {email: author, photoURL: avatar}}} = getState();
    const id = generateId();
    const messageWithAuthor = {
        ...message,
        author,
        avatar
    };

    return dispatch(fetch(setDataToFirebase(`boards/${boardId}/messages/${id}`, messageWithAuthor)
        .then(() => dispatch(addMessage(messageWithAuthor)))));
};

const subscribeBoard = ({name, description, boardId, image}, messageCounter) => (dispatch, getState) => {
    const {me: {me: {id}}} = getState();
    const board = {
        [boardId]: {
            name,
            id: boardId,
            description,
            counter: messageCounter
        }
    };

    if (image) {
        board[boardId].image = image;
    }

    return dispatch(fetch(setDataToFirebase(`users/${id}/boards`, board)
        .then(() => dispatch(updateBoardSubscriptionsToMe(board)))));
};

const getAllBoards = () => async dispatch => {
    const {body} = await dispatch(fetch(Fetch.fetching(`${ROOT_URL}/boards.json`)));
    const respBody = body || {};
    const boards = Object.keys(respBody).map(key => ({
        ...respBody[key],
        id: key,
        key
    }));
    return dispatch(initBoards(boards));
};


export {
    subscribeBoard,
    createBoard,
    getBoard,
    getAllBoards,
    updateBoardMessages
};