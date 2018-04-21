import Home from './Login';
import Main from './Main';
import Registration from './Registration';

const screensConfiguration = {
    login: {
        screen: Home,
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