import React from 'react';
import {Image, View} from 'react-native';

import styles from './styles';

const Logo = ({style}) => (
    <View style={style}>
        <Image
            style={styles.logoImage}
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/qrss-c2191.appspot.com/o/logo_xsmall.jpeg?alt=media&token=0b7a580a-2904-4dab-a210-57dfa3caa576'
            }}
        />
    </View>
);


export default Logo;