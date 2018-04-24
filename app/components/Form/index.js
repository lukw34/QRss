import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Field} from 'redux-form';


const GenerateForm = (SubmitButton, buttonProps) => {
    const Form = ({config = []}) => (
        <View style={{flex: 1}}>
            <View style={{flex: 3}}>
                {config.map(element => (<Field
                    key={element.name}
                    {...element}
                />))
                }
            </View>
            <View style={{flex: 1}}>
                <SubmitButton {...buttonProps} />
            </View>
        </View>
    );

    Form.propTypes = {
        config: PropTypes.arrayOf(PropTypes.shape({}))
    };

    return Form;
};

export default GenerateForm;