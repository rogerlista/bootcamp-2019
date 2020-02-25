import React, { Component } from 'react'
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'

import api from '../../services/api'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  ContainerLoading,
} from './styles'

export default class User extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params.user.name,
  })

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.object,
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    loading: true,
    page: 1,
    perPage: 20,
    loadingMore: false,
    refreshing: false,
  }

  async componentDidMount() {
    this.loadRepositories()
  }

  loadRepositories = async () => {
    if (this.state.loadingMore) return

    const { route } = this.props
    const { user } = route.params
    const { stars, page, perPage } = this.state

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
        per_page: perPage,
      },
    })

    const repo = response.data

    this.setState({
      stars: page === 1 ? repo : [...stars, ...repo],
      page: page + 1,
      loading: false,
      loadingMore: false,
      refreshing: false,
    })
  }

  loadingMore = () => {
    this.setState({
      loadingMore: true,
    })

    this.loadRepositories()
  }

  renderFooter = () => {
    if (this.state.loadingMore) {
      return <ActivityIndicator color="#7159c1" />
    }

    return null
  }

  refreshList = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.loadRepositories()
      }
    )
  }

  handleNavigate(repo) {
    const { navigation } = this.props
    navigation.navigate('Repo', { repo })
  }

  render() {
    const { route } = this.props
    const { user } = route.params
    const { stars, loading, refreshing } = this.state

    if (loading) {
      return (
        <ContainerLoading>
          <ActivityIndicator size="large" color="#7159c1" />
          <Text>Aguarde, carregando os dados...</Text>
        </ContainerLoading>
      )
    } else {
      return (
        <Container>
          <Header>
            <Avatar source={{ uri: user.avatar }} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>
          </Header>

          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReached={this.loadingMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar
                  key={item.id}
                  source={{ uri: item.owner.avatar_url }}
                />
                <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </TouchableOpacity>
              </Starred>
            )}
          />
        </Container>
      )
    }
  }
}
