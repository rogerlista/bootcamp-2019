import styled from 'styled-components'

import Icon from 'react-native-vector-icons/MaterialIcons'

export const HeaderBar = styled.View`
  background: #191920;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 80px 20px 0px;
`

export const Logo = styled.Image``

export const IconCart = styled(Icon)`
  font-size: 26px;
  color: #fff;
  margin-right: 20px;
`

export const ItemsCart = styled.Text`
  font-size: 12px;
  width: 12px;
  color: #fff;
  background: #7159c1;
  margin-left: 15px;
  text-align: center;
`
