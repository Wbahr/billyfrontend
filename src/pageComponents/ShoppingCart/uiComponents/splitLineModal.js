import React, { useState } from 'react'
import Modal from '../../_common/modal'
import styled from 'styled-components'
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

export default function SplitLineModal({ open, index, hideSplitLineModal, cart, setCart }) {
  const [lineCount, setLineCount] = useState(1)
  const [lineQuantity, setLineQuantity] = useState(1)

  function handleClose(){
    hideSplitLineModal()
    setLineCount(1)
    setLineQuantity(1)
  }
	
  function splitItem() {
    const splitItems = []
    for (let i = 0; i < lineCount; i++) {
      splitItems.push({
        frecno: cart[index].frecno,
        quantity: parseInt(lineQuantity),
        itemNotes: cart[index].itemNotes,
      })
    }
    const frontCart = cart?.slice(0, index) || []// returns cart item before split item
    const backCart = cart?.slice(index + 1) || [] // returns cart item after split item
    setCart([...frontCart, ...splitItems, ...backCart])
  }
	
  const handleSplitClick = () => {
    splitItem()
    handleClose()
  }
  
  return (
    <Modal open={open} onClose={handleClose} contentStyle={{ maxWidth: 350, borderRadius: 5 }}>
      <Container>
        <h4>Split Line</h4>
        <DivItem>
          <Label>Line Count: </Label><input value={lineCount} style={{ width: 100 }} onChange={(e) => setLineCount(e.target.value)}/>
        </DivItem>
        <DivItem>
          <Label>Quantity per Line: </Label><input value={lineQuantity} style={{ width: 100 }} onChange={(e) => setLineQuantity(e.target.value)}/>
        </DivItem>
        <ButtonBlack onClick={handleSplitClick}>Split</ButtonBlack>
      </Container>
    </Modal>
  )
}