import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import LoaderBalls from './LoaderBalls';
import styles from './styles';
import {getBoard} from '../../actions/boards.actions';

const mapDispatchToProps = dispatch => ({
    getBoardInfo: id => dispatch(getBoard(id))
});

class BoardLoader extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    static propTypes = {
        ballsNumber: PropTypes.number,
        getBoardInfo: PropTypes.func,
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.shape({
                    boardId: PropTypes.string
                })
            })
        })
    };

    static defaultProps = {
        ballsNumber: 5
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ballsNumber !== prevState.balls.length) {
            return {
                balls: new Array(nextProps.ballsNumber || 0).fill(125)
            };
        }

        return prevState;
    }


    state = {
        balls: []
    };

    async componentDidMount() {
        const {getBoardInfo, navigation: {state: {params: {boardId}}, navigate}} = this.props;
        const data = await getBoardInfo(boardId);
        setTimeout(() => {
            const {urlQR, name} = data;
            if(!urlQR || !name) {
                navigate('Main');
            } else {
                navigate('Board', data);
            }
        }, 500);
    }

    loader = [];
    variation = 5;

    stopAnimation = () => {
        this.loader.forEach(ref => {
            ref.stopAnimation();
        });
    };

    render() {
        const {balls} = this.state;
        const {ballsNumber} = this.props;
        return (
            <View style={styles.container}>
                {balls.map((delay, i) => (
                    <LoaderBalls
                        ref={loaderRef => {
                            this.loader.push(loaderRef);
                        }}
                        key={`key-${i}`}
                        index={i}
                        delay={delay * i}
                        duration={delay * ballsNumber}
                        value={delay}
                        variation={this.variation}
                    />
                ))}
            </View>
        );
    }
}


export default connect(null, mapDispatchToProps)(BoardLoader);