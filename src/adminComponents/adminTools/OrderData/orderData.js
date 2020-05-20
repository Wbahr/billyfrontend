import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import { Button } from '@material-ui/core'
import AirlineInput from '../../../pageComponents/_common/form/inputv2'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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

const GET_ORDER_DATA = gql`
  query ItemById($itemId: Int){
    customerPartNumbers(frecno: $itemId){
      customerPartNumber
      id
    }
  }
`

export default function OrderDatapage() {
	const [orderNumber, setOrderNumber] = useState('')
	const [orderData, setOrderData] = useState(null)

	const [getOrderData, {loading}] = useLazyQuery(GET_ORDER_DATA, {
		fetchPolicy: 'no-cache',
		variables: { orderNumber },
		onCompleted: result => {
			if (!_.isNil(result.customerPartNumbers)) {
				setOrderNumber('')
				setOrderData(null)
			} else {
				setOrderData(null)
			}
		}
	})

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
				<Button variant="contained" color="secondary" disabled={false} onClick={() => { setOrderNumber(''), setOrderData(null)}}>
        Clear
				</Button>
				<Button variant="contained" color="primary" disabled={loading} onClick={() => {getOrderData()}}>
					{loading ? 'Searching..' : 'Get Data'}
				</Button>
			</ButtonContainer>
			<AirlineInput 
				type="text"
				placeholder="Order Data"
				name="orderData"
				value={orderData}
				disabled={true}
			/>
			<ButtonContainer>
				<CopyToClipboard text={orderData}>
					<Button disabled={_.isNil(orderData)}variant="contained" color="secondary">Copy Data</Button>
				</CopyToClipboard>
			</ButtonContainer>
		</ContentScreenContainer>
	)
}
