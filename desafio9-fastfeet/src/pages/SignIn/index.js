import React from 'react'

import logo from '~/assets/fastfeet-logo.png'

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="Logo FastFeet" />

      <form>
        <label htmlFor="email">Seu e-mail</label>
        <input type="email" placeholder="examplo@email.com" />
        <label htmlFor="password">Sua senha</label>
        <input type="password" placeholder="************" />

        <button type="submit" className="button">
          Entrar no sistema
        </button>
      </form>
    </>
  )
}
