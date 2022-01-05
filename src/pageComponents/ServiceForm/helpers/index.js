export const defaultBilling = {
    paymentMethod: 'credit_card', /* note: if the default is changed to purchase order, anon users will not be able to checkout */
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
    cardType: 'new_card',
    cardIsValid: false,
    companyName: '',
    savePaymentMethod: false,
    sameAsShipping: false,
}

export const defaultConfirmationEmail = {
    sendToShipTo: true,
    imagesOnQuote: false,
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
    carrierId: -1,
    isCollect: false,
    collectNumber: '',
    companyName: '',
    submissionLocation: '',
}

export const defaultQuote = {
    packingBasisName: '',
    packingBasis: '0',
}

export const emptyPart = {
    urgency: 'Normal',
    type: null,
    repairLocation: null,
    warranty: false,
    quantity: 1,
    manufacturer: '',
    modelCode: '',
    partNumber: '',
    serialNumber: '',
    failure: '',
    failureLocation: '',
    serviceHours: '',
    circumstances: '',
    otherDetails: '',
    images: [],
    certification: false,
    safety: false,
    fluidType: null,
    toAirline: null,
    toCustomer: null,
    poNo: null,
    carrierNumber: ''
}

export const transformForPaymentInfo = ({ billing: { address1, address2, city, state, zip, country },
    shipto: { companyName, phone, email, firstName, lastName, ...shipto } }) => (
    { variables: { paymentMethodRequest: {
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
    } }
    })