import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text} from 'react-native';

import styles from './styles';
import variables from '../../variables';

const MyTextInput = ({input, meta: {touched, error}, multiline = false, password = false, placeholder}) => (
    <View style={styles.inputContainer}>
        <TextInput
            {...input}
            multiline={multiline}
            style={styles.textInput}
            placeholder={placeholder}
            secureTextEntry={password}
            underlineColorAndroid={variables.lightPrimary}
        />
        {touched && error && <Text style={styles.inputError}>{error}</Text>}
    </View>

);

MyTextInput.propTypes = {
    multiline: PropTypes.bool,
    input:PropTypes.shape({}),
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    }),
    password: PropTypes.bool,
    placeholder: PropTypes.string
};

export default MyTextInput;