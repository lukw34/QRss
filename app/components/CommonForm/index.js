import React from 'react';
import PropTypes from 'prop-types';
import GenerateForm from '../Form';
import variables from '../../variables';
import SubmitButton from '../SubmitButton';

class CommonForm extends React.Component {
    static propTypes = {
        isLoader: PropTypes.bool,
        config: PropTypes.arrayOf(PropTypes.shape({})),
        submitText: PropTypes.string,
        submit: PropTypes.func
    };

    constructor(props) {
        super(props);
        const {submit, submitText} = props;
        const buttonProps = {
            color: variables.accentColor,
            raised: true,
            onPress: submit,
            text: submitText
        };

        this.formComponent = GenerateForm(SubmitButton, buttonProps);
    }

    render() {
        const Form = this.formComponent;
        const {isLoader, config} = this.props;
        return (
            <Form
                config={config}
                isLoader={isLoader}
            />
        );
    }
}

export default CommonForm;