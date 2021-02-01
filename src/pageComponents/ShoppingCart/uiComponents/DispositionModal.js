import React, { useState } from 'react'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'

const DivRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`

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

export default function DispositionModal(props) {

    const {
        open,
        hide,
        dispositions,
        cartItem,
        setCartItem,
    } = props

    const dispositionOptions = dispositions?.map(disposition => ({ label: disposition.text, value: disposition.value }))

    const [selectedDisposition, setSelectedDisposition] = useState(cartItem?.sourceLocId)
    const [alert, setAlert] = useState(null)

    function handleClose(){
        setAlert(null)
        hide()
    }

    const handleSaveDisposition = () => {
        if (!selectedDisposition) {
            setCartItem({ ...cartItem, disposition: null })
        } else {
            setCartItem({ ...cartItem, disposition: selectedDisposition })
        }
        hide()
    }

    const handleDispositionChange = (event) => {
        setSelectedDisposition(event.target.value)
    }

    return (
        <Modal open={open} onClose={handleClose} contentStyle={{ maxWidth: 350, borderRadius: 3 }}>
            <Container>
                <h4>Select Disposition</h4>
                {alert && <p>{alert}</p>}

                <DivItem>
                    <Label>Dispositions: </Label>
                    <select value={selectedDisposition} onChange={handleDispositionChange}>
                        { dispositionOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </DivItem>

                <DivRow>
                    <ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
                    <ButtonRed onClick={handleSaveDisposition}>Save</ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
