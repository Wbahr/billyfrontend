import React from 'react'
import styled from 'styled-components'
import { Field, FieldArray } from 'formik'
import ShippingScheduleLine from '../uiComponents/scheduleLine'
import SelectField from '../../_common/formik/select'
import FormikInput from '../../_common/formik/input_v2'
import { packingBasis } from '../helpers/checkoutDropdownData'

const FormRow = styled.div`
    display: flex;
    flex-wrap: wrap;
	width: 100%;
	margin-top: 24px;
	align-items: center;
	padding: 0 8px;
	label {
		margin: 4px 8px auto 4px;
		font-style: italic;
	}
`

const Pinfo = styled.p`
	display: flex;
	font-size: 16px;
	padding: 8px;
	border: 1px solid black;
	background-color: #e7f2ff;
	border: 1px #007bff solid;
	border-radius: 2px;
	color: #007bff;
	margin: 8px 16px 0 16px;
`

const DivScheduleHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
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

const Container = styled.div`
    max-width: 100%;
`

const getInfoMessage = packingBasisName => {
    switch (packingBasisName) {
    case 1:
        return <Pinfo>Your order will ship complete when all parts are available.</Pinfo>
    case 2:
        return <Pinfo>In-stock items will ship within 2 business days. Non-stock items ship complete when they all become available.</Pinfo>
    case 3:
        return <Pinfo>Your order will ship by line as items become available. Multiple shipping charges may apply.</Pinfo>
    case 4:
        return (
            <div>
                <Pinfo>Please specify dates by line (below) for when you want each part to ship.</Pinfo>
                <DivScheduleHeader><p>Item</p><p>Requested Shipment Date</p></DivScheduleHeader>
            </div>
        )
    default:
        return <div/>
    }
}

export function ShippingScheduleForm(props) {
    const {
        values: {
            schedule: { cartWithDates, packingBasisName }
        },
        setFieldValue,
        itemsDetails,
        itemsCustomerPartNumbers
    } = props

    function handlePackingBasisChange(name, value) {
        setFieldValue(name, value)
        const foundPackingBasis = packingBasis.find(elem => elem.value === value)
        setFieldValue('schedule.packingBasis', foundPackingBasis.apiValue)
    }
  
    const InfoMessage = ({ packingBasisName }) => getInfoMessage(packingBasisName)
  
    const mapShippingScheduleLines = (item, index) => {
        const details = itemsDetails?.find(detail => detail.invMastUid === item.invMastUid)
        const customerPartNumbers = itemsCustomerPartNumbers?.filter(part => part.invMastUid === item.invMastUid)
    
        return (
            <ShippingScheduleLine
                key={index}
                item={item}
                itemDetails={details}
                customerPartNumbers={customerPartNumbers}
                index={index}
            />
        )
    }
  
    const renderLineItems = () => cartWithDates?.length
        ? cartWithDates.map(mapShippingScheduleLines)
        : <p>No Cart Items</p>
    
    return (
        <Container>
            <FormRow>
                <label htmlFor="schedule.packingBasisName">How do you want your order to ship?*</label>
                <div style={{ flexGrow: 99, maxWidth: '100%' }}>
                    <Field
                        name="schedule.packingBasisName"
                        component={SelectField}
                        options={packingBasis}
                        isSearchable={false}
                        changeFunction={handlePackingBasisChange}
                    />
                    <FormikInput type="hidden" name="schedule.packingBasis" />
                </div>
            </FormRow>
      
            <InfoMessage packingBasisName={packingBasisName}/>
      
            {
                packingBasisName === 4 && (
                    <FieldArray
                        name="schedule.cartWithDates"
                        render={renderLineItems}
                    />
                )}
        </Container>
    )
}