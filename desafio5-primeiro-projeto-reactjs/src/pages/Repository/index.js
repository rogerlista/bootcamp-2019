import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../services/api'

import Container from '../../components/Container'
import { Loading, Owner, IssueList, IssueFilter, Pagination } from './styles'

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
    currentPage: 1,
    perPage: 5,
    disabled: true,
    filters: [
      { state: 'open', label: 'Abertas', active: true, button: 1 },
      { state: 'closed', label: 'Fechadas', active: false, button: 2 },
      { state: 'all', label: 'Todas', active: false, button: 3 },
    ],
  }

  async componentDidMount() {
    const { match } = this.props
    const { filters, perPage, currentPage } = this.state

    const repoName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(filter => filter.active).state,
          page: currentPage,
          per_page: perPage,
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

  loadIssues = async state => {
    const { repoName, perPage, filters } = this.state

    filters.map(filter => (filter.active = filter.state === state))

    this.setState({ loading: true })

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        page: 1,
        per_page: perPage,
      },
    })

    this.setState({
      issues: issues.data,
      currentPage: 1,
      loading: false,
      disabled: true,
    })
  }

  paginate = async next => {
    const { repoName, filters, currentPage, perPage } = this.state
    const pageNumber = next ? currentPage + 1 : currentPage - 1
    const page = pageNumber < 1 ? 1 : pageNumber

    this.setState({ loading: true })

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters.find(filter => filter.active).state,
        page,
        per_page: perPage,
      },
    })

    this.setState({
      issues: issues.data,
      currentPage: page,
      loading: false,
      disabled: page <= 1,
    })
  }

  render() {
    const { repository, issues, loading, disabled, filters } = this.state
    const active = filters.find(filter => filter.active).button
    console.log('filters', filters, 'disabled', disabled)

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

        <IssueFilter active={active}>
          {filters.map(filter => (
            <button
              key={filter.state}
              onClick={() => this.loadIssues(filter.state)}
            >
              {filter.label}
            </button>
          ))}
        </IssueFilter>

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

        <Pagination>
          <button disabled={disabled} onClick={() => this.paginate()}>
            Anterior
          </button>
          <button onClick={() => this.paginate('next')}>Próxima</button>
        </Pagination>
      </Container>
    )
  }
}
