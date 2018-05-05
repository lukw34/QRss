import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal} from 'react-native';
import {connect} from 'react-redux';

import {createBoard} from '../../../actions/boards.actions';
import {pushLoader, popLoader} from '../../../actions/loader.actions';
import {generateId} from '../../../utils/utils';
import styles from './styles';
import CreateQRssForm from './CreateQRssForm';
import {isLoaderSelector} from '../../../selectors/loader.selectors';
import QRGenerator from '../../../components/QRGenerator/index.android';

const mapStateToProps = state => ({
    isLoader: isLoaderSelector(state)
});
const mapDispatchToProps = dispatch => ({
    createNewQRss: data => dispatch(createBoard(data)),
    startLoader: () => dispatch(pushLoader()),
    stopLoader: () => dispatch(popLoader())
});

class NewQRss extends React.Component {

    static propTypes = {
        isLoader: PropTypes.bool,
        createNewQRss: PropTypes.func,
        startLoader: PropTypes.func,
        stopLoader: PropTypes.func,
        screenProps: PropTypes.shape({
            rootNavigateTo: PropTypes.func
        }),
    };

    state = {
        modalVisible: false,
        modalData: {}
    };

    onRequestClose = () => {
        this.setState({
            modalVisible: false
        });
    };

    onSubmit = (data) => {
        this.setState({
            modalVisible: true,
            modalData: {
                ...data,
                id: generateId()
            }
        });
    };

    render() {
        const {isLoader, createNewQRss, startLoader, stopLoader, screenProps: {rootNavigateTo}} = this.props;
        const {modalData, modalVisible} = this.state;
        const generatorProps = {
            createRequest: createNewQRss,
            closeModal: this.onRequestClose,
            isLoader,
            stopLoader,
            startLoader,
            rootNavigateTo,
            ...modalData
        };
        return (
            <View style={styles.QRssScreenContainer}>
                <View style={{flex: 1}}>
                    <CreateQRssForm
                        onSubmit={this.onSubmit}
                        isLoader={isLoader}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={this.onRequestClose}
                >
                    <QRGenerator {...generatorProps} />
                </Modal>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQRss);