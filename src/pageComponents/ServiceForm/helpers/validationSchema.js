const { object, string, boolean, array, number } = require('yup')

//Step 1
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

export const shipToSchema = object({
    communications: object({
        email: boolean()
            .test(
                'oneOfRequired',
                'A preferred communication channel is required',
                function (item) {
                    return (this.parent.email === true || this.parent.phone === true || this.parent.fax === true)
                }
            )
    }),
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
            .min(2)
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
            .required('Email is required')
    })
})

export const airlineShipToSchema = shipToSchema.concat(contactSchema)

//Step 2
export const billToSchema = object({
    billing: object({
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
//Step 3
export const partSchema = object({
    parts: array().of(object({
        type: string().min(2).nullable().required('Type of part is required'),
        quantity: string().required('Quantity is required'),
        manufacturer: string().required('Manufacturer is required'),
        modelCode: string().required('Model code is required'),
        partNumber: string().required('Part number is required'),
        failure: string().required('What failed is required'),
        failureLocation: string().required('Failure location is required'),
        fluidType: string().min(2).nullable().required('Fluid Type is required'),
        toAirline: string().min(2).nullable().required('Getting part to Airline is required'),
        toCustomer: string().min(2).nullable().required('Returning part is required')
    }))
})

export const airlinePartSchema = object({
    parts: array().of(object({
        type: string().min(2).nullable().required('Type of part is required'),
        repairLocation: string().required('Repair location is required'),
        quantity: number().positive('Quantity must be more than zero').required('Quantity is required'),
        manufacturer: string().required('Manufacturer is required'),
        modelCode: string().required('Model code is required'),
        partNumber: string().required('Part number is required'),
        failure: string().required('What failed is required'),
        failureLocation: string().required('Failure location is required'),
        fluidType: string().min(2).nullable().required('Fluid Type is required'),
        toAirline: string().min(2).nullable().required('Getting part to Airline is required'),
        toCustomer: string().min(2).nullable().required('Returning part is required')
    }))
})

export const serviceSchema = object({
    parts: array().of(object({
        type: string().required('Type of part is required'),
        quantity: string().required('Quantity is required'),
        manufacturer: string().required('Manufacturer is required'),
        modelCode: string().required('Model code is required'),
        partNumber: string().required('Part number is required'),
        failure: string().required('What failed is required'),
        failureLocation: string().required('Failure location is required'),
        fluidType: string().required('Fluid Type is required'),
    }))
})

export const airlineServiceSchema = object({
    parts: array().of(object({
        type: string().required('Type of part is required'),
        repairLocation: string().required('Repair location is required'),
        quantity: number().positive('Quantity must be more than zero').required('Quantity is required'),
        manufacturer: string().required('Manufacturer is required'),
        modelCode: string().required('Model code is required'),
        partNumber: string().required('Part number is required'),
        failure: string().required('What failed is required'),
        failureLocation: string().required('Failure location is required'),
        fluidType: string().required('Fluid Type is required'),
    }))
})

export const confirmationSchema = object({})