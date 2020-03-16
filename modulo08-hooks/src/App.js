import React, { useState } from 'react'

function App() {
  const [techs, setTechs] = useState(['ReactJS', 'React Native'])
  const [newTech, setNewTech] = useState('')

  function handleAdd() {
    setTechs([...techs, newTech])
    setNewTech('')
  }

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

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
