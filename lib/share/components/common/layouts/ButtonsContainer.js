// @flow

import * as React from 'react'
import styled from 'styled-components'

export default (styled.div`
  > * + * {
    margin-left: 12px;
  }
`: React.ComponentType<{| children: React.Node |}>)
