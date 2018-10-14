// @flow

import * as React from 'react'
import styled from 'styled-components'

export default (styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 12px 0;
    + li {
      ${({ lined }) => (lined ? 'border-top: 1px solid #f1f1f1' : '')};
    }
  }
`: React.ComponentType<{|
  children: Array<React.Element<'li'>>,
  lined?: true
|}>)
