import React from 'react';
import {View} from 'react-native';

import Navigator from '../Navigator';

import styles from './styles';

const Root = () => (
    <View style={styles.rootContainer}>
        <Navigator
            scenes={[
                'login',
                'main',
                'registration',
                'scanner',
                'board',
                'boardLoader'
            ]}
        />
    </View>
);


export default Root;