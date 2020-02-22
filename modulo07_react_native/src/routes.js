import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Main from './pages/Main'
import User from './pages/User'

const Stack = createStackNavigator()

const Routes = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#7159c1' },
    }}
  >
    <Stack.Screen name="Usuários" component={Main} />
    <Stack.Screen name="User" component={User} />
  </Stack.Navigator>
)

export default Routes
