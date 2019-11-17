import React from 'react'
import { StatusBar } from 'react-native'

import './config/reactotron-config'

// sempre colocar código produzido por nós depois do reactotron senão não será possível debugar

import Routes from './routes'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  )
}
