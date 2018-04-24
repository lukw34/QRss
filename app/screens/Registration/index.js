import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import RegistrationForm from './RegistrationForm';
import {createUserWithEmailAndPassword} from "../../actions/authorization.actions";
import {isLoaderSelector} from '../../selectors/loader.selectors';


const mapDispatchToProps = dispatch => ({
    createUser: userData => dispatch(createUserWithEmailAndPassword(userData))
});

const mapStateToProps = state => ({
    isLoader: isLoaderSelector(state)
});

class Registration extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    static propTypes = {
        isLoader: PropTypes.bool,
        createUser: PropTypes.func
    };

    onSubmit = ({email, password, photoURL}) => {
        this.props.createUser({email, password, photoURL});
    };

    render() {
        const {isLoader} = this.props;
        return (
            <View style={styles.registrationScreenContainer}>
                <View style={{flex: 1}} />
                <View style={{flex: 6}}>
                    <RegistrationForm
                        onSubmit={this.onSubmit}
                        isLoader={isLoader}
                    />
                </View>
                <View
                    style={{flex: 3}}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);