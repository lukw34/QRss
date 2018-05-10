import React from 'react';
import {Modal, View, ActivityIndicator, Text} from 'react-native';

import styles from './styles';
import variables from '../../variables';

class Loader extends React.PureComponent {
    static getDerivedStateFromProps({isLoader}) {
        return {isLoader};
    }

    state = {
        isLoader: false
    };

    onRequestClose = () => this.setState({isLoader: false});

    render() {
        const {isLoader} = this.state;
        return (
            <Modal
                animationtype='slide'
                transparent
                visible={isLoader}
                onRequestCLose={this.onRequestClose}
            >
                <View style={styles.loaderContainer}>
                    <View style={styles.loaderInnerContainer}>
                        <ActivityIndicator
                            style={{flex: 2}}
                            size='large'
                            color={variables.accentColor}
                        />
                        <Text
                            style={styles.loaderText}
                        >Please wait...
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default Loader;
