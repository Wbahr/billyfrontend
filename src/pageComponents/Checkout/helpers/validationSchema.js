import { yupToFormErrors } from 'formik'
const { object, string, number, date } = require('yup')

// Step 1
export const shippingScheduleSchema = object({
  schedule: object({
    packingBasisName: string().matches(/(1|2|3|4)/).required()
  })
})

// Step 2
const contactSchema = object({
  contact: object({
    firstName: string()
      .min(3)
      .max(50)
      .required(),
    lastName: string()
      .min(3)
      .max(50)
      .required(),
    phone: string()
      .min(10)
      .required(),
    email: string()
      .email()
      .required()
  })
})

export const shipToSchema = object({
  shipto: object({
    firstName: string()
      .min(3)
      .max(50)
      .required(),
    lastName: string()
      .min(3)
      .max(50)
      .required(),
    address1: string()
      .min(5)
      .max(256)
      .required(),
    city: string()
      .min(3)
      .max(100)
      .required(),
    stateOrProvince: string()
      .required(),
    zip: string()
      .min(5)
      .max(10)
      .required(), 
    phone: string()
      .min(10)
      .required(),
    email: string()
      .email()
      .required(),
    carrierId: string()
      .required()
  })
})

export const airlineShipToSchema = shipToSchema.concat(contactSchema)

// Step 3
export const billToSchema = object({
  billing: object({
    purchaseOrder: string()
      .min(3)
      .max(50)
      .required(),
    firstName: string()
      .min(3)
      .max(50)
      .required(),
    lastName: string()
      .min(3)
      .max(50)
      .required(),
    address1: string()
      .min(5)
      .max(256)
      .required(),
    city: string()
      .min(3)
      .max(100)
      .required(),
    stateOrProvince: string()
      .required(),
    zip: string()
      .min(5)
      .max(10)
      .required()
  })
})