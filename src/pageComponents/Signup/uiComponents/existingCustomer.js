// Render Prop
import React, { useState } from 'react';
import { Formik, Form, isInteger } from 'formik';
import styled from 'styled-components';
import FormikInput from '../../_common/formik/input_v2';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ButtonRed = styled.button`
  background-color: rgb(219, 22, 51);
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  box-shadow: 2px 2px 4px #000;
  &:hover{
    background-color: #b51029;
  }
  &:active{
    background-color: #b51029;
    box-shadow: 2px 2px 2px #000;
  }
`

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0;
`

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

const ErrorSummarySpan = styled.p`
  background-color: mistyrose;
  color: red;
  padding: 10px;
  border: 1px solid red;
`

function PleaseFixErrors() {
	return (
		<ErrorSummarySpan><FontAwesomeIcon icon={faExclamationTriangle} /> Please correct the problems and try again</ErrorSummarySpan>
	);
}

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
			.min(8, "Minimum length of 8")
			.max(1000),
		verifyPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], "Passwords must match")

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
				{({ isSubmitting, errors, touched, isValid, dirty }) => (
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
							<ButtonRed type="submit" disabled={isSubmitting}>
					Submit
							</ButtonRed>
						</DivCenter>
					</Form>
				)}
			</Formik>
		</div>
	);
}

