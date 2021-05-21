import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CategoryBlock = styled.div`
  display: flex;
  flex-direction: ${props => props.size === 'small' ? 'column' : 'row'};
  align-items: center;
  justify-content: ${props => props.size === 'small' ? 'center' : 'center'};
  width: ${props => props.size === 'small' ? '200px' : '350px'};
  height: ${props => props.size === 'small' ? 'auto' : '160px'};
  cursor: pointer;
  border: ${props => props.size === 'small' ? '' : `3px solid ${props.theme.backgroundColor}`};
  transition: 0.2s;
  &:hover {
	transform: translate(0, -4px);	
  }
  padding: 3px;
  margin: 7px;
  font-family: ${props => props.theme.GeneralFontName};
  font-size: 16px;
  color: black;
  border-radius: 5px;
  img {
      margin: 0 8px;
      max-width: ${props => props.size === 'small' ? '100px' : '120px'};
      width: ${props => props.size === 'small' ? '100%' : '100%'};

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

const H3 = styled.h3`
  font-size: 20px;
  text-align: center;
  padding: 0 20px;
`

export default ({ size, text, linkTo, Image, ...rest }) => {
    return (
        <Link to={linkTo || '#'}>
            <CategoryBlock {...{ ...rest, size }}>
                {Image}
                <H3>{text}</H3>
            </CategoryBlock>
        </Link>
    )
}