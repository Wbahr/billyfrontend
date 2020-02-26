import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Context from '../../config/context'
import CheckoutOrderSummary from './uiComponents/checkoutOrderSummary'
import CheckoutWizard from './checkoutWizard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonRed, ButtonBlack } from '../../styles/buttons'
import CheckoutProgress from './uiComponents/checkoutProgress'
import { shippingScheduleSchema, shipToSchema, billToSchema } from './helpers/validationSchema'
import { connect, getIn } from 'formik'

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
  font-family: helvetica-neue-light,Helvetica Neue,Helvetica,Arial,sans-serif;
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
      transactionId
      messages
    } 
  }
`

function CheckoutPage(props) {
  const {
    history,
    formik
  } = props

  const [currentStep, setCurrentStep] = useState(0)
  const [possibleTaxChange, setPossibleTaxChange] = useState(false)
  const [triggerSubmit, setTriggerSubmit] = useState(false)
  const stepLabel = ['Shipping Schedule','Ship To','Bill To','Order Review']
  const [stepValidated, setStepValidated] = useState(
    {
      0: false,
      1: false,
      2: false,
      3: false
    }
  )

  const YupSchema = {
    0: shippingScheduleSchema, 
    1: shipToSchema, 
    2: billToSchema
  }

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      let orderId = _.get(data,`submitOrder.transactionId`,null)
      if (!_.isNil(orderId)) {
        history.push(`/order-complete/${orderId}`)
      } else {
        window.alert('an error has occured. check the networking tab')
      }
    }
  })

  // useEffect(() => {
  //   // const touch = getIn(props.formik.touched, props.name)
  //   // console.log('formik ->', touch)
  //   // If the current step isn't 2 (ship to), step 2 has been validated, and the tax could've changed get the tax amount on step change
  //   if (currentStep !== 2 && stepValidated[2] && possibleTaxChange) {
  //     updateTaxes(zipcode, shipToId)
  //     setPossibleTaxChange(false)
  //   } else if (currentStep === 2) {
  //     setPossibleTaxChange(true)
  //   }
  // },[currentStep])

  function handleMoveStep(requestedStep){
    // const { values: formikValues } = useFormikContext()
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

  function handleCheckoutSubmit(formValues){
    submitOrder({ variables: { order: formValues } })
  }
  
  return(
    <DivContainer>
      <DivCheckoutCol>
        <Div>
          <DivRow>
            <FontAwesomeIcon icon="lock" />
            <H3>Checkout</H3>
            <CheckoutProgress stepLabels={stepLabel} step={currentStep} stepValidated={stepValidated} clickMoveToStep={(index)=>handleMoveStep(index)}/>
          </DivRow>
        </Div>
        <Container>
          <Pformheader>{stepLabel[currentStep]}</Pformheader>
          <Context.Consumer>
            {({cart}) => (
            <CheckoutWizard 
              step={currentStep} 
              shoppingCart={cart} 
              triggerSubmit={triggerSubmit} 
              YupSchema={YupSchema}
              handleValidateFields={(values)=>handleValidateFields(values)}
              submitForm={(formValues)=>handleCheckoutSubmit(formValues)}
            />)}
          </Context.Consumer>
          <DivNavigation>
            {currentStep === 0 && <ButtonBlack onClick={()=>history.push('/cart')}><FontAwesomeIcon icon='shopping-cart' size="sm" color="white"/>Back to Cart</ButtonBlack>}
            {currentStep > 0 && <ButtonBlack onClick={()=>{setCurrentStep(currentStep - 1)}}>Previous</ButtonBlack>}
            {currentStep < (stepLabel.length - 1) && <ButtonRed disabled={!stepValidated[currentStep]} onClick={()=>{setCurrentStep(currentStep + 1)}}>Continue</ButtonRed>}
            {currentStep === (stepLabel.length - 1) && <ButtonRed onClick={()=>{setTriggerSubmit(true)}}><FontAwesomeIcon icon='lock' size="sm" color="white"/>  Submit</ButtonRed>}
          </DivNavigation>
        </Container>
      </DivCheckoutCol>
      <DivOrderTotalCol>
        <CheckoutOrderSummary/>
      </DivOrderTotalCol>
    </DivContainer>
  )
}

export default connect(CheckoutPage)