// @flow

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
  ${({ inline }) => inline && 'display: inline-block;'}
  ${borders}
  ${borderRadius}
  ${color}
  ${fontSize}
  ${space}
  ${width}
`

export default Box
