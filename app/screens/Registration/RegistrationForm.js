import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {requiredValidation, emailValidation, shouldBeEqual, lengthValidation} from '../../utils/validators';
import IconInput from '../../components/IconInput';
import ImageInput from '../../components/ImageInput';
import CommonForm from '../../components/CommonForm';

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
        placeholder: 'email',
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
        placeholder: 'password',
        component: IconInput,
        validate: [
            requiredValidation, lengthValidation
        ]
    }, {
        name: 'repassword',
        password: true,
        icon: 'lock',
        placeholder: 'Type password again',
        component: IconInput,
        validate: [
            requiredValidation, lengthValidation
        ]
    }, {
        name: 'photoURL',
        component: ImageInput,
        validate: [
            requiredValidation
        ]
    }];

    render() {
        const {isLoader, submit} = this.props;
        return (
            <CommonForm
                isLoader={isLoader}
                config={this.config}
                submitText='Sign Up'
                submit={submit}
            />
        );
    }
}

export default reduxForm({
    form: 'registrationForm',
    validate: RegistrationForm.validate
})(RegistrationForm);