import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CategoryBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 350px;
  height: 160px;
  cursor: pointer;
  margin: 0 16px 16px 16px;
  border: 3px solid ${props => props.theme.backgroundColor};
  padding: 3px;
  margin: 3px;
  font-family: ${props => props.theme.fancyFontNameBold};
  font-size: 20px;
  color: black;
  border-radius: 8px;
  img {
      margin-right: 5px;
      max-height: 150px;
      max-width: 150px;
  }
  section {
      display: block;
      text-align: center;
      width: 200px;
  }
`

export default function Category(props) 
{
  const {text, linkTo, image, ...rest } = props;
  return (
    <Link to={`${linkTo}`}>
      <CategoryBlock {...rest}>
        <img src={image} alt={text} title={text} />
        <section>{text}</section>
      </CategoryBlock>
    </Link>
  );  
}