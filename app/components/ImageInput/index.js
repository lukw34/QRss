import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import { launchImageLibraryAsync } from 'expo-image-picker';

import {isLoaderSelector} from '../../selectors/loader.selectors';
import {popLoader, pushLoader} from '../../actions/loader.actions';
import {uploadImage} from '../../utils/utils';
import styles from './styles';

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(pushLoader()),
    stopLoading: () => dispatch(popLoader())
});

const mapStateToProps = (state) => ({
    isLoader: isLoaderSelector(state)
});

class ImageInput extends React.Component {
    static propTypes = {
        isLoader: PropTypes.bool
    };

    getPhotos = async () => {
        const {startLoading, stopLoading, input: {onChange}} = this.props;
        startLoading();
        try {
            const {uri} = await launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            const imageUrl = await uploadImage(uri);
            onChange(imageUrl);
            stopLoading();
        } catch (e) {
            stopLoading();
        }
    };


    render() {
        const {input: {value: uri}, meta: {touched, error}, isLoader} = this.props;
        return (
            <View style={{
                flex: 2,
                flexDirection: 'column'
            }}
            >
                <View style={styles.imageInputContainer}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Image
                            style={styles.imageInputImage}
                            source={{uri}}
                        />
                        <ActionButton
                            hidden={isLoader}
                            onPress={this.getPhotos}
                            icon="art-track"
                        />
                    </View>
                </View>
                {touched && error && <Text style={styles.inputError}>{error}</Text>}
            </View>
        );
    }
}


ImageInput.propTypes = {
    startLoading: PropTypes.func,
    stopLoading: PropTypes.func,
    input: PropTypes.shape({
        onChange: PropTypes.func,
        value: PropTypes.string
    }),
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageInput);