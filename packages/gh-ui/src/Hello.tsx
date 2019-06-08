import * as React from 'react'

export interface Props {
  name: string
}

const Hello: React.FC<Props> = ({ name }: Props) => <div>Hello {name}</div>

export default Hello
