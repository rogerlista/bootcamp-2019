import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api'

import Container from '../../components/Container'
import { Form, SubmitButton, List } from './styles'

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  }

  // carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories')

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) })
    }
  }

  // salva os dados no localStorage
  componentDidUpdate(prevProps, prevState) {
    const { repositories } = this.state

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ loading: true, error: false })

    const { newRepo, repositories } = this.state

    try {
      const repositoryExists = repositories.some(
        repository => repository.name === newRepo
      )

      if (repositoryExists) {
        throw new Error('Repositório duplicado.')
      }

      const response = await api.get(`/repos/${newRepo}`)

      const data = {
        name: response.data.full_name,
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      })
    } catch (error) {
      this.setState({ loading: false, error: true })
      console.warn('Ops ocorreu um erro', error)
    }
  }

  render() {
    const { newRepo, repositories, loading, error } = this.state

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositório
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
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
