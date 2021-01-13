import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CategoryBlock = styled.div`
  display: flex;
  flex-direction: ${props => props.size === 'small' ? 'column' : 'row'};
  align-items: center;
  justify-content: ${props => props.size === 'small' ? 'center' : 'left'};
  width: ${props => props.size === 'small' ? '200px' : '350px'};
  height: ${props => props.size === 'small' ? 'auto' : '160px'};
  cursor: pointer;
  border: ${props => props.size === 'small' ? '' : `3px solid ${props.theme.backgroundColor}`};
  &: hover {
      border: ${props => props.size === 'small' ? '' : `3px solid ${props.theme.mainColor}`};
  }
  padding: 3px;
  margin: 3px;
  font-family: ${props => props.theme.fancyFontNameBold};
  font-size: 20px;
  color: black;
  border-radius: 8px;
  img {
      margin-right: 5px;
      height: ${props => props.size === 'small' ? '100px' : '150px'};
      width: ${props => props.size === 'small' ? '100px' : '150px'};
  }
  section {
      display: block;
      text-align: center;
      width: ${props => props.size === 'small' ? 'auto' : '200px'};
  }
  @media (max-width: 355px) {
    width: min-content;
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
`

export default ({size, text, linkTo, Image, ...rest }) => {
  return (
    <Link to={linkTo}>
      <CategoryBlock {...{...rest, size}}>
        {Image}
        <section>{text}</section>
      </CategoryBlock>
    </Link>
  );
}