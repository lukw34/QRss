import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import Form from '../../components/Form';

class Registration extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }).isRequired,
    };

    initModel = {
        email: {
            value: '',
            password: true,
            placeholder: 'User email',
            inputType: 'icon-input',
            icon: 'person',
            keyboardType: 'email-address'
        },
        password: {
            value: '',
            password: true,
            icon: 'lock',
            placeholder: 'Password',
            inputType: 'icon-input'
        },
        repassword: {
            value: '',
            password: true,
            icon: 'lock',
            placeholder: 'Type password again',
            inputType: 'icon-input'
        }
    };

    constructor(props) {
        super(props);
        this.onModelChange = this.onModelChange.bind(this);
    }


    state = {
        model: this.initModel
    };

    onModelChange(key, value) {
        const {model} = this.state;
        const modelValue = model[key] || {};
        this.setState({
            model: {
                ...model,
                [key]: {
                    ...modelValue,
                    value
                }
            }
        });
    }


    render() {
        const {model} = this.state;

        return (
            <View style={styles.registrationScreenContainer}>
                <View style={{flex: 6}}>
                </View>
                <View style={{flex: 4}}>
                    <Form
                        onModelChange={this.onModelChange}
                        model={model}
                    />
                </View>
            </View>
        );
    }
}

export default Registration;