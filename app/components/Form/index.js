import React from 'react';
import PropTypes from 'prop-types';

import IconInput from '../IconInput';

class Form extends React.Component {
    static propTypes = {
        model: PropTypes.shape({}),
        onModelChange: PropTypes.func.isRequired
    };

    static mapFields = {
        'icon-input': IconInput
    };


    static defaultProps = {
        model: []
    };

    mapConfigToFields() {
        const {model, onModelChange} = this.props;
        return Object.keys(model).map(key => {
            const element = model[key];
            const FormInput = Form.mapFields[element.inputType];
            if (FormInput) {
                return (
                    <FormInput
                        {...element}
                        onModelChange={onModelChange}
                        key={key}
                        modelKey={key}
                    />
                );
            }

            return null;
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.mapConfigToFields()}
            </React.Fragment>
        );
    }

}

export default Form;