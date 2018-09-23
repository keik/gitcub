// @flow

import * as React from 'react'
import styled from 'styled-components'

const ButtonsContainer = (styled.div`
  > * + * {
    margin-left: 12px;
  }
`: React.ComponentType<{| children: React.Node |}>)

export default ButtonsContainer
