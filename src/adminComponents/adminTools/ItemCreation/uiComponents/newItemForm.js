// Render Prop
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from "styled-components"
import FormikInput from '../../../../pageComponents/_common/formik/input_v2'
import FormikSelect from '../../../../pageComponents/_common/formik/select'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0;
`

const H4 = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #DB1633;
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

export default function NewItemForm() {

  return <div>
    <H2>Item Creation</H2>
    <H4>for internal new items</H4>
    <Formik
      initialValues={{
        itemID: 'SMC kq2', 
        itemDescription: '', 
        unitOfMeasure: '', 
        listPrice: '0.00',
        airlinePartCost: '0.00'
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
          <DivFormContainer>
            <FormikInput label="Item ID:" type="text" name="itemID" disabled="true" />
            <FormikInput label="Item Description (max 40 char):" type="text" name="itemDescription"/>
            <Field 
              name="unitOfMeasure" 
              component={FormikSelect} 
              options={UnitOfMeasure}
              placeholder="Select a UOM"
              label="Unit of Measure:"
              width="400px"
            /> 
            <FormikInput type="hidden" name="supplierID" disabled="true"/>
            <FormikInput label="Product Group ID" type="text" name="productGroupID" />
            <FormikInput label="List Price" type="text" name="listPrice" />
            <FormikInput label="Airline Cost" type="text" name="airlinePartCost" />
          </DivFormContainer>
          <DivCenter>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registering Item..' : 'Register Item'}</button>
          </DivCenter>
        </Form>
      )}
    </Formik>
  </div>
}