import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getThumbnailImagePath } from '../../_common/helpers/generalHelperFunctions'

const DivContainer = styled.div`
  display: flex;
  border-bottom: 1px whitesmoke solid;
  padding: 8px 16px;
  margin: 8px 0;
  height: 70px;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
`

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
`

const DivCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const DivQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const DivCol1 = styled.div`
  display: flex;
  width: 100px;
`

const DivCol2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 300px;
  height: 100%;
  margin-right: 50px;
  p {
    font-size: 16px;
    margin: 0;
  }
`

const DivCol3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 99;
`

const Img = styled.img`
  margin: 0 4px;
`

const Label = styled.label`
  margin: 0;
  font-size: 14px;
`

const P1 = styled.p`
  font-size: 16px;
  font-weight: 600;
`

const P2 = styled.p`
  color: grey;
  font-size: 12px !important;
`

const DivSpacer = styled.div`
  margin: 0 8px;
`

const getContent = (itemDetails, item, customerPartNumbers, index) => {
    if (!itemDetails) {
        return <p>{item.frecno}</p>
    } else {
        const imagePath = getThumbnailImagePath(itemDetails)
        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const selectedCustomerPartNumber = customerPartNumbers?.find(elem => elem.id === item.customerPartNumberId)
		
        return (
            <DivCard>
                <DivCol1>
                    <Img height='65px' src={imagePath} alt={item.frecno} />
                </DivCol1>
				
                <DivCol2>
                    <P1>{itemDetails.itemDesc}</P1>
                    <P2>{itemDetails.itemCode} | AHC{itemDetails.invMastUid} {!!selectedCustomerPartNumber && `| ${selectedCustomerPartNumber.customerPartNumber}`}</P2>
                </DivCol2>
				
                <DivCol3>
                    <DivQuantity>
                        <DivItem>
                            <Label>Qty: {item.quantity}</Label>
                        </DivItem>
                    </DivQuantity>
                </DivCol3>
				
                <div>
                    <Field name={`schedule.cartWithDates.${index}.requestedShipDate`}>
                        {({ field, form }) => (
                            <DivRow>
                                <DivSpacer>
                                    <FontAwesomeIcon icon="calendar" color="lightgrey"/>
                                </DivSpacer>
								
                                <DatePicker
                                    minDate={tomorrowDate}
                                    selected={Date.parse(field.value)}
                                    onChange={(value) => form.setFieldValue(field.name, value)}
                                />
                            </DivRow>
                        )}
                    </Field>
                </div>
            </DivCard>
        )
    }
}

export default function ScheduleLine({ item, itemDetails, customerPartNumbers, index }) {
	
    return (
        <DivContainer key={index}>
            {getContent(itemDetails, item, customerPartNumbers, index)}
        </DivContainer>
    )
}