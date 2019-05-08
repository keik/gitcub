// @flow

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle({
  '*': {
    boxSizing: 'border-box'
  },
  body: {
    margin: 0,
    color: '#333',
    fontSize: '14px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    lineHeight: 1.5
  },
  a: {
    textDecoration: 'none',
    color: '#4078c0',
    '&:hover, &:active': {
      textDecoration: 'underline',
      outlineWidth: 0
    }
  },
  code: {
    fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
    fontSize: '12px',
    color: '#333',
    wordWrap: 'normal',
    whiteSpace: 'pre'
  },
  hr: {
    margin: '16px 0',
    border: 0,
    borderBottom: '1px solid #ddd'
  },
  'input[type="text"]': {
    minHeight: '34px',
    padding: '6px 8px',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#333',
    verticalAlign: 'middle',
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    border: '1px solid #ddd',
    borderRadius: '3px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)'
  }
})

export default GlobalStyles
