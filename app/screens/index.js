import Login from './Login/index.android';
import Main from './Main';
import Registration from './Registration';
import Scanner from './Scanner';
import Board from './Board';
import BoardLoader from './BoardLoader';

const screensConfiguration = {
    login: {
        screen: Login,
        name: 'Login'
    },
    main: {
        screen: Main,
        name: 'Main'
    },
    registration: {
        screen: Registration,
        name: 'Registration'
    },
    scanner: {
        screen: Scanner,
        name: 'Scanner'
    },
    board: {
        screen: Board,
        name: 'Board'
    },
    boardLoader: {
        screen: BoardLoader,
        name: 'BoardLoader'
    }
};

export default screensConfiguration;