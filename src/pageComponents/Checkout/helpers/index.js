export const defaultBilling = {
	paymentMethod: '',
		purchaseOrder: '',
		firstName: '',
		lastName: '',
		contactId: '',
		address1: '',
		address2: '',
		city: '',
		stateOrProvince: '',
		zip: '',
		country: 'us',
		phone: '',
		email: '',
		cardType: ''
}

export const defaultConfirmationEmail = {
	sendToShipTo: 1,
	ccEmails: []
}

export const defaultContact = {
	savedContact: null,
	firstName: '',
	lastName: '',
	phone: '',
	email: ''
}

export const defaultShipTo = {
	saveShipTo: 0,
	address1: '',
	address2: '',
	city: '',
	stateOrProvince: '',
	zip: '',
	country: 'us',
	phone: '',
	email: '',
	shippingNotes: '',
	carrierId: '',
	isCollect: 0,
	collectNumber: ''
}

export const defaultQuote = {
	packingBasisName: '',
	packingBasis: '0',
}

export const transformForPaymentInfo = ({billing: {address1, address2, city, state, zip, country},
												 shipto: {companyName, phone, email, firstName, lastName, ...shipto}}) => ({
	companyName,
	phone,
	email,
	billingAddress: {
		address1, address2, city, state, zip, country
	},
	shippingAddress: {
		name: `${firstName} ${lastName}`,
		phone,
		address1: shipto.address1,
		address2: shipto.address2,
		city: shipto.city,
		state: shipto.state,
		zip: shipto.zip,
		country: shipto.country
	}
})