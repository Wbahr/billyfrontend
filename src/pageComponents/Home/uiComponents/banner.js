import React from 'react'
import styled from 'styled-components'

const BannerContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 1400px;
  margin: 20px auto;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`
const Div0 = styled.div`
  margin: 10px 10px 10px 0;
  width: 600px;
  height: 320px;
`
const Div1 = styled.div`
  margin: 10px;
  background-color: red;
  width: 290px;
  height: 150px;
`
const Div3 = styled.div`
  margin: 10px;
  background-color: red;
  width: 290px;
  height: 150px;
`
const Div2 = styled.div`
  margin: 10px;
  background-color: grey;
  // width: 600px;
  height: 150px;
`
const Row = styled.div`
  display: flex;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
`
const Otto = styled.img`
  width: 100%;
  height: 100%;
`
const Img3 = styled.img`
  width: 100%;
  height: 100%;
`;

const Img4 = styled.img`
  width: 100%;
  height: 100%;
`;

class Banner extends React.Component {

  render(){
    return(
      <BannerContainer>
        <Col>
          <Div0><Img src="https://www.airlinehyd.com/customer/aihyco/images/Home/new_header_layout-2.jpg" /> </Div0>
        </Col>
        <Col>
          <Div2><Otto src="https://www.airlinehyd.com/customer/aihyco/images/Home/otto.jpg" /></Div2>
          <Row>
            <Div1><Img3 src="https://www.airlinehyd.com/customer/aihyco/images/Home/new_header_layout-3.jpg" /> </Div1>
            <Div3><Img4 src="https://www.airlinehyd.com/customer/aihyco/images/Home/new_header_layout-4.jpg" /> </Div3>
          </Row>
        </Col>
      </BannerContainer>
    )
  }
}

export default Banner