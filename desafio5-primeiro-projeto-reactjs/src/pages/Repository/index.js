import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../services/api'

import Container from '../../components/Container'
import { Loading, Owner, IssueList, Filters } from './styles'

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    repoName: '',
    repository: {},
    issues: [],
    loading: true,
  }

  async componentDidMount() {
    const { match } = this.props
    const repoName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ])

    this.setState({
      repoName,
      repository: repository.data,
      issues: issues.data,
      loading: false,
    })
  }

  getStateIssues = state => {
    const { repoName } = this.state
    return api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
      },
    })
  }

  handleOpen = async () => {
    const issues = await this.getStateIssues('open')

    this.setState({
      issues: issues.data,
    })
  }

  handleClosed = async () => {
    const issues = await this.getStateIssues('closed')

    this.setState({
      issues: issues.data,
    })
  }

  handleAll = async () => {
    const issues = await this.getStateIssues('all')

    this.setState({
      issues: issues.data,
    })
  }

  render() {
    const { repository, issues, loading } = this.state

    if (loading) {
      return <Loading>Carregando</Loading>
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filters>
          <button onClick={this.handleOpen}>Abertos</button>
          <button onClick={this.handleClosed}>Fechados</button>
          <button onClick={this.handleAll}>Todos</button>
        </Filters>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {/** LABELS */}
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    )
  }
}
