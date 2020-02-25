import React from 'react'

import PropTypes from 'prop-types'
import { WebView } from 'react-native-webview'

function Repo({ navigation, route }) {
  navigation.setOptions({ title: route.params.repo.name })

  return (
    <WebView source={{ uri: route.params.repo.html_url }} style={{ flex: 1 }} />
  )
}

Repo.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.object,
    }),
  }),
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }),
}

export default Repo
