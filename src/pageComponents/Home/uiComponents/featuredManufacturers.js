import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import { H2 } from '../../_common/text'
import SectionHeader from '../../_common/sectionHeader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery';
// const Thing = styled.div`
//   margin-top: -6px;
//   width: 40px;
//   height: 5px;
//   background-color: #DB1633;
//   margin-bottom: 20px;
// `

// const DivSlider = styled.div`
//   display: flex;
//   max-width: 1200px;
//   width: 100%, 
//   height: 300px,
//   justify-content: space-between;
//   align-items: center;

// `
// export default class Slider extends Component {
//   state = {
//     images: [
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured2.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured3.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured4.png",
//       // "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured5.png",
//       // "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured6.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured13.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png",
//       "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png"
//     ],
//     currentIndex: 0,
//     translateValue: 0
//   }

//   goToPrevSlide = () => {

//   }

//   goToNextSlide = () => {
//     // Exiting the method early if we are at the end of the images array.
//     // We also want to reset currentIndex and translateValue, so we return
//     // to the first image in the array.
//     if(this.state.currentIndex === this.state.images.length - 1) {
//       return this.setState({
//         currentIndex: 0,
//         translateValue: 0
//       })
//     }

//     // This will not run if we met the if condition above
//     this.setState(prevState => ({
//       currentIndex: prevState.currentIndex + 1,
//       translateValue: prevState.translateValue + -(this.slideWidth())
//     }));
//   }

//   slideWidth = () => {
//      return document.querySelector('.slide').clientWidth
//   }

//   render() {
//     return (
//       <div>
//         <SectionHeader
//           text='Featured Manufacturers'
//         />
//         <DivSlider>
//           <LeftArrow
//           goToPrevSlide={this.goToPrevSlide}
//           />
//           {
//             this.state.images.map((image, i) => (
//               <Slide key={i} image={image} />
//             ))
//           }
//           <RightArrow
//           goToNextSlide={this.goToNextSlide}
//           />
//         </DivSlider>
//       </div>
//     );
//   }
// }

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

`;


const Brandsdiv = styled.div`
height: 120px;
  width: 150px;
  // border-radius: 50%;
  font-size: 25px;
  // background: blue;
  margin: 20px 40px;
  display: inline-block;
 display: flex;
 align-items: center;

`;


const ImgSlide = keyframes`
0%{
  transform: translate3d(0, 0, 0);
}
100%{
  transform: translate3d(-3000px, 0, 0);
}

`;

const LogoImg = styled.img`
width: 150px;
height: auto;
animation: ${ImgSlide} 60s linear infinite;

`;
const divStyle = {
  // verticalAlign: "middle",
  // display: "inline-block",
  // whiteSpace: "nowrap",
  overflowX: "hidden",
  overflowY: "hidden",
  width: "70%",
  display: "flex"
};

const IconDiv = styled.div`
  // padding-top: 10px;
  // padding-bottom: 10px;
  // height: 100%;
  cursor: pointer;
  color: black;
  transition: 0.6s ease;
  margin: 0 25px;
  &:hover{
    color: #555555;
    height: 100%;
   
  }
`;

const A = styled.a`

`;



const P = styled.p`
  font-size: 25px;
  text-align: center;
  margin: 0;
  width: 150px;
`;



export default class Slider extends Component {
  constructor() {
    super()
    this.scroll = this.scroll.bind(this)
  }

  scroll(direction) {
    const far = $(".image-container").width() / 2 * direction;
    const pos = $(".image-container").scrollLeft() + far;
    $(".image-container").animate({ scrollLeft: pos }, 1000)
  }


  render() {
    return (
      <>
        <SectionHeader
          text='Featured Manufacturers'
        />

        <Wrapper>
          <IconDiv><A onClick={this.scroll.bind(null, -1)}> <FontAwesomeIcon icon='chevron-left' size='2x' /></A></IconDiv>
          <div className="image-container" style={divStyle}>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured2.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured3.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured4.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured5.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured6.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured7.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured8.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured9.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured10.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured13.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured14.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured15.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured16.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured17.png" /></A></Brandsdiv>
            <Brandsdiv><A href=""><LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/Home/Featured18.png" /></A></Brandsdiv>
            {/* <Brandsdiv><A href="#"> <P>All Brands</P></A></Brandsdiv> */}
          </div>

          <IconDiv><A onClick={this.scroll.bind(null, 1)}><FontAwesomeIcon icon='chevron-right' size='2x' /></A></IconDiv>

        </Wrapper>


      </>
    )
  };
}