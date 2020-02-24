import React, { Component } from 'react'
import { Text, ActivityIndicator } from 'react-native'

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
  }

  state = {
    stars: [],
    loading: true,
    page: 1,
    perPage: 20,
    loadingMore: false,
  }

  async componentDidMount() {
    this.loadRepositories()
  }

  loadRepositories = async () => {
    if (this.state.loadingMore) return

    const { route } = this.props
    const { user } = route.params
    const { stars, page, perPage } = this.state

    this.setState({ loadingMore: true })

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
        per_page: perPage,
      },
    })

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      page: page + 1,
      loadingMore: false,
    })
  }

  renderLoadingMore = () => {
    if (!this.state.loadingMore) return null

    return <ActivityIndicator color="#7159c1" />
  }

  render() {
    const { route } = this.props
    const { user } = route.params
    const { stars, loading } = this.state

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
            onEndReached={this.loadRepositories}
            onEndReachedThreshold={0.2}
            ListFooterComponent={this.renderLoadingMore}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        </Container>
      )
    }
  }
}
