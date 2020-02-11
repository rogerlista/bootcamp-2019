import React from 'react'

import logo from '../assets/facebook.svg'
import avatar from '../assets/avatar.svg'

function Header() {
  return (
    <header>
      <img src={logo} alt="Logo Facebook" />
      <div class="perfil">
        <span>Meu perfil</span>
        <img src={avatar} />
      </div>
    </header>
  )
}

export default Header
