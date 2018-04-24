import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import variables from '../../variables';
import LoginButton from '../../components/SubmitButton';
import GenerateForm from '../../components/Form';
import {requiredValidation, emailValidation} from '../../utils/validators';
import IconInput from '../../components/IconInput';


class LoginForm extends React.Component {

    static propTypes = {
        submit: PropTypes.func,
        isLoader: PropTypes.bool
    };

    config = [{
        name: 'email',
        type: 'email',
        placeholder: 'User email',
        inputType: 'icon-input',
        icon: 'person',
        component: IconInput,
        keyboardType: 'email-address',
        validate: [
            requiredValidation, emailValidation
        ]
    }, {
        name: 'password',
        password: true,
        icon: 'lock',
        placeholder: 'Password',
        component: IconInput,
        validate: [
            requiredValidation
        ]
    }];

    render() {
        const {isLoader, submit} = this.props;
        const buttonProps = {
            color: variables.accentColor,
            raised: true,
            onPress: submit,
            disabled: isLoader,
            text: 'Sign In'
        };
        const Form = GenerateForm(LoginButton, buttonProps);
        return (
            <Form
                config={this.config}
            />
        );
    }
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm);