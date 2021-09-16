import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'
import ServiceHome from '../uiComponents/service'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Div = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
`
const ImgDiv = styled.div`
    display: flex;
    justify-content: center;
`
const Img = styled.img`
    width: 200px;
`
const DetailDiv = styled.div`
    display: flex;
    margin: 0 30px;
`
const Detail = styled.p`
    margin-bottom: 0;
    font-size: 14px;
`
const ServiceDiv = styled.div`
    margin: 10px 0;
`
export default function lubricationSystems() {
    return (
        <>
            <Header text="Lubrication Systems" />
            <Container>
                <ServiceHome text="Lubrication Systems" />
                <ServiceDiv>
                    <Div>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/icons/lubrication.png" />
                        </ImgDiv>
                        <DetailDiv>
                            <Detail>
                                As an authorized distributor for SKF/Lincoln, we stock a wide range of lubrication components and systems, but our engineering and fabrication departments will tailor this equipment for installation on specialized industrial systems and a wide range of mobile hydraulic equipment. We design customized automated lubrication systems to increase component life and reduce repairs on individual industrial machines or a complete process line. For mobile equipment, we maintain a library of ready-to-implement system designs, but can also design custom systems if required.
                            </Detail>
                        </DetailDiv>
                    </Div>
                    <Div>
                        <DetailDiv>
                            <Detail>
                                Our lubrication systems are highly efficient because they auto-feed lubricant from a central source to the friction points on a machine. Precise amounts of grease reach each bearing during normal course of operation, resulting in fewer shutdowns and production losses. In fact, the regularity and precision of automatic lubrication reduces bearing failures by more than 36% when compared to manual lubrication.                    
                            </Detail>
                        </DetailDiv>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/icons/lubrication2.png" />
                        </ImgDiv>
                    </Div>
                    <Div>
                        <ImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Graphics/images/icons/lubrication3.png" />
                        </ImgDiv>
                        <DetailDiv>
                            <Detail>
                                With our automatic lubrication systems, not only are repair and spare part costs reduced, significantly, but lubricant costs, are also dramatically reduced — as high as 70% — due to the accurate timing and measurement of lubricants. In addition, less man-hours are required, resulting in lower labor costs, and injury risks are lessened due to the elimination of the potentially hazardous practice of manual application to difficult-to-reach locations                    
                            </Detail>
                        </DetailDiv>
                    </Div>
                </ServiceDiv>
            </Container>
        </>
    )
}
