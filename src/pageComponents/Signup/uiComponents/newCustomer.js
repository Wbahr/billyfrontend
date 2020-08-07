// Render Prop
import React  from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import styled from 'styled-components'
import FormikInput from '../../_common/formik/input_v2'
import { ButtonRed } from 'styles/buttons';
import CheckBox from 'pageComponents/_common/formik/checkBox';
import { ShowErrorAlert } from 'styles/alerts';
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm';
import { newCustomerInitialValues, newCustomerSchema } from '../validationSchemas';

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
				initialValues={newCustomerInitialValues}
				validationSchema={newCustomerSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => { /*TODO: Remove this for final implementation */
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
