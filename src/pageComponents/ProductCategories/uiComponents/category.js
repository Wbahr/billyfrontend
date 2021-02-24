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
  &:hover {
      border: ${props => props.size === 'small' ? '' : `3px solid ${props.theme.mainColor}`};
  }
  padding: 3px;
  margin: 7px;
  font-family: ${props => props.theme.GeneralFontName};
  font-size: 16px;
  color: black;
  border-radius: 5px;
  img {
      margin: 0 8px;
      max-height: ${props => props.size === 'small' ? '100px' : '150px'};
      max-width: ${props => props.size === 'small' ? '100%' : '100%'};
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

export default ({ size, text, linkTo, Image, ...rest }) => {
    return (
        <Link to={linkTo || '#'}>
            <CategoryBlock {...{ ...rest, size }}>
                {Image}
                <section>{text}</section>
            </CategoryBlock>
        </Link>
    )
}