import React from 'react';
import {TouchableOpacity, Modal, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-material-ui';

import styles from './styles';


class ImagePreview extends React.Component {
    static propTypes = {
        uri: PropTypes.string
    };

    state = {
        modalVisible: false
    };

    openModal = () => this.setState({modalVisible: true});

    closeModal = () => this.setState({modalVisible: false});

    render() {
        const {uri} = this.props;
        const {modalVisible} = this.state;
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={this.closeModal}
                >
                    <View style={{justifyContent: 'center', alignItems:'center', flex: 1}}>
                        <Image
                            style={styles.imagePreviewImage}
                            source={{uri}}
                        />
                        <Button
                            text='Close'
                            onPress={this.closeModal}
                            style={{
                                text: {color: 'red'},
                                container: [styles.previewButtonContainer, styles.previewCloseButton],
                            }}
                        />
                    </View>
                </Modal>
                {uri && (
                    <TouchableOpacity
                        style={styles.imagePreviewContainer}
                        onPress={this.openModal}
                    >
                        <Image
                            style={styles.imagePreviewContainer}
                            source={{uri}}
                        />
                    </TouchableOpacity>)
                }
            </View>
        );
    }

}

export default ImagePreview;
