import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import SubmitButton from '../../components/SubmitButton';
import Form from './AddMessageForm';

class AddMessage extends React.Component {
    static navigationOptions = {
        headerStyle: styles.addMessageNavigatorHeaderStyle,
        headerTitleStyle: {
            color: 'white',
        },
        headerTitle: 'Type new message',
        headerRight: null,
        headerLeft: null
    };

    static propTypes = {
        isLoader: PropTypes.bool,
        navigation: PropTypes.shape({
            goBack: PropTypes.func
        })
    };


    onDismissPress = () => this.props.navigation.goBack();

    onSubmit = async (data) => {
        const {navigation: {state: {params: {onSubmit}}, goBack}} = this.props;
        await onSubmit(data);
        goBack();
    };

    render() {
        const {isLoader} = this.props;
        return (
            <View style={styles.addMessageContainer}>
                <View style={styles.addMessageFormContainer}>
                    <Form
                        config={this.config}
                        onSubmit={this.onSubmit}
                        submitText='Add Message'
                        isLoader={isLoader}
                    />
                </View>
                <View style={{flex: 2}}>
                    <SubmitButton
                        color='#D94141'
                        raised
                        disabled={isLoader}
                        text='Dismiss'
                        onPress={this.onDismissPress}
                    />
                </View>
            </View>

        );
    }
}

export default AddMessage;