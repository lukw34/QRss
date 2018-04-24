import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import CreateQRssForm from './CreateQRssForm';
import {isLoaderSelector} from '../../../selectors/loader.selectors';


const mapStateToProps = state => ({
    isLoader: isLoaderSelector(state)
});

class NewQRss extends React.Component {

    static propTypes = {
        isLoader: PropTypes.bool
    };

    onSubmit = () => {
    };

    render() {
        const {isLoader} = this.props;
        return (
            <View style={styles.QRssScreenContainer}>
                <View style={{flex: 9}}>
                    <CreateQRssForm
                        onSubmit={this.onSubmit}
                        isLoader={isLoader}
                    />
                </View>
                <View
                    style={{flex: 1}}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(NewQRss);