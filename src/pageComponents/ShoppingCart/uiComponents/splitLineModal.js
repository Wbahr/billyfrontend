import React, { useState } from 'react'
import _ from 'lodash'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import Context from '../../../config/context'
import { ButtonBlack } from '../../../styles/buttons'

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin: 0;
  font-size: 12px;
  font-style: italic;
`

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

export default function SplitLineModal({open, index, hideSplitLineModal}) {
  const [lineCount, setLineCount] = useState(1)
  const [lineQuantity, setLineQuantity] = useState(1)

  function handleClose(){
    hideSplitLineModal()
    setLineCount(1)
    setLineQuantity(1)
  }
  
  return(
    <Popup open={open} onClose={()=>handleClose()} closeOnDocumentClick contentStyle={{'max-width': '350px', 'border-radius': '5px'}}>
      <Container>
        <h4>Split Line</h4>
        <DivItem>
          <Label>Line Count: </Label><input value={lineCount} style={{'width': '100px'}} onChange={(e)=> setLineCount(e.target.value)}/>
        </DivItem>
        <DivItem>
          <Label>Quantity per Line: </Label><input value={lineQuantity} style={{'width': '100px'}} onChange={(e)=> setLineQuantity(e.target.value)}/>
        </DivItem>
        <Context.Consumer>
          {({splitItem}) => (
            <ButtonBlack onClick={()=>{
              splitItem(index,lineCount,lineQuantity)
              handleClose()
            }}>Split</ButtonBlack>
          )}
        </Context.Consumer>
      </Container>
    </Popup>
  )
}