import React, { Component } from 'react'
import { View } from 'react-native'

import PropTypes from 'prop-types'

import api from '../../services/api'

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
  }

  async componentDidMount() {
    const { route } = this.props
    const { user } = route.params

    const response = await api.get(`/users/${user.login}/starred`)

    this.setState({ stars: response.data })
  }

  render() {
    return <View />
  }
}
