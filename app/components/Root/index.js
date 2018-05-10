import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../Loader';
import Navigator from '../Navigator';
import {isLoaderSelector} from '../../selectors/loader.selectors';
import styles from './styles';

const mapStateToProps = state => ({
    isLoader: isLoaderSelector(state)
});

const Root = ({isLoader}) => (
    <View style={styles.rootContainer}>
        <Navigator
            scenes={[
                'login',
                'main',
                'registration',
                'scanner',
                'board',
                'boardLoader',
                'addMessage'
            ]}
        />
        <Loader
            isLoader={isLoader}
        />
    </View>
);

Root.propTypes = {
    isLoader: PropTypes.bool
};

export default connect(mapStateToProps)(Root);