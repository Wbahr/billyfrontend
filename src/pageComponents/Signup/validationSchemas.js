import * as Yup from 'yup'

export const existingCustomerSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Minimum length of 2')
        .max(50, 'Maximum length of 50')
        .required('required'),
    lastName: Yup.string()
        .min(2, 'Minimum length of 2')
        .max(50, 'Maximum length of 50')
        .required('required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('required'),
    phone: Yup.string()
        .min(10, 'Must be exactly 10 characters')
        .max(10, 'Must be exactly 10 characters')
        .required('required'),
    phoneExtension: Yup.string(),
    fax: Yup.string(),
    jobTitle: Yup.string(),
    customerId: Yup.number()
        .typeError('Must be a number')
        .integer('Must be a number')
        .required('required, can be provided by a sales representative'),
    password: Yup.string()
        .required('required')
        .min(8, 'Minimum length of 8')
        .max(1000),
    verifyPassword: Yup.string()
        .required('required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    passwordStrength: Yup.boolean()
        .equals([true], 'Check the password complexity requirements.'),

})

export const existingCustomerInitialValues = { 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    phoneExtension: '',
    fax: '',
    jobTitle: '',
    customerId: '', 
    password: '', 
    verifyPassword: '',
    passwordStrength: false,
}

export const editCustomerSchema =  Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Minimum length of 2')
        .max(50, 'Maximum length of 50')
        .required('required'),
    lastName: Yup.string()
        .min(2, 'Minimum length of 2')
        .max(50, 'Maximum length of 50')
        .required('required'),
    jobTitle: Yup.string(),
    phone: Yup.string()
        .min(10, 'Must be exactly 10 characters')
        .max(10, 'Must be exactly 10 characters')
        .required('required'),
    phoneExtension: Yup.string(),
    email: Yup.string()
        .email('Invalid email address')
        .required('required'),
    fax: Yup.string(),
    shippingCompany: Yup.string()
        .when('customerId', { is: '', then: Yup.string().required('required'), otherwise: Yup.string().notRequired() })
        .max(70),
    shippingAddress1: Yup.string()
        .max(50),
    shippingAddress2: Yup.string()
        .max(50),
    shippingCity: Yup.string()
        .max(50),
    shippingState: Yup.string()
        .max(50),
    shippingPostal: Yup.string()
        .max(11),
    shippingCountry: Yup.string()
        .max(60),
    billingSame: Yup.boolean(),
    billingCompany: Yup.string()
        .max(70)
        .when(['billingSame', 'customerId'], 
            { is: (billingSame, customerId) => billingSame || customerId !== '', then: Yup.string().notRequired(), otherwise: Yup.string().required('required') }),
    billingAddress1: Yup.string()
        .max(50),
    billingAddress2: Yup.string()
        .max(50),
    billingCity: Yup.string()
        .max(50),
    billingState: Yup.string()
        .max(50),
    billingPostal: Yup.string()
        .max(11),
    billingCountry: Yup.string()
        .max(60),
    customerId: Yup.number()
        .typeError('Must be a number')
        .integer('Must be a number')
})

export const newCustomerSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Minimum length of 2')
        .max(50, 'Maximum length of 50')
        .required('required'),
    lastName: Yup.string()
        .min(2, 'Minimum length of 2')
        .max(50, 'Maximum length of 50')
        .required('required'),
    jobTitle: Yup.string(),
    phone: Yup.string()
        .min(10, 'Must be exactly 10 characters')
        .max(10, 'Must be exactly 10 characters')
        .required('required'),
    phoneExtension: Yup.string(),
    email: Yup.string()
        .email('Invalid email address')
        .required('required'),
    fax: Yup.string(),
    password: Yup.string()
        .required('required')
        .min(8, 'Minimum length of 8')
        .max(1000),
    verifyPassword: Yup.string()
        .required('required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    shippingCompany: Yup.string()
        .required('required')
        .max(70),
    shippingAddress1: Yup.string()
        .max(50),
    shippingAddress2: Yup.string()
        .max(50),
    shippingCity: Yup.string()
        .max(50),
    shippingState: Yup.string()
        .max(50),
    shippingPostal: Yup.string()
        .max(11),
    shippingCountry: Yup.string()
        .max(60),
    billingSame: Yup.boolean(),
    billingCompany: Yup.string()
        .max(70)
        .when('billingSame', { is: true, then: Yup.string().notRequired(), otherwise: Yup.string().required('required') }),
    billingAddress1: Yup.string()
        .max(50),
    billingAddress2: Yup.string()
        .max(50),
    billingCity: Yup.string()
        .max(50),
    billingState: Yup.string()
        .max(50),
    billingPostal: Yup.string()
        .max(11),
    billingCountry: Yup.string()
        .max(60),
    passwordStrength: Yup.boolean()
        .equals([true], 'Check the password complexity requirements.'),
})

export const newCustomerInitialValues = {
    id: '',
    customerId: '',
    customerSearch: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    phone: '',
    phoneExtension: '',
    email: '',
    fax: '',
    password: '',
    verifyPassword: '',
    shippingCompany: '',
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingState: '',
    shippingPostal: '',
    shippingCountry: '',
    billingSame: false,
    billingCompany: '',
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingState: '',
    billingPostal: '',
    billingCountry: '',
    passwordStrength: false,
}