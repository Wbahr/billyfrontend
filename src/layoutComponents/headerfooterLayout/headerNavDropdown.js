import React from 'react'
import styled from 'styled-components'

const DivOption = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35px;
  border-top: 1px solid whitesmoke;
  // border-bottom: 1px solid whitesmoke;
  color: black;
  padding: 0 16px;
  opacity: 0.96;
  background-color: white;
  &:hover{
    opacity: 1;
    background-color: whitesmoke;
    color: #328EFC;
  }
`

export default function ImpersonationSearchComponent(props) {
  const {
    open,
    options,
    history
  } = props

  const Container = styled.div`
    visibility: ${open ? 'visible' : 'hidden'};
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    box-shadow: 0px 1px 1px #9f9f9f;
    border-radius: 0 3px 3px 3px;
  `

  const Links = options.map((option, index) => {
    return (
      <DivOption key={`impersonation-option-${index}`} onClick={() => {history.push(option.link)}}>
        {option.label}
      </DivOption>
    )
  })
  return (
    <Container>
      {Links}
    </Container>
  )
}