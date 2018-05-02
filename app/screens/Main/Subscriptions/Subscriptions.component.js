import React from 'react';
import {View, FlatList, Image} from 'react-native';
import {ListItem, ActionButton} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import variables from '../../../variables';

const SubscriptionsComponent = ({subscriptions, goToScanner, onItemPress}) => (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: variables.primary
    }}
    >
        <FlatList
            data={subscriptions}
            renderItem={({item: {image: uri, id, description, name} = {}}) => (
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
                            fontSize: 18
                        },
                        primaryText: {
                            fontSize: 23
                        },
                        leftElementContainer: {
                            width: 100,
                            padding: 10
                        }
                    }}
                    leftElement={<Image
                        style={{
                            width: 85,
                            height: 85,
                        }}
                        source={{uri}}
                    />}
                />)}
        />
        {subscriptions <= 0 && (
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