import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: 10px 0;
`

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin: 5px 5px 0;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 17px;
  :before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    transform: translateX(13px);
  }
`

const Input = styled.input`
  :checked {
    background-color: #2196F3;
    transform: translateX(26px);
  }
  :focus {
    box-shadow: 0 0 1px #2196F3;
  }
`

export default function ToggleSwitch({ label, text, text2, toggled, setToggled }) {


  return (
    <Container>
      {label}
      <Label>
        <Input type='checkbox' checked={toggled} onClick={() => setToggled(!toggled)} />
        <Span></Span>
      </Label>
      {toggled ? text : text2}
    </Container>
  )
}

