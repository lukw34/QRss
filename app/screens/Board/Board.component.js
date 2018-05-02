import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Image, Modal} from 'react-native';
import {Subheader, ListItem, ActionButton, Button} from 'react-native-material-ui';

import AddMessage from '../../components/AddMessage';
import variables from '../../variables';

const Board = ({
    description,
    messages,
    modalVisible,
    closeModal, onSubmit,
    onActionButtonPress,
    isSubscribed,
    isSubscriptionActive,
    isLoader,
    subscribeBoard
}) => (
    <View style={{
        flex: 1,
        backgroundColor: variables.primary
    }}
    >
        <View style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
        }}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <Button
                    disabled={!isSubscriptionActive && !isSubscribed}
                    text=''
                    icon={isSubscribed ? 'check-circle' : 'rss-feed'}
                    style={{
                        text: {
                            color: 'white',
                            fontSize: 20
                        }
                    }}
                    onPress={subscribeBoard}
                />
            </View>
            <Subheader
                lines={2}
                text={description}
                style={{
                    container: {
                        flex: 5,
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
            flex: 9
        }}
        >
            <FlatList
                data={messages}
                renderItem={({item: {author, avatar: uri, description, title, id} = {}}) => (
                    <ListItem
                        key={id}
                        divider
                        centerElement={{
                            secondaryText: author,
                            primaryText: title,
                            tertiaryText: description
                        }}
                        leftElement={<Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                            }}
                            source={{uri}}
                        />}
                    />)}
            />
        </View>
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <AddMessage
                onSubmit={onSubmit}
                closeModal={closeModal}
            />
        </Modal>
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
    closeModal: PropTypes.func,
    onActionButtonPress: PropTypes.func,
    modalVisible: PropTypes.bool,
    onSubmit: PropTypes.func,
    isSubscribed: PropTypes.bool,
    isSubscriptionActive: PropTypes.bool,
    subscribeBoard: PropTypes.func,
    isLoader: PropTypes.bool
};

export default Board;