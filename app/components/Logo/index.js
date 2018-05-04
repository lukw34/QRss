import React from 'react';
import {Image} from 'react-native';

const Logo = () => (
    <Image
        style={{
            flex: 1,
            justifyContent: 'center',
            maxWidth: 100,
            maxHeight: 100,
            margin: 25,
            borderRadius: 12
        }}
        source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/qrss-c2191.appspot.com/o/logo_xsmall.jpeg?alt=media&token=0b7a580a-2904-4dab-a210-57dfa3caa576'
        }}
    />
);

export default Logo;