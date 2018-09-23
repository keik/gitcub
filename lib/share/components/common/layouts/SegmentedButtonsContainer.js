// @flow

import * as React from 'react'
import styled from 'styled-components'

const SegmentedButtonsContainer = (styled.div`
  > * {
    border-right-width: 0;
    border-radius: 0;
    &:first-child {
      border-right-width: 0;
      border-radius: 3px 0 0 3px;
    }
    &:last-child {
      border-right-width: 1px;
      border-radius: 0 3px 3px 0;
    }
  }
`: React.ComponentType<{| children: React.Node |}>)

export default SegmentedButtonsContainer
