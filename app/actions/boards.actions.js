import firebase from 'firebase';
import {popLoader, pushLoader} from './loader.actions';
import Fetch from '../utils/Fetch';
import {ROOT_URL} from '../constants';
import {fetch} from './fetch.actions';
import {
    INIT_MESSAGES,
    UNSUBSCRIBE_BOARD,
    ADD_MESSAGE,
    SUBSCRIBE_BOARD,
    INIT_BOARDS,
    UPDATE_MESSAGE_COUNTER
} from '../constants/actions';
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

const unsubscribeBoards = boardId => ({
    type: UNSUBSCRIBE_BOARD,
    boardId
});

const addMessage = message => ({
    type: ADD_MESSAGE,
    message
});

const updateMessageCounter = (boardId, messageCounter) => ({
    type: UPDATE_MESSAGE_COUNTER,
    messageCounter,
    boardId
});

const createBoard = boardData => dispatch => {
    dispatch(pushLoader());
    firebase.database().ref(`boards/${boardData.id}`)
        .set(boardData, () => dispatch(popLoader()));
};

const getBoard = id => async (dispatch) => {
    const {body} = await dispatch(fetch(Fetch.fetching(`${ROOT_URL}/boards/${id}.json`)));
    const {messages = {}, name, description, urlQR} = body || {};
    dispatch(initMessages(Object.keys(messages)
        .map(key => ({
            ...messages[key],
            id: key,
            key
        }))
        .sort((a = '', b = '') => new Date(b.createdAt) - new Date(a.createdAt))));
    return {name, description, id, urlQR};
};

const getSubscribeBoardMessagesCounter = boardId => async (dispatch, getState) => {
    const {me: {me: {boards = {}}}} = getState();
    const isSubscribedBoard = !!boards[boardId];
    if (isSubscribedBoard) {
        const {body} = await dispatch(fetch(Fetch.fetching(`${ROOT_URL}/boards/${boardId}/messages.json`)));
        const respBody = body || {};
        const messageCounter = Object.keys(respBody).length;
        dispatch(updateMessageCounter(boardId, messageCounter));
    }
};

const updateBoardMessages = (boardId, message) => (dispatch, getState) => {
    const {me: {me: {email: author, photoURL: avatar}}} = getState();
    const id = generateId();
    const messageWithAuthor = {
        ...message,
        author,
        avatar,
        createdAt: new Date().toISOString()
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
            readCounter: messageCounter
        }
    };

    if (image) {
        board[boardId].image = image;
    }

    return dispatch(fetch(setDataToFirebase(`users/${id}/boards`, board)
        .then(() => dispatch(updateBoardSubscriptionsToMe(board)))));
};

const deleteBoardFromMe = boardId => async (dispatch, getState) => {
    const {me: {me: {id}}} = getState();
    await dispatch(fetch(Fetch.fetching(`${ROOT_URL}/users/${id}/boards/${boardId}.json`, {
        method: 'DELETE'
    })));
    return dispatch(unsubscribeBoards(boardId));
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
    deleteBoardFromMe,
    getSubscribeBoardMessagesCounter,
    subscribeBoard,
    createBoard,
    getBoard,
    getAllBoards,
    updateBoardMessages
};