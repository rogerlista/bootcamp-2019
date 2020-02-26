import React from 'react'

import PropTypes from 'prop-types'

import { Browser } from './styles'

export default function Repo({ navigation, route }) {
  navigation.setOptions({ title: route.params.repo.name })

  return <Browser source={{ uri: route.params.repo.html_url }} />
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
