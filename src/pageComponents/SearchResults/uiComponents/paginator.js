import React, { useState, useEffect } from 'react'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(true)
  const [currentPageSet, setCurrentPageSet] = useState(1)
  const [resultPageOption1, setResultPageOption1] = useState(1)
  const [resultPageOption2, setResultPageOption2] = useState(2)
  const [resultPageOption3, setResultPageOption3] = useState(3)
  const [resultPageOption4, setResultPageOption4] = useState(4)
  const [resultPageOption5, setResultPageOption5] = useState(5)

  useEffect(() => {
    if(currentPage > 1){
      let increment
      if (direction){
        increment = 5
      } else {
        increment = -5
      }
      setResultPageOption1(resultPageOption1 + increment)
      setResultPageOption2(resultPageOption2 + increment)
      setResultPageOption3(resultPageOption3 + increment)
      setResultPageOption4(resultPageOption4 + increment)
      setResultPageOption5(resultPageOption5 + increment)
    }
  }, [currentPageSet])

  function handleSetCurrentPage(change){
    switch(change){
      case 'prev':
        setCurrentPage(currentPage - 1)
        if(currentPage%5 === 0){
          setDirection(false)
          setCurrentPage(currentPageSet - 1)
        }
        break
      case 'next':
        setCurrentPage(currentPage + 1)
        if(currentPage%5 === 0){
          setDirection(true)
          setCurrentPageSet(currentPageSet + 1)
        }
        break
      default:
        setCurrentPage(change)
    }
  } 
 
  return(
    <DivPaginatorContainer>
      <DivAction onClick={() => handleSetCurrentPage('prev')}>Prev</DivAction>
      {(currentPage === resultPageOption1) ? <DivSelected onClick={() => handleSetCurrentPage(resultPageOption1)}>{resultPageOption1}</DivSelected> : <Div onClick={() => handleSetCurrentPage(resultPageOption1)}>{resultPageOption1}</Div>}
      {(currentPage === resultPageOption2) ? <DivSelected onClick={() => handleSetCurrentPage(resultPageOption2)}>{resultPageOption2}</DivSelected> : <Div onClick={() => handleSetCurrentPage(resultPageOption2)}>{resultPageOption2}</Div>}
      {(currentPage === resultPageOption3) ? <DivSelected onClick={() => handleSetCurrentPage(resultPageOption3)}>{resultPageOption3}</DivSelected> : <Div onClick={() => handleSetCurrentPage(resultPageOption3)}>{resultPageOption3}</Div>}
      {(currentPage === resultPageOption4) ? <DivSelected onClick={() => handleSetCurrentPage(resultPageOption4)}>{resultPageOption4}</DivSelected> : <Div onClick={() => handleSetCurrentPage(resultPageOption4)}>{resultPageOption4}</Div>}
      {(currentPage === resultPageOption5) ? <DivSelected onClick={() => handleSetCurrentPage(resultPageOption5)}>{resultPageOption5}</DivSelected> : <Div onClick={() => handleSetCurrentPage(resultPageOption5)}>{resultPageOption5}</Div>}
      <DivAction onClick={() => handleSetCurrentPage('next')}>Next</DivAction>
    </DivPaginatorContainer>
  )
}