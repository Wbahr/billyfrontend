import React from 'react'
import { Field } from 'formik'

export const ShippingScheduleForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <label>How do you want your order to ship?</label>
    <Field as="select" name="schedule.packing_basis">
      <option value="0">Complete</option>
      <option value="1">When Ready</option>
      <option value="2">By Line</option>
    </Field>
    {values.schedule.packing_basis === "0" && <p>Your order will ship complete with all parts.</p>}
    {values.schedule.packing_basis === "1" && <p>Your order will ship in increments as items become ready.</p>}
    {values.schedule.packing_basis === "2" && <p>Please specify dates below (by line) when you want each part to ship.</p>}
    {/* {values.schedule.packing_basis === "2" &&
      <FieldArray
        name="schedule.requested_dates"
        render={arrayHelpers => (
          <div>
            {(values.friends && values.friends.length > 0) && (
              values.friends.map((friend, index) => (
                <div key={index}>
                  <Field name={`schedule.requested_dates.${index}`} />
                </div>
              ))
            )}
          </div>
        )}
      />
    } */}
    <label>Disposition</label>
    <Field as="select" name="schedule.disposition">
      <option value="0" disabled selected>Select a Disposition</option>
      <option value="1">Backorder</option>
      <option value="2">Drop Ship</option>
    </Field>
    <button type="submit">Print</button>
  </form>
)

export const defaultValues = {
  schedule: {
    packing_basis: "0",
    requested_dates: []
  }
}