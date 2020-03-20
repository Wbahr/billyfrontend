import React from 'react'
import styled from 'styled-components'
import Background1 from '../../../imgs/homepage/new_header_layout-2.jpg';
import Background2 from '../../../imgs/homepage/otto.jpg'
import Background3 from '../../../imgs/homepage/new_header_layout-3.jpg';
import Background4 from '../../../imgs/homepage/new_header_layout-4.jpg';



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
  width: 600px;
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
          <Div0><Img src={Background1} /> </Div0>
        </Col>
        <Col>
          <Div2><Otto src={Background2} /></Div2>
          <Row>
            <Div1><Img3 src={Background3} /> </Div1>
            <Div3><Img4 src={Background4} /> </Div3>
          </Row>
        </Col>
      </BannerContainer>
    )
  }
}

export default Banner