import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'

import OrderList from '../pages/OrderList'
import DeliveryList from '../pages/DeliveryList'
import RecipientList from '../pages/RecipientList'
import ProblemList from '../pages/ProblemList'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order-list" component={OrderList} />
      <Route path="/delivery-list" component={DeliveryList} />
      <Route path="/recipient-list" component={RecipientList} />
      <Route path="/problem-list" component={ProblemList} />
    </Switch>
  )
}
