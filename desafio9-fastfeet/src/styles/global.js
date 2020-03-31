import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body{
    font: 400 14px 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #999;
    font: 400 16px 'Roboto', sans-serif;
    height: 45px;
    padding: 0 15px;
    width: 100%;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .button {
    background: #7d40e7;
    border-radius: 4px;
    display: inline-block;
    font: 700 14px 'Roboto', sans-serif;
    height: 36px;
    line-height: 36px;
    text-align: center;
    text-decoration: none;
    transition: filter 0.2s;
  }

  .button:hover {
    filter: brightness(90%);
  }

  .back-link {
    align-items: center;
    background: #ccc;
    color: #fff;
    display: flex;
    font: 700 14px 'Roboto', sans-serif;
    text-decoration: none;
    transition: filter 0.2s;
  }

  .back-link svg {
    margin-right: 8px;
  }

  .back-link:hover {
    filter: brightness(90%)
  }
`
