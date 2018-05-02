import React from 'react';
import {Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import styles from './styles';

const SubmitButton = ({color, onPress, text, bordered, disabled}) => (<Button
    text={text}
    raised
    disabled={disabled}
    onPress={onPress}
    style={{
        container: [styles.containerLoginButton, color && {backgroundColor: color}, bordered && styles.containerLoginButtonBordered],
        text: styles.containerLoginButtonText
    }}
/>);

SubmitButton.propTypes = {
    color: PropTypes.string,
    onPress: PropTypes.func,
    text: PropTypes.string,
    bordered: PropTypes.bool,
    disabled: PropTypes.bool
};

export default SubmitButton;