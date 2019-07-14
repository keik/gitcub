import styled from 'styled-components'

export interface ButtonProps {
  className?: string
  readonly primary?: true
  readonly small?: true
}

export const Button = styled.button<ButtonProps>(props => ({
  ...(props.primary
    ? {
      backgroundColor: '#28a745',
      color: '#ffffff'
    }
    : {
      backgroundColor: '#eeeeee',
      color: '#333'
    }),
  ...(props.small
    ? {
      padding: '0 10px',
      fontSize: '12px',
      lineHeight: '24px'
    }
    : {
      padding: '0 12px',
      fontSize: '14px',
      lineHeight: '30px'
    }),
  alignItems: 'center',
  border: '1px solid rgba(32, 32, 32, 0.2)',
  borderRadius: '3px',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'inline-flex',
  '&:hover': { textDecoration: 'none' }
}))
