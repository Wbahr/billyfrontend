// Render Prop
import React, { useState }  from 'react'
import styled from 'styled-components'
import { newCustomerInitialValues, newCustomerSchema } from '../validationSchemas'
import { useMutation } from '@apollo/client'
import Summary from '../summary'
import { SAVE_NEW_CUSTOMER } from 'config/providerGQL'
import NewCustomerForm, { mapToApi } from './newCustomerForm'

const H4 = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 16px;
`

export default function NewCustomer() {
  const [saved, setSaved] = useState(false)
  const [saveNewCustomer] = useMutation(SAVE_NEW_CUSTOMER, { 
    onCompleted() {
      setSaved(true)
    }
  })

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => { 
      saveNewCustomer(mapToApi(values))
      setSubmitting(false)
    }, 1000)
  }

  if (saved === true) {
    return <Summary />
  } else {
    return (
      <>
        <H4>New Customer</H4>
        <NewCustomerForm 
          useExpandedMode={true}
          showCustomerLookup={false}
          newCustomerInitialValues={newCustomerInitialValues} 
          validationSchema={newCustomerSchema} 
          onSubmit={onSubmit} 
          choosePasswordEnabled={true} 
          buttonText="Register Account"
        />
      </>
    )
  }
}
