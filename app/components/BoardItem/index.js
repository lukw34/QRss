import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {ListItem, Badge, Button} from 'react-native-material-ui';

import styles from './styles';

const BoardItem = ({id, name, onItemPress, onDeletePress, image: uri, description, readCounter = 0, messageCounter = 0}) => (
    <ListItem
        key={id}
        divider
        centerElement={{
            tertiaryText: description,
            primaryText: name,
        }}
        onPress={() => onItemPress(id)}
        style={{
            container: styles.boardItemContainer,
            tertiaryText: styles.boardItemTertiaryText,
            primaryText: styles.boardItemPrimaryText,
            leftElementContainer: styles.boardItemLeftElementContainer,
            centerElementContainer: styles.boardItemCenterElementContainer,
            rightElementContainer: styles.boardItemRightElementContainer
        }}
        rightElement={<Button
            text=''
            icon='delete'
            onPress={() => onDeletePress(id)}
        />}
        leftElement={
            <View style={styles.boardItemLeftElementContainerView}>
                <Badge text={(messageCounter - readCounter).toString()}>
                    <Image
                        style={styles.boardItemLeftElementImage}
                        source={{uri}}
                    />
                </Badge>
            </View>
        }
    />);

BoardItem.propTypes = {
    name: PropTypes.string,
    onItemPress: PropTypes.func,
    onDeletePress: PropTypes.func,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    readCounter: PropTypes.number,
    messageCounter: PropTypes.number
};

export default BoardItem;