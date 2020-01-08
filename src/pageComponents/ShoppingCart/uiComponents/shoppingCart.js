import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Context from '../../../config/context'
import ShoppingCartItem from './shoppingCartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px grey solid;
  margin-top: 24px;
`

const DivRow = styled.div`
  display: flex;
  justify-content: flex-bottom;
  p {
    cursor: pointer;
    color: grey;
    margin: 0 0 2px 12px;
    align-self: flex-end;
    font-size: 12px;
  }
`

const H3 = styled.h3`
  margin: 0 0 2px 4px;
`

const Ashare = styled.a`
  margin-right: 4px
`

const AshareBlue = styled(Ashare)`
  color: #328EFC !important;
  font-weight: 500;
`

const DivShare = styled.div`
  cursor: pointer;
  margin-right: 4px;
  align-self: flex-end;
`

const DivSave = styled(DivShare)`
  margin-right: 16px;
`

const DivShoppingCartCol = styled.div`
  display: flex;
  flex-direction: column;
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
`


export default function ShoppingCart({showSplitLineModal}) {
  const [savedCart, setSavedCart] = useState(false)

  useEffect(() => {
    if(savedCart){
      setTimeout(()=>setSavedCart(false), 1000)
    }
  },[savedCart])

  const ShoppingCartItems = (
    <Context.Consumer>
      {({cart, emptyCart}) => (
        cart.map((item, index)=>{
          return(
            // <Draggable>
              <ShoppingCartItem
                item={item}
                emptyCart={emptyCart}
                index={index}
                showSplitLineModal={showSplitLineModal}
              />
            // </Draggable>
          )
        })
      )}
    </Context.Consumer>
  )

  return(
    <>
      <Div>
        <Context.Consumer>
          {({emptyCart}) => {
            return(
              <DivRow>
                <H3>Shopping Cart</H3>
                <p onClick={()=>emptyCart()}>(empty cart)</p>
              </DivRow>
            )
          }}
        </Context.Consumer>
        <DivRow>
          <Context.Consumer>
            {({saveCart}) => {
              return(
                <DivSave onClick={()=>{saveCart(), setSavedCart(true)}}>
                  {savedCart ? <AshareBlue>Cart Saved</AshareBlue> : <Ashare>Save Cart</Ashare>}
                  {savedCart ? <FontAwesomeIcon icon="save" color="#328EFC"/>   : <FontAwesomeIcon icon="save" color="grey"/>  }
                </DivSave>
              )
            }}
          </Context.Consumer>
          <DivShare>
            <Ashare>Share</Ashare>
            <FontAwesomeIcon icon="share" color="grey"/>
          </DivShare>
        </DivRow>
      </Div>
      {/* <DragDropContext> */}
        {/* <Droppable> */}
          {ShoppingCartItems}
        {/* </Droppable> */}
      {/* </DragDropContext> */}
    </>
  )
}