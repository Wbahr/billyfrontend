import React from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
  p {
    text-align: center;
  }
`

export default function FourOFourPage() {

  return (
    <DivContainer>
      <p>404. We can't find this page. :(</p>
      <img height="300px" src="https://www.airlinehyd.com/customer/aihyco/images/404_error_message_image.png"/>
    </DivContainer>
  )
}