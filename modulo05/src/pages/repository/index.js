import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import api from '../../services/api'

import Container from '../../components/container'
import { Loading, Owner, IssueList, IssueFilter } from './styles'

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
    filterIndex: 0,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
  }

  async componentDidMount() {
    const { match } = this.props
    const { filters } = this.state

    const repoName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(filter => filter.active).state,
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

  loadIssues = async () => {
    const { match } = this.props
    const { filters, filterIndex } = this.state

    const repoName = decodeURIComponent(match.params.repository)

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
      },
    })

    this.setState({ issues: response.data })
  }

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex })
    this.loadIssues()
  }

  render() {
    const { repository, issues, isLoading, filters, filterIndex } = this.state

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
        </Owner>

        <IssueList>
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>

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
