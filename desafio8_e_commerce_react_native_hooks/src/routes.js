import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Cart from './pages/Cart'

import Header from './components/Header'

const Stack = createStackNavigator()

const Routes = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      // headerTransparent: true,
      headerLeft: null,
      header: ({ navigation }) => <Header navigation={navigation} />,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Cart" component={Cart} />
  </Stack.Navigator>
)

export default Routes
