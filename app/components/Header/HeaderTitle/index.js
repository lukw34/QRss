import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';


import styles from './styles';


const mapStateToProps = ({me: {me: {email, photoURL}}}) => ({
    email, photoURL
});


const HeaderTitle = ({email, photoURL: uri}) => (
    <View style={styles.headerTitleContainer}>
        <Image
            style={styles.headerTitleImage}
            source={{uri}}
        />
        <Text style={styles.headerTitle}>
            {email}
        </Text>
    </View>
);

HeaderTitle.propTypes = {
    email: PropTypes.string,
    photoURL: PropTypes.string
};

export default connect(mapStateToProps)(HeaderTitle)