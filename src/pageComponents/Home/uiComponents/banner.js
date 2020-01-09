import React from 'react'
import styled from 'styled-components'

const BannerContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 1400px;
  margin: 12px auto 0 auto;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Div0 = styled.div`
  margin: 10px;
  background-color: grey;
  width: 600px;
  height: 320px;
`

const Div1 = styled.div`
  margin: 10px;
  background-color: grey;
  width: 290px;
  height: 150px;
`

const Div2 = styled.div`
  margin: 10px;
  background-color: grey;
  width: 600px;
  height: 150px;
`
const Row = styled.div`
  display: flex;
`
class Banner extends React.Component {

  render(){
    return(
      <BannerContainer>
        <Col>
          <Div0/> 
        </Col>
        <Col>
          <Div2/> 
          <Row>
            <Div1/> 
            <Div1/> 
          </Row>
        </Col>
      </BannerContainer>
    )
  }
}

export default Banner