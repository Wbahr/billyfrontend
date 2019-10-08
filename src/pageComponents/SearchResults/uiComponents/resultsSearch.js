import React from 'react'
import styled from 'styled-components'

const DivResultsSearch = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const InputSearch = styled.input`
  width: 300px;
  height: 30px;
  font-size: 14px;
  border-width: 1px 0px 1px 1px;
  padding: 0 4px;
`

const ButtonSearch = styled.button`
  width: 70px;
  height: 30px;
  background-color: rgb(219, 22, 51);
  color: white;
  border: 0;
  font-size: 14px;
`


export default function ResultsSearch(props) {
  return(
    <DivResultsSearch>
      <InputSearch placeholder="Search within these results"/><ButtonSearch>Search</ButtonSearch>
    </DivResultsSearch>
  )
}