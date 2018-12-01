// @flow

import * as React from 'react'
import styled from '@emotion/styled'

const SegmentedButtonsContainer = (styled.div`
  a,
  button {
    border-right-width: 0;
    border-radius: 0;
  }

  > :first-child {
    a,
    button {
      border-right-width: 0;
      border-radius: 3px 0 0 3px;
    }
  }
  > a,
  > button {
    &:first-child {
      border-right-width: 0;
      border-radius: 3px 0 0 3px;
    }
  }

  > :last-child {
    a,
    button {
      border-right-width: 1px;
      border-radius: 0 3px 3px 0;
    }
  }
  > a,
  > button {
    &:last-child {
      border-right-width: 1px;
      border-radius: 0 3px 3px 0;
    }
  }
`: React.ComponentType<{| children: React.Node |}>)

export default SegmentedButtonsContainer
