import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import {requiredValidation} from '../../utils/validators';
import CommonForm from '../../components/CommonForm';
import TextInput from '../../components/TextInput';
import ImageInput from '../../components/ImageInput';

class AddMessageForm extends React.Component {

    static propTypes = {
        submit: PropTypes.func,
        isLoader: PropTypes.bool
    };

    config = [{
        name: 'title',
        type: 'text',
        placeholder: 'Message Title',
        component: TextInput,
        validate: [requiredValidation]
    }, {
        name: 'description',
        type: 'text',
        placeholder: 'Message Description',
        component: TextInput,
        multiline: true,
        maxLength: 70,
        validate: [requiredValidation]
    }, {
        name: 'imageUrl',
        component: ImageInput
    }];

    render() {
        const {isLoader, submit} = this.props;
        return (
            <CommonForm
                config={this.config}
                submit={submit}
                submitText='Add Message'
                isLoader={isLoader}
            />
        );
    }
}

export default reduxForm({
    form: 'addMessageForm'
})(AddMessageForm);