import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import variables from '../../variables';
import LoginButton from '../../components/SubmitButton';
import GenerateForm from '../../components/Form';
import {requiredValidation, emailValidation, shouldBeEqual} from '../../utils/validators';
import IconInput from '../../components/IconInput';
import ImageInput from '../../components/ImageInput';

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
    }, {
        name: 'photoURL',
        component: ImageInput,
        validate: [
            requiredValidation
        ]
    }];

    constructor(props) {
        super(props);
        const {submit} = props;
        const buttonProps = {
            color: variables.accentColor,
            raised: true,
            onPress: submit,
            text: 'Sign Up'
        };

        this.formComponent = GenerateForm(LoginButton, buttonProps);
    }

    render() {
        const {isLoader} = this.props;
        const Form = this.formComponent;
        return (
            <Form
                isLoader={isLoader}
                config={this.config}
            />
        );
    }
}

export default reduxForm({
    form: 'registrationForm',
    validate: RegistrationForm.validate
})(RegistrationForm);