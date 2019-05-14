import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import Select from 'react-select'
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
  @media (max-width: 700px) {
    width: auto;
  }
`

const StyledRMAListGrey2 = styled(StyledRMAListGrey)`
  @media (max-width: 700px) {
    padding-top: 0;
  }
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
  @media (max-width: 768px) {
    display: none;
  }
`

const StyledRMAItemDetailsContainer = styled.div`
  display: flex;
  
  @media (max-width: 700px) {
    flex-direction: column;
  }
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
  
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 8px 0;
  }
`

const StyledSubmitButtonContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`

const DivErrors = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: #ff5252;
  color: white;
  border: 1px solid red;
  border-radius: 3px;
  padding: 8px;
  margin: 0 auto 8px auto;
  text-align: center;
`

const StyledCheckbox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  padding-right: 18px;
`

const StyledInput = styled.input`
  width: 48px;
  height: 20px;
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 0 8px;
  padding: 0 8px;
`

const StyledInput2 = styled(StyledInput)`
  width: 200px;
`

const StyledTextArea = styled.textarea`
  width: 300px; 
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 8px;
  padding: 0 8px;
`

const validate = (values) => {
	let errors = {}
	let returnItems = values.items
	for(let i = 0; i < returnItems.length; i++) {
		let item = returnItems[i]
		if (item.willReturn) {
			// check if quantity is ok
			if (item.returnQuantity <= 0 || item.returnQuantity > item.quantityShipped) {
				errors.quantity = 'Check to ensure all return quantities are valid'
			}
			// check if dropdowns are populated
			if (item.returnReason.length < 1 || item.refundType.length < 1) {
				errors.return = 'Specify a return reason and refund type for all returns'
			}
			// check if other is filled out
			if (item.returnReason === 'other' && item.otherDesc.length < 1) {
				errors.other = 'Please describe return reason of other'
			}
			// check if description is filled out
			if (item.returnReason === 'inaccurate' && item.details.length < 1) {
				errors.description = 'Please describe how part recommendation was inaccurate'
			}
		}
	}
	return errors
}

const showReplacement = ['damaged', 'defective', 'incorrect', 'early', 'missing', 'other']

const RMAform = ({items, clickedContinue}) => (
	<div>
		<Formik
			initialValues={{items}}
			validate={validate}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={values => clickedContinue(values.items)}
			render={({ values, handleChange, errors }) => (
				<Form>
					<FieldArray
						name="returnItems"
						render={arrayHelpers => (
							<div>
								{values.items.map((item, index) => (
									<StyledRMAItemDetailContainer key={index}>
										<StyledRMAItemDetailHeader>
											<p>{index + 1}</p>
											{/*<p>Item ID: {item.itemId}</p>*/}
											<p>AHC-{item.frecnoNum}</p>
										</StyledRMAItemDetailHeader>
										<StyledRMAItemDetailsContainer>
											<StyledRMAItemPhotoContainer></StyledRMAItemPhotoContainer>
											<StyledRMAListGrey>
												<StyledText0><StyledText1>Customer Part #: </StyledText1>{item.customerPartNum}</StyledText0>
												<StyledText0><StyledText1>Description: </StyledText1>{item.itemDesc}</StyledText0>
												<StyledText0><StyledText1>Quantity Ordered: </StyledText1>{item.quantityOrdered}</StyledText0>
												<StyledText0><StyledText1>Quantity Shipped: </StyledText1>{item.quantityShipped}</StyledText0>
											</StyledRMAListGrey>
											<StyledRMAListGrey2>
												<StyledText0><StyledText1>Promise Date: </StyledText1>{item.promiseDate}</StyledText0>
												<StyledText0><StyledText1>Total Price: </StyledText1>{`$${(item.unitPrice * item.quantityOrdered).toFixed(2)}`}</StyledText0>
												<StyledText0><StyledText1>Unit Price: </StyledText1>{`$${item.unitPrice}`}</StyledText0>
											</StyledRMAListGrey2>
										</StyledRMAItemDetailsContainer>
										<StyledRMAItemActionsContainer>
											<Field name={`items.${index}.willReturn`} >
												{({ field, form}) => (
													<StyledCheckbox {...field} type='checkbox'/>
												)}
											</Field>
											<Field
												type='hidden'
												name={`items.${index}.frecnoNum`}
											/>
											<Field
												type='hidden'
												name={`items.${index}.quantityShipped`}
											/>
											<Field
												type='hidden'
												name={`items.${index}.unitPrice`}
											/>
											<p>Return
												<Field name={`items.${index}.returnQuantity`}>
													{({ field, form}) => (
														<StyledInput {...field} type='number' min='0'/>
													)}
												</Field>
                        of {item.quantityShipped}
											</p>
										</StyledRMAItemActionsContainer>
										{ item.willReturn ?
                      <>
                        <StyledRMAReturnReasonContainer>
                        	<Field name={`items.${index}.returnReason`}>
                        		{({ field, form}) => (
                        			<select
                        				{...field}
                        				onChange={(e) => {form.setFieldValue(`items.${index}.returnReason`, e.target.value); form.setFieldValue(`items.${index}.refundType`, '') }}
                        			>
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
                        			</select>
                        		)}
                        	</Field>
                        	<Field name={`items.${index}.otherDesc`}>
                        		{({ field, form}) => (
                        			<StyledInput2 {...field} placeholder='Specify a Return Reason' hidden={item.returnReason !== 'other'} />
                        		)}
                        	</Field>
                        	<Field component='textarea' name={`items.${index}.details`}>
                        		{({ field, form}) => (
                        			<StyledTextArea {...field}
                        				component='textarea'
                        				rows='3'
                        				placeholder='Please give a short comment of how the description or recommendation was inaccurate'
                        				hidden={item.returnReason !== 'inaccurate'} />
                        		)}
                        	</Field>
                        </StyledRMAReturnReasonContainer>
                        <StyledRMAReturnReasonContainer>
                        	<Field component='select' name={`items.${index}.refundType`}>
                        		<option value='' selected disabled hidden>Select Refund Type</option>
                        		<option value='credit'>Airline Credit</option>
                        		<option value='refund'>Refund</option>
                        		{ _.includes(showReplacement, item.returnReason) && <option value='replacement'>Replacement</option>}
                        	</Field>
                        </StyledRMAReturnReasonContainer>
                      </>
											: null}
									</StyledRMAItemDetailContainer>
								))}
							</div>
						)}
					/>
					<StyledSubmitButtonContainer>
						{Object.keys(errors).length ?
							<DivErrors>
								{errors.quantity && <span>{errors.quantity}</span>}
								{errors.return && <span>{errors.return}</span>}
								{errors.other && <span>{errors.other}</span>}
								{errors.description && <span>{errors.description}</span>}
							</DivErrors>
							: null}
						<Button type="submit" text='Continue' />
					</StyledSubmitButtonContainer>
				</Form>
			)}
		/>
	</div>
)

export default RMAform
