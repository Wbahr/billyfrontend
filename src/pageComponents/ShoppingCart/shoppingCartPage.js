import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ShoppingCart from './uiComponents/shoppingCart'
import SubtotalBox from './uiComponents/subtotalBox'
import OrderSummary from './uiComponents/orderSummary'
import SplitLineModal from './uiComponents/splitLineModal'
import FactoryStockModal from './uiComponents/factoryStockModal'

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
        index={index}
      />
      <DivShoppingCartCol>
        <ShoppingCart
          showSplitLineModal={handleShowSplitLineModal}
          showFactoryStockModal={handleShowFactoryStockModal}
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