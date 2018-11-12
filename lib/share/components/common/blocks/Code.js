// @flow

import styled from 'react-emotion'

const Code = styled.pre`
  margin: 0;
`
Code.Lines = styled.ul`
  float: left;
  min-width: 48px;
  padding: 0.5em;
  margin: 0;
  list-style: none;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.3);
  text-align: right;
  border-right: 1px solid #eee;
`
Code.Body = styled.code`
  background-color: white;
`

export default Code
