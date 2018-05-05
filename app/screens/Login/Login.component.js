import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

import LoginForm from './LoginForm';
import Logo from '../../components/Logo';
import variables from '../../variables';
import LoginButton from '../../components/SubmitButton';
import styles from './styles';

const LoginScreen = ({onSignUpPress, onSignInPress, onFacebookSignInPress, onGoogleSignInPress, isLoader}) => (
    <View style={styles.loginScreenContainer}>
        <Logo
            style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'center'
            }}
        />
        <View style={{flex: 5}}>
            <LoginForm
                onSubmit={onSignInPress}
                isLoader={isLoader}
            />
        </View>
        <View style={{flex: 3}}>
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
            <Text style={styles.signUpContainerLabel}>Do not have an account ?</Text>
            <TouchableWithoutFeedback onPress={onSignUpPress}>
                <View>
                    <Text style={styles.signUpButton}>Sign Up </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
);

LoginScreen.propTypes = {
    onSignInPress: PropTypes.func,
    onFacebookSignInPress: PropTypes.func,
    isLoader: PropTypes.bool,
    onGoogleSignInPress: PropTypes.func,
    onSignUpPress: PropTypes.func
};

export default LoginScreen;