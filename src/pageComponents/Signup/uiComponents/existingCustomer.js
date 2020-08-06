// Render Prop
import React, { useState } from 'react';
import { Formik, Form, isInteger, useFormikContext } from 'formik';
import styled from 'styled-components';
import FormikInput from '../../_common/formik/input_v2';
import * as Yup from 'yup';
import { ButtonRed } from 'styles/buttons';
import { ShowErrorAlert } from 'styles/alerts';
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm';
import { gql, useMutation } from '@apollo/client';
import Summary from '../summary';

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
		.typeError("Must be a number")
		.integer("Must be a number")
		.required("required, can be provided by a sales representative"),
	password: Yup.string()
		.required('required')
		.min(8, "Minimum length of 8")
		.max(1000),
	verifyPassword: Yup.string()
		.required('required')
		.oneOf([Yup.ref('password')], "Passwords must match")

});

//Pulled the FormWrapper out of the NewCustomer component for better syntax/readability for using the state with useEffect
const FormWrapper = () => {
	const { values, isValid, isSubmitting, dirty, setFieldValue, validateForm  } = useFormikContext();
	return (
		<Form>
			<FormikFormContainer>
				<FormikFormGroup>
					<FormikInput label="Customer ID*" type="text" name="customerId" />
					<FormikInput label="First Name*" type="text" name="firstName" />
					<FormikInput label="Last Name*" type="text" name="lastName" />
					<FormikInput label="Email*" type="email" name="email" />
					<FormikInput label="Phone" type="text" name="phone" />
					<FormikInput label="Phone Extension" type="text" name="phoneExtension" />
					<FormikInput label="Fax" type="text" name="fax" />
					<FormikInput label="Job Title" type="text" name="jobTitle" />
					<FormikInput label="Password*" type="password" name="password" />
					<FormikInput label="Confirm Password*" type="password" name="verifyPassword" />
				</FormikFormGroup>
			</FormikFormContainer>
			{ !isValid && <DivCenter><ShowErrorAlert message="Please correct the problems and try again" /></DivCenter>}
			<DivCenter>
				<ButtonRed type="submit" disabled={isSubmitting}>Submit</ButtonRed>
			</DivCenter>
		</Form>
	);
};

const SUBMIT_REG = gql`
	mutation SubmitContactRegistration($contact: RegistrationContactInputGraphType) {
		submitContactRegistration(contact: $contact)
  	}
`

export default function ExistingCustomer() {
	const [saved, setSaved] = useState(false);
	const [saveNewCustomer] = useMutation(SUBMIT_REG,
		{
			onCompleted() {
				setSaved(true);
			}
		}
	);

	const map = (values) => {
		return {variables: { 
			contact: {
				firstName: values.firstName,
				lastName: values.lastName,
				password: values.password,
				customerId: values.customerId,
				email: values.email,
				fax: values.fax,
				jobTitle: values.jobTitle,
				phone: values.phone,
				phoneExtension: values.phoneExtension
			}
		}};
	};

	if(saved === true) {
		return <Summary />
	} else {
		return (
			<>
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
						customerId: '', 
						password: '', 
						verifyPassword: '' }}
					validationSchema={existingCustomerSchema}
					validateOnBlur={false}
					validateOnChange={false}
					onSubmit={(values, { setSubmitting }) => {	
						console.log(values);
						saveNewCustomer(map(values));
						alert(JSON.stringify(values, null, 2))
						setSubmitting(false)
					}}
				>
					<FormWrapper />
				</Formik>
			</>
		);
	}
}

