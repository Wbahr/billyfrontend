import React from 'react'
import styled from 'styled-components'
import BannerImg from './BannerImg'

const FeaturedBrandBg = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 80px 0;
  background-image: url('https://media.istockphoto.com/photos/white-silver-geometric-universal-background-for-business-presentation-picture-id1207126778?s=2048x2048');
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
