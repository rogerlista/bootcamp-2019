import React from 'react'
import { Link } from 'react-router-dom'

import logo from '~/assets/fastfeet-logo.png'

import { Container, Profile } from './styles'

export default function Header() {
  return (
    <Container>
      <nav>
        <img src={logo} alt="FastFeet" />
        <ul>
          <li className="selected">
            <Link to="/order-list">Encomendas</Link>
          </li>
          <li>
            <Link to="/order-list">Entregadores</Link>
          </li>
          <li>
            <Link to="/order-list">Destinatários</Link>
          </li>
          <li>
            <Link to="/order-list">Problemas</Link>
          </li>
        </ul>
      </nav>
      <Profile>
        <strong>Admin FastFeet</strong>
        <Link to="/">sair do sistema</Link>
      </Profile>
    </Container>
  )
}
