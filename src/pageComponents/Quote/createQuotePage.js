import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useLazyQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Context from '../../config/context'
import CheckoutOrderSummary from './uiComponents/quoteOrderSummary'
import QuoteWizard from './quoteWizard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonRed, ButtonBlack } from '../../styles/buttons'
import QuoteProgress from './uiComponents/quoteProgress'
import { shippingScheduleSchema, shipToSchema } from './helpers/validationSchema'

const DivContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: inherit;
`

const DivCheckoutCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  @media(max-width: 1000px) {
    width: 100%;
  }
`

const DivOrderTotalCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media(max-width: 1400px) {
    display: none;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-bottom;
  margin: 0 20px 0 20px;
  p {
    cursor: pointer;
    color: grey;
    margin: 0 0 2px 12px;
    align-self: flex-end;
    font-size: 12px;
  }
`

const H3 = styled.h3`
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 8px;
  margin: 0 0 2px 4px;
`

const Pstep = styled.span`
  font-family: ProximaBold;
  text-transform: uppercase;
  font-size: 20px;
`

const DivNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const Container = styled.div`
  margin: 20px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 18px;
  height: 100%;
  border: 1px solid lightgrey;
  padding: 20px;
`

const Pformheader = styled.p`
  margin: 0;
  font-family: ProximaBold;
  text-transform: uppercase;
`

const SUBMIT_ORDER = gql`
  mutation SubmitOrder($order: OrderInputDataInputGraphType){
    submitOrder(orderInput: $order){
      webReferenceId
      messages
    } 
  }
`

export default function CheckoutPage({history}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [triggerSubmit, setTriggerSubmit] = useState(false)
  const [showOrderFailedModal, setShowOrderFailedModal] = useState(false)
  const stepLabel = ['Shipping Schedule','Ship To','Quote Review']
  const context = useContext(Context)
  const [stepValidated, setStepValidated] = useState(
    {
      0: false,
      1: false,
      2: false
    }
  )

  const YupSchema = {
    0: shippingScheduleSchema, 
    1: shipToSchema
  }

  function handleMoveStep(requestedStep){
    if(requestedStep === 0 || stepValidated[requestedStep - 1]){
      setCurrentStep(requestedStep)
    }
  }

  function handleValidateFields(values){
    YupSchema[currentStep].isValid(values).then(function(valid) {
      setStepValidated({
        ...stepValidated,
        [currentStep]: values
      })
    })
  }

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      let orderId = _.get(data,`submitOrder.webReferenceId`,null)
      let confirmationEmail = _.get(data, `submitOrder.confirmationEmailRecipient`,'')
      if (!_.isNil(orderId)) {
        localStorage.removeItem('shoppingCartToken')
        context.emptyCart()
        history.push(`/quote-complete/${orderId}/${confirmationEmail}`)
      } else {
        setShowOrderFailedModal(true)
      }
    }
  })

  function handleCheckoutSubmit(formValues){
    submitOrder({ variables: { order: formValues } })
  }
  
  return(
    <DivContainer>
      <DivCheckoutCol>
        <Div>
          <DivRow>
            <H3>Create a Quote</H3>
            <QuoteProgress stepLabels={stepLabel} step={currentStep} stepValidated={stepValidated} clickMoveToStep={(index)=>handleMoveStep(index)}/>
          </DivRow>
        </Div>
        <Container>
          <Pformheader>{stepLabel[currentStep]}</Pformheader>
          <Context.Consumer>
            {({cart}) => (
            <QuoteWizard 
              step={currentStep} 
              shoppingCart={cart} 
              triggerSubmit={triggerSubmit} 
              YupSchema={YupSchema}
              handleValidateFields={(values)=>handleValidateFields(values)}
              showOrderFailedModal={showOrderFailedModal}
              submitForm={(formValues)=>handleCheckoutSubmit(formValues)}
            />)}
          </Context.Consumer>
          <DivNavigation>
            {currentStep === 0 && <ButtonBlack onClick={()=>history.push('/cart')}><FontAwesomeIcon icon='shopping-cart' size="sm" color="white"/>Back to Cart</ButtonBlack>}
            {currentStep > 0 && <ButtonBlack onClick={()=>{setCurrentStep(currentStep - 1)}}>Previous</ButtonBlack>}
            {currentStep < (stepLabel.length - 1) && <ButtonRed disabled={!stepValidated[currentStep]} onClick={()=>{setCurrentStep(currentStep + 1)}}>Continue</ButtonRed>}
            {currentStep === (stepLabel.length - 1) && <ButtonRed onClick={()=>{setTriggerSubmit(true)}}><FontAwesomeIcon icon='file-invoice-dollar' size="sm" color="white"/>Create Quote</ButtonRed>}
          </DivNavigation>
        </Container>
      </DivCheckoutCol>
      <DivOrderTotalCol>
        <CheckoutOrderSummary/>
      </DivOrderTotalCol>
    </DivContainer>
  )
}