import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native';
import {Subheader, ActionButton, Button} from 'react-native-material-ui';

import Message from '../../components/Message';
import styles from './styles';

const Board = ({
                   description,
                   messages,
                   onActionButtonPress,
                   isSubscribed,
                   isSubscriptionActive,
                   isLoader,
                   subscribeBoard
               }) => (
    <View style={styles.boardContainer}>
        <View style={styles.boardHeaderContainer}>
            <Button
                disabled={!isSubscriptionActive && !isSubscribed}
                text=''
                icon={isSubscribed ? 'check-circle' : 'rss-feed'}
                style={{
                    text: styles.boardHeaderButtonText,
                    container: styles.boardHeaderButtonContainer
                }}
                onPress={subscribeBoard}
            />
            <Subheader
                lines={2}
                text={description}
                style={{
                    container: styles.boardSubheaderContainer,
                    text: styles.boardSubheaderText
                }}
            />
        </View>
        <View style={{
            flex: 9
        }}
        >
            <FlatList
                data={messages}
                renderItem={({item = {}}) => <Message {...item} />}
            />
        </View>
        <ActionButton
            icon='add'
            onPress={onActionButtonPress}
            hidden={isLoader}
        />
    </View>
);

Board.propTypes = {
    description: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({})),
    onActionButtonPress: PropTypes.func,
    isSubscribed: PropTypes.bool,
    isSubscriptionActive: PropTypes.bool,
    subscribeBoard: PropTypes.func,
    isLoader: PropTypes.bool
};

export default Board;