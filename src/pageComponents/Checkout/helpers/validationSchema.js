const { object, string, boolean, array } = require('yup')

// Step 1
const contactSchema = object({
    contact: object({
        firstName: string()
            .max(50)
            .required('First Name is required'),
        lastName: string()
            .max(50)
            .required('Last Name is required'),
        phone: string()
            .min(10, 'Phone Number must be at least 10 characters long')
            .required('Phone Number is required'),
        email: string()
            .email('Email is not valid')
            .required('Email is required')
    })
})

const scheduleSchema = object({
    schedule: object({
        packingBasis: string().min(1).required(),
        quoteRefNo: string().when('isQuote', (isQuote, schema) => {
            return isQuote
                ? schema.min(1)
                : schema
        })
    }),
})

export const shipToSchema = object({
    shipto: object({
        firstName: string()
            .max(50)
            .required('First Name is required'),
        lastName: string()
            .max(50)
            .required('Last Name is required'),
        address1: string()
            .min(5, 'Address Line 1 must be at least 5 characters long')
            .max(256)
            .required('Address Line 1 is required'),
        city: string()
            .min(2, 'City must be at least 2 characters long')
            .max(100)
            .required('City is required'),
        stateOrProvince: string()
            .required('State/Province must be selected'),
        zip: string()
            .min(5, 'Zip/Postal Code must be at least 5 characters long (6 in Canada)')
            .max(10)
            .required('Zip/Postal Code is required'),
        phone: string()
            .min(10, 'Phone Number must be at least 10 characters long')
            .required('Phone Number is required'),
        email: string()
            .email('Email is not valid')
            .required('Email is required'),
        carrierId: string()
            .required('Shipping Carrier must be selected'),
        collectNumber: string()
            .when('isCollect', {
                is: true,
                then: string().min(1).required('Collect Number is required'),
                otherwise: string()
            })
    })
}).concat(scheduleSchema)

export const airlineShipToSchema = shipToSchema.concat(contactSchema)

// Step 2
export function getBillToSchema(requirePoNumber) {
    return object({
        billing: object({
            cardIsValid: boolean()
                .when('paymentMethod', (paymentMethod, schema) => {
                    return paymentMethod === 'purchase_order'
                        ? schema
                        : schema.oneOf([true], 'Must be valid credit card')
                }),
            purchaseOrder: string()
                .when('paymentMethod', (paymentMethod, schema) => {
                    return requirePoNumber || paymentMethod === 'purchase_order'
                        ? schema
                            .min(1, 'Purchase Order must be at least 1 character long')
                            .max(20, 'Purchase Order can not exceed 20 characters')
                            .required('PO Number is required')
                        : schema
                }),
            firstName: string()
                .when('cardType', {
                    is: 'saved_card',
                    then: string(),
                    otherwise: string()
                        .max(50)
                        .required('First Name is required')
                }),
            lastName: string()
                .when('cardType', {
                    is: 'saved_card',
                    then: string(),
                    otherwise: string()
                        .max(50)
                        .required('Last Name is required'),
                }),
            address1: string()
                .when('cardType', {
                    is: 'saved_card',
                    then: string(),
                    otherwise: string()
                        .min(5, 'Address Line 1 must be at least 5 characters long')
                        .max(256)
                        .required('Address Line 1 is required')
                }),
            city: string()
                .when('cardType', {
                    is: 'saved_card',
                    then: string(),
                    otherwise: string().min(2, 'City must be at least 2 characters long')
                        .max(100)
                        .required('City is required')
                }),
            stateOrProvince: string()
                .when('cardType', {
                    is: 'saved_card',
                    then: string(),
                    otherwise: string().required('State/Province must be selected')
                }),
            zip: string()
                .when('cardType', {
                    is: 'saved_card',
                    then: string(),
                    otherwise: string()
                        .min(5, 'Zip/Postal Code must be at least 5 characters long (6 in Canada)')
                        .max(10)
                        .required('Zip/Postal Code is required')
                })
        })
    })
}

export const confirmationSchema = object({
    confirmationEmail: object({
        sendToShipTo: boolean(),
        imagesOnQuote: boolean(),
        ccEmails: array().of(string()
            .email('Email is not valid')
            .required('Email is required'))
    })
})
