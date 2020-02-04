import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import ShippingScheduleLine from '../uiComponents/scheduleLine'

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

const FormikSelect = styled.select`
  // height: 40px;
  :focus{
    outline: none;
  }
`

const DivScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 36px;
  margin: 24px 0 12px 0;
  border-bottom: 2px whitesmoke solid;
  p {
    font-family: Proxima;
    font-style: italic;
    margin: 0;
  }
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
      <Field name="schedule.packing_basis">
        {({ field, form, meta }) => (
            <FormikSelect {...field}>
              <option value="0" disabled selected>Select an Option</option>
              <option value="1">Ship Complete</option>
              <option value="2">Ship in Two Shipments</option>
              <option value="3">Ship when Ready</option>
              <option value="4">Schedule by Line</option>
            </FormikSelect>
        )}
      </Field>
    </FormRow>
    {values.schedule.packing_basis === "1" && <Pinfo>Your order will ship complete when all parts are available.</Pinfo>}
    {values.schedule.packing_basis === "2" && <Pinfo>In-stock items will ship within 2 business days. Non-stock items will ship complete when they all become available.</Pinfo>}
    {values.schedule.packing_basis === "3" && <Pinfo>Your order will ship by line as items become available. Multiple shipping charges may apply.</Pinfo>}
    {values.schedule.packing_basis === "4" && (
      <>
        <Pinfo>Please specify dates by line (below) for when you want each part to ship.</Pinfo>
        <DivScheduleHeader><p>Item</p><p>Requested Shipment Date</p></DivScheduleHeader>
      </>
    )}
    {values.schedule.packing_basis === "3" &&
      values.shoppingCart.map(item => 
        <ShippingScheduleLine item={item} />
      )
    }
    {/* <FormRow>
      <label>Disposition</label>
      <Field as="select" name="schedule.disposition">
        <option value="0" disabled selected>Select a Disposition</option>
        <option value="1">Backorder</option>
        <option value="2">Drop Ship</option>
      </Field>
    </FormRow> */}
  </form>
)

export const defaultValues = {
  schedule: {
    packing_basis: "0",
    requested_dates: []
  }
}