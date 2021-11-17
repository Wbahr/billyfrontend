import React, { useState } from 'react'
import Modal from '../../_common/modal'
import AirlineInput from '../../_common/form/inputv2'
import CustomSelect from '../../_common/form/select'
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

const MarginBottomDiv = styled.div`
  margin-bottom: 5px;
`

export default function DispositionModal(props) {

    const {
        open,
        hide,
        dispositions,
        cartItem,
        setCartItem,
        supplierOptions,
        airlineCost,
        supplierId,
        purchaseOrderCost
    } = props

    const dispositionOptions = dispositions?.map(disposition => ({ label: disposition.text, value: disposition.value, key: disposition.value }))
    
    const [cost, setCost] = useState(purchaseOrderCost || airlineCost)
    const [selectedSupplier, setSelectedSupplier] = useState(supplierId)
    const [selectedDisposition, setSelectedDisposition] = useState(cartItem?.disposition || '')
    const [alert, setAlert] = useState(null)

    function handleClose(){
        setAlert(null)
        hide()
    }

    const handleSaveDisposition = () => {
        if (!selectedDisposition) {
            setCartItem({ ...cartItem, disposition: null })
        } else if (['S', 'D'].includes(selectedDisposition)) {
            setCartItem({ ...cartItem, disposition: selectedDisposition, supplierId: `${selectedSupplier}`, purchaseOrderCost: cost })
        } else {
            setCartItem({ ...cartItem, disposition: selectedDisposition })
        }
        hide()
    }

    const saveDisabled = ['S', 'D'].includes(selectedDisposition) && !selectedSupplier

    return (
        <Modal open={open} onClose={handleClose} contentStyle={{ maxWidth: 350, borderRadius: 3 }}>
            <Container>
                <h4>Select Disposition</h4>
                {alert && <p>{alert}</p>}

                <DivItem>
                    <Label>Dispositions: </Label>
                    <CustomSelect 
                        value={dispositionOptions.filter(o => o.value === selectedDisposition)} 
                        setValue={setSelectedDisposition}
                        options={dispositionOptions}
                    />
                </DivItem>
                
                {['S', 'D'].includes(selectedDisposition) && (
                    <>
                        <DivItem>
                            <Label>Supplier: </Label>
                            <CustomSelect 
                                value={supplierOptions.filter(o => o.value === selectedSupplier)} 
                                setValue={setSelectedSupplier}
                                options={supplierOptions}
                            />
                        </DivItem>
                    
                        <MarginBottomDiv>
                            <DivItem>
                                <Label>PO Cost: </Label>
                                <AirlineInput
                                    type="number"
                                    value={cost}
                                    width='100px'
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </DivItem>
                        </MarginBottomDiv>
                    </>
                )}
                <DivRow>
                    <ButtonBlack onClick={handleClose}>Cancel</ButtonBlack>
                    <ButtonRed onClick={handleSaveDisposition} disabled={saveDisabled}>Save</ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
