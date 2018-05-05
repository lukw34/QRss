import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';


class Scanner extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            goBack: PropTypes.func
        })
    };

    state = {
        isRead: false
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if(status !== 'granted') {
            this.props.navigation.goBack();
        }
    }

    onBarCodeRead = ({data: boardId}) => {
        const {isRead} = this.state;
        if (!isRead) {
            this.setState({
                isRead: true
            });
            this.props.navigation.navigate('BoardLoader', {boardId});

        }
    };

    render() {
        return (
            <BarCodeScanner
                onBarCodeRead={this.onBarCodeRead}
                style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                }}
            />
        );
    }
}

export default Scanner;