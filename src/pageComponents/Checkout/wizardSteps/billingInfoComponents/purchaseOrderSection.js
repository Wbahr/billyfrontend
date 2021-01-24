import React, { useContext, useEffect } from 'react'
import { Field } from 'formik'
import FormikInput from '../../../_common/formik/input_v2'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import SelectField from '../../../_common/formik/select'
import styled from 'styled-components'
import Context from '../../../../setup/context'

const Row = styled.div`
	display: flex;
	flexDirection: row;
	flex-wrap: wrap;
`
const Label = styled.p`
	margin: auto 10px;
`

export default function PurchaseOrderSection(props) {
  const { values, setFieldValue, checkoutDropdownData: { billingInfo } } = props
  const context = useContext(Context)

  useEffect(() => {
    if (billingInfo) {
      if (values.contact.firstName && !values.billing.firstName) {
        values.billing.firstName = values.contact.firstName
      }
      if (values.contact.lastName && !values.billing.lastName) {
        values.billing.lastName = values.contact.lastName
      }
      if (values.contact.email && !values.billing.email) {
        values.billing.email = values.contact.email
      }
      if (values.contact.phone && !values.billing.phone) {
        values.billing.phone = values.contact.phone
      }

      setFieldValue('billing', {
        ...values.billing
      })
    }
  }, [])
  /* Note: we don't show a "same as shipping" on this screen, because the customer has to use
    the accounting-approved address when paying by PO */
  return (
    <div>
      {!!billingInfo.requiresPONumber && <Row><Label>A PO# is required for this order.</Label></Row>}
      {!!billingInfo.terms && <Row><Label>Terms: {billingInfo.terms}</Label></Row>}
      <Row>
        {!!context.userInfo && <FormikInput label="PO Number*" name="billing.purchaseOrder" />}
        <FormikInput label="Company Name" name="billing.companyName" disabled={!!billingInfo.isNetTerms} />
      </Row>
      <Row>
        <FormikInput label="First Name*" name="billing.firstName" disabled={!!billingInfo.isNetTerms} />
        <FormikInput label="Last Name*" name="billing.lastName" disabled={!!billingInfo.isNetTerms} />
      </Row>
      <Row>
        <FormikInput label='Email Invoice To' name="billing.email" disabled={!!billingInfo.isNetTerms} />
        <FormikInput label="Phone" name="billing.phone" disabled={!!billingInfo.isNetTerms} />
      </Row>
      <FormikInput label="Address 1*" name="billing.address1" width={500} disabled={!!billingInfo.isNetTerms} />
      <FormikInput label="Address 2" name="billing.address2" width={500} disabled={!!billingInfo.isNetTerms} />
      <Row>
        <FormikInput label="City*" name="billing.city" disabled={!!billingInfo.isNetTerms} />
        <FormikInput label="Zip*" name="billing.zip" width={150} style={{ width: 'auto' }} disabled={!!billingInfo.isNetTerms} />
      </Row>
      <Row>
        <Field
          name="billing.country"
          component={SelectField}
          options={[{ label: 'United States', value: 'us' }, { label: 'Canada', value: 'canada' }]}
          placeholder="Select a Country"
          isSearchable={false}
          label="Country*"
          isDisabled={!!billingInfo.isNetTerms}
        />
        {values.billing.country === 'us' && (
          <Field
            name="billing.stateOrProvince"
            component={SelectField}
            options={StateList}
            placeholder="Select a State"
            label="State*"
            width="200px"
            isDisabled={!!billingInfo.isNetTerms}
          />
        )}
        {values.billing.country === 'canada' && (
          <Field
            name="billing.stateOrProvince"
            component={SelectField}
            options={CanadianProvinceList}
            placeholder="Select a Province"
            label="Province*"
            width="200px"
            isDisabled={!!billingInfo.isNetTerms}
          />
        )}

      </Row>
    </div>
  )
}
