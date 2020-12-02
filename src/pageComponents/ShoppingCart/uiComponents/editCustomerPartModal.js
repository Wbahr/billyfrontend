import React, { useState, useContext } from 'react'
import Context from '../../../config/context'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../../_common/form/inputv2'

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

export default function EditCustomerPartNumberModal({open, index, hideCustomerPartModal, invMastUid, selectCustomerPartNumber}) {
	const [partNumber, setPartNumber] = useState('')
	const [alert, setAlert] = useState(null)
	const {addCustomerPartNumber} = useContext(Context)

	const [createPartNumber, { loading: mutationLoading }] = useMutation(CREATE_PART_NUMBER, {
		fetchPolicy: 'no-cache',
		onCompleted: ({customerPartNumber}) => {
			console.log('response', customerPartNumber)
			if (customerPartNumber.success) {
				setAlert(`Successfully created ${customerPartNumber.theirItemId}`)
				addCustomerPartNumber({ id: customerPartNumber.xrefId, customerPartNumber: customerPartNumber.theirItemId, invMastUid })
				selectCustomerPartNumber(customerPartNumber.xrefId)
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
					theirItemId: partNumber
				}
			}
		})
	}

	function handleClose(){
		setAlert(null)
		hideCustomerPartModal()
	}
  
	return(
		<Modal open={open} onClose={handleClose} contentStyle={{maxWidth: 350, borderRadius: 3}}>
			<Container>
				<h4>Add Part Number</h4>
				{alert && <p>{alert}</p>}
				
				<DivItem>
					<Label>Part Number: </Label>
					<AirlineInput value={partNumber} disabled={mutationLoading} width='200px' onChange={e => setPartNumber(e.target.value)}/>
				</DivItem>
				
				<DivRow>
					<ButtonBlack disabled={mutationLoading} onClick={handleClose}>Cancel</ButtonBlack>
					<ButtonRed disabled={mutationLoading} onClick={handleSubmitPartNumber}>{mutationLoading ? 'Saving' : 'Save'}</ButtonRed>
				</DivRow>
			</Container>
		</Modal>
	)
}