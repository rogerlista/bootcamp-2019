import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'

import './config/reactotron'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'

import store from './store'

const App = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#191920" />
        <Routes />
      </NavigationContainer>
    </Provider>
  )
}

export default App
