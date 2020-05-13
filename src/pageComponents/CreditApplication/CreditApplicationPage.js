import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Header from '../_common/header'

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`
export default function CreditApplicationPage() {
    return (
        <Container>
            <Header text="Credit Application" />
        </Container>
    )
}
