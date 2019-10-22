import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Introduction from './app/components/Introduction';


export default function App() {
  return (
    <View style={styles.container}>
      <Introduction name="Ukasz"/>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});