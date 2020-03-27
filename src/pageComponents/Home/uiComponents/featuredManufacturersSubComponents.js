import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DivSlideCard = styled.div`
  cursor: pointer;
  display: flex;
  width: 150px;
  height: 75px;
  padding: 8px 16px;
  align-items: center;
  margin: 0 8px;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  &:hover{
    box-shadow: 0 2px 2px rgba(0,0,0,.2);
  }
`
export const RightArrow = (props) => {
  return (
    <div onClick={props.goToNextSlide}>
      <FontAwesomeIcon icon='chevron-right' size='2x'/>
    </div>
  );
}

export const LeftArrow = (props) => {
  return (
    <div onClick={props.goToPrevSlide}>
      <FontAwesomeIcon icon='chevron-left' size='2x'/>
    </div>
  );
}

export const Slide = ({ image }) => {
  return ( 
    <DivSlideCard>
      <div>
        <img src={image} width='100%' />
      </div>
    </DivSlideCard> 
  )
}