import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {Subheader, Button, ListItem, ActionButton} from 'react-native-material-ui';

import {messagesCount, messagesSelector} from '../../selectors/board.selector';
import variables from '../../variables';

const mapStateToProps = state => ({
    messages: messagesSelector(state),
    count: messagesCount(state)
});

class Board extends React.Component {

    static navigationOptions = ({navigation: {state: {params: {name}}, navigate}}) => ({
        headerStyle: {
            backgroundColor: variables.darkPrimary,
            borderBottomWidth: 4,
            borderColor: variables.divider
        },
        headerTitleStyle: {
            color: 'white',
        },
        headerTitle: name,
        headerRight: (<Button
            text=''
            icon='camera'
            style={{
                text: {
                    color: variables.accentColor
                }
            }}
            onPress={() => navigate('Scanner')}
        />),
        headerLeft: (<Button
            text=''
            icon='arrow-back'
            style={{
                text: {
                    color: 'white'
                }
            }}
            onPress={() => navigate('Main')}
        />)
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.shape({
                    boardId: PropTypes.string,
                    name: PropTypes.string,
                    description: PropTypes.string
                })
            })
        }),
        messages: PropTypes.arrayOf(PropTypes.shape({}))
    };

    onActionButtonPress = () => {

    };

    render() {
        const {navigation: {state: {params: {description}}}, messages} = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: variables.primary
            }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
                >
                    <Subheader
                        lines={2}
                        text={description}
                        style={{
                            text: {
                                color: variables.accentColor,
                                textAlign: 'center',
                                fontSize: 20
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
                        renderItem={({item: {author, avatar: uri, description, title} = {}}) => (
                            <ListItem
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
                <ActionButton
                    icon='add'
                    onPress={this.onActionButtonPress}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(Board);