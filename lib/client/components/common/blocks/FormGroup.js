// @flow

import styled from 'react-emotion'

const FormGroup = styled.div`
  margin-bottom: 8px;
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};

  > label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }
`

export default FormGroup
