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
  }

  async componentDidMount() {
    const { route } = this.props
    const { user } = route.params

    const response = await api.get(`/users/${user.login}/starred`)

    this.setState({ stars: response.data, loading: false })
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
