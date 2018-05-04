import React from 'react';
import {View, FlatList} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import PropTypes from 'prop-types';

import {AVAILABLE_SUBSCRIPTIONS} from '../../../constants';
import BoardItem from '../../../components/BoardItem';
import styles from './styles';

const SubscriptionsComponent = ({subscriptions, goToScanner, onItemPress, onDeletePress}) => (
    <View style={styles.subscriptionContainer}>
        <FlatList
            data={subscriptions}
            renderItem={({item = {}}) => (
                <BoardItem
                    {...item}
                    onItemPress={onItemPress}
                    onDeletePress={onDeletePress}
                />)}
        />
        {AVAILABLE_SUBSCRIPTIONS > subscriptions && (
            <ActionButton
                icon='camera'
                onPress={goToScanner}
            />)
        }
    </View>
);

SubscriptionsComponent.propTypes = {
    onItemPress: PropTypes.func,
    goToScanner: PropTypes.func,
    subscriptions: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SubscriptionsComponent;