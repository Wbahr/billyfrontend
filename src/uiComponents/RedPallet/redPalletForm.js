import React from 'react'
import _ from 'lodash'
import { Formik, Form, Field, FieldArray } from 'formik'
import Select from 'react-select'
import styled from 'styled-components'
import { FormText1 } from '../../styles/fonts'
import Button from '../_common/button'
import Header from '../_common/sectionHeader'
// import addsvg from '../../imgs/airline/add.svg'
// import subsvg from '../../imgs/airline/sub.svg'
import Dropzone from './photoupload'

const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
`

const DivLeftAlign = styled.div`
  display: flex;
  align-items: flex-end;
  width: 516px;
  min-width: 316px;
  margin: 0 auto;
`

const DivRow = styled.div`
  display: flex;
  width 100%;
`

const Input = styled.input`
  cursor: pointer;
  width: 500px;
  min-width: 300px;
  height: 25px;
  border: 1px solid grey;
  border-radius: 3px;
  margin: 8px;
  padding: 16px 8px;
  :focus {
    outline: none;
    border: 1px solid #318EFC;
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

const SelectInput = styled.select`
  padding: 0 8px;
  margin: 0 0 0 8px;
  :focus {
    outline: none;
    border: 1px solid #318EFC;
  }
`

const DivSelectContainer = styled.div`
  margin: 8px;
`

const StyledTextArea = styled.textarea`
  width: 500px; 
  min-width: 300px;
  border: 1px solid #404040;
  border-radius: 3px;
  margin: 8px;
  padding: 0 8px;
  :focus {
    outline: none;
    border: 1px solid #318EFC;
  }
`

const StyledTextArea1 = styled(StyledTextArea)`
  margin: 0;
`

const DivRepairItemContainer = styled.div`
  background-color: whitesmoke;
  width: 516px; 
  min-width: 316px;
  padding: 16px 8px;
  margin: 16px auto;
  border-radius: 2px;
`

const DivSubItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: #318EFC;
  height: auto;
  margin-left: auto;
`

const DivAddItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: #318EFC;
  background-color: white;
  border: 1px solid #318EFC;
  border-radius: 3px;
  width: 50%;
  height: 50px;
  margin: 0 auto 16px auto;
`

const DivSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 516px;
  min-width: 316px;
  margin: 0 auto;
`

const validate = (values) => {

}

const RMAform = ({repairItems, emptyItem}) => (
	<DivForm>
		<Formik
			initialValues={{repairItems}}
			// validate={validate}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={values => clickedContinue(values)}
			render={({ values, handleChange, errors }) => (
				<Form>
          <Header text={'General Information'} />
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
            <DivSelectContainer>
              <Field name={`state`}>
                {({ field, form}) => (
                  <>
                  <FormText1>State*:</FormText1>
                    <SelectInput
                      {...field}
                    >
                      <option value='' selected disabled hidden>--</option>
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
                    </SelectInput>
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
            </DivSelectContainer>
          </DivLeftAlign>
          <Header text={'Part Repair Details'} />
          <DivLeftAlign>
            <DivSelectContainer>
              <Field name={`pickup`}>
                {({ field, form}) => (
                  <>
                  <FormText1>Pickup*:</FormText1>
                    <SelectInput
                      {...field}
                    >
                      <option value='' selected disabled hidden>--</option>
                      <option value='airline'>Airline Pickup</option>
                      <option value='customer'>Customer Drop-off</option>
                      <option value='ship'>Shipping Company</option>
                      <option value='sales'>Sales Drop-off</option>
                    </SelectInput>
                  </>
                )}
              </Field>
            </DivSelectContainer>
          </DivLeftAlign>
            <FieldArray
              name="repairItems"
              render={arrayHelpers => (
                <>
                  {values.repairItems.map((item, index) => (
                    <DivRepairItemContainer key={index}>
                      <DivRow>
                        <DivSelectContainer>
                          <Field name={`repairItems.${index}.repairType`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Type of Repair*:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='' selected disabled hidden>--</option>
                                  <option value='hyd'>Hydraulic</option>
                                  <option value='elec'>Electrical</option>
                                  <option value='pnue'>Pnuematic</option>
                                  <option value='other'>Other</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                        {(index === 0 && values.repairItems.length === 1) ? null :
                          <DivSubItem onClick={() => arrayHelpers.remove(index)}>
                            {/*<img src={subsvg} height='auto' width='auto' alt="remove-item"/>*/}
                            Remove Item
                          </DivSubItem>
                        }
                      </DivRow>
                      <DivLeftAlign>
                        <Field name={`repairItems.${index}.po`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='PO #' />
                          )}
                        </Field>
                        <DivSelectContainer>
                          <Field name={`repairItems.${index}.head`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Urgency:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='' selected disabled hidden>--</option>
                                  <option value='hot'>Hot</option>
                                  <option value='warm'>Warm</option>
                                  <option value='normal'>Normal</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
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
                        <DivSelectContainer>
                          <Field name={`repairItems.${index}.warranty`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Warranty*:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='' selected disabled hidden>--</option>
                                  <option value='true'>Yes</option>
                                  <option value='false'>No</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                      </DivLeftAlign>
                      <Field component='textarea' name={`repairItems.${index}.issue`}>
                        {({ field, form}) => (
                          <StyledTextArea1 {...field}
                            component='textarea'
                            rows='3'
                            placeholder='Please enter a description of the repair needed'
                          />
                        )}
                      </Field>
                    </DivRepairItemContainer>
                    ))
                  }
                  {values.repairItems.length < 5 &&
                    <DivLeftAlign>
                      <DivAddItem onClick={() => arrayHelpers.insert(values.repairItems.length, emptyItem)}>
                        {/*<img src={addsvg} alt="add-item"/>*/}
                        Add Item
                      </DivAddItem>
                    </DivLeftAlign>
                  }
                </>
                )}
            />
            <Dropzone />
            <Field component='textarea' name={`additionalNotes`}>
              {({ field, form}) => (
                <StyledTextArea {...field}
                  component='textarea'
                  rows='3'
                  placeholder='Pickup or other information'
                />
              )}
            </Field>
					<DivSubmitContainer>
            <Button type="submit" text='Submit' />
          </DivSubmitContainer>
				</Form>
			)}
		/>
	</DivForm>
)

export default RMAform
