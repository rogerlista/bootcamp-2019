import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import { formatPrice } from '../../util/format'
import api from '../../services/api'

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

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products')
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))

      setProducts(data)
    }

    loadProducts()
  }, [])

  function handleAddProduct(id) {
    addToCartRequest(id)
  }

  return (
    <Container>
      <ProductList
        data={products}
        keyExtractor={product => String(product.id)}
        renderItem={({ item }) => (
          <Product>
            <Imagem source={{ uri: item.image }} />
            <Description>{item.title}</Description>
            <Price>{item.priceFormatted}</Price>

            <AddButton onPress={() => handleAddProduct(item.id)}>
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

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount

    return amount
  }, {}),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
