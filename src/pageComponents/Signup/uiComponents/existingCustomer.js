// Render Prop
import React, { useState } from 'react';
import { Formik, Form, isInteger } from 'formik';
import styled from 'styled-components';
import FormikInput from '../../_common/formik/input_v2';
import * as Yup from 'yup';
import { ThemeButton, PleaseFixErrors } from 'layoutComponents/theme';

const H4 = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 16px;
`

const DivCenter = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`

export default function ExistingCustomer() {
	const existingCustomerSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, "Minimum length of 2")
			.max(50, "Maximum length of 50")
			.required('required'),
		lastName: Yup.string()
			.min(2, "Minimum length of 2")
			.max(50, "Maximum length of 50")
			.required('required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('required'),
		phone: Yup.string(),
		phoneExtension: Yup.string(),
		fax: Yup.string(),
		jobTitle: Yup.string(),
		customerId: Yup.number()
			.integer("Must be a number")
			.positive("Must be positive"),
		password: Yup.string()
			.required('required')
			.min(8, "Minimum length of 8")
			.max(1000),
		verifyPassword: Yup.string()
			.required('required')
			.oneOf([Yup.ref('password')], "Passwords must match")

	});

	return (
		<div>
			<H4>Existing Customer</H4>
			<Formik
				initialValues={{ 
					firstName: '', 
					lastName: '', 
					email: '', 
					phone: '',
					phoneExtension: '',
					fax: '',
					jobTitle: '',
					customerID: '', 
					password: '', 
					verifyPassword: '' }}
				validationSchema={existingCustomerSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={(values, { setSubmitting }) => {	
					console.log(values);
					alert(JSON.stringify(values, null, 2))
					setSubmitting(false)
				}}
			>
				{({ isSubmitting, errors, touched, isValid }) => (
					<Form>
						{ !isValid && <PleaseFixErrors/>}
						<FormikInput label="Customer ID" type="text" name="customerID" validationMessage={errors.customerID && touched.customerID ? errors.customerID : null}  />
						<FormikInput label="First Name" type="text" name="firstName" validationMessage={errors.firstName && touched.firstName ? errors.firstName : null} />
						<FormikInput label="Last Name" type="text" name="lastName" validationMessage={errors.lastName && touched.lastName ? errors.lastName : null}  />
						<FormikInput label="Email" type="email" name="email" validationMessage={errors.email && touched.email ? errors.email : null}  />
						<FormikInput label="Phone" type="text" name="phone" validationMessage={errors.phone && touched.phone ? errors.phone : null}  />
						<FormikInput label="Phone Extension" type="text" name="phoneExtension" validationMessage={errors.phoneExtension && touched.phoneExtension ? errors.phoneExtension : null}  />
						<FormikInput label="Fax" type="text" name="fax" validationMessage={errors.fax && touched.fax ? errors.fax : null}  />
						<FormikInput label="Job Title" type="text" name="jobTitle" validationMessage={errors.jobTitle && touched.jobTitle ? errors.jobTitle : null}  />
						<FormikInput label="Password" type="password" name="password" validationMessage={errors.password && touched.password ? errors.password : null}  />
						<FormikInput label="Confirm Password" type="password" name="verifyPassword" validationMessage={errors.verifyPassword && touched.verifyPassword ? errors.verifyPassword : null}  />
						<DivCenter>
							<ThemeButton type="submit" disabled={isSubmitting}>Submit</ThemeButton>
						</DivCenter>
					</Form>
				)}
			</Formik>
		</div>
	);
}

