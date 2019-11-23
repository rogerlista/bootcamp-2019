import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, TouchableHighlight } from 'react-native'

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
  Loading,
} from './styles'

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    loading: true,
    refreshing: false,
    page: 1,
  }

  componentDidMount() {
    this.load()
  }

  load = async () => {
    const { stars, page } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')

    try {
      const response = await api.get(`/users/${user.login}/starred`, {
        params: { page },
      })

      this.setState({
        stars: page === 1 ? response.data : [...stars, ...response.data],
      })
    } catch (error) {
      console.tron.log('Não foi possível obter os dados', error)
    } finally {
      this.setState({ loading: false, refreshing: false })
    }
  }

  loadMore = async () => {
    this.setState({ page: this.state.page + 1 })
    this.load()
  }

  renderFooter = () => {
    if (!this.state.loading) return null

    return <Loading />
  }

  refreshList = () => {
    this.setState({ page: 1, stars: [], refreshing: true })
    this.load()
  }

  handleNavigate = repository => {
    const { navigation } = this.props

    navigation.navigate('Repository', { repository })
  }

  render() {
    const { navigation } = this.props
    const { stars, refreshing } = this.state

    const user = navigation.getParam('user')

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
            <TouchableHighlight onPress={() => this.handleNavigate(item)}>
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableHighlight>
          )}
          onRefresh={this.refreshList}
          refreshing={refreshing}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    )
  }
}
