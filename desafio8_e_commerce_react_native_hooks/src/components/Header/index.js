import React from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'

import { HeaderBar, Logo, IconCart, ItemsCart } from './styles'

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length)

  return (
    <HeaderBar>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home')
        }}
      >
        <Logo source={require('../../assets/images/logo.png')} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart')
        }}
      >
        <ItemsCart>{cartSize}</ItemsCart>
        <IconCart name="shopping-basket" />
      </TouchableOpacity>
    </HeaderBar>
  )
}
