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
    saved_ship_to: string()
      .required(),
    company_name: string()
      .min(3)
      .max(256)
      .required(),
    contact_name_first: string()
      .min(3)
      .max(50)
      .required(),
    contact_name_last: string()
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
    state: string(),
    province: string(),
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

// Step 3
export const billToSchema = object({
  billing: object({
    saved_ship_to: string()
      .required(),
    company_name: string()
      .min(3)
      .max(256)
      .required(),
    contact_name_first: string()
      .min(3)
      .max(50)
      .required(),
    contact_name_last: string()
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
    state: string(),
    province: string(),
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