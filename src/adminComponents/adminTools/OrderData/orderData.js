import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import AirlineInput from '../../../pageComponents/_common/form/inputv2'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

const DivSearchInputWrapper = styled.div`
  max-width: 500px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px auto;
  button {
    margin: 0 16px;
  }
`

const DivSpacer = styled.div`
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
`

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1600px;
  margin: 28px auto;
  flex-grow: 99;
  align-items: center;
`

export default function OrderJSONpage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [orderJson, setOrderJson] = useState('')

  return(
    <ContentScreenContainer>
      <DivSearchInputWrapper>
      <DivSpacer>
        <AirlineInput 
          label="Order Number:"
          type="text"
          placeholder="Enter Order Number"
          name="orderNumber"
          value={orderNumber}
          onChange={e => setOrderNumber(e.target.value)}
        />
      </DivSpacer>
    </DivSearchInputWrapper>
    <ButtonContainer>
      <Button variant="contained" color="secondary" disabled={false} onClick={() => setOrderNumber('')}>
        Clear
      </Button>
      <Button variant="contained" color="primary" disabled={false} onClick={() => {searchItems()}}>
        {false ? 'Searching..' : 'Get Data'}
      </Button>
    </ButtonContainer>
    <Editor
      value={orderJson}
      onChange={()=>console.log('changed')}
    />
  </ContentScreenContainer>
  )
}
