import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

const FormRow = styled.div`
  display: flex;
  margin-top: 24px;
  label {
    margin: 0 16px;
  }
`

const Pinfo = styled.p`
  display: flex;
  font-size: 16px;
  padding: 8px;
  border: 1px solid black;
  width: max-content;
  background-color: #e7f2ff;
  border: 1px #007bff solid;
  border-radius: 2px;
  color: #007bff;
  margin: 8px 16px 0 16px;
`

export const ShippingScheduleForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <FormRow>
      <label>How do you want your order to ship?</label>
      <Field as="select" name="schedule.packing_basis">
        <option value="0" disabled selected>Select an Option</option>
        <option value="1">Complete</option>
        <option value="2">When Ready</option>
        <option value="3">By Line</option>
      </Field>
    </FormRow>
    {values.schedule.packing_basis === "1" && <Pinfo>Your order will ship complete with all parts.</Pinfo>}
    {values.schedule.packing_basis === "2" && <Pinfo>Your order will ship in increments as items become ready.</Pinfo>}
    {values.schedule.packing_basis === "3" && <Pinfo>Please specify dates by line (below) for when you want each part to ship.</Pinfo>}
    {values.schedule.packing_basis === "3" &&
      console.log('cart', values)
    }
    <FormRow>
      <label>Disposition</label>
      <Field as="select" name="schedule.disposition">
        <option value="0" disabled selected>Select a Disposition</option>
        <option value="1">Backorder</option>
        <option value="2">Drop Ship</option>
      </Field>
    </FormRow>
  </form>
)

export const defaultValues = {
  schedule: {
    packing_basis: "0",
    requested_dates: []
  }
}