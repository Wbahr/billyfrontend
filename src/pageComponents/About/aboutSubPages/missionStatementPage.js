import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Header from '../uiComponents/Header'

const MainContainer = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    padding: 0 10px;
`
const Img_Div = styled.div`
    width: 800px;
    margin-top: 50px;
`
const Img = styled.img`
    max-width: 100%;
`
export default class missionStatementPage extends Component {
    render() {
        return (
            <MainContainer>
                <Header text="Airline's core Values" />
                <Img_Div>
                    <Img src="https://www.airlinehyd.com/customer/aihyco/images/Airline-Core-Values.jpg" />
                </Img_Div>
            </MainContainer>
        )
    }
}
