import styled from 'styled-components'

export const StyledText0 = styled.span`
  margin: 0 0 8px 0; 
  font-family: ${props => props.theme.headingFont};
  font-size: 12px;
  line-height: 20px;
`

export const StyledText1 = styled(StyledText0)`
  font-weight: 900;
`

export const StyledTextGrey = styled(StyledText0)`
  color: #777;
`

export const StyledTextGreyBold = styled(StyledTextGrey)`
  font-weight: 900;
`

export const FormText1 = styled.span`
  font-size: 16px;
  color: black;
`

export const FormText1Bold = styled(FormText1)`
  font-weight: 700;
`
