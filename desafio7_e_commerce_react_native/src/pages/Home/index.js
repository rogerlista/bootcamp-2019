import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import { formatPrice } from '../../util/format'
import api from '../../services/api'
import Header from '../../components/Header'

import * as CartActions from '../../store/modules/cart/actions'

import {
  Container,
  ProductList,
  Product,
  Imagem,
  Description,
  Price,
  AddButton,
  IconContainer,
  IconButton,
  IconButtonText,
  AddButtonText,
} from './styles'

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('/products')
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))

    this.setState({ products: data })
  }

  handleAddProduct = product => {
    const { addToCart } = this.props

    addToCart(product)
  }

  render() {
    const { products } = this.state
    const { amount } = this.props

    return (
      <Container>
        <Header navigation={this.props.navigation} />
        <ProductList
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <Imagem source={{ uri: item.image }} />
              <Description>{item.title}</Description>
              <Price>{item.priceFormatted}</Price>

              <AddButton onPress={() => this.handleAddProduct(item)}>
                <IconContainer>
                  <IconButton name="add-shopping-cart" />
                  <IconButtonText>{amount[item.id] || 0}</IconButtonText>
                </IconContainer>
                <AddButtonText>Adicionar</AddButtonText>
              </AddButton>
            </Product>
          )}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount

    return amount
  }, {}),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
