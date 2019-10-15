import React from 'react'
import styled from 'styled-components'

const DivPaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 0 20px 0;
`

const Div = styled.div`
  cursor: pointer;
  border: 3px #f3f3f3 solid;
  padding: 0 4px;
  margin: 0 4px;
`

const DivAction = styled.div`
  cursor: pointer;
  border: 3px #f3f3f3 solid;
  margin: 0 4px;
`

const DivSelected = styled(Div)`
  border-color: #404040;
  // color: white;
`

export default function Paginator({resultSize, resultPage, totalResults}) {

  return(
    <DivPaginatorContainer>
      <DivAction>First</DivAction>
      <Div>{resultPage}</Div>
      <DivSelected>{resultPage + 1}</DivSelected>
      <Div>{resultPage + 2}</Div>
      <Div>{resultPage + 3}</Div>
      <Div>{resultPage + 4}</Div>
      <DivAction>Next</DivAction>
    </DivPaginatorContainer>
  )
}