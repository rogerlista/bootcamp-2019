import React, { useState, useEffect, useMemo } from 'react'

function App() {
  const [techs, setTechs] = useState([])
  const [newTech, setNewTech] = useState('')

  function handleAdd() {
    setTechs([...techs, newTech])
    setNewTech('')
  }

  useEffect(() => {
    const storageTechs = localStorage.getItem('techs')

    if (storageTechs) {
      setTechs(JSON.parse(storageTechs))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs))
  }, [techs])

  const techSize = useMemo(() => techs.length, [techs])

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <strong>Você tem {techSize} tecnologias</strong>
      <br />

      <input
        value={newTech}
        onChange={event => setNewTech(event.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  )
}

export default App
