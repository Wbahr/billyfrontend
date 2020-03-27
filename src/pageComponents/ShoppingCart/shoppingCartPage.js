import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import ShoppingCart from './uiComponents/shoppingCart'
import SubtotalBox from './uiComponents/subtotalBox'
import OrderSummary from './uiComponents/orderSummary'
import SplitLineModal from './uiComponents/splitLineModal'
import FactoryStockModal from './uiComponents/factoryStockModal'
import EditPriceModal from './uiComponents/editPriceModal'
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
  const [showEditPriceModal, setShowEditPriceModal] = useState(false)
  const [showCustomerPartModal, setShowCustomerPartModal] = useState(false)
  const [index, setIndex] = useState(null)

  function handleShowSplitLineModal(index){
    setIndex(index)
    setShowSplitLineModal(true)
  }

  function handleHideSplitLineModal(){
    setShowSplitLineModal(false)
  }

  function handleShowFactoryStockModal(index){
    setIndex(index)
    setShowFactoryStockModal(true)
  }

  function handleHideFactoryStockModal(){
    setShowFactoryStockModal(false)
  }

  function handleShowEditPriceModal(index){
    setIndex(index)
    setShowEditPriceModal(true)
  }

  function handleHideEditPriceModal(){
    setShowEditPriceModal(false)
  }

  function handleShowCustomerPartModal(index){
    setIndex(index)
    setShowCustomerPartModal(true)
  }

  function handleHideCustomerPartModal(){
    setShowCustomerPartModal(false)
  }

  return(
    <DivContainer>
      <SplitLineModal 
        open={showSplitLineModal} 
        hideSplitLineModal={handleHideSplitLineModal}
        index={index}
      />
      <FactoryStockModal
        open={showFactoryStockModal}
        hideFactoryStockModal={handleHideFactoryStockModal}
        product={{
          'name': 'SMC - 4233',
          'frecno': '4233'
        }}
      />
      <EditPriceModal 
        open={showEditPriceModal} 
        hideEditPriceModal={handleHideEditPriceModal}
        index={index}
      />
      <CustomerPartModal
        open={showCustomerPartModal} 
        hideCustomerPartModal={handleHideCustomerPartModal}
        index={index}
      />
      <DivShoppingCartCol>
        <ShoppingCart
          showSplitLineModal={handleShowSplitLineModal}
          showFactoryStockModal={handleShowFactoryStockModal}
          showEditPriceModal={handleShowEditPriceModal}
          showCustomerPartModal={handleShowCustomerPartModal}
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