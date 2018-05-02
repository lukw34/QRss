import React from 'react';
import {View} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import {Permissions} from 'expo';
import PropTypes from 'prop-types';
import DonutGraph from '../../../components/DonutGraph';

class Dashboard extends React.Component {

    static propTypes = {
        rootNavigateTo: PropTypes.func
    };

    state = {
        hasCameraPermission: null,
    };

    componentDidMount() {
        this.requestCameraPermission();
    }

    requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    readBarCode = () => {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission) {
            this.props.rootNavigateTo('BoardLoader', {boardId: 'AKy56gNYzLp27AE'});
        }
    };


    render() {
        return (
            <View style={{
                flex: 1
            }}
            >
                <DonutGraph />
                <ActionButton
                    icon='camera'
                    onPress={this.readBarCode}
                />
            </View>
        );
    }
}

export default Dashboard;