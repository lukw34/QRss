import React from 'react';
import {Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import styles from './styles';

const SubmitButton = ({color, onPress, text, bordered, disabled, icon}) => (<Button
    text={text}
    raised
    icon={icon}
    disabled={disabled}
    onPress={onPress}
    style={{
        container: [styles.containerLoginButton, color && {backgroundColor: color}, bordered && styles.containerLoginButtonBordered],
        text: styles.containerLoginButtonText
    }}
/>);

SubmitButton.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func,
    text: PropTypes.string,
    bordered: PropTypes.bool,
    disabled: PropTypes.bool
};

export default SubmitButton;