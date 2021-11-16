import React from 'react'
import styled from 'styled-components'
import Header from '../_common/header'

const Container = styled.div`
    max-width: 1300px;
    margin: 0px auto;
`
const MainDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px 0;
`
const Div = styled.div`
    margin: 20px;
    width: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #f2f3f4;
    border-radius: 10px;
`
const ImgDiv = styled.div`
    width: 150px;
    margin-top: 20px;
`
const Img = styled.img`
    width: 100%;
`
const List = styled.p`
    margin-top: 10px;
    font-weight: bold;
    // text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 0.5px;
`
export default function knowledgeCenterPage() {
    return (
        <Container>
            <Header text="Knowledge Center & FAQ" />
            <MainDiv>
                <Div>
                    <ImgDiv>
                        <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/Hydraulic%20Resources%20Icon.png" />
                    </ImgDiv>
                    <List>Hydraulic Resources</List>
                </Div>
                <Div>
                    <ImgDiv>
                        <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/pneumatic%20resources.png" />
                    </ImgDiv>
                    <List>Pneumatic Resources</List>
                </Div>
                <Div>
                    <ImgDiv>
                        <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/manufacturers%20resources.png" />
                    </ImgDiv>
                    <List>Manufacturer Resources</List>
                </Div>
                <Div>
                    <ImgDiv>
                        <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/other%20resources.png" />
                    </ImgDiv>
                    <List>Other Resources</List>
                </Div>
            </MainDiv>

        </Container>
    )
}
