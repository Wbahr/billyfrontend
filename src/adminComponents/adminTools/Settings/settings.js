import React, { useState } from 'react'
import Loader from 'pageComponents/_common/loader';
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, useFormikContext, FieldArray } from 'formik'
import { ButtonRed } from 'styles/buttons';
import FormikFieldArray from '../../../pageComponents/_common/formik/fieldArray'
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm';
import * as Yup from 'yup';
import { ShowErrorAlert } from 'styles/alerts';
import Modal from 'pageComponents/_common/modal'

const GET_ALL_SETTINGS = gql`
    query appSettings {
        appSettings {
            newCustomerNotificationEmails
            contactUsNotificationEmails
        }
    }
`

const SAVE_ALL_SETTINGS = gql`
    mutation saveAppSettings($settings: AppSettingsModelGraphType) {
        saveAppSettings(settings: $settings)
    }
`

const H3 = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  color: black;
`

const DivCenter = styled.div`
    display: flex;
    justify-content: center;
`

const systemSettingsSchema = Yup.object().shape({
    contactUsNotificationEmails: Yup.array().of(
            Yup.string()
            .email("Must be an email"))
        .min(1, "Must have at least one email"),
    newCustomerNotificationEmails: Yup.array().of(
            Yup.string()
            .email("Must be an email"))
        .min(1, "Must have at least one email"),
});


const FormWrapper = () => {
	const { isValid, isSubmitting } = useFormikContext();

	return  (
		<Form>
			<FormikFormContainer>
				<FormikFormGroup>
					<H3>System Settings</H3>
					<FormikFieldArray name="contactUsNotificationEmails" label="Contact Us Notification Emails" addMore="+" />
                    <FormikFieldArray name="newCustomerNotificationEmails" label="New Customer Notification Emails" addMore="+" />
				</FormikFormGroup>
			</FormikFormContainer>
			{!isValid  && <DivCenter><ShowErrorAlert message="Please correct the problems and try again" /></DivCenter>}
			<DivCenter>
				<ButtonRed type="submit" disabled={isSubmitting}>
					Save Changes
				</ButtonRed>
			</DivCenter>
		</Form>
	)
}

export default function Settings() {
	const [settings, setSettingsData] = useState(null);
    const [savedShowModal, setSavedShowModal] = useState(false);
    /*{
        "data": {
          "appSettings": {
            "newCustomerNotificationEmails": [
              "khatcher@airlinehyd.com"
            ],
            "contactUsNotificationEmails": [
              "khatcher@airlinehyd.com",
              "jgeorge@airlinehyd.com"
            ]
          }
        }
      }
*/

	useQuery(GET_ALL_SETTINGS, {
		fetchPolicy: 'no-cache',
		onCompleted: result => {
            setSettingsData(result.appSettings);
            console.log(result.appSettings);
		}
    });
    
    const [saveSettings] = useMutation(SAVE_ALL_SETTINGS,
		{
			onCompleted() {
				setSavedShowModal(true);
			}
		}
    );

    const handleModalClose = () => {
		setSavedShowModal(false);
    }
    
    if(settings) {
        return (
        <>
            <Modal open={savedShowModal} onClose={handleModalClose} >     
                <div>
                    Saved Successfully!
                </div>
            </Modal>
            <Formik
                initialValues={settings}
                validationSchema={systemSettingsSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting }) => {
                    saveSettings({variables: { settings: { newCustomerNotificationEmails: values.newCustomerNotificationEmails, contactUsNotificationEmails: values.contactUsNotificationEmails } } });
                    setSubmitting(false);
                }}
            >
                <FormWrapper />
            </Formik>
        </>
        );
    } else {
        return (
            <Loader />
        );
    }
}