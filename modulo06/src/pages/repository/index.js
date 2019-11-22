import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WebView } from 'react-native-webview'

class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props
    const repository = navigation.getParam('repository')
    console.tron.log('Repository', repository.html_url)
    return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
  }
}

export default Repository
