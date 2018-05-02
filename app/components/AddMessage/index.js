import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';

import {requiredValidation} from '../../utils/validators';
import variables from '../../variables';
import GenerateForm from '../Form';
import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';

class AddMessage extends React.Component {
    static propTypes = {
        isLoader: PropTypes.bool,
        submit: PropTypes.func,
        closeModal: PropTypes.func
    };


    config = [{
        name: 'title',
        type: 'text',
        placeholder: 'Message Title',
        component: TextInput,
        validate: [
            requiredValidation,
        ]
    }, {
        name: 'description',
        type: 'text',
        placeholder: 'Message Description',
        component: TextInput,
        multiline: true,
        maxLength: 70,
        validate: [
            requiredValidation,
        ]
    }];

    render() {
        const {isLoader, submit, closeModal} = this.props;
        const buttonProps = {
            color: variables.accentColor,
            raised: true,
            onPress: submit,
            disabled: isLoader,
            text: 'Add Message'
        };
        const Form = GenerateForm(SubmitButton, buttonProps);
        return (
            <View style={{
                flex: 1,
                backgroundColor: variables.primary
            }}
            >
                <View style={{
                    marginTop: 25,
                    flex: 6
                }}
                >
                    <Form
                        config={this.config}
                    />
                </View>
                <View style={{
                    flex: 2
                }}
                >
                    <SubmitButton
                        color='#D94141'
                        raised
                        disabled={isLoader}
                        text='Close Modal'
                        onPress={closeModal}
                    />
                </View>
            </View>
        );
    }
}

export default reduxForm({
    form: 'addMessageForm'
})(AddMessage);