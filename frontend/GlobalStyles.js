// @flow

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #333;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol';
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: #4078c0;
}

a:hover,
  a:active {
    text-decoration: underline;
    outline-width: 0;
  }

code {
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 12px;
  color: #333;
  word-wrap: normal;
  white-space: pre;
}

hr {
  margin: 16px 0;
  border: 0;
  border-bottom: 1px solid #ddd;
}

input[type='text'] {
  min-height: 34px;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
}
`

export default GlobalStyles
