import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api'

import Container from '../../components/container'
import { Form, SubmitButton, List } from './styles'

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories')

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) })
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      this.setState({ isLoading: true, error: false })

      const { newRepo, repositories } = this.state

      const response = await api.get(`/repos/${newRepo}`)

      const data = {
        name: response.data.full_name,
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      })
    } catch (error) {
      this.setState({ error: true })
      console.log('Repositório não localizado.', error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { newRepo, repositories, isLoading, error } = this.state

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton isLoading={isLoading}>
            {isLoading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/* encodeURIComponent é uma função do javascript que realiza o encode da barra */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}

export default Main
