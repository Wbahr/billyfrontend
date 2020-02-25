import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CheckoutProgress({stepLabels, step, clickMoveToStep, stepValidated}) {

  const UlProgressBar = styled.ul`
    margin: 0;
    
    li {
      cursor: pointer;
      list-style-type: none;
      width: 25%;
      float: left;
      font-size: 12px;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      color: #535353; 
    }

    li:before {
      width: 20px;
      height: 20px;
      content: '';
      line-height: 20px;
      border: 2px solid #535353;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
    }

    li:after {
      width: 100%;
      height: 2px;
      content: '';
      position: absolute;
      background-color: #7d7d7d;
      top: 10px;
      left: -50%;
      z-index: -1;
    }

    li:first-child:after {
      content: none;
    }
  ` 

  // const [stepValidated, setStepValidated] = useState(
  //   {
  //     0: false,
  //     1: false,
  //     2: false,
  //     3: false
  //   }
  // )

  let Steps = stepLabels.map((stepName, index) =>{
    let LI = styled.li`
      :before {
        background-color: ${stepValidated[index] ? "#afd5ff" : "white"};
      }
    `

    const LiSelected = styled.li`
    color: #535353 !important; 
    font-weight: 500;
    :before {
      border-color: #535353 !important;
      background-color: ${stepValidated[index] ? "#afd5ff" : "white"};
    }
  `

    if (index === step) {
      return(<LiSelected onClick={()=>clickMoveToStep(index)}>{stepName}</LiSelected>)
    } else {
      return(<LI onClick={()=>clickMoveToStep(index)}>{stepName}</LI>)
    }
  })
  return(
    <>
      <UlProgressBar>
        {Steps}
      </UlProgressBar>
    </>
  )
}