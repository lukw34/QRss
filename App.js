import React from 'react';
import Root from './app/components/Root';
import {ThemeProvider} from 'react-native-material-ui'
import firebase from 'firebase';
import {Provider} from 'react-redux';
import {withNavigation} from 'react-navigation';

import variables from './app/variables';
import store from './app/store';

console.disableYellowBox = true;

const uiTheme = {
    palette: {
        primaryColor: variables.primary,
        accentColor: variables.accentColor
    }
};

class App extends React.Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyANU7T383c1vDYAD72raeu8wy3M0AkxHxo',
            authDomain: 'qrss-c2191.firebaseapp.com',
            databaseURL: 'https://qrss-c2191.firebaseio.com',
            projectId: 'qrss-c2191',
            storageBucket: 'gs://qrss-c2191.appspot.com'
        });
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider uiTheme={uiTheme}>
                    <Root/>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;