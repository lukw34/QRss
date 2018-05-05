import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Field} from 'redux-form';


const GenerateForm = (SubmitButton, buttonProps) => {
    const Form = ({config = [], isLoader}) => (
        <View style={{flex: 1}}>
            <View style={{flex: 5}}>
                {config.map(element => (<Field
                    key={element.name}
                    {...element}
                />))
                }
            </View>
            <View style={{flex: 1}}>
                <SubmitButton
                    {...buttonProps}
                    isLaoder={isLoader}
                />
            </View>
        </View>
    );

    Form.propTypes = {
        isLoader: PropTypes.bool,
        config: PropTypes.arrayOf(PropTypes.shape({}))
    };

    return Form;
};

export default GenerateForm;