// @flow

import * as React from 'react'
import styled from 'react-emotion'

const ButtonsContainer = (styled.div`
  > * + * {
    margin-left: 12px;
  }
`: React.ComponentType<{| children: React.Node |}>)

export default ButtonsContainer
