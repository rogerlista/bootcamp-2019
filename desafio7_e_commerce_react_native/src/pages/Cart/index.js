import React from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import Header from '../../components/Header'

import * as CartActions from '../../store/modules/cart/actions'

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

const Cart = ({ navigation, cart, removeFromCart }) => {
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
                  <IconButton name="remove-circle-outline" />
                  <Qtd value={String(item.amount)} editable={false} />
                  <IconButton name="add-circle-outline" />
                </FooterQtd>
                <SubTotal>R$ 539,70</SubTotal>
              </Footer>
            </Product>
          )}
        ></CartList>

        <TotalDescription>Total</TotalDescription>
        <TotalValue>R$ 1619,10</TotalValue>
        <ButtonFinish>
          <ButtonFinishText>Finalizar pedido</ButtonFinishText>
        </ButtonFinish>
      </CartDetail>
    </Container>
  )
}
const mapStateToProps = state => ({
  cart: state.cart,
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
