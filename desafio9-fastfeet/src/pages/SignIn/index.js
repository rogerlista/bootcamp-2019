import React from 'react'

import { Form, Input } from '@rocketseat/unform'

import logo from '~/assets/fastfeet-logo.png'

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data)
  }

  return (
    <>
      <img src={logo} alt="Logo FastFeet" />

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <Input name="email" type="email" placeholder="examplo@email.com" />
        <label htmlFor="password">Sua senha</label>
        <Input name="password" type="password" placeholder="************" />

        <button type="submit" className="button">
          Entrar no sistema
        </button>
      </Form>
    </>
  )
}
