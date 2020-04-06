import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  height: 64px;
  padding: 0 30px;

  display: flex;
  justify-content: space-between;

  nav {
    height: 32px;
    margin: 19px 0;

    display: flex;
    align-items: center;

    img {
      height: 26px;
      margin-right: 30px;
      width: 135px;
    }

    ul {
      border-left: 1px solid #ddd;
      height: 32px;
      padding-left: 30px;

      display: flex;
      align-items: center;
    }

    a {
      color: #999;
      font-size: 15px;
      font-weight: bold;
      padding-right: 21px;
      text-transform: uppercase;
    }

    .selected a {
      color: #444;
    }
  }
`

export const Profile = styled.div`
  margin-top: 6px;

  display: flex;
  align-items: flex-end;
  flex-direction: column;

  strong {
    color: #666;
    margin-bottom: 5px;
  }

  a {
    color: #de3b3b;
  }
`
