import React, { useState, useContext } from 'react'
import Context from '../../../setup/context'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Row = styled.div`
  display: flex;
`

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

const CloseIconDiv = styled.div`
    margin-left: 8px;
    cursor: pointer;
`

const CREATE_PART_NUMBER = gql`
  mutation($part: CustomerPartNumberInput) {
    customerPartNumber(customerPartNumber: $part){
      xrefId
      itemCode
      theirItemId
      success
      message
    }
  }
`

export default function CustomerPartModal({ open, setOpen, invMastUid, selectCustomerPartNumber, selectedCustomerPartNumber, customerPartNumbers, clearCustomerPartNumber }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [partNumber, setPartNumber] = useState('')
    const [alert, setAlert] = useState(null)
    const { addCustomerPartNumber } = useContext(Context)

    const resetModal = () => {
        setAlert(null)
        setPartNumber('')
        setOpen && setOpen(false)
        setModalOpen(false)
    }

    const handleCancel = () => {
        if (!saving) {
            resetModal()
            selectCustomerPartNumber(0)
        }
    }

    const [createPartNumber, { loading: saving }] = useMutation(CREATE_PART_NUMBER, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ customerPartNumber }) => {
            if (customerPartNumber.success) {
                setAlert(`Successfully created ${customerPartNumber.theirItemId}`)
                addCustomerPartNumber({ id: customerPartNumber.xrefId, customerPartNumber: customerPartNumber.theirItemId, invMastUid })
                selectCustomerPartNumber(customerPartNumber.xrefId)
                resetModal()
            } else {
                setPartNumber('')
                setAlert(customerPartNumber.message)
            }
        }
    })

    function handleSubmitPartNumber() {
        createPartNumber({
            variables: {
                part: {
                    invMastUid,
                    theirItemId: partNumber.trim()
                }
            }
        })
    }

    const handleSelectCustomerPartNumber = ({ target: { value } }) => {
        if (value === '-1') setModalOpen(true)
        selectCustomerPartNumber(value)
    }

    const handlePartNumberChange = ({ target: { value } }) => setPartNumber(value.replace(/[^A-Za-z0-9 -.,/=:#]/, ''))

    const isDuplicate = customerPartNumbers?.some(cpn => cpn.customerPartNumber === partNumber)
    const isEmpty = !partNumber.trim().length

    return (
        <>
            <Row>
                <select value={selectedCustomerPartNumber || 0} onChange={handleSelectCustomerPartNumber}>
                    <option value="0">Customer Part#</option>
                    {customerPartNumbers?.map(elem =>
                        <option key={elem.id} value={elem.id}>{elem.customerPartNumber}</option>
                    )}
                    <option value="-1">Create Part#</option>
                </select>

                {selectedCustomerPartNumber !== 0 && (
                    <CloseIconDiv onClick={clearCustomerPartNumber}>
                        <FontAwesomeIcon icon="times" color="grey" />
                    </CloseIconDiv>
                )}
            </Row>

            <Modal
                open={modalOpen || open}
                onClose={resetModal}
                contentStyle={{ maxWidth: 350, borderRadius: 3 }}
            >
                <Container>
                    <h4>Add Part Number</h4>
                    {alert && <p>{alert}</p>}

                    <DivItem>
                        <Label>Part Number: </Label>
                        <AirlineInput
                            value={partNumber}
                            disabled={saving}
                            width='200px'
                            onChange={handlePartNumberChange}
                        />
                    </DivItem>

                    {isDuplicate && (
                        <DivItem style={{ color: 'red' }}>
                            This number exists for this part already
                        </DivItem>
                    )}

                    <DivRow>
                        <ButtonBlack disabled={saving} onClick={handleCancel}>Cancel</ButtonBlack>
                        <ButtonRed disabled={saving || isDuplicate || isEmpty} onClick={handleSubmitPartNumber}>{saving ? 'Saving' : 'Save'}</ButtonRed>
                    </DivRow>
                </Container>
            </Modal>
        </>
    )
}
