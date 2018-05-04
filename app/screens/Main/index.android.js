import {TabNavigator} from 'react-navigation';
import React from 'react';
import {ToastAndroid} from 'react-native';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {Constants, Permissions, Notifications} from 'expo';

import variables from '../../variables';
import Dashboard from './Dashboard';
import Map from './Map/index.android';
import NewQRss from './NewQRss';
import Subscriptions from './Subscriptions';
import HeaderRight from '../../components/Header/HeaderRight';
import HeaderTitle from '../../components/Header/HeaderTitle';


class Main extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: variables.darkPrimary,
            borderBottomWidth: 4,
            borderColor: variables.divider
        },
        headerTitle: (<HeaderTitle/>),
        headerRight: (<HeaderRight/>),
        headerLeft: null
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    };

    state = {
        accessToNotifications: false
    };

    async componentDidMount() {
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
                this.authSubscription();
                this.subscribeBoard();
            }
        });

        const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            this.setState({
                accessToNotifications: true
            });
        }

        this.subscribeBoard = firebase.database()
            .ref('boards/AKy56gNYzLp27AE')
            .on('child_changed', (snapshot) => {
                const data = snapshot.val();
                if (typeof snapshot === 'object') {
                    const [lastMessage] = Object.keys(data)
                        .map(key => data[key])
                        .filter(({createdAt}) => !!createdAt)
                        .sort((a = '', b = '') => new Date(b.createdAt) - new Date(a.createdAt));

                    const user = firebase.auth().currentUser;
                    const {email} = user || {};
                    if (lastMessage.author !== email) {
                        this._sendImmediateNotification();
                    }
                }
            });
    }

    _sendImmediateNotification() {
        const localNotification = {
            title: 'New message available in your subscriptions',
            data: {type: 'immediate'},
            android: {
                sound: true
            }
        };

        const {accessToNotifications} = this.state;
        if (accessToNotifications) {
            Notifications.presentLocalNotificationAsync(localNotification);
        }
    }

    rootNavigateTo = (screenName, params = {}) => this.props.navigation.navigate(screenName, params);

    render() {
        const TabNavigatorComp = TabNavigator(
            {
                Dashboard: {screen: Dashboard},
                NewQRss: {screen: NewQRss},
                RSSMap: {screen: Map},
                Boards: {screen: Subscriptions}
            }, {
                tabBarPosition: 'bottom',
                tabBarOptions: {
                    style: {
                        backgroundColor: variables.darkPrimary,
                    },
                    labelStyle: {
                        fontSize: 11,
                    },
                    tintColor: variables.accentColor,
                    indicatorStyle: {
                        backgroundColor: variables.accentColor
                    }
                }
            });

        return (
            <TabNavigatorComp
                screenProps={{
                    rootNavigateTo: this.rootNavigateTo
                }}
            />);
    }
}

export default Main;
