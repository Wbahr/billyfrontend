import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function QuoteProgress({stepLabels, step, clickMoveToStep}) {

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
      color: #7d7d7d; 
    }

    li:before {
      width: 20px;
      height: 20px;
      content: '';
      line-height: 20px;
      border: 2px solid #7d7d7d;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
      background-color: white;
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

  const LiSelected = styled.li`
    color: #535353 !important; 
    font-weight: 500;
    :before {
      border-color: #007bff !important;
    }
  `

  let Steps = stepLabels.map((stepName, index) =>{
    if (index === step) {
      return(<LiSelected onClick={()=>clickMoveToStep(index)}>{stepName}</LiSelected>)
    } else {
      return(<li onClick={()=>clickMoveToStep(index)}>{stepName}</li>)
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