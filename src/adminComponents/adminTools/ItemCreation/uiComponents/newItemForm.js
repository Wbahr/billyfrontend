// Render Prop
import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';
import styled from "styled-components"
import FormikInput from '../../../../pageComponents/_common/formik/input_v2'
import FormikSelect from '../../../../pageComponents/_common/formik/select'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from '@material-ui/core'

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

export const UnitOfMeasure = [
  {
      "label": "Alabama",
      "value": "AL"
  },
  {
      "label": "Alaska",
      "value": "AK"
  }
]

export default function NewItemForm(props) {
  const {
    searchTerm,
    supplierList,
    selectedSupplier,
    unitsOfMeasureList,
    productGroupsList
  } = props
  let index = supplierList.findIndex(elem => elem.id === selectedSupplier)
  let SearchTerm = supplierList[index].prefix + ' ' + searchTerm
  return <div>
    <Formik
      initialValues={{
        itemCreation: {
          itemID: SearchTerm, 
          itemDescription: '', 
          supplierID: selectedSupplier,
          unitOfMeasure: '', 
          listPrice: '',
          airlinePartCost: ''
        }
      }}
      validate={values => {
        let errors = {}
        if (!values.itemID) {
          errors.itemID = 'Required';
        } else if (!/^[A-Z0-9._ %+-]{2,40}$/i.test(values.itemID)) {
          errors.itemID = 'Please enter less than 40 characters and exclude {*,"}';
        }
        if (!values.productGroupID) {
          errors.productGroupID = 'Required';
        } else if (!/^[0-9]{4,4}$/i.test(values.productGroupID)) {
          errors.productGroupID = 'Enter a valid ProductGroupID';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <H2>Item Creation Form</H2>
          <DivFormContainer>
            <FormikInput label="Item ID:" type="text" name="itemCreation.itemID" disabled={true} />
            <FormikInput label="Item Description (max 40 char):" type="text" name="itemCreation.itemDescription"/>
            <Field 
              name="itemCreation.unitOfMeasure" 
              component={FormikSelect} 
              options={unitsOfMeasureList}
              placeholder="Select a UOM"
              label="Unit of Measure:"
              width="400px"
            /> 
            <FormikInput type="hidden" name="itemCreation.supplierID" />
            <FormikInput label="List Price:" type="currency" name="itemCreation.listPrice" />
            <FormikInput label="Airline Cost:" type="currency" name="itemCreation.airlinePartCost" />
            <Field 
              name="itemCreation.productGroupID" 
              component={FormikSelect} 
              options={productGroupsList}
              placeholder="Select a Product Group"
              label="Product Group ID:"
              width="400px"
            /> 
            <DivCenter>
              <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registering Item..' : 'Register Item'}
              </Button>
            </DivCenter>
          </DivFormContainer>
        </Form>
      )}
    </Formik>
  </div>
}