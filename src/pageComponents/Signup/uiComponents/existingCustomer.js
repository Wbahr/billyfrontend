import React, { useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import styled from 'styled-components';
import FormikInput from '../../_common/formik/input_v2';
import { ButtonRed } from 'styles/buttons';
import { ShowErrorAlert } from 'styles/alerts';
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm';
import { useMutation } from '@apollo/client';
import Summary from '../summary';
import { existingCustomerInitialValues, existingCustomerSchema } from '../validationSchemas';
import { SUBMIT_CONT_REG } from 'config/providerGQL';

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
//Pulled the FormWrapper out of the NewCustomer component for better syntax/readability for using the state with useEffect
const FormWrapper = () => {
	const { isValid, isSubmitting } = useFormikContext();
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

export default function ExistingCustomer() {
	const [saved, setSaved] = useState(false);
	const [saveNewCustomer] = useMutation(SUBMIT_CONT_REG,
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
				customerIdP21: values.customerId,
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
					initialValues={existingCustomerInitialValues}
					validationSchema={existingCustomerSchema}
					validateOnBlur={false}
					validateOnChange={false}
					onSubmit={(values, { setSubmitting }) => {	
						saveNewCustomer(map(values));
						setSubmitting(false)
					}}
				>
					<FormWrapper />
				</Formik>
			</>
		);
	}
}

