import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../services/api'

import Container from '../../components/container'
import { Loading, Owner, IssueList } from './styles'

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    repository: {},
    issues: [],
    isLoading: true,
    selectedState: 'open',
    issueStates: ['open', 'closed', 'all'],
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
      repository: repository.data,
      issues: issues.data,
      isLoading: false,
    })
  }

  async componentDidUpdate(_, prevState) {
    const { selectedState } = this.state

    if (prevState.selectedState !== selectedState) {
      const issues = await api.get(`${prevState.repository.url}/issues`, {
        params: {
          state: selectedState,
        },
      })

      this.setState({
        issues: issues.data,
      })
    }
  }

  handleChangeSelect = e => {
    this.setState({ selectedState: e.target.value })
  }

  render() {
    const {
      repository,
      issues,
      isLoading,
      selectedState,
      issueStates,
    } = this.state

    if (isLoading) {
      return <Loading>Carregando</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>

          <label>
            Issues
            <select value={selectedState} onChange={this.handleChangeSelect}>
              {issueStates.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
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
