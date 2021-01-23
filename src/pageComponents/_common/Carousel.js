import { useRef } from 'react'
import { scrollHorizontal } from './helpers/generalHelperFunctions'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const LeftScrollControl = styled.div`
	position: absolute;
	left: 10px;
	height: 160px;
	display: flex;
	align-items: center;
	background-color: #e6e6e6;
	border-radius: 5px;
	cursor: pointer;
	opacity: .5;
	transition: opacity 250ms ease-out;
`

const RightScrollControl = styled.div`
	position: absolute;
	right: 10px;
	height: 160px;
	display: flex;
	align-items: center;
	background-color: #e6e6e6;
	border-radius: 5px;
	cursor: pointer;
	opacity: .5;
	transition: opacity 250ms ease-out;
`

const DivRow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	padding: 0 15px;
	overflow-X: auto;
	&:hover ${RightScrollControl} {
		opacity: 1;
	}
	&:hover ${LeftScrollControl} {
		opacity: 1;
	}
`

export default function Carousel({ children, scrollDeltaOverride, ...props }) {
  const carouselRef = useRef(null)
	
  const scrollLeft = () => {
    const carouselScrollDelta = scrollDeltaOverride || window.innerWidth * .65
    scrollHorizontal(carouselRef.current, -carouselScrollDelta, 500)
  }
	
  const scrollRight = () => {
    const carouselScrollDelta = scrollDeltaOverride || window.innerWidth * .65
    scrollHorizontal(carouselRef.current, carouselScrollDelta, 500)
  }
	
  return (
    <DivRow ref={carouselRef} {...props}>
      {children}
			
      <LeftScrollControl onClick={scrollLeft}>
        <ChevronLeft size="large"/>
      </LeftScrollControl>
			
      <RightScrollControl onClick={scrollRight}>
        <ChevronRight size="large"/>
      </RightScrollControl>
    </DivRow>
  )
}