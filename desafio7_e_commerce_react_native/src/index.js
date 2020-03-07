import React from 'react'
import { StatusBar } from 'react-native'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import './config/reactotron'

import Header from './components/Header'
import Routes from './routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#191920" />
      <Header />
      <Routes />
    </NavigationContainer>
  )
}
