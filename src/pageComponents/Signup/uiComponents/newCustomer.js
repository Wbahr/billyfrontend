// Render Prop
import React  from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import styled from 'styled-components'
import FormikInput from '../../_common/formik/input_v2'
import * as Yup from 'yup';
import { ButtonRed } from 'styles/buttons';
import CheckBox from 'pageComponents/_common/formik/checkBox';
import { ShowErrorAlert } from 'styles/alerts';
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm';

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
});

//Pulled the FormWrapper out of the NewCustomer component for better syntax/readability for using the state with useEffect
const FormWrapper = () => {
	const { values, isValid, isSubmitting, dirty, setFieldValue, validateForm  } = useFormikContext();

	React.useEffect(() => {
		if(dirty) 
		{
			//Reset the fields and update validation
			setFieldValue('billingCompany','');
			setFieldValue('billingAddress1','');
			setFieldValue('billingAddress2','');
			setFieldValue('billingCity','');
			setFieldValue('billingState','');
			setFieldValue('billingPostal','');
			setFieldValue('billingCountry','');
			validateForm();
		}
	}, [values.billingSame]);

	return  (
		<Form>
			<FormikFormContainer>
				<FormikFormGroup>
					<H3>Account Information</H3>
					<FormikInput label="First Name*" type="text" name="firstName" />
					<FormikInput label="Last Name*" type="text" name="lastName" />
					<FormikInput label="Job Title" type="text" name="jobTitle" />
					<FormikInput label="Phone" type="text" name="phone" />
					<FormikInput label="Phone Extension" type="text" name="phoneExtension" />
					<FormikInput label="Email*" type="email" name="email" />
					<FormikInput label="Fax" type="text" name="fax" />
					<FormikInput label="Password*" type="password" name="password" />
					<FormikInput label="Verify Password*" type="password" name="verifyPassword" />
				</FormikFormGroup>
				<FormikFormGroup>
					<H3>Shipping Information</H3>
					<FormikInput label="Company*" type="text" name="shippingCompany" />
					<FormikInput label="Address Line 1" type="text" name="shippingAddress1" />
					<FormikInput label="Address Line 2" type="text" name="shippingAddress2" />
					<FormikInput label="City" type="text" name="shippingCity" />
					<FormikInput label="State" type="text" name="shippingState" />
					<FormikInput label="Zip/Postal Code" type="text" name="shippingPostal" />
					<FormikInput label="Country" type="text" name="shippingCountry" />
				</FormikFormGroup>
				<FormikFormGroup>
					<H3>Billing Information</H3>
					<CheckBox label="Same as Shipping" name="billingSame" />
					<FormikInput label="Company" type="text" name="billingCompany" disabled={values.billingSame == 1} />
					<FormikInput label="Address Line 1" type="text" name="billingAddress1" disabled={values.billingSame == 1}  />
					<FormikInput label="Address Line 2" type="text" name="billingAddress2" disabled={values.billingSame == 1}  />
					<FormikInput label="City" type="text" name="billingCity" disabled={values.billingSame == 1} />
					<FormikInput label="State" type="text" name="billingState" disabled={values.billingSame == 1} />
					<FormikInput label="Zip/Postal Code" type="text" name="billingPostal" disabled={values.billingSame == 1}  />
					<FormikInput label="Country" type="text" name="billingCountry" disabled={values.billingSame == 1} />
				</FormikFormGroup>
			</FormikFormContainer>
			{!isValid  && <DivCenter><ShowErrorAlert message="Please correct the problems and try again" /></DivCenter>}
			<DivCenter>
				<ButtonRed type="submit" disabled={isSubmitting}>
					Register Account
				</ButtonRed>
			</DivCenter>
		</Form>
	)
}

export default function NewCustomer() {
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
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						console.log(values);
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					  }, 1000);
				}}
			>
				<FormWrapper />
			</Formik>
		</>
	);
}
