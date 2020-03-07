import React from 'react'

import { HeaderBar, Logo, IconCart } from './styles'

export default function Header() {
  return (
    <HeaderBar>
      <Logo source={require('../../assets/images/logo.png')} />
      <IconCart name="shopping-basket" />
    </HeaderBar>
  )
}
