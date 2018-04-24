import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import variables from '../../variables';
import LoginButton from '../../components/SubmitButton';
import GenerateForm from '../../components/Form';
import {requiredValidation, emailValidation, shouldBeEqual} from '../../utils/validators';
import IconInput from '../../components/IconInput';

class RegistrationForm extends React.Component {
    static propTypes = {
        isLoader: PropTypes.bool,
        submit: PropTypes.func
    };

    static validate = ({password, repassword}) => ({
        ...shouldBeEqual({
            value: password,
            name: 'password'
        }, {
            value: repassword,
            name: 'repassword'
        })
    });

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
    }, {
        name: 'repassword',
        password: true,
        icon: 'lock',
        placeholder: 'Type password again',
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
            bordered: true,
            onPress: submit,
            disabled: isLoader,
            text: 'Sign Up'
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
    form: 'registrationForm',
    validate: RegistrationForm.validate
})(RegistrationForm);