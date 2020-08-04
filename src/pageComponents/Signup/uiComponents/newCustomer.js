// Render Prop
import React from 'react'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import FormikInput from '../../_common/formik/input_v2'

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

const DivFormContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: stretch;
	justify-content: center; 
`

const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: whitesmoke;
  padding: 10px;
  background-color: #e8e8e8;
`

const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

const NewCustomer = () => (
	<div>
		<H4>New Customer</H4>

		<Formik
			initialValues={{ 
				firstName: '', 
				lastName: '', 
				jobTitle: '',
				phone: '',
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
		>
			{({ isSubmitting }) => (
				<Form>
					<DivFormContainer>
						<DivInputContainer>
							<H3>Account Information</H3>
							<FormikInput label="First Name" type="text" name="firstName" />
							<FormikInput label="Last Name" type="text" name="lastName" />
							<FormikInput label="Job Title" type="text" name="jobTitle" />
							<FormikInput label="Phone" type="text" name="phone" />
							<FormikInput label="Email" type="email" name="email" />
							<FormikInput label="Fax" type="text" name="text" />
							<FormikInput label="Password" type="password" name="password" />
							<FormikInput label="Verify Password" type="password" name="verifyPassword" />
						</DivInputContainer>
						<DivInputContainer>
							<H3>Shipping Information</H3>
							<FormikInput label="Company" type="text" name="shippingCompany" />
							<FormikInput label="Address Line 1" type="text" name="shippingAddress1" />
							<FormikInput label="Address Line 2" type="email" name="shippingAddress2" />
							<FormikInput label="City" type="text" name="shippingCity" />
							<FormikInput label="State" type="text" name="shippingState" />
							<FormikInput label="Zip/Postal Code" type="password" name="shippingPostal" />
							<FormikInput label="Country" type="text" name="shippingCountry" />
						</DivInputContainer>
						<DivInputContainer>
							<H3>Billing Information</H3>
							<FormikInput label="Same as Shipping" type="checkbox" name="billingSame" />
							<FormikInput label="Company" type="text" name="billingCompany" />
							<FormikInput label="Address Line 1" type="text" name="billingAddress1" />
							<FormikInput label="Address Line 2" type="email" name="billingAddress2" />
							<FormikInput label="City" type="text" name="billingCity" />
							<FormikInput label="State" type="password" name="billingState" />
							<FormikInput label="Zip/Postal Code" type="password" name="billingPostal" />
							<FormikInput label="Country" type="password" name="billingCountry" />
						</DivInputContainer>
						
					</DivFormContainer>
					<DivCenter>
						<ButtonRed type="submit" disabled={isSubmitting}>
							Register Account
						</ButtonRed>
					</DivCenter>
				</Form>
			)}
		</Formik>
	</div>
)

export default NewCustomer