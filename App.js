import React, {useEffect} from 'react';
import Root from './app/components/Root';
import {ThemeContext, getTheme} from 'react-native-material-ui'
import firebase from 'firebase';
import {Provider} from 'react-redux';

import variables from './app/variables';
import store from './app/store';

console.disableYellowBox = true;

firebase.initializeApp({
    apiKey: 'AIzaSyANU7T383c1vDYAD72raeu8wy3M0AkxHxo',
    authDomain: 'qrss-c2191.firebaseapp.com',
    databaseURL: 'https://qrss-c2191.firebaseio.com',
    projectId: 'qrss-c2191',
    storageBucket: 'gs://qrss-c2191.appspot.com'
});

const uiTheme = {
    palette: {
        primaryColor: variables.primary,
        accentColor: variables.accentColor
    }
};

const App = () => (
    <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Root/>
        </ThemeContext.Provider>
    </Provider>
);


export default App;