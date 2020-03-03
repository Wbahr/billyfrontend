// Render Prop
import React, { useState } from 'react'
import _ from 'lodash'
import { Formik, Form as FormikForm, Field } from 'formik'
import styled from "styled-components"
import FormikInput from '../../../../pageComponents/_common/formik/input_v2'
import FormikSelect from '../../../../pageComponents/_common/formik/select'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from '@material-ui/core'
import * as Yup from 'yup'
import { useMutation } from '@apollo/react-hooks'

const Form = styled(FormikForm)`
  margin: 32px 64px;
`

const DivCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const H2 = styled.h2`
  font-family: ProximaBold;
  width: 100%;
  text-align: center;
  font-size: 26px;
  margin: 0;
  background-color: white;
  color: black;
  padding: 6px;
  border-bottom: 1px solid;
  text-transform: uppercase;
`

const DivFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 16px 32px;
  width: 100%;
  margin-bottom: 8px; 
`

const DivError = styled.div`
  height: auto;
  width: max-content;
  border: 1px solid orange;
  border-radius: 2px;
  background-color: cornsilk;
  color: darkorange;
  padding 4px;
  margin: 0 auto;
  margin-bottom: 4px;
`

const ItemCreationSchema = Yup.object({
  itemCreate: Yup.object({
    itemDescription: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    listPrice: Yup.string()
    .required('Required'),
    unitOfMeasure: Yup.string()
    .required('Required'),
    airlinePartCost: Yup.string()
    .required('Required'),
    productGroupID: Yup.string()
    .required('Required'),
  })
})

const CREATE_ITEM = gql`
  mutation CreateItem($item: ItemCreateInputGraphType) {
    itemCreate(item: $item){
      itemId
      message
      success
    }
  }
`

export default function NewItemForm(props) {
  const {
    searchTerm,
    supplierList,
    selectedSupplier,
    unitsOfMeasureList,
    productGroupsList,
    clearForm
  } = props
  let index = supplierList.findIndex(elem => elem.id === selectedSupplier)
  let SearchTerm = _.isNil(supplierList[index].prefix) ? searchTerm : supplierList[index].prefix + ' ' + searchTerm

  const [executeCreateItem, { loading, error, data }] = useMutation(CREATE_ITEM, {
    onCompleted: data => {
      let responseData = data.itemCreate
      if(responseData.success){
        console.log('submitted', responseData)
        clearForm()
      } else {
        console.log('error')
      }
    }
  })
  return <div>
    <Formik
      initialValues={{
        itemCreate: {
          itemID: SearchTerm, 
          itemDescription: '', 
          supplierID: selectedSupplier,
          unitOfMeasure: '', 
          listPrice: '',
          airlinePartCost: '',
          productGroupID: ''
        }
      }}
      validationSchema={ItemCreationSchema}
      onSubmit={(values) => {
        executeCreateItem({"variables": {'item': values}})
      }}
    >
      {({ values, isSubmitting, errors }) => (
        console.log('errors', errors),
        <Form>
          <H2>Item Creation Form</H2>
          <DivFormContainer>
            {Object.keys(errors).length > 0 && <DivCenter><DivError>Please fill out all fields</DivError></DivCenter>}
            <FormikInput label="Item ID*:" type="text" name="itemCreate.itemID" disabled={true} />
            <FormikInput label={`Item Description (${values.itemCreate.itemDescription.length}/40 char)*:`} type="text" name="itemCreate.itemDescription" maxlength="40"/>
            <Field 
              name="itemCreate.unitOfMeasure" 
              component={FormikSelect} 
              options={unitsOfMeasureList}
              placeholder="Select a UOM"
              label="Unit of Measure*:"
              width="400px"
            /> 
            <FormikInput type="hidden" name="itemCreate.supplierID" />
            <FormikInput label="List Price*:" type="currency" name="itemCreate.listPrice" />
            <FormikInput label="Airline Cost*:" type="currency" name="itemCreate.airlinePartCost" />
            <Field 
              name="itemCreate.productGroupID" 
              component={FormikSelect} 
              options={productGroupsList}
              placeholder="Select a Product Group"
              label="Product Group ID*:"
              width="400px"
            /> 
            <DivCenter>
              <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
                {isSubmitting ? 'Registering Item..' : 'Register Item'}
              </Button>
            </DivCenter>
          </DivFormContainer>
        </Form>
      )}
    </Formik>
  </div>
}