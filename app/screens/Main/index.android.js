import React from 'react';
import PropTypes from 'prop-types';
import {TabNavigator} from 'react-navigation';
import {ToastAndroid} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {Constants, Permissions, Notifications} from 'expo';

import {addMessage} from '../../actions/boards.actions';
import variables from '../../variables';
import Dashboard from './Dashboard';
import Map from './Map/index.android';
import NewQRss from './NewQRss';
import Subscriptions from './Subscriptions';
import HeaderRight from '../../components/Header/HeaderRight';
import HeaderTitle from '../../components/Header/HeaderTitle';

const mapDispatchToProps = dispatch => ({
    addNewMessage: message => dispatch(addMessage(message))
});

class Main extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: variables.darkPrimary,
            borderBottomWidth: 4,
            borderColor: variables.divider
        },
        headerTitle: (<HeaderTitle />),
        headerRight: (<HeaderRight />),
        headerLeft: null
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }),
        addNewMessage: PropTypes.func
    };

    state = {
        accessToNotifications: false
    };

    async componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.handleLogOut();
            }
        });

        await this.checkNotificationsPermissions();
        const {uid} = firebase.auth().currentUser || {};

        this.addSubscriptionListener = firebase.database().ref(`users/${uid}/boards`);
        this.addSubscriptionListener.on('child_added', snapshot => {
            if (snapshot) {
                this.handleAddSubscription(snapshot);
            }
        });

        this.removeSubscriptionListenre = firebase.database()
            .ref(`users/${uid}/boards`);
        this.removeSubscriptionListenre.on('child_removed', snapshot => {
            if (snapshot) {
                this.handleRemoveSubscription(snapshot);
            }
        });
    }

    componentWillUnmount() {
        this.authSubscription();
        this.addSubscriptionListener.off('child_added');
        this.removeSubscriptionListenre.off('child_removed');
        Object.keys(this.boardSubscription).map(key => this.boardSubscription[key].off('child_changed'));
    }

    boardSubscription = {};

    handleMessageAdded(snapshot) {
        const data = snapshot.val();
        if (typeof data === 'object') {
            const [lastMessage] = Object.keys(data)
                .map(key => data[key])
                .filter(({createdAt}) => !!createdAt)
                .sort((a = '', b = '') => new Date(b.createdAt) - new Date(a.createdAt));

            const {email} = firebase.auth().currentUser || {};
            if (lastMessage.author !== email) {
                this.props.addNewMessage(lastMessage);
                this.sendImmediateNotification();
            }
        }
    }

    handleAddSubscription(snapshot) {
        const {id} = snapshot.val();
        const subscription = firebase.database()
            .ref(`boards/${id}`);

        if(!this.boardSubscription[id]) {
            subscription.on('child_changed', (snapshot) => {
                if (snapshot) {
                    this.handleMessageAdded(snapshot);
                }
            });
            this.boardSubscription = {
                ...this.boardSubscription,
                [id]: subscription
            };
        }
    }

    handleRemoveSubscription(snapshot) {
        const {id} = snapshot.val();
        const subscription = this.boardSubscription[id];
        subscription.off('child_changed');
        delete this.boardSubscription[id];
    }

    handleLogOut() {
        ToastAndroid.showWithGravityAndOffset(
            'Thank you for your time!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            150
        );
        this.props.navigation.navigate('Login');
        this.authSubscription();
        this.addSubscriptionListener.off('child_added');
        this.removeSubscriptionListenre.off('child_removed');
        Object.keys(this.boardSubscription).map(key => this.boardSubscription[key].off('child_changed'));
    }

    async checkNotificationsPermissions() {
        const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            this.setState({
                accessToNotifications: true
            });
        }
    }

    sendImmediateNotification() {
        const localNotification = {
            title: 'New message available in your subscriptions',
            data: {type: 'immediate'},
            android: {
                sound: true,
                icon: 'https://firebasestorage.googleapis.com/v0/b/qrss-c2191.appspot.com/o/logo_xsmall.jpeg?alt=media&token=082c8f0a-1d67-4a4f-b8ed-c138f0c560e0'
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
                        fontSize: 10,
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

export default connect(null, mapDispatchToProps)(Main);
