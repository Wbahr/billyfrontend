import React from 'react'
import styled from 'styled-components'

const HeaderDetail = styled.div`
    display: flex;
    flex-direction: column;
`
const Title = styled.p`
    font-weight: bold;
`
export default function productLayout(props) {
  const {
    text,
    title,
  } = props
  return (
    <>
      <HeaderDetail>
        <Title>{title}</Title>
        <p>{text}</p>
      </HeaderDetail>
    </>
  )
}
