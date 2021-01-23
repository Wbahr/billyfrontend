import React from 'react'
import Modal from '../modal'
import styled from 'styled-components'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'

const DivRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
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

export default function DeleteChickenModal({ open, hide, handleDelete, text }) {
  return (
    <Modal open={open} onClose={hide} contentStyle={{ 'maxWidth': '350px', 'borderRadius': '3px' }}>
      <Container>
        <p>{text}</p>
        <DivRow>
          <ButtonBlack onClick={hide}>Cancel</ButtonBlack>
          <ButtonRed onClick={handleDelete}>DELETE</ButtonRed>
        </DivRow>
      </Container>
    </Modal>
  )
}