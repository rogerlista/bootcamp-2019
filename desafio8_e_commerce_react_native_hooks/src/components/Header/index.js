import React from 'react'
import { useSelector } from 'react-redux'

import {
  HeaderBar,
  LogoContainer,
  Logo,
  BasketContainer,
  IconCart,
  ItemsCart,
} from './styles'

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length)

  return (
    <HeaderBar>
      <LogoContainer
        onPress={() => {
          navigation.navigate('Home')
        }}
      >
        <Logo />
      </LogoContainer>

      <BasketContainer
        onPress={() => {
          navigation.navigate('Cart')
        }}
      >
        <IconCart name="shopping-basket" />
        <ItemsCart>{cartSize || 0}</ItemsCart>
      </BasketContainer>
    </HeaderBar>
  )
}
