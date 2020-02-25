import styled from 'styled-components'

export const Alert = styled.div`
  border-radius: 2px;
  padding: 4px 8px;
  margin-bottom: 8px;
`

export const ErrorAlert = styled(Alert)`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;;
`

export const InfoAlert = styled(Alert)`
  color: #0c5460;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
`