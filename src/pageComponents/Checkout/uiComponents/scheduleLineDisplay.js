import React  from 'react'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import NumberFormat from 'react-number-format'
import { getThumbnailImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'

const DivContainer = styled.div`
  display: flex;
  border-bottom: 1px whitesmoke solid;
  padding: 8px 16px;
  margin: 8px 0;
  height: 70px;
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

const LabelBold = styled(Label)`
  font-weight: 600;
  font-size: 16px;
`

const P1 = styled.p`
  font-size: 16px;
  font-weight: 600;
`

const P2 = styled.p`
  color: grey;
  font-size: 12px !important;
`
//TODO rename this; it has the same name as the component in scheduleLine.js
export default function ScheduleLineDisplay({ item, price, itemDetails, customerPartNumbers }) {

    const imagePath = getThumbnailImagePath(itemDetails)
    let date = item.requestedShipDate
    date = (date.getMonth() +1) + '/' +  date.getDate() + '/' +  date.getFullYear()

    const selectedCustomerPartNumber = customerPartNumbers?.find(elem => elem.id === item.customerPartNumberId)
    const totalPrice = Number(item.quantity) * (
        (item.itemUnitPriceOverride || price)
            ? Number(item.itemUnitPriceOverride ? item.itemUnitPriceOverride : price.unitPrice)
            : 0
    )

    const Content = () => (
        <DivCard>
            <DivCol1>
                <Img height='65px' src={imagePath} />
            </DivCol1>
			
            <DivCol2>
                <P1>{itemDetails?.itemDesc}</P1>
                <P2>{itemDetails?.itemCode} | AHC{itemDetails?.invMastUid} {selectedCustomerPartNumber && `| ${selectedCustomerPartNumber.customerPartNumber}`}</P2>
                <P2>Requested Date: {date}</P2>
            </DivCol2>
			
            <DivCol3>
                <DivQuantity>
                    <DivItem>
                        <Label>
                            <NumberFormat
                                value={item.itemUnitPriceOverride ? item.itemUnitPriceOverride : (price ? price.unitPrice : 0) }
                                displayType="text"
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                            />/each
                        </Label>
                    </DivItem>
                </DivQuantity>
				
                <DivQuantity>
                    <DivItem>
                        <Label>Qty: {item.quantity}</Label>
                    </DivItem>
                </DivQuantity>
				
                <DivQuantity>
                    <DivItem>
                        <LabelBold>
                            <NumberFormat
                                value={totalPrice}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        </LabelBold>
                    </DivItem>
                </DivQuantity>
            </DivCol3>
        </DivCard>
    )
	
    return (
        <DivContainer>
            <Content/>
        </DivContainer>
    )
}