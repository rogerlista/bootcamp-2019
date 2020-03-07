import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { formatPrice } from '../../util/format'
import api from '../../services/api'
import Header from '../../components/Header'

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
    const { dispatch } = this.props

    dispatch({
      type: 'ADD_TO_CART',
      product,
    })
  }

  render() {
    const { products } = this.state

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

export default connect()(Home)
