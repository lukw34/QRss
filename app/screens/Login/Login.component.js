import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

import variables from '../../variables';
import LoginButton from '../../components/LoginButton';
import Form from '../../components/Form';
import styles from './styles';

const LoginScreen = ({model, onSignUpPress, onSignInPress, onFacebookSignInPress, onGoogleSignInPress, onModelChange, isLoader}) => (
    <View style={styles.loginScreenContainer}>
        <View style={{flex: 5}}>
        </View>
        <View style={{flex: 4}}>
            <Form model={model} onModelChange={onModelChange}/>
        </View>
        <View style={{flex: 5}}>
            <LoginButton
                color={variables.accentColor}
                onPress={onSignInPress}
                raised
                disabled={isLoader}
                text='Sign In'
            />
            <LoginButton
                color={variables.darkPrimary}
                disabled={isLoader}
                raised
                text='Sign In with facebook'
                bordered
                onPress={onFacebookSignInPress}
            />
            <LoginButton
                color='#D94141'
                raised
                disabled={isLoader}
                text='Sign In With Google +'
                onPress={onGoogleSignInPress}
            />
        </View>
        <View style={styles.signUpContainer}>
            <Text style={styles.signUpContainerLabel}>Don't have an account ?</Text>
            <TouchableWithoutFeedback onPress={onSignUpPress}>
                <View>
                    <Text style={styles.signUpButton}>Sign Up </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
);

LoginScreen.propTypes = {
    model: PropTypes.shape({}),
    onSignInPress: PropTypes.func,
    onModelChange: PropTypes.func,
    onFacebookSignInPress: PropTypes.func,
    isLoader: PropTypes.bool,
    onGoogleSignInPress: PropTypes.func,
    onSignUpPress: PropTypes.func
};

export default LoginScreen;