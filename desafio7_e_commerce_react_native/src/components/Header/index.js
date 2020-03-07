import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'

import { HeaderBar, Logo, IconCart } from './styles'

const Header = props => {
  return (
    <HeaderBar>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Home')
        }}
      >
        <Logo source={require('../../assets/images/logo.png')} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Cart')
        }}
      >
        <IconCart name="shopping-basket" />
      </TouchableOpacity>
    </HeaderBar>
  )
}

export default Header
