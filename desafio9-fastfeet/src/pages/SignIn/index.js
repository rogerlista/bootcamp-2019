import React from 'react'
import { useDispatch } from 'react-redux'

import * as Yup from 'yup'
import { Form, Input } from '@rocketseat/unform'

import { signInRequest } from '~/store/modules/auth/actions'

import logo from '~/assets/fastfeet-logo.png'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),

  password: Yup.string().required('A senha é obrigatória'),
})

export default function SignIn() {
  const dispatch = useDispatch()

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <>
      <img src={logo} alt="Logo FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
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
