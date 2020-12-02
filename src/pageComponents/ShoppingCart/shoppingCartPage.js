import React, { useState } from 'react'
import styled from 'styled-components'
import ShoppingCart from './uiComponents/shoppingCart'
import SubtotalBox from './uiComponents/subtotalBox'
import OrderSummary from './uiComponents/orderSummary'
import SplitLineModal from './uiComponents/splitLineModal'
import FactoryStockModal from './uiComponents/factoryStockModal'
import CustomerPartModal from './uiComponents/editCustomerPartModal'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
`

const DivShoppingCartCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media(max-width: 1400px) {
    display: none;
  }
`

export default function ShoppingCartPage(props) {
	const [showSplitLineModal, setShowSplitLineModal] = useState(false)
	const [showFactoryStockModal, setShowFactoryStockModal] = useState(false)
	const [showCustomerPartModal, setShowCustomerPartModal] = useState(false)
	const [index, setIndex] = useState(null)
	const [modalData, setModalData] = useState(null)

	function handleSetModalData(data){
		setModalData(data)
	}

	function handleShowSplitLineModal(index){
		setIndex(index)
		setShowSplitLineModal(true)
	}
	
	function handleShowFactoryStockModal(index){
		setIndex(index)
		setShowFactoryStockModal(true)
	}
	
	function handleShowCustomerPartModal(index){
		setIndex(index)
		setShowCustomerPartModal(true)
	}


	return(
		<DivContainer>
			<DivShoppingCartCol>
				<ShoppingCart
					showSplitLineModal={handleShowSplitLineModal}
					showFactoryStockModal={handleShowFactoryStockModal}
					showCustomerPartModal={handleShowCustomerPartModal}
					handleSetModalData={handleSetModalData}
					history={props.history}
				/>
				<SubtotalBox
					history={props.history}
				/>
			</DivShoppingCartCol>
			<DivOrderTotalCol>
				<OrderSummary
					history={props.history}
				/>
			</DivOrderTotalCol>
		</DivContainer>
	)
}