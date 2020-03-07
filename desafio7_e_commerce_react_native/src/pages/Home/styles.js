import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Container = styled.View`
  flex: 1;
  background: #191920;
`

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  horizontal: true,
})`
  margin-top: 120px;
`

export const Product = styled.View`
  height: 358px;
  width: 220px;
  margin: 0 20px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
`

export const Imagem = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
`

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 16px;
  line-height: 21px;
  color: #333;
`

export const Price = styled.Text`
  font-size: 21px;
  font-weight: bold;
  margin-top: 10px;
`

export const AddButton = styled(RectButton)`
  background: #7159c1;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: auto;

  display: flex;
  flex-direction: row;
  align-items: center;
`

export const IconContainer = styled.View`
  background: rgba(0, 0, 0, 0.1);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const IconButton = styled(Icon)`
  padding: 16px 0px 16px 16px;
  font-size: 16px;
  color: #fff;
`

export const IconButtonText = styled.Text`
  font-size: 12px;
  color: #fff;
  padding: 0px 16px 0px 5px;
`

export const AddButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  padding: 16px 0px;
  text-transform: uppercase;
  margin: 0 auto;
`
