import React from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import Header from '../../components/Header'

import * as CartActions from '../../store/modules/cart/actions'

import { formatPrice } from '../../util/format'

import {
  Container,
  CartList,
  CartDetail,
  Product,
  Detail,
  Item,
  Imagem,
  Description,
  Price,
  ButtonRemove,
  IconDeleteItem,
  ButtonAction,
  IconButton,
  Footer,
  FooterQtd,
  Qtd,
  SubTotal,
  TotalDescription,
  TotalValue,
  ButtonFinish,
  ButtonFinishText,
} from './styles'

const Cart = ({ navigation, cart, total, removeFromCart, updateAmount }) => {
  function increment(product) {
    updateAmount(product.id, product.amount + 1)
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1)
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <CartDetail>
        <CartList
          data={cart}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <Detail>
                <Imagem source={{ uri: item.image }} />
                <Item>
                  <Description>{item.title}</Description>
                  <Price>{item.priceFormatted}</Price>
                </Item>
                <ButtonRemove onPress={() => removeFromCart(item.id)}>
                  <IconDeleteItem name="delete-forever" />
                </ButtonRemove>
              </Detail>

              <Footer>
                <FooterQtd>
                  <ButtonAction onPress={() => decrement(item)}>
                    <IconButton name="remove-circle-outline" />
                  </ButtonAction>
                  <Qtd value={String(item.amount)} editable={false} />
                  <ButtonAction onPress={() => increment(item)}>
                    <IconButton name="add-circle-outline" />
                  </ButtonAction>
                </FooterQtd>
                <SubTotal>{item.subtotal}</SubTotal>
              </Footer>
            </Product>
          )}
        ></CartList>

        <TotalDescription>Total</TotalDescription>
        <TotalValue>{total}</TotalValue>
        <ButtonFinish>
          <ButtonFinishText>Finalizar pedido</ButtonFinishText>
        </ButtonFinish>
      </CartDetail>
    </Container>
  )
}
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount
    }, 0)
  ),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
