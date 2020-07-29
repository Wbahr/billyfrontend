import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CategoryBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 140px;
  cursor: pointer;
  margin: 0 16px 16px 16px;
  background-image: url('${props => props.image}');
  background-color: grey;
  font-family: ProximaBold;
  font-size: 20px;
  color: white;
`

export default function Category(props) {
  let {text, linkTo, image, ...rest } = props;
  return (
    <Link to={`${linkTo}`}>
      <CategoryBlock {...rest} image={image}>
        {text}  
      </CategoryBlock>
    </Link>
  );  
}

