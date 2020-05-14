import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../../config/context'

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

export default function ShippingScheduleItem({item, index}) {
	const itemId = parseInt(item.frecno,10)
	const context = useContext(Context)
	let displayItem = context.itemDetailCache.find(elem => elem.itemDetails.invMastUid == itemId)
	const {
		itemDetails,
		customerPartNumbers
	} = displayItem


	let Content
	if(_.isNil(itemDetails)) {
		Content = (<p>{item.freqno}</p>)
	} else {
		let imagePath
		let resultImage = _.get(itemDetails,'image[0].path',null)
		if (_.isNil(resultImage)){
			imagePath = 'https://www.airlinehyd.com/images/no-image.jpg'
		} else {
			let imagePathArray = resultImage.split('\\')
			let imageFile = imagePathArray[imagePathArray.length - 1]
			imageFile = imageFile.slice(0, -5) + 't.jpg'
			imagePath = 'https://www.airlinehyd.com/images/items/' + imageFile
		}

		let tomorrowDate = new Date()
		tomorrowDate.setDate(tomorrowDate.getDate() + 1)

		let selectedCustomerPartNumber = customerPartNumbers.find(elem => elem.id === item.customerPartNumberId)

		Content = (
			<DivCard>
				<DivCol1>
					<Img height='65px'  src={imagePath} />
				</DivCol1>
				<DivCol2>
					<P1>{itemDetails.itemDesc}</P1>
					<P2>{itemDetails.itemCode} | AHC{itemDetails.invMastUid} {!_.isNil(selectedCustomerPartNumber) && `| ${selectedCustomerPartNumber.customerPartNumber}`}</P2>
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
						{({
							field,
							form,
							form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
							meta
						}) => (
							<DivRow>
								<DivSpacer>
									<FontAwesomeIcon icon="calendar" color="lightgrey"/>
								</DivSpacer>
								<DatePicker
									minDate={tomorrowDate}
									selected={Date.parse(field.value)}
									onChange={(value)=>form.setFieldValue(field.name, value)}
								/>
							</DivRow>
						)
						}
					</Field>
				</div>
			</DivCard>
		)
	}
	return(
		<DivContainer key={index}>
			{Content}
		</DivContainer>
	)
}