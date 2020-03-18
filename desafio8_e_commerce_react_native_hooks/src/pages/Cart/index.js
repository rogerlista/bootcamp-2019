import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as CartActions from '../../store/modules/cart/actions'

import Icon from 'react-native-vector-icons/MaterialIcons'
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
  EmptyContainer,
  EmptyText,
} from './styles'

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.amount * product.price
      }, 0)
    )
  )

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.amount * product.price),
    }))
  )

  const dispatch = useDispatch()

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1))
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1))
  }

  return (
    <Container>
      {cart.length ? (
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
                  <ButtonRemove
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(item.id))
                    }
                  >
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
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  )
}
