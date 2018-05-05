import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {ListItem} from 'react-native-material-ui';

import styles from './styles';

const Message = ({id, author, title, description, avatar, imageUrl}) => (
    <ListItem
        key={id}
        divider
        centerElement={{
            secondaryText: author,
            primaryText: title,
            tertiaryText: description
        }}
        style={{
            centerElementContainer: {
                flex: 6
            },
            leftElementContainer: {
                flex: 2
            },
            rightElementContainer: {
                flex: 2
            }
        }}
        leftElement={<Image
            style={styles.messageImageElement}
            source={{uri: avatar}}
        />}
        rightElement={imageUrl ? <Image
            style={styles.messageImageElement}
            source={{uri: imageUrl}}
        /> : null}
    />);

Message.propTypes = {
    avatar: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    id: PropTypes.string
};

export default Message;