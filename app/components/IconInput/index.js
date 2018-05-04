import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text} from 'react-native';
import {Icon} from 'react-native-material-ui';

import styles from './styles';

const IconInput = ({icon, input, meta: {touched, error}, password = false, placeholder}) => (
    <View style={styles.iconInputContainer}>
        <View style={styles.iconInput}>
            <View style={styles.iconInputIcon}>
                <Icon
                    name={icon}
                    size={40}
                />
            </View>
            <TextInput
                {...input}
                style={styles.iconInputTextInput}
                placeholder={placeholder}
                secureTextEntry={password}
                underlineColorAndroid='transparent'
                onBlur={(evt) => input.onBlur(evt.nativeEvent.text)}
            />
        </View>
        {touched && error && <Text style={styles.iconInputError}>{error}</Text>}
    </View>

);

IconInput.propTypes = {
    input: PropTypes.shape({}),
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    }),
    icon: PropTypes.string,
    value: PropTypes.string,
    password: PropTypes.bool,
    placeholder: PropTypes.string
};

export default IconInput;