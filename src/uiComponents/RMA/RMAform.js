import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import styled from 'styled-components'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Button from '../common/button'

const StyledRMAList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 10px;
`

const StyledRMAListGrey = styled(StyledRMAList)`
  background-color: #E9E6E5;
  width: 40%;
  padding-top: 10px;
`

const StyledRMAItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`

const StyledRMAItemDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  height: 20px;
 
  background-color: #404040;
  color: white;
  font-family: verdana;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
`

const StyledRMAItemPhotoContainer = styled.div`
  width: 20%;
`

const StyledRMAItemDetailsContainer = styled.div`
  display: flex;
`

const StyledRMAItemActionsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #bbbbbb;
  height: 45px;
`

const StyledRMAReturnReasonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #ccc;
  height: 45px;
`

const StyledSubmitButtonContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
`

// const StyledCheckbox = styled.input`
//   width: 15px;
//   height: 15px;
//   cursor: pointer;
//   padding-right: 18px;
// `
//
// const StyledInput = styled.input`
//   width: 30px;
//   height: 20px;
//   border-radius: 1px;
// `
// const printer = (value) => {
//   console.log('printer', value)
// }
const RMAform = ({items, printer}) => (
  console.log('items::', items),
  console.log('printer::', printer),
  <div>
    <Formik
      initialValues={{items}}
      onSubmit={values => printer(values)}
      render={({ values }) => (
        <Form>
          <FieldArray
            name="returnItems"
            render={arrayHelpers => (
              <div>
                {values.items.map((item, index) => (
                  <StyledRMAItemDetailContainer key={index}>
                    <StyledRMAItemDetailHeader>
                      <p>{index + 1}</p>
                      <p>Item ID: {item.itemId}</p>
                      <p>387819</p>
                    </StyledRMAItemDetailHeader>
                    <StyledRMAItemDetailsContainer>
                      <StyledRMAItemPhotoContainer></StyledRMAItemPhotoContainer>
                      <StyledRMAListGrey>
                        <StyledText0><StyledText1>Customer Part #: </StyledText1>{item.customerPartNum}</StyledText0>
                        <StyledText0>{item.itemDesc}</StyledText0>
                        <StyledText0><StyledText1>Quantity Ordered: </StyledText1>{item.quantityOrdered}</StyledText0>
                        <StyledText0><StyledText1>Quantity Shipped: </StyledText1>{item.quantityShipped}</StyledText0>
                      </StyledRMAListGrey>
                      <StyledRMAListGrey>
                        <StyledText0><StyledText1>Promise Date: </StyledText1>{item.promiseDate}</StyledText0>
                        <StyledText0><StyledText1>Total Price: </StyledText1>{item.totalPrice}</StyledText0>
                        <StyledText0><StyledText1>Unit Price: </StyledText1>{item.unitPrice}</StyledText0>
                      </StyledRMAListGrey>
                    </StyledRMAItemDetailsContainer>
                    <StyledRMAItemActionsContainer>
                      <Field
                        type='checkbox'
                        name={`returnItems.${index}.willReturn`}
                      />
                      <Field
                        type='hidden'
                        name={`returnItems.${index}.itemId`}
                      />
                      <p>Return <Field type='number' name={`returnItems.${index}.returnQuantity`} min='0' />of {item.quantityShipped}</p>
                    </StyledRMAItemActionsContainer>
                    <StyledRMAReturnReasonContainer>
                      <Field component="select" name={`returnItems.${index}.returnReason`}>
                        <option value='' selected disabled hidden>Select Return Reason</option>
                        <option value='mistake'>Purchased by Mistake</option>
                        <option value='inaccurate'>Inaccurate Description / Recommendation</option>
                        <option value='damaged'>Product / Packaging arrived Damaged</option>
                        <option value='defective'>Item is Defective / Doesn't work</option>
                        <option value='late'>Item arrived too late</option>
                        <option value='incorrect'>Incorrect item sent</option>
                        <option value='excess'>Received more than ordered</option>
                        <option value='early'>Item arrived too early</option>
                        <option value='no_need'>No longer needed</option>
                        <option value='not_approved'>Customer did not approve purchase</option>
                        <option value='missing'>Missing items / Components</option>
                        <option value='other'>Other</option>
                      </Field>
                      <Field
                        placeholder='Please Specify'
                        name={`returnItems.${index}.otherDesc`}
                      />
                      <Field
                        component='textarea'
                        placeholder='Please give a short comment of how the description / recommendation was inaccurate'
                        name={`returnItems.${index}.details`}
                      />
                    </StyledRMAReturnReasonContainer>
                    <StyledRMAReturnReasonContainer>
                      <Field component="select" name={`returnItems.${index}.refundType`}>
                        <option value='' selected disabled hidden>Select Refund Type</option>
                        <option value='credit'>Airline Credit</option>
                        <option value='refund'>Refund</option>
                        <option value='credit'>Replacement</option>
                      </Field>
                    </StyledRMAReturnReasonContainer>
                  </StyledRMAItemDetailContainer>
                ))}
              </div>
            )}
          />
          <StyledSubmitButtonContainer>
            <Button type="submit" text='Continue'/>
          </StyledSubmitButtonContainer>
        </Form>
      )}
    />
  </div>
)

export default RMAform
