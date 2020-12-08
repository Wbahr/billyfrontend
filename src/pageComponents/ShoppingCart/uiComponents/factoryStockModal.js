import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ButtonBlack } from '../../../styles/buttons'
import Modal from '../../_common/modal'

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
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
  margin: 0 20px;
`

const DivRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin: 8px 0;
`

const GET_FACTORY_STOCK = gql`
  query GetFactoryStock($invMastUid: Int){
    factoryStock(invMastUid: $invMastUid){
      invMastUid
      factoryAvailability
      leadTimeDays
      modifiedBy
      modifiedDate
    }
  }
`

const MODIFY_FACTORY_STOCK = gql`
  mutation ModifyFactoryStock($stockInput: FactoryStockInput){
    factoryStock(factoryStock: $stockInput){
      invMastUid
      factoryAvailability
      leadTimeDays
      modifiedDate
      modifiedBy
    }
  }
`

export default function FactoryStockModal({open, product, hideFactoryStockModal}) {
	const [qtyAvailable, setQtyAvailable] = useState(0)
	const [leadTime, setLeadTime] = useState(0)
	const [lastModified, setLastModified] = useState('--')
	const [lastModifiedBy, setLastModifiedBy] = useState('--')
	const [factoryStockDetails, setFactoryStockDetails] = useState(null)

	useEffect(() => {
		if (open) getFactoryStock()
	}, [open])

	useEffect(() => {
		if (factoryStockDetails) {
			setLeadTime(factoryStockDetails.leadTimeDays)
			setQtyAvailable(factoryStockDetails.factoryAvailability)
			setLastModified(factoryStockDetails.modifiedDate)
			setLastModifiedBy(factoryStockDetails.modifiedBy)
		}
	}, [factoryStockDetails])

	const [getFactoryStock] = useLazyQuery(GET_FACTORY_STOCK, {
		fetchPolicy: 'no-cache',
		variables: {
			invMastUid: product?.frecno || 0
		},
		onCompleted: data => {
			setFactoryStockDetails(data.factoryStock)
		}
	})

	const [modifyFactoryStock, {loading}] = useMutation(MODIFY_FACTORY_STOCK, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			setFactoryStockDetails(data.factoryStock)
		}
	})
	function handleClose(){
		hideFactoryStockModal()
	}

	function handleUpdate(){
		modifyFactoryStock(
			{
				variables: {
					'stockInput': {
						'invMastUid': Number(product?.frecno || 0),
						'factoryAvailability': Number(qtyAvailable),
						'leadTimeDays': Number(leadTime)
					}
				}
			}
		)
	}

	function handleChange(e){
		if( e.target.id === 'qtyAvailable'){
			setQtyAvailable(e.target.value)
		} else if( e.target.id === 'leadTime') {
			setLeadTime(e.target.value)
		}
	}
  
	return(
		<Modal open={open} onClose={handleClose} contentStyle={{maxWidth: 300, borderRadius: 3}}>
			<Container>
				<h4>Factory Stock</h4>
				<h6>{product?.name || ''}</h6>
				
				<DivRow>
					<DivItem>
						<Label>Factory Availability: </Label>
						<input id="qtyAvailable" type="number" value={qtyAvailable} style={{width: 100}} onChange={handleChange}/>
					</DivItem>
					
					<DivItem>
						<Label>Est. Lead Time (days): </Label>
						<input id="leadTime" type="number" value={leadTime} style={{width: 100}} onChange={handleChange}/>
					</DivItem>
				</DivRow>
				
				<DivRow>
					<DivItem>
						<Label>Last Modified: </Label>
						<input disabled value={lastModified} style={{width: 250}}/>
					</DivItem>
				</DivRow>
				
				<DivRow>
					<DivItem>
						<Label>Modified By: </Label>
						<input disabled value={lastModifiedBy} style={{width: 250}}/>
					</DivItem>
				</DivRow>
				
				<ButtonBlack disabled={loading} onClick={handleUpdate}>Update</ButtonBlack>
			</Container>
		</Modal>
	)
}