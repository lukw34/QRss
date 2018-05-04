import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {ListItem, ActionButton, Button, Badge} from 'react-native-material-ui';
import PropTypes from 'prop-types';

import {AVAILABLE_SUBSCRIPTIONS} from '../../../constants';
import variables from '../../../variables';

const SubscriptionsComponent = ({subscriptions, goToScanner, onItemPress, onDeletePress}) => (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: variables.primary
    }}
    >
        <FlatList
            data={subscriptions}
            renderItem={({item: {image: uri, id, description, name, readCounter = 0, messageCounter = 0} = {}}) => (
                <ListItem
                    key={id}
                    divider
                    centerElement={{
                        tertiaryText: description,
                        primaryText: name,
                    }}
                    onPress={() => onItemPress(id)}
                    style={{
                        container: {
                            margin: 15,
                            height: 150
                        },
                        tertiaryText: {
                            fontSize: 15
                        },
                        primaryText: {
                            fontSize: 20
                        },
                        leftElementContainer: {
                            flex: 4,
                            justifyContent: 'center'
                        },
                        centerElementContainer: {
                            flex: 6
                        },
                        rightElementContainer: {
                            flex: 3
                        }
                    }}
                    rightElement={<Button
                        text=''
                        icon='delete'
                        onPress={() => onDeletePress(id)}
                        style={{
                            container: {
                                flex: 1,
                            }
                        }}
                    />}
                    leftElement={
                        <View style={{
                            padding: 8,
                            margin: 8
                        }}>
                            <Badge text="3">
                                <Image
                                    style={{
                                        width: 65,
                                        height: 65
                                    }}
                                    source={{uri}}
                                />
                            </Badge>
                        </View>}
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