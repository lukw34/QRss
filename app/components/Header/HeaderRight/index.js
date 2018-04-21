import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';

import {signOutCurrentUser} from '../../../actions/authorization.actions';

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutCurrentUser())
});

class HeaderRight extends React.Component {
    static propTypes = {
        signOut: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        this.props.signOut();
    }

    render() {
        return (<Button
            style={{
                text: {
                    color: 'white'
                }
            }}
            onPress={this.handlePress}
            icon='exit-to-app'
            text=''
        />)
    }
}

export default connect(null, mapDispatchToProps)(HeaderRight)