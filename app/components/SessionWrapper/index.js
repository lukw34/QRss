import React from 'react';
import {ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import HeaderRight from '../Header/HeaderRight';
import HeaderTitle from '../Header/HeaderTitle';
import variables from '../../variables';

const HOCWrapper = (Screen, Header) => {
    class ScreenWrapper extends React.Component {
        static navigationOptions = ({navigation}) => ({
            headerStyle: {
                backgroundColor: variables.darkPrimary,
                borderBottomWidth: 4,
                borderColor: variables.divider
            },
            headerTitle: (<HeaderTitle/>),
            headerRight: (<HeaderRight/>),
            headerLeft: null
        });

        static propTypes = {
            navigation: PropTypes.shape({})
        };

        static defaultProps = {
            navigation: {}
        };

        componentDidMount() {
            this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    ToastAndroid.showWithGravityAndOffset(
                        'Thank you for your time!',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        0,
                        150
                    );
                    this.props.navigation.navigate('Login');
                }

            });
        }

        componentWillUnmount() {
            this.authSubscription();
        }


        render() {
            return (<Screen />);
        }
    }

    return ScreenWrapper;
};


export default HOCWrapper;