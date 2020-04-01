import styled from 'styled-components'

export const Wrapper = styled.div`
  align-items: center;
  background: #7d40e7;
  display: flex;
  height: 100%;
  justify-content: center;
`

export const Content = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 425px;
  max-width: 360px;
  padding 60px 30px;
  width: 100%;

  img {
    height: 44px;
    margin: 0 auto 40px;
    width: 260px;
  }

  span {
    align-self: flex-start;
    display: block;
    color: #fb6f91;
    font-weight: bold;
    margin: -10px 0 10px;
  }

  button {
    font-size: 16px;
    height: 45px;
    width: 100%;
  }
`
