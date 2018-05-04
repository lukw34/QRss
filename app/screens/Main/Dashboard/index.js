import React from 'react';
import {View} from 'react-native';
import {Subheader} from 'react-native-material-ui';
import {Permissions} from 'expo';
import PropTypes from 'prop-types';
import DonutGraph from '../../../components/DonutGraph';
import variables from '../../../variables';
import SubmitButton from '../../../components/SubmitButton';
import Logo from '../../../components/Logo';

class Dashboard extends React.Component {

    static propTypes = {
        screenProps: PropTypes.shape({
            rootNavigateTo: PropTypes.func
        })
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
            this.props.screenProps.rootNavigateTo('BoardLoader', {boardId: 'AKy56gNYzLp27AE'});
        }
    };


    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: variables.primary
            }}
            >
                <View style={{
                    flex: 3,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                >
                    <Logo/>
                </View>
                <View style={{
                    flex: 4,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <DonutGraph data={[{
                        name: 'Your available subscription',
                        value: 5
                    }, {
                        name: 'Number of subscribed boards',
                        value: 5
                    }]}
                    />
                    <Subheader
                        text='Your available subscriptions'
                        style={{
                            container: {
                                justifyContent: 'center'
                            },
                            text: {
                                color: variables.accentColor,
                                textAlign: 'center',
                                fontSize: 18
                            }
                        }}
                    />
                </View>
                <View style={{
                    flex: 2,
                    justifyContent: 'center'
                }}
                >
                    <SubmitButton
                        color={variables.accentColor}
                        text='Go to scanner'
                        icon='camera'
                        onPress={this.readBarCode}
                    />
                </View>
            </View>
        );
    }
}

export default Dashboard;