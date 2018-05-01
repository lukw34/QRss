import React from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class LoaderBalls extends React.Component {
    static propTypes = {
        duration: PropTypes.number,
        index: PropTypes.number,
        delay: PropTypes.number,
        value: PropTypes.number,
        variation: PropTypes.number
    };

    static defaultProps = {
        duration: 500,
        delay: 500,
        value: 500,
        index: 0,
        variation: 10
    };

    constructor(props) {
        super(props);

        this.stopAnimation = this.stopAnimation.bind(this);
        this.runAnimation = this.runAnimation.bind(this);
    }

    state = {
        translateY: new Animated.Value(0),
        stopAnimation: false
    };

    componentDidMount() {
        this.runAnimation();
    }

    runAnimation() {
        const {delay, duration, value, index, variation} = this.props,
            toValue = (index % 2 === 0 ? -1 : 1) * variation;
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(this.state.translateY, {
                duration: value,
                toValue,
            }),
            Animated.delay(duration - delay - value),
            Animated.spring(this.state.translateY, {
                toValue: 0,
                speed: 3
            })
        ]).start(() => {
            if (!this.state.stopAnimation) {
                setTimeout(() => {
                    this.runAnimation();
                }, 150);
            }
        });
    }

    stopAnimation() {
        this.setState({
            stopAnimation: true
        });
    }

    render() {
        const {translateY} = this.state,
            style = [
                styles.circle, {
                    transform: [{
                        translateY
                    }]
                }
            ];
        return (
            <Animated.View
                style={style}
            />
        );
    }
}

export default LoaderBalls;