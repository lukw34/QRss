import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';


import {requiredValidation, emailValidation} from '../../utils/validators';
import IconInput from '../../components/IconInput';
import CommonForm from '../../components/CommonForm';

class LoginForm extends React.Component {

    static propTypes = {
        submit: PropTypes.func,
        isLoader: PropTypes.bool
    };

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
            requiredValidation
        ]
    }];


    render() {
        const {isLoader, submit} = this.props;
        return (
            <CommonForm
                config={this.config}
                submit={submit}
                submitText='Sign In'
                isLoader={isLoader}
            />
        );
    }
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm);