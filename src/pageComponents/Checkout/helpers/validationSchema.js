import { yupToFormErrors } from 'formik'
const { object, string, number, date } = require('yup')

// Step 1
export const shippingScheduleSchema = object({
  schedule: object({
    packingBasis: string().matches(/(1|2|3|4)/).required()
  })
})

// Step 2
export const shipToSchema = object({
  shipto: object({
    companyName: string()
      .min(3)
      .max(256)
      .required(),
    contactNameFirst: string()
      .min(3)
      .max(50)
      .required(),
    contactNameLast: string()
      .min(3)
      .max(50)
      .required(),
    address1: string()
      .min(5)
      .max(256)
      .required(),
    address2: string()
      .min(1)
      .max(256),
    city: string()
      .min(3)
      .max(100)
      .required(),
    stateOrProvince: string(),
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

// Step 3
export const billToSchema = object({
  billing: object({
    companyName: string()
      .min(3)
      .max(256)
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
    address2: string()
      .min(1)
      .max(256),
    city: string()
      .min(3)
      .max(100)
      .required(),
    stateOrProvince: string(),
    zip: string()
      .min(5)
      .max(10)
      .required(), 
    phone: string()
      .min(10)
      .required(),
    email: string()
      .email()
      .required()
  })
})