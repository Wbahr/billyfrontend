import React, { useContext, useEffect } from 'react'
import { Field } from 'formik'
import FormikInput from '../../../_common/formik/input_v2'
import { StateList, CanadianProvinceList } from '../../../_common/helpers/helperObjects'
import SelectField from '../../../_common/formik/select'
import styled from 'styled-components'
import Context from '../../../../config/context'

const Row = styled.div`
	display: flex;
	flexDirection: row;
	flex-wrap: wrap;
`

export default function PurchaseOrderSection(props) {
    const { values, setFieldValue, checkoutDropdownData: { customerPhysicalAddress } } = props
    const context = useContext(Context)
    useEffect(() => {
        if (customerPhysicalAddress) {
            setFieldValue('billing', {
                ...values.billing,
                companyName: customerPhysicalAddress.companyName || '',
                address1: customerPhysicalAddress.physAddress1 || '',
                address2: customerPhysicalAddress.physAddress2 || '',
                city: customerPhysicalAddress.physCity || '',
                zip: customerPhysicalAddress.physPostalCode || '',
                stateOrProvince: customerPhysicalAddress.physState || '',
                country: customerPhysicalAddress.physCountry?.toLowerCase() || ''
            })
        }
    }, [customerPhysicalAddress])

    return (
        <div>
            <Row>
                {!!context.userInfo && <FormikInput label="PO Number*" name="billing.purchaseOrder" />}
                <FormikInput label="Company Name" name="billing.companyName" />
            </Row>
            <Row>
                <FormikInput label="First Name*" name="billing.firstName" />
                <FormikInput label="Last Name*" name="billing.lastName" />
            </Row>
            <Row>
                <FormikInput label='Email Invoice To' name="billing.email" />
                <FormikInput label="Phone" name="billing.phone" />
            </Row>
            <FormikInput label="Address 1*" name="billing.address1" width={500} />
            <FormikInput label="Address 2" name="billing.address2" width={500} />
            <Row>
                <FormikInput label="City*" name="billing.city" />
                <FormikInput label="Zip*" name="billing.zip" width={150} style={{ width: 'auto' }} />
            </Row>
            <Row>
                <Field
                    name="billing.country"
                    component={SelectField}
                    options={[{ label: 'United States', value: 'us' }, { label: 'Canada', value: 'canada' }]}
                    placeholder="Select a Country"
                    isSearchable={false}
                    label="Country*"
                />
                {values.billing.country === 'us' && (
                    <Field
                        name="billing.stateOrProvince"
                        component={SelectField}
                        options={StateList}
                        placeholder="Select a State"
                        label="State*"
                        width="200px"
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
                    />
                )}
            </Row>
        </div>
    )
}
