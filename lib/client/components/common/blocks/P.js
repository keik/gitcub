// @flow

import styled from '@emotion/styled'

const P = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ gray }) => (gray ? '#767676' : 'inherit')};
`

export default P
