import styled from 'styled-components/native'

// import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Container = styled.View`
  flex: 1;
  background: #191920;
`

export const CartDetail = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 50px 20px;
  padding: 10px 15px 0;
`

export const CartList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 0 5px;
`

export const Product = styled.View`
  margin-bottom: 10px;
`

export const Detail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export const Item = styled.View`
  width: 60%;
`

export const Imagem = styled.Image`
  width: 80px;
  height: 80px;
`

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #333;
  font-size: 14px;
  line-height: 18px;
`

export const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`

export const ButtonRemove = styled.TouchableOpacity``

export const IconDeleteItem = styled(Icon)`
  color: #7159c1;
  font-size: 24px;
`

export const ButtonAction = styled.TouchableOpacity``

export const IconButton = styled(Icon)`
  color: #7159c1;
  font-size: 20px;
`

export const Footer = styled.View`
  background: #eee;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  padding: 5px 10px;
`

export const FooterQtd = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Qtd = styled.TextInput`
  background: #fff;
  color: #666;
  border-color: #ddd;
  font-size: 14px;
  height: 26px;
  width: 50px;
  margin: 5px 8px;
  text-align: right;
  padding-right: 10px;
`

export const SubTotal = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const TotalDescription = styled.Text`
  color: #999;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
  text-transform: uppercase;
`

export const TotalValue = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`

export const ButtonFinish = styled.TouchableOpacity`
  border-radius: 4px;
  background: #7159c1;
  margin: 30px 0 10px;
  padding: 10px;
`

export const ButtonFinishText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const EmptyText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
`
