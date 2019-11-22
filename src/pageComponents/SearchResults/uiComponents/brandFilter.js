import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition } from "react-transition-group"

const DivTitle = styled.div`
  display: flex;
  cursor: pointer;
  width: 280px;
  height: 36px;
  padding: 0 16px;
  background-color: #f3f3f3;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`
const DivOptions = styled.div`
  display: flex; 
  flex-direction: column;
  margin-left: 16px;
  background: ${({ state }) => {
      switch (state) {
        case "entering":
          return "red"
        case "entered":
          return "blue"
        case "exiting":
          return "green"
        case "exited":
          return "yellow"
      }
    }
  }
`

const DivOptionRow = styled.div`
  display: flex; 
  align-items: center;
  margin: 8px 0 0 24px;
`

const P = styled.p`
  margin: 0;
`

const Acategory = styled.p`
  cursor: pointer;
  margin: 0;
  color: #535353;
  font-size: 12px;
  :hover{
    color: #0056b3;
  }
`

const Label = styled.label`
  margin-bottom: 0;
  margin-left: 4px;
`

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

// export default function AttributeFilter({filterName, filterOptions, openByDefault}) {
export default function BrandFilter() {
  const [isOpen, setIsOpen] = useState(false)

  let FilterName = 'Brand'
  let FilterOptions = ['Circuit Protection', 'Industrial Controls', 'Pneumatics', 'Power Products', 'Sensors']
  let AttributeOptions = _.map(FilterOptions, option => {
    return (
      <DivOptionRow>
        <Acategory>{option}</Acategory>
      </DivOptionRow>
    )
  })

  return(
    <>
      <DivTitle onClick={()=>(setIsOpen(!isOpen))}>
        <P>{FilterName}</P>
        {isOpen ?  <FontAwesomeIcon icon="caret-up" color="black"/> : <FontAwesomeIcon icon="caret-down" color="black"/>}
      </DivTitle>
      {/* <Transition in={isOpen} timeout={300}>
        {state => (
          <DivOptions state={state}>{AttributeOptions}</DivOptions>
        )}
      </Transition> */}
      {isOpen && AttributeOptions}
    </>
  )
}