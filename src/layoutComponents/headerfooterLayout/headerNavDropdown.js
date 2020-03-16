import React, { useState, useContext } from 'react'
import styled from 'styled-components'

const DivOption = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-top: 1px solid whitesmoke;
  // border-bottom: 1px solid whitesmoke;
  color: black;
  padding: 0 16px;
  &:hover{
    background-color: whitesmoke;
  }
`

export default function ImpersonationSearchComponent(props) {
  const {
    open,
    options,
    history
  } = props

  const Container = styled.div`
    visibility: ${open ? "visible" : "hidden"};
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: white;
    box-shadow: 0px 1px 1px #9f9f9f;
    border-radius: 0 3px 3px 3px;
  `

  let Links = options.map(option=>{
    return(
      <DivOption onClick={()=>{history.push(option.link)}}>
        {option.label}
      </DivOption>
    )
  })
  return(
    <Container>
      {Links}
    </Container>
  )
}