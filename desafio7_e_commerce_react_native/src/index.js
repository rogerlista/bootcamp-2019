import React from 'react'
import { StatusBar } from 'react-native'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import './config/reactotron'

import Routes from './routes'

const App = props => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#191920" />
      <Routes />
    </NavigationContainer>
  )
}

export default App
