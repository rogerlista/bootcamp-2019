import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'

import { HeaderBar, Logo, IconCart, ItemsCart } from './styles'

const Header = ({ navigation, cartSize }) => {
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

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header)
