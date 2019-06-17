import React from 'react'
import _ from 'lodash'
import { Formik, Form, Field, FieldArray } from 'formik'
import Select from 'react-select'
import styled from 'styled-components'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import Button from '../_common/button'

const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
`

const DivLeftAlign = styled.div`
  display: flex;
  width: 516px;
  min-width: 316px;
  margin: 0 auto;
`

const Input = styled.input`
  cursor: pointer;
  width: 500px;
  min-width: 300px;
  height: 25px;
  border: none;
  border-bottom: 2px solid black;
  margin: 8px;
  padding: 16px 8px;
  :focus {
    outline: none;
    border-bottom: 2px solid darkblue;
  }
`

const Inputm = styled(Input)`
  width: 225px;
  min-width: 125px;
`

const Inputsm = styled(Input)`
  width: 100px;
  min-width: 100px;
`

const Inputxsm = styled(Input)`
  width: 50px;
  min-width: 50px;
`

const StyledTextArea = styled.textarea`
  width: 500px; 
  min-width: 300px;
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 8px;
  padding: 0 8px;
`

const DivRepairItemContainer = styled.div`
`

const validate = (values) => {

}

const RMAform = ({repairItems}) => (
	<DivForm>
		<Formik
			initialValues={{repairItems}}
			// validate={validate}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={values => clickedContinue(values)}
			render={({ values, handleChange, errors }) => (
				<Form>
            <Field name={`company`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Company*' />
              )}
            </Field>
            <Field name={`fullname`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Full Name*' />
              )}
            </Field>
            <Field name={`email`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Email*' />
              )}
            </Field>
            <Field name={`phone`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Phone*' />
              )}
            </Field>
            <DivLeftAlign>
              <Field name={`ext`}>
                {({ field, form}) => (
                  <Inputsm {...field}
                    component='input'
                    placeholder='Ext' />
                )}
              </Field>
            </DivLeftAlign>
            {/*<Field name={`saved_address`}>*/}
              {/*{({ field, form}) => (*/}
                {/*<Input {...field}*/}
                  {/*component='input'*/}
                  {/*placeholder='Saved Address' />*/}
              {/*)}*/}
            {/*</Field>*/}
            <Field name={`address_1`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Address 1*' />
              )}
            </Field>
            <Field name={`address_2`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Address 2' />
              )}
            </Field>
            <Field name={`city`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='City*' />
              )}
            </Field>
          <DivLeftAlign>
            <Field name={`state`}>
              {({ field, form}) => (
                <>
                <p>State*:</p>
                  <select
                    {...field}
                  >
                    <option value='' selected disabled hidden>Select a State</option>
                    <option value='CT'>CT</option>
                    <option value='DE'>DE</option>
                    <option value='DC'>DC</option>
                    <option value='ME'>ME</option>
                    <option value='MD'>MD</option>
                    <option value='MA'>MA</option>
                    <option value='NH'>NH</option>
                    <option value='NJ'>NJ</option>
                    <option value='NY'>NY</option>
                    <option value='OH'>OH</option>
                    <option value='PA'>PA</option>
                    <option value='RI'>RI</option>
                    <option value='VA'>VA</option>
                    <option value='VT'>VT</option>
                    <option value='WV'>WV</option>
                  </select>
                </>
              )}
            </Field>
            <Field name={`zip`}>
              {({ field, form}) => (
                <Inputsm {...field}
                  component='input'
                  placeholder='Zip*' />
              )}
            </Field>
          </DivLeftAlign>
          <DivLeftAlign>
            <Field name={`repairType`}>
              {({ field, form}) => (
                <>
                <p>Type of Repair*:</p>
                  <select
                    {...field}
                  >
                    <option value='' selected disabled hidden>Select Repair Type</option>
                    <option value='hyd'>Hydraulic</option>
                    <option value='elec'>Electrical</option>
                    <option value='pnue'>Pnuematic</option>
                    <option value='other'>Other</option>
                  </select>
                </>
              )}
            </Field>
            <Field name={`repairType`}>
              {({ field, form}) => (
                <>
                <p>Pickup*:</p>
                  <select
                    {...field}
                  >
                    <option value='' selected disabled hidden>Select Pickup Type</option>
                    <option value='airline'>Airline Pickup</option>
                    <option value='customer'>Customer Drop-off</option>
                    <option value='ship'>Shipping Company</option>
                    <option value='sales'>Sales Drop-off</option>
                  </select>
                </>
              )}
            </Field>
          </DivLeftAlign>
            <FieldArray
              name="repairItems"
              render={arrayHelpers => (
                <>
                  {values.repairItems.map((item, index) => (
                    <DivRepairItemContainer key={index}>
                      <DivLeftAlign>
                        <Field name={`repairItems.${index}.po`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='PO #' />
                          )}
                        </Field>
                        <Field name={`repairItems.${index}.head`}>
                          {({ field, form}) => (
                            <>
                            <p>Urgency:</p>
                              <select
                                {...field}
                              >
                                <option value='' selected disabled hidden>Select Urgency</option>
                                <option value='hot'>Hot</option>
                                <option value='warm'>Warm</option>
                                <option value='normal'>Normal</option>
                              </select>
                            </>
                          )}
                        </Field>
                      </DivLeftAlign>
                      <DivLeftAlign>
                        <Field name={`repairItems.${index}.manufacturer`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Manufacturer' />
                          )}
                        </Field>
                        <Field name={`repairItems.${index}.model`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Model' />
                          )}
                        </Field>
                      </DivLeftAlign>
                      <DivLeftAlign>
                        <Field name={`repairItems.${index}.serial`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Serial #' />
                          )}
                        </Field>
                        <Field name={`repairItems.${index}.part`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Part #' />
                          )}
                        </Field>
                      </DivLeftAlign>
                      <DivLeftAlign>
                        <Field name={`repairItems.${index}.warranty`}>
                          {({ field, form}) => (
                            <>
                            <p>Warranty*:</p>
                              <select
                                {...field}
                              >
                                <option value='' selected disabled hidden>Has Warranty?</option>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                              </select>
                            </>
                          )}
                        </Field>
                      </DivLeftAlign>
                      <Field component='textarea' name={`repairItems.${index}.issue`}>
                        {({ field, form}) => (
                          <StyledTextArea {...field}
                            component='textarea'
                            rows='3'
                            placeholder='Please enter a description of the repair needed'
                          />
                        )}
                      </Field>
                      {(index === 0 && values.repairItems.length === 1) ? null : <button type="button" onClick={() => arrayHelpers.remove(index)}>-</button>}
                    </DivRepairItemContainer>
                    ))
                  }
                  {values.repairItems.length < 6 && <DivLeftAlign><button type="button" onClick={() => arrayHelpers.insert(values.repairItems.length, {})}>Add Item +</button></DivLeftAlign>}
                </>
                )}
            />
            <Field component='textarea' name={`additionalNotes`}>
              {({ field, form}) => (
                <StyledTextArea {...field}
                  component='textarea'
                  rows='3'
                  placeholder='Pickup or other information'
                />
              )}
            </Field>
					{/*<StyledSubmitButtonContainer>*/}
						{/*{Object.keys(errors).length &&*/}
							{/*<DivErrors>*/}
								{/*{errors.quantity && <span>{errors.quantity}</span>}*/}
								{/*{errors.return && <span>{errors.return}</span>}*/}
								{/*{errors.other && <span>{errors.other}</span>}*/}
								{/*{errors.description && <span>{errors.description}</span>}*/}
							{/*</DivErrors>*/}
						{/*}*/}
						{/*<Button type="submit" text='Submit' />*/}
					{/*</StyledSubmitButtonContainer>*/}
				</Form>
			)}
		/>
	</DivForm>
)

export default RMAform
