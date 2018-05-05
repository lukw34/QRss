import React from 'react';
import {View, ActivityIndicator, Image, ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-material-ui';

import {uploadImage, downloadImage} from '../../utils/utils';
import variables from '../../variables';
import styles from './styles';

class QRGenerator extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        createRequest: PropTypes.func,
        description: PropTypes.string,
        name: PropTypes.string,
        geolocation: PropTypes.shape({}),
        isLoader: PropTypes.bool,
        startLoader: PropTypes.func,
        stopLoader: PropTypes.func,
        closeModal: PropTypes.func,
        rootNavigateTo: PropTypes.func
    };

    state = {
        urlQR: ''
    };

    async componentDidMount() {
        const {createRequest, id, description, name, geolocation, startLoader, stopLoader} = this.props;
        try {
            startLoader();
            const urlQR = await this.getQRCode();
            await createRequest({
                id,
                description,
                geolocation,
                name,
                urlQR
            });
            stopLoader();
        } catch (e) {
            //handle catch
        }
    }

    onButtonPress = async () => {
        const {startLoader, stopLoader} = this.props;
        const {urlQR} = this.state;
        startLoader();
        try {
            await downloadImage(urlQR);
            ToastAndroid.showWithGravityAndOffset(
                'QR code is saved on your phone',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150
            );
        } catch (e) {
            // handle error
        }
        stopLoader();
    };

    getQRCode = async () => {
        const {id} = this.props;
        const QR = `http://api.qrserver.com/v1/create-qr-code/?data=${id}&size=250x250`;
        const urlQR = await uploadImage(QR);
        this.setState({
            urlQR
        });
        return urlQR;
    };

    goToBoard = () => {
        const {id: boardId, rootNavigateTo, closeModal} = this.props;
        rootNavigateTo('BoardLoader', {boardId});
        closeModal();
    };

    render() {
        const {urlQR: uri} = this.state;
        const {isLoader, closeModal} = this.props;
        const shouldBeLoader = !uri || isLoader;
        return (
            <View style={styles.QRContainer}>
                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    {shouldBeLoader && <ActivityIndicator
                        size='large'
                        color={variables.accentColor}
                    />}
                </View>
                <View style={{
                    flex: 5
                }}
                >
                    <Image
                        style={styles.QRImageContainer}
                        source={{uri}}
                    />
                </View>
                <View style={{
                    flex: 3,
                    flexDirection: 'column',
                }}
                >
                    <Button
                        primary
                        text='Save QR Code'
                        icon='get-app'
                        onPress={this.onButtonPress}
                        disabled={shouldBeLoader}
                        style={{
                            container: [styles.QRButtonContainer, styles.QRSaveButton]
                        }}
                    />
                    <Button
                        primary
                        text='Go to board'
                        icon=''
                        onPress={this.goToBoard}
                        disabled={shouldBeLoader}
                        style={{
                            text: {color: variables.accentColor},
                            container: [styles.QRButtonContainer, styles.QRGoButton]
                        }}
                    />
                    <Button
                        warnin
                        text='Close'
                        onPress={closeModal}
                        disabled={shouldBeLoader}
                        style={{
                            text: {color: 'red'},
                            container: [styles.QRButtonContainer, styles.QRCloseButton],
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default QRGenerator;