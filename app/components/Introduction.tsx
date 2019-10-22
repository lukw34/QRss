import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    name: String,
    age?: number
}

const Introduction = ({ name, age }: Props) => {

    return (
        <View>
            <Text>{name}</Text>
        </View>);
};

export default Introduction;