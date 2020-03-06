import React from 'react'
import { View, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from './pages/Home'
import Cart from './pages/Cart'

import logo from './assets/images/logo.svg'

const Stack = createStackNavigator()

function LogoTitle() {
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <Image style={{ width: 20, height: 20 }} source={logo} />
      <Icon name="shopping-basket" size={36} color="#fff" />
    </View>
  )
}

const Routes = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'right',
      // headerTintColor: '#fff',
      headerTransparent: true,
      headerTitle: (
        <>
          <Image style={{ width: 20, height: 20 }} source={logo} />
          <Icon name="shopping-basket" size={36} color="#fff" />
        </>
      ),
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Cart" component={Cart} />
  </Stack.Navigator>
)

export default Routes
