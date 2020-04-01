import React from 'react'
import { Switch } from 'react-router-dom'

import SignIn from '~/pages/SignIn'

import OrderList from '~/pages/OrderList'
import DeliveryList from '~/pages/DeliveryList'
import RecipientList from '~/pages/RecipientList'
import ProblemList from '~/pages/ProblemList'

import Route from './Route'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order-list" component={OrderList} isPrivate />
      <Route path="/delivery-list" component={DeliveryList} isPrivate />
      <Route path="/recipient-list" component={RecipientList} isPrivate />
      <Route path="/problem-list" component={ProblemList} isPrivate />
    </Switch>
  )
}
