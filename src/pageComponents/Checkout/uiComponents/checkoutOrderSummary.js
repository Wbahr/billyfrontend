import React, { useContext } from 'react'
import styled from 'styled-components'
import Context from '../../../config/context'
import NumberFormat from 'react-number-format'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: max-content;
  margin-left: auto;
  padding: 16px;
  align-items: flex-end;
  position: -webkit-sticky;
  position: sticky;
  top: 125px;
  margin-top: 85px;
  border: 1px solid lightgrey;
`

const H4 = styled.h4`
  width: 100%;
  font-family: ProximaBold;
  text-transform: uppercase;
  padding-left: 4px;
`

const DivButtonContainer = styled.div `
  margin: auto auto 0 auto;
`

const DivCheckoutButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db1633;
  background-image: linear-gradient(to top left, #950f23, #DB1633);
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  width: 250px;
  margin: 8px 0;
  box-shadow: 1px 1px 2px #000;
  
  p {
    margin: 0;
    margin-left: 8px;
    font-size: 18px;
    font-weight: 500;
  }
`

const DivLineItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  min-width: 250px;
  align-self: center;
  p {
    margin: 0;
  }
`

const DivLineItemTotal = styled(DivLineItem)`
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #001d3d;
  p {
    font-size: 18px;
    font-weight: 600;
  }
`

export default function CheckoutOrderSummary({currentStep, zipcode, taxRate, taxRateLoading}) {
  const {cartPricing: {subTotal, tariff}} = useContext(Context)
  
  const taxAmount = subTotal * taxRate
	console.log(`Current Step: ${currentStep} - Tax Amount: ${taxAmount}`)
	return (
		<Div>
			<H4>Order Summary</H4>
			
			<DivLineItem>
				<p>Subtotal</p>
				<p><NumberFormat value={subTotal} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale/></p>
			</DivLineItem>
			
			<DivLineItem>
				<p>Tariff</p>
				<p><NumberFormat value={tariff} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale/></p>
			</DivLineItem>
			
			<DivLineItem>
				<p>Tax</p>
				{/* If past step 1 (ship to), show tax */}
				{
          taxRateLoading 
            ? <p>Loading...</p>
            : (currentStep >= 1 && zipcode) ? (
              <p>
                <NumberFormat
                  value={taxAmount}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                />
              </p>
            ) : <p>(TBD)</p>
					
				}
			</DivLineItem>
			
			<DivLineItem>
				<p>Shipping</p>
				<p>(TBD)</p>
			</DivLineItem>
			
			<DivLineItemTotal>
				<p>
					Total <NumberFormat
						value={Number(subTotal) + Number(tariff) + Number(taxAmount)}
						displayType="text"
						thousandSeparator={true}
						prefix="$"
						decimalScale={2}
						fixedDecimalScale
					/>
				</p>
			</DivLineItemTotal>
		</Div>
	)
}