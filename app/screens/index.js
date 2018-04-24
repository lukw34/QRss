import Login from './Login/index.android';
import Main from './Main';
import Registration from './Registration';

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
    }
};

export default screensConfiguration;