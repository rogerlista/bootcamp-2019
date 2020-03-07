import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { formatPrice } from '../../util/format'
import api from '../../services/api'

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

export default class Home extends Component {
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

  render() {
    const { products } = this.state

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

              <AddButton onPress={() => {}}>
                <IconContainer>
                  <IconButton name="add-shopping-cart" />
                  <IconButtonText>4</IconButtonText>
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
