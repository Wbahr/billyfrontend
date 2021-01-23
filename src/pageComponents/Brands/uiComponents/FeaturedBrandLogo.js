import React from 'react'
import styled from 'styled-components'
import BannerImg from './BannerImg'

const FeaturedBrandBg = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 80px 0;
  background-image: url('https://airlinemedia.airlinehyd.com/Static_pages/Brands/brands-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  `

export default function FeaturedBrandLogo(props) {
  return (
    <FeaturedBrandBg>
      <BannerImg src={props.src}/>
    </FeaturedBrandBg>
  )
}
