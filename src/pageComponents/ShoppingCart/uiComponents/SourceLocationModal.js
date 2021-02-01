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

export default function SourceLocationModal(props) {

    const {
        open,
        hide,
        sourceLocations,
        cartItem,
        setCartItem,
    } = props

    const sourceLocOptions = sourceLocations?.map(loc => ({ label: loc.sourceLocId, value: loc.sourceLocId }))

    const [selectedSourceLoc, setSelectedSourceLoc] = useState(cartItem?.sourceLocId)
    const [alert, setAlert] = useState(null)

    function handleClose(){
        setAlert(null)
        hide()
    }

    const handleSaveSourceLoc = () => {
        if (selectedSourceLoc === '2100') {
            setCartItem({ ...cartItem, sourceLocId: null })
        } else {
            setCartItem({ ...cartItem, sourceLocId: selectedSourceLoc })
        }
        hide()
    }

    const handleSourceLocChange = (event) => {
        setSelectedSourceLoc(event.target.value)
    }

    return (
        <Modal open={open} onClose={handleClose} contentStyle={{ maxWidth: 350, borderRadius: 3 }}>
            <Container>
                <h4>Select Source Location</h4>
                {alert && <p>{alert}</p>}

                <DivItem>
                    <Label>Source Locations: </Label>
                    <select value={selectedSourceLoc} onChange={handleSourceLocChange}>
                        { sourceLocOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </DivItem>

                <DivRow>
                    <ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
                    <ButtonRed onClick={handleSaveSourceLoc}>Save</ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
