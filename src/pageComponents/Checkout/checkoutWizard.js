import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Formik} from 'formik'


export default function CheckoutWizard({step}) {
  const ContactForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
  }) => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name && <div>{errors.name}</div>}
      <button type="submit">Submit</button>
    </form>
  )

  switch(step){
    case 1:
      return(
        <Formik component={ContactForm} />
      )
    case 2:
      return(
        <Formik component={ContactForm} />
      )
    default: 
      return(
        <Formik component={ContactForm} />
      )
  }

}

CheckoutWizard.propTypes = {
  step: PropTypes.number.isRequired
}