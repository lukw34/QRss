import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native';
import {Icon} from 'react-native-material-ui';

import styles from './styles'

const IconInput = ({icon, onModelChange, modelKey, value, keyboardType = 'default', password = false, placeholder}) => (
    <View style={styles.iconInputContainer}>
        <View style={styles.iconInputIcon}>
            <Icon
                name={icon}
                size={40}
            />
        </View>
        <TextInput
            style={styles.iconInputTextInput}
            onChangeText={value => onModelChange(modelKey, value)}
            value={value}
            placeholder={placeholder}
            secureTextEntry={password}
            keyboardType={keyboardType}
            editable
            underlineColorAndroid='transparent'
        />
    </View>
);

IconInput.propTypes = {
    icon: PropTypes.string,
    onModelChange: PropTypes.func,
    value: PropTypes.string,
    modelKey: PropTypes.string,
    keyboardType: PropTypes.string,
    password: PropTypes.bool
};

export default IconInput;