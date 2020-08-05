// Render Prop
import React from 'react'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import FormikInput from '../../_common/formik/input_v2'
import * as Yup from 'yup';
import { ButtonRed } from 'styles/buttons';
import CheckBox from 'pageComponents/_common/formik/checkBox';
import { ShowErrorAlert } from 'styles/alerts';
import { FormikFormGroup, FormikFormContainer, FormikFormFieldContainer } from 'styles/formikForm';

const DivCenter = styled.div`
  display: flex;
  justify-content: center;
`

const H2 = styled.h2`
  
  text-align: center;
  font-size: 20px;
  margin: 0;
`

const H4 = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 16px;
`
const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

export default function NewCustomer() {
	const existingCustomerSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, "Minimum length of 2")
			.max(50, "Maximum length of 50")
			.required('required'),
		lastName: Yup.string()
			.min(2, "Minimum length of 2")
			.max(50, "Maximum length of 50")
			.required('required'),
		jobTitle: Yup.string(),
		phone: Yup.string(),
		phoneExtension: Yup.string(),
		email: Yup.string()
			.email('Invalid email address')
			.required('required'),
		fax: Yup.string(),
		password: Yup.string()
			.required('required')
			.min(8, "Minimum length of 8")
			.max(1000),
		verifyPassword: Yup.string()
			.required('required')
			.oneOf([Yup.ref('password')], "Passwords must match"),
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
		billingCompany: Yup.string()
			.max(70),
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
	});
	return (
	<>
		<H4>New Customer</H4>
		<Formik
			initialValues={{ 
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
			}}
			validationSchema={existingCustomerSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={(values) => {	
					console.log(values);
					alert(JSON.stringify(values, null, 2))
				}}
		>
			{({ values, touched, isSubmitting, errors, isValid }) => (
				<Form>
					{ !isValid && <ShowErrorAlert message="Please correct the problems and try again" />}
					<FormikFormContainer>
						<FormikFormGroup>
							<H3>Account Information</H3>
							<FormikInput label="First Name*" type="text" name="firstName" validationMessage={errors.firstName && touched.firstName ? errors.firstName : null} />
							<FormikInput label="Last Name*" type="text" name="lastName" validationMessage={errors.lastName && touched.lastName ? errors.lastName : null}/>
							<FormikInput label="Job Title" type="text" name="jobTitle" validationMessage={errors.jobTitle && touched.jobTitle ? errors.jobTitle : null}/>
							<FormikInput label="Phone" type="text" name="phone" validationMessage={errors.phone && touched.phone ? errors.phone : null}/>
							<FormikInput label="Phone Extension" type="text" name="phoneExtension" validationMessage={errors.phoneExtension && touched.phoneExtension ? errors.phoneExtension : null}/>
							<FormikInput label="Email*" type="email" name="email" validationMessage={errors.email && touched.email ? errors.email : null}/>
							<FormikInput label="Fax" type="text" name="fax" validationMessage={errors.fax && touched.fax ? errors.fax : null}/>
							<FormikInput label="Password*" type="password" name="password" validationMessage={errors.password && touched.password ? errors.password : null}/>
							<FormikInput label="Verify Password*" type="password" name="verifyPassword" validationMessage={errors.verifyPassword && touched.verifyPassword ? errors.verifyPassword : null}/>
						</FormikFormGroup>
						<FormikFormGroup>
							<H3>Shipping Information</H3>
							<FormikInput label="Company*" type="text" name="shippingCompany" validationMessage={errors.shippingCompany && touched.shippingCompany ? errors.shippingCompany : null}/>
							<FormikInput label="Address Line 1" type="text" name="shippingAddress1" validationMessage={errors.shippingAddress1 && touched.shippingAddress1 ? errors.shippingAddress1 : null}/>
							<FormikInput label="Address Line 2" type="email" name="shippingAddress2" validationMessage={errors.shippingAddress2 && touched.shippingAddress2 ? errors.shippingAddress2 : null}/>
							<FormikInput label="City" type="text" name="shippingCity" validationMessage={errors.shippingCity && touched.shippingCity ? errors.shippingCity : null}/>
							<FormikInput label="State" type="text" name="shippingState" validationMessage={errors.shippingState && touched.shippingState ? errors.shippingState : null}/>
							<FormikInput label="Zip/Postal Code" type="password" name="shippingPostal" validationMessage={errors.shippingPostal && touched.shippingPostal ? errors.shippingPostal : null}/>
							<FormikInput label="Country" type="text" name="shippingCountry" validationMessage={errors.shippingCountry && touched.shippingCountry ? errors.shippingCountry : null}/>
						</FormikFormGroup>
						<FormikFormGroup>
							<H3>Billing Information</H3>
							
							<FormikInput label="Company" type="text" name="billingCompany" validationMessage={errors.billingCompany && touched.billingCompany ? errors.billingCompany : null}/>
							<FormikInput label="Address Line 1" type="text" name="billingAddress1" validationMessage={errors.billingAddress1 && touched.billingAddress1 ? errors.billingAddress1 : null}/>
							<FormikInput label="Address Line 2" type="email" name="billingAddress2" validationMessage={errors.billingAddress2 && touched.billingAddress2 ? errors.billingAddress2 : null}/>
							<FormikInput label="City" type="text" name="billingCity" validationMessage={errors.billingCity && touched.billingCity ? errors.billingCity : null}/>
							<FormikInput label="State" type="password" name="billingState" validationMessage={errors.billingState && touched.billingState ? errors.billingState : null}/>
							<FormikInput label="Zip/Postal Code" type="password" name="billingPostal" validationMessage={errors.billingPostal && touched.billingPostal ? errors.billingPostal : null}/>
							<FormikInput label="Country" type="password" name="billingCountry" validationMessage={errors.billingCountry && touched.billingCountry ? errors.billingCountry : null}/>
							<CheckBox label="Same as Shipping" name="billingSame" changeFunction={(fieldName) => console.log("Checkbox!",values[fieldName])}  />	
						</FormikFormGroup>
						<DivCenter>
							<ButtonRed type="submit" disabled={isSubmitting}>
								Register Account
							</ButtonRed>
						</DivCenter>
					</FormikFormContainer>
				</Form>
			)}
		</Formik>
	</>
	);
}
