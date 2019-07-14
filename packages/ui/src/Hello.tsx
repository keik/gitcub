import * as React from 'react'
import styled from 'styled-components'

export interface Props {
  className?: string
  name: string
}

export const Hello: React.FC<Props> = ({ className, name }: Props) => (
  <div className={className}>Hello {name}</div>
)

export const StyledHello = styled(Hello)`
  color: blue;
`
