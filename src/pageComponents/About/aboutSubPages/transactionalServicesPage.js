import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Header from '../uiComponents/Header'
import PageContainer from '../uiComponents/PageContainer'

const Container = styled.div`
  max-width: 1300px;
  margin: 50px auto;
`
export default function transactionalServicesPage() {
    return (     
        <Container>
            <Header text="Transactional Services" />
        </Container>
    )
}
