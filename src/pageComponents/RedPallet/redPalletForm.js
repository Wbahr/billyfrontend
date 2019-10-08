import React from 'react'
import _ from 'lodash'
import { Formik, Form, Field, FieldArray } from 'formik'
import Select from 'react-select'
import styled from 'styled-components'
import { FormText1, FormText1Bold } from '../../styles/fonts'
import Button from '../_common/button'
import Header from '../_common/sectionHeader'
// import addsvg from '../../imgs/airline/add.svg'
// import subsvg from '../../imgs/airline/sub.svg'
import Dropzone from './photoupload'
import SerialNumberFields from './redPalletSerialNumbers'

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
  @media (max-width: 700px) {
    width: auto;
  }
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
  @media (max-width: 700px) {
    width: auto;
  }
`

const Inputm = styled(Input)`
  width: 225px;
  min-width: 125px;
  @media (max-width: 700px) {
    width: auto;
  }
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
  @media (max-width: 700px) {
    width: auto;
  }
`

const DivSelectContainer = styled.div`
  margin: 8px;
  @media (max-width: 700px) {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
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
  @media (max-width: 700px) {
    width: auto;
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
  @media (max-width: 700px) {
    width: auto;
  }
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

const DivAlert = styled.div`
  height: 30px;
  width: 100%;
  border: 1px solid orange;
  border-radius: 2px;
  background-color: cornsilk;
  color: darkorange;
`

const DivSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 516px;
  min-width: 316px;
  margin: 0 auto;
  @media (max-width: 700px) {
    width: auto;
  }
`

const validate = (values) => {
  console.log('values',JSON.stringify(values))
}

const cleanPhoneNumber = (phonenum) => {
  //Added this helper because phone numbers can be very messy
  let cleanedPhoneNum = phonenum.replace(/\D/g,'')
  let mutatedPhoneNum = cleanedPhoneNum.slice(0,3) + '-' + cleanedPhoneNum.slice(3,6) + '-' + cleanedPhoneNum.slice(6,10)
  if(cleanedPhoneNum.slice(10,).length > 0){
    mutatedPhoneNum += cleanedPhoneNum.slice(10,)
  }
  return mutatedPhoneNum
}

const setAddress = (shipToId, form) => {
  for (let i = 0; i < form.values.ShipTos.length; i++) {
    if (shipToId === '-1') {
        form.setFieldValue(`address_1`, '')
        form.setFieldValue(`address_2`, '')
        form.setFieldValue(`city`, '')
        form.setFieldValue(`state`, '')
        form.setFieldValue(`zip`, '')
        form.setFieldValue(`phone`, '')
    } else if (String(form.values.ShipTos[i].Id) === shipToId) {
        let ShipToItem = form.values.ShipTos[i]
        form.setFieldValue(`address_1`, _.isNil(ShipToItem.Line1) ? '' : ShipToItem.Line1)
        form.setFieldValue(`address_2`, _.isNil(ShipToItem.Line2) ? '' : ShipToItem.Line2)
        form.setFieldValue(`city`, _.isNil(ShipToItem.City) ? '' : ShipToItem.City)
        form.setFieldValue(`state`, _.isNil(ShipToItem.State) ? '' : ShipToItem.State)
        form.setFieldValue(`zip`, _.isNil(ShipToItem.Zip) ? '' : ShipToItem.Zip)
        form.setFieldValue(`phone`, _.isNil(ShipToItem.Phone) ? '' : cleanPhoneNumber(ShipToItem.Phone))
    }
  }
}

const supportedStates = ['CT','DE','DC','ME','MD','MA','NH','NJ','NY','OH','PA','RI','VA','VT','WV']

const RMAform = ({initValues, emptyItem}) => (
	<DivForm>
		<Formik
			initialValues={initValues}
			validate={validate}
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
                  placeholder='Company*'
                />
              )}
            </Field>
            <Field name={`FullName`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Full Name*'
                />
              )}
            </Field>
            <Field name={`Email`}>
              {({ field, form}) => (
                <Input {...field}
                  component='input'
                  placeholder='Email*'
                />
              )}
            </Field>
            <DivLeftAlign>
              <DivSelectContainer>
                <Field name={`shipto`}>
                  {({ field, form}) => (
                    <>
                    <FormText1>Ship To*:</FormText1>
                      <SelectInput
                        {...field}
                        onChange={(e) => { setAddress(e.target.value, form); form.setFieldValue(`pickup`, '-1')}}
                      >
                        {values.ShipTos.map((shipto, index) => (
                          <option key={index} value={shipto.Id} selected={shipto.IsDefault}>{shipto.Line1 + ' - ' + shipto.City + ', ' + shipto.State}</option>
                        ))
                        }
                        <option key={-1} value={-1}>New Address</option>
                      </SelectInput>
                    </>
                  )}
                </Field>
              </DivSelectContainer>
            </DivLeftAlign>
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
                      onChange={(e) => { form.setFieldValue(`state`, e.target.value); form.setFieldValue(`pickup`, '-1')}}
                    >
                      <option value='' selected disabled hidden>--</option>
                      <option value='AL'>AL</option>
                      <option value='AK'>AK</option>
                      <option value='AZ'>AZ</option>
                      <option value='AR'>AR</option>
                      <option value='CA'>CA</option>
                      <option value='CO'>CO</option>
                      <option value='CT'>CT</option>
                      <option value='DE'>DE</option>
                      <option value='FL'>FL</option>
                      <option value='GA'>GA</option>
                      <option value='HI'>HI</option>
                      <option value='ID'>ID</option>
                      <option value='IL'>IL</option>
                      <option value='IN'>IN</option>
                      <option value='IA'>IA</option>
                      <option value='KS'>KS</option>
                      <option value='KY'>KY</option>
                      <option value='LA'>LA</option>
                      <option value='ME'>ME</option>
                      <option value='MD'>MD</option>
                      <option value='MA'>MA</option>
                      <option value='MI'>MI</option>
                      <option value='MN'>MN</option>
                      <option value='MS'>MS</option>
                      <option value='MO'>MO</option>
                      <option value='MT'>MT</option>
                      <option value='NE'>NE</option>
                      <option value='NV'>NV</option>
                      <option value='NH'>NH</option>
                      <option value='NJ'>NJ</option>
                      <option value='NM'>NM</option>
                      <option value='NY'>NY</option>
                      <option value='NC'>NC</option>
                      <option value='ND'>ND</option>
                      <option value='OH'>OH</option>
                      <option value='OK'>OK</option>
                      <option value='OR'>OR</option>
                      <option value='PA'>PA</option>
                      <option value='RI'>RI</option>
                      <option value='SC'>SC</option>
                      <option value='SD'>SD</option>
                      <option value='TN'>TN</option>
                      <option value='TX'>TX</option>
                      <option value='UT'>UT</option>
                      <option value='VT'>VT</option>
                      <option value='VA'>SD</option>
                      <option value='WA'>WA</option>
                      <option value='WV'>WV</option>
                      <option value='WI'>WI</option>
                      <option value='WY'>WY</option>
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
              <Field name={`phone`}>
              {({ field, form}) => (
                <Inputm {...field}
                  component='input'
                  placeholder='Phone*' />
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
                  <FormText1>Shipped via*:</FormText1>
                    <SelectInput
                      {...field}
                    >
                      <option value='-1' selected disabled hidden>--</option>
                      { _.includes(supportedStates, values.state) &&
                        <>
                          <option value='airline'>Airline Pickup</option>
                          <option value='customer'>Customer Drop-off</option>
                          <option value='sales'>Salesperson Pickup</option>
                        </>
                      }
                      <option value='ship'>Commercial Carrier</option>
                    </SelectInput>
                  </>
                )}
              </Field>
            </DivSelectContainer>
          </DivLeftAlign>
            <FieldArray
              name="RepairItems"
              render={arrayHelpers => (
                <>
                  {values.RepairItems.map((item, index) => (
                    <DivRepairItemContainer key={index}>
                      <DivRow>
                        <DivSelectContainer>
                          <FormText1Bold>{`Repair Item ${index + 1}`}</FormText1Bold>
                        </DivSelectContainer>
                        {(index === 0 && values.RepairItems.length === 1) ? null :
                          <DivSubItem onClick={() => arrayHelpers.remove(index)}>
                            Remove Item
                          </DivSubItem>
                        }
                      </DivRow>
                      <DivRow>
                        { item.urgency === 'hot' &&
                          <DivAlert>
                            <span>Urgency Hot - Additional charges WILL apply</span>
                          </DivAlert>
                        }
                        { item.urgency === 'warm' &&
                          <DivAlert>
                            <span>Urgency Warm - Additional charges may apply</span>
                          </DivAlert>
                        }
                      </DivRow>
                      <DivRow>
                        <DivSelectContainer>
                          <Field name={`RepairItems.${index}.repairType`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Type of Repair*:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='' selected disabled hidden>--</option>
                                  <option value='VALVE REPAIR'>Hydraulic Valve</option>
                                  <option value='PUMP REPAIR'>Hydraulic Pump</option>
                                  <option value='MOTOR FOR REPAIR'>Hydraulic Motor</option>
                                  <option value='ACCUMULATOR FOR REPAIR'>Hydraulic Accumulator</option>
                                  <option value='CYLINDER FOR REPAIR'>Hydraulic Cylinder</option>
                                  <option value='MOTOR REPAIR'>Electric Motor</option>
                                  <option value='GEARBOX'>Gearbox</option>
                                  <option value='RPR(R)-HASKEL REPAIR'>Haskel Pump</option>
                                  <option value='WINCH REPAIR'>Winch</option>
                                  <option value='HYDRAULIC HOSE'>Hydraulic Hose</option>
                                  <option value='BRC REPAIR'>Servo Drive</option>
                                  <option value='BRC REPAIR'>Servo Motor</option>
                                  <option value='GENERAL LINCOLN'>General Lincoln</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                        <DivSelectContainer>
                          <Field name={`RepairItems.${index}.urgency`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Urgency:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='normal' selected>Normal</option>
                                  <option value='warm'>Warm</option>
                                  <option value='hot'>Hot</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                      </DivRow>
                      <DivLeftAlign>
                        <DivSelectContainer>
                          <Field name={`RepairItems.${index}.fluidType`}>
                            {({ field, form }) => (
                              <>
                              <FormText1>Fluid Type*:</FormText1>
                                <SelectInput
                                  {...field}
                                  onChange={(e) => {
                                    form.setFieldValue(`RepairItems.${index}.fluidType`, e.target.value)
                                    form.setFieldValue(`RepairItems.${index}.fluidOther`, '')
                                  }}
                                >
                                  <option value='' selected disabled hidden>--</option>
                                  <option value='air'>Air</option>
                                  <option value='phosphateester'>Phosphate Ester</option>
                                  <option value='mineraloil'>Standard Mineral oil</option>
                                  <option value='waterglycol'>Water Glycol</option>
                                  <option value='grease'>Grease</option>
                                  <option value='other'>Other</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                      </DivLeftAlign>
                      { item.fluidType === 'other' &&
                        <DivLeftAlign>
                          <Field name={`RepairItems.${index}.fluidOther`}>
                              {({ field, form}) => (
                                <>
                                  <Inputm {...field}
                                    component='input'
                                    placeholder='Specify Other Fluid Type*' />
                                </>
                              )}
                          </Field>
                        </DivLeftAlign>
                      }
                      <DivLeftAlign>
                        <Field name={`RepairItems.${index}.po`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='PO #*' />
                          )}
                        </Field>
                        <Field name={`RepairItems.${index}.part`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Part #' />
                          )}
                        </Field>
                      </DivLeftAlign>
                      <DivLeftAlign>
                        <Field name={`RepairItems.${index}.manufacturer`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Manufacturer' />
                          )}
                        </Field>
                        <Field name={`RepairItems.${index}.model`}>
                          {({ field, form}) => (
                            <Inputm {...field}
                              component='input'
                              placeholder='Model' />
                          )}
                        </Field>
                      </DivLeftAlign>
                      <DivLeftAlign>
                        <DivSelectContainer>
                          <Field name={`RepairItems.${index}.quantity`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Quantity:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='1' selected>1</option>
                                  <option value='2'>2</option>
                                  <option value='3'>3</option>
                                  <option value='4'>4</option>
                                  <option value='5'>5</option>
                                  <option value='6'>6</option>
                                  <option value='7'>7</option>
                                  <option value='8'>8</option>
                                  <option value='9'>9</option>
                                  <option value='10'>10</option>
                                  <option value='11'>11</option>
                                  <option value='12'>12</option>
                                  <option value='13'>13</option>
                                  <option value='14'>14</option>
                                  <option value='15'>15</option>
                                  <option value='16'>16</option>
                                  <option value='17'>17</option>
                                  <option value='18'>18</option>
                                  <option value='19'>19</option>
                                  <option value='20'>20</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                      </DivLeftAlign>
                      <SerialNumberFields
                        fieldCount={item.quantity}
                        index={index}
                      />
                      <DivLeftAlign>
                        <DivSelectContainer>
                          <Field name={`RepairItems.${index}.warrantyRequest`}>
                            {({ field, form}) => (
                              <>
                              <FormText1>Warranty Request:</FormText1>
                                <SelectInput
                                  {...field}
                                >
                                  <option value='false' selected>No</option>
                                  <option value='true'>Yes</option>
                                </SelectInput>
                              </>
                            )}
                          </Field>
                        </DivSelectContainer>
                        { item.warrantyRequest === 'true' &&
                          <Field name={`RepairItems.${index}.warrantyInfo`}>
                            {({ field, form}) => (
                              <Inputm {...field}
                                component='input'
                                placeholder='Original Order or PO #' />
                            )}
                          </Field>
                        }
                      </DivLeftAlign>
                      <Field component='textarea' name={`RepairItems.${index}.issue`}>
                        {({ field, form}) => (
                          <StyledTextArea1 {...field}
                            component='textarea'
                            rows='3'
                            placeholder='Please enter a description of the repair needed'
                          />
                        )}
                      </Field>
                      <Dropzone />
                    </DivRepairItemContainer>
                    ))
                  }
                  {values.RepairItems.length < 10 &&
                    <DivLeftAlign>
                      <DivAddItem onClick={() => arrayHelpers.insert(values.RepairItems.length, emptyItem)}>
                        Add Item
                      </DivAddItem>
                    </DivLeftAlign>
                  }
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
					<DivSubmitContainer>
            <Button type="submit" text='Submit' />
          </DivSubmitContainer>
				</Form>
			)}
		/>
	</DivForm>
)

export default RMAform
