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
import { SAVE_NEW_CUSTOMER } from 'config/providerGQL';
import NewCustomerForm from './newCustomerForm';

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
	const [saved, setSaved] = useState(false);
	const [saveNewCustomer] = useMutation(SAVE_NEW_CUSTOMER,
		{
			onCompleted() {
				setSaved(true);
			}
		}
	);

	const map = (values) => {
		return {variables: { 
			reg: {
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
    
    const onSubmit = (values, { setSubmitting }) => {	
        saveNewCustomer(map(values));
        setSubmitting(false)
    };

	if(saved === true) {
		return <Summary />
	} else {
		return (
			<>
				<H4>Existing Customer</H4>
                <NewCustomerForm 
                    useExpandedMode={false}
                    showCustomerLookup={false}
					newCustomerInitialValues={existingCustomerInitialValues} 
					validationSchema={existingCustomerSchema} 
					onSubmit={onSubmit} 
					choosePasswordEnabled={true} 
					buttonText="Register Account" />
			</>
		);
	}
}

