// import React, { useState } from 'react'
// import styled from 'styled-components'
// import { Link, useHistory } from 'react-router-dom'

// const H2 = styled.h2`
//   color: #212529;
//   font-size: 34px;
//   font-weight: 500;
// `


// export default function FeaturedManufacturers(props) {
//   const [searchTerm, setSearchTerm] = useState('')

//   return(
//     <>
//       <H2>Featured Manufacturers</H2>

//     </>
//   )
// }

import React, { Component } from 'react'
import styled from 'styled-components'
import { H2 } from '../../_common/text'
import { LeftArrow, RightArrow, Slide } from './featuredManufacturersSubComponents'
import SectionHeader from '../../_common/sectionHeader.js'

const Thing = styled.div`
  margin-top: -6px;
  width: 40px;
  height: 5px;
  background-color: #DB1633;
  margin-bottom: 20px;
`

const DivSlider = styled.div`
  display: flex;
  width: 100%, 
  height: 300px,
  justify-content: space-between;
  align-items: center;
`
export default class Slider extends Component {
  state = {
    images: [
      "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured2.png",
      "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured3.png",
      "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured4.png",
      // "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured5.png",
      // "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured6.png",
      "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured11.png",
      "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured12.png",
      "https://www.airlinehyd.com/customer/aihyco/images/Home/Featured13.png"
    ],
    currentIndex: 0,
    translateValue: 0
  }

  goToPrevSlide = () => {

  }

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if(this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    
    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }

  slideWidth = () => {
     return document.querySelector('.slide').clientWidth
  }

  render() {
    return (
      <div>
        <SectionHeader
          text='Featured Manufacturers'
        />
        <DivSlider>
          <LeftArrow
          goToPrevSlide={this.goToPrevSlide}
          />
          {
            this.state.images.map((image, i) => (
              <Slide key={i} image={image} />
            ))
          }
          <RightArrow
          goToNextSlide={this.goToNextSlide}
          />
        </DivSlider>
      </div>
    );
  }
}