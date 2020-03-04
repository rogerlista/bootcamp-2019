import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import './config/reactotron'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to E-Commerce</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191920',
  },
  welcome: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
