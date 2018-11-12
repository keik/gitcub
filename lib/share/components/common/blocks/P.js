// @flow

import styled from 'react-emotion'

const P = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ gray }) => (gray ? '#767676' : 'inherit')};
`

export default P
