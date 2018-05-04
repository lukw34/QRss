import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import GeoLocation from '../../../components/GeoLocationInput';
import TextInput from '../../../components/TextInput';
import ImageInput from '../../../components/ImageInput';
import variables from '../../../variables';
import SubmitButton from '../../../components/SubmitButton';
import GenerateForm from '../../../components/Form';
import {requiredValidation} from '../../../utils/validators';


class CreateQRssForm extends React.Component {
    static propTypes = {
        isLoader: PropTypes.bool,
        submit: PropTypes.func
    };

    constructor(props) {
        super(props);
        const {submit} = props;
        const buttonProps = {
            color: variables.accentColor,
            raised: true,
            onPress: submit,
            text: 'Generate QR code'
        };

        this.formComponent = GenerateForm(SubmitButton, buttonProps);
    }

    config = [{
        name: 'name',
        type: 'text',
        placeholder: 'QRss Name',
        component: TextInput,
        validate: [
            requiredValidation,
        ]
    }, {
        name: 'description',
        type: 'text',
        placeholder: 'QRss Description',
        component: TextInput,
        multiline: true,
        maxLength: 70,
        validate: [
            requiredValidation,
        ]
    }, {
        name: 'geolocation',
        placeholder: 'QRss Geolocation',
        component: GeoLocation,
        validate: [
            requiredValidation,
        ]
    }, {
        name: 'image',
        placeholder: 'QRss image',
        component: ImageInput
    }];


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
    form: 'createQRssForm'
})(CreateQRssForm);