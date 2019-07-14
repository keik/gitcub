// @flow

// @deprecated

import styled from 'styled-components'
import {
  borders,
  borderRadius,
  color,
  fontSize,
  space,
  width
} from 'styled-system'

const Box = styled.div`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  ${borders}
  ${borderRadius}
  ${color}
  ${fontSize}
  ${space}
  ${width}
`

export default Box
