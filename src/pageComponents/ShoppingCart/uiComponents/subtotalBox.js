import React, { useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {DebounceInput} from 'react-debounce-input'
import Context from '../../../config/context'
import NumberFormat from 'react-number-format'

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 16px 8px;
`

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 200px;
	margin-left: auto;
	padding-right: 16px;
	align-items: flex-end;
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
	margin: 4px 0;
	box-shadow: 1px 1px 2px #000;
	p {
		margin: 0;
		margin-left: 8px;
		font-size: 18px;
		font-weight: 500;
	}
`

const DivQuoteButton = styled(DivCheckoutButton)`
	background-image: none;
	background-color: #535353;
`

export default function SubtotalBox({history}) {
	const context = useContext(Context)

	return(
		<Container>
			<Context.Consumer>
				{({ setOrderNotes, orderNotes }) => (
					<DebounceInput
						element="textarea"
						minLength={2}
						debounceTimeout={300}
						onChange={e => setOrderNotes(e.target.value)} 
						placeholder='Type Order Notes here'
						style={{'width': '600px'}}
						value={orderNotes}
					/>
				)}
			</Context.Consumer>

			<Div>
				<h5>Subtotal: {context.cartPricing.state === 'loading' ? 'Calculating...' : <NumberFormat value={context.cartPricing.subTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>}</h5>
				{ context.cart.length > 0 &&
					<>
						<Context.Consumer>
							{({userInfo}) => {
								if (_.isNil(userInfo) || (!_.isNil(userInfo) && userInfo.role !== 'AirlineEmployee')){
									return(
										<DivCheckoutButton onClick={()=>history.push('/checkout')}>
											<FontAwesomeIcon icon="lock" color="white"/>
											<p>Start Secure Checkout</p>
										</DivCheckoutButton>
									)
								}
							}}        
						</Context.Consumer>
						<Context.Consumer>
							{({userInfo}) => {
								if (!_.isNil(userInfo) && (userInfo.role === 'AirlineEmployee' || userInfo.role === 'Impersonator')){
									return(
										<DivQuoteButton onClick={()=>history.push('/create-quote')}>
											<FontAwesomeIcon icon='file-invoice-dollar' color="white"/>
											<p>Create a Quote</p>
										</DivQuoteButton>
									)
								}
							}}        
						</Context.Consumer>
						{/* <Context.Consumer>
							{({userInfo}) => {
								if (!_.isNil(userInfo)){
									return(
										<DivShoppinglistButton>
											<p>Save to Shopping List</p>
										</DivShoppinglistButton>
									)
								}
							}}        
						</Context.Consumer> */}
					</>
				}
			</Div>
		</Container>
	)
}