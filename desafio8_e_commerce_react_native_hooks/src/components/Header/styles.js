import styled from 'styled-components'

import Icon from 'react-native-vector-icons/MaterialIcons'

import logo from '../../assets/images/logo.png'

export const HeaderBar = styled.View`
  background: #191920;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 80px 20px 0px;
`

export const LogoContainer = styled.TouchableOpacity``

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`

export const BasketContainer = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`

export const IconCart = styled(Icon)`
  font-size: 26px;
  color: #fff;
`

export const ItemsCart = styled.Text`
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  font-size: 12px;
  width: 12px;
  color: #fff;
  background: #7159c1;
  margin-left: 15px;
  text-align: center;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`
