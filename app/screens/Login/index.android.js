import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ToastAndroid} from 'react-native';
import firebase from 'firebase';

import {errorMessageSelector, isErrorSelector} from '../../selectors/me.selectors';
import {isLoaderSelector} from '../../selectors/loader.selectors';
import LoginScreen from './Login.component';
import {
    signInWithEmailAndPassword,
    signInWithFacebook,
    signInWithGoogle,
    onAuthorizationSuccess
} from '../../actions/authorization.actions';

const mapStateToProps = (state) => ({
    isError: isErrorSelector(state),
    error: errorMessageSelector(state),
    isLoader: isLoaderSelector(state)
});

const mapDispatchToProps = dispatch => ({
    authWithEmailAndPassword: (email, password) => dispatch(signInWithEmailAndPassword({email, password})),
    authWithFacebook: () => dispatch(signInWithFacebook()),
    authWithGoogle: () => dispatch(signInWithGoogle()),
    setMe: me => dispatch(onAuthorizationSuccess(me))
});

class Login extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }).isRequired,
        isLoader: PropTypes.bool,
        error: PropTypes.string,
        isError: PropTypes.bool,
        authWithEmailAndPassword: PropTypes.func,
        authWithFacebook: PropTypes.func,
        authWithGoogle: PropTypes.func,
        setMe: PropTypes.func,
        style: PropTypes.number
    };


    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const {uid: id, email, photoURL} = user;
                this.props.setMe({
                    id, email, photoURL
                });
                ToastAndroid.showWithGravityAndOffset(
                    'You are logged to application!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    150
                );
                this.props.navigation.navigate('Main');
            }
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    onSignInPress = ({email, password} = {}) => {
        const {authWithEmailAndPassword} = this.props;
        authWithEmailAndPassword(email, password);
    };


    onSignUpPress = () => this.props.navigation.navigate('Registration');

    render() {
        const {isLoader, authWithFacebook, authWithGoogle} = this.props;
        const props = {
            isLoader,
            onSignInPress: this.onSignInPress,
            onFacebookSignInPress: authWithFacebook,
            onGoogleSignInPress: authWithGoogle,
            onSignUpPress: this.onSignUpPress
        };

        return (<LoginScreen {...props} />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);