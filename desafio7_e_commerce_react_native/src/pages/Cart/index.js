import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'

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

const Cart = ({ navigation, cart }) => {
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
                <ButtonRemove>
                  <IconDeleteItem name="delete-forever" />
                </ButtonRemove>
              </Detail>

              <Footer>
                <FooterQtd>
                  <IconButton name="remove-circle-outline" />
                  <Qtd value="8" editable={false} />
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

export default connect(mapStateToProps)(Cart)
