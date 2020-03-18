import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { formatPrice } from '../../util/format'
import api from '../../services/api'

import { addToCartRequest } from '../../store/modules/cart/actions'

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

export default function Home() {
  const [products, setProducts] = useState([])

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount

      return sumAmount
    }, {})
  )

  const dispatch = useDispatch()

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
    dispatch(addToCartRequest(id))
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
