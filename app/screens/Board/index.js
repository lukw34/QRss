import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from 'react-native-material-ui';

import BoardComponent from './Board.component';
import {messagesCount, messagesSelector} from '../../selectors/messages.selectors';
import {isAvailableSubscription, isBoardSubscribed} from '../../selectors/me.selectors';
import {isLoaderSelector} from '../../selectors/loader.selectors';
import variables from '../../variables';
import {updateBoardMessages, subscribeBoard} from '../../actions/boards.actions';

const mapStateToProps = (state, props) => ({
    messages: messagesSelector(state),
    count: messagesCount(state),
    isSubscribed: isBoardSubscribed(state, props),
    isSubscriptionActive: isAvailableSubscription(state),
    isLoader: isLoaderSelector(state)
});

const mapDispatchToProps = dispatch => ({
    sendMessage: (boardId, message) => dispatch(updateBoardMessages(boardId, message)),
    subscribeThisBoard: (board, count) => dispatch(subscribeBoard(board, count))
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
                    id: PropTypes.string,
                    name: PropTypes.string,
                    description: PropTypes.string,
                    image: PropTypes.string
                })
            })
        }),
        count: PropTypes.number,
        isSubscribed: PropTypes.bool,
        isSubscriptionActive: PropTypes.bool,
        subscribeThisBoard: PropTypes.func,
        messages: PropTypes.arrayOf(PropTypes.shape({})),
        sendMessage: PropTypes.func,
        isLoader: PropTypes.bool
    };

    state = {
        modalVisible: false
    };

    onSubmit = (data) => {
        const {navigation: {state: {params: {id}}}, sendMessage} = this.props;
        sendMessage(id, data).then(() => {
            this.closeModal();
        });
    };

    onActionButtonPress = () => this.setState({
        modalVisible: true
    });

    closeModal = () => this.setState({
        modalVisible: false
    });

    subscribeBoard = () => {
        const {
            isSubscriptionActive,
            subscribeThisBoard,
            count,
            isSubscribed,
            navigation: {state: {params: {id: boardId, name, description, image, urlQR}}}
        } = this.props;

        if(isSubscriptionActive && !isSubscribed) {
            subscribeThisBoard({
                boardId,
                name,
                description,
                image: image || urlQR
            }, count);
        }
    };

    render() {
        const {navigation: {state: {params: {description,}}}, messages, isSubscriptionActive, isLoader, isSubscribed} = this.props;
        const {modalVisible} = this.state;
        const props = {
            modalVisible,
            isSubscribed,
            isLoader,
            description,
            isSubscriptionActive,
            messages,
            subscribeBoard: this.subscribeBoard,
            closeModal: this.closeModal,
            onActionButtonPress: this.onActionButtonPress,
            onSubmit: this.onSubmit
        };

        return (<BoardComponent {...props} />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);