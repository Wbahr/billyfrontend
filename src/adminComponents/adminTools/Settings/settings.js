import React, { useState } from 'react'
import Loader from 'pageComponents/_common/loader'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, useFormikContext } from 'formik'
import { ButtonRed } from 'styles/buttons'
import FormikFieldArray from '../../../pageComponents/_common/formik/fieldArray'
import { FormikFormGroup, FormikFormContainer } from 'styles/formikForm'
import * as Yup from 'yup'
import { ShowErrorAlert, ShowInfoAlert } from 'styles/alerts'
import Modal from 'pageComponents/_common/modal'
import { GET_ALL_SETTINGS, SAVE_ALL_SETTINGS } from 'setup/providerGQL'
import FormikInput from 'pageComponents/_common/formik/input_v2'

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
            .email('Must be an email'))
        .min(1, 'Must have at least one email'),
    newCustomerNotificationEmails: Yup.array().of(
        Yup.string()
            .email('Must be an email'))
        .min(1, 'Must have at least one email'),
    emailFrom: Yup.string().email('Must be an email')
        .required('required'),
    siteBaseUrl: Yup.string().required(),
    adminDashNewCustomersRelativeUrl: Yup.string().required(),
})

const FormWrapper = () => {
    const { isValid, isSubmitting } = useFormikContext()

    return (
        <Form>
            <FormikFormContainer>
                <FormikFormGroup>
                    <H3>System Settings</H3>
                    <FormikFieldArray name="contactUsNotificationEmails" label="Contact Us Notification Emails" addMore="+" />
                    <FormikFieldArray name="newCustomerNotificationEmails" label="New Customer Notification Emails" addMore="+" />
                    <FormikInput type="text" name="emailFrom" label="Send Email From" />
                    <FormikInput type="text" name="siteBaseUrl" label="Website Base URL" />
                    <FormikInput type="text" name="adminDashNewCustomersRelativeUrl" label="Relative URL to New Customers Admin Dash (do not start with /)" />
                    <FormikFieldArray name="orderConfirmationEmailRecipients" label="Order Confirmation Email Recipients (additional emails to copy on every email confirmation. These will be visible to the customer)" addMore="+" />
                </FormikFormGroup>
            </FormikFormContainer>
            {!isValid && <DivCenter><ShowErrorAlert message="Please correct the problems and try again" /></DivCenter>}
            <DivCenter>
                <ButtonRed type="submit" disabled={isSubmitting}>
                    Save Changes
                </ButtonRed>
            </DivCenter>
        </Form>
    )
}

export default function Settings() {
    const [settings, setSettingsData] = useState(null)
    const [savedShowModal, setSavedShowModal] = useState(false)

    useQuery(GET_ALL_SETTINGS, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            setSettingsData(result.appSettings)
        }
    })

    const [saveSettings] = useMutation(SAVE_ALL_SETTINGS,
        {
            onCompleted() {
                setSavedShowModal(true)
            }
        }
    )

    const handleModalClose = () => {
        setSavedShowModal(false)
    }

    const onSubmit = (values, { setSubmitting }) => {
        saveSettings({
            variables: {
                settings:
                {
                    newCustomerNotificationEmails: values.newCustomerNotificationEmails,
                    contactUsNotificationEmails: values.contactUsNotificationEmails,
                    emailFrom: values.emailFrom,
                    siteBaseUrl: values.siteBaseUrl,
                    adminDashNewCustomersRelativeUrl: values.adminDashNewCustomersRelativeUrl,
                    orderConfirmationEmailRecipients: values.orderConfirmationEmailRecipients,
                }
            }
        })
        setSubmitting(false)
    }

    return settings ? (
        <>
            <Modal open={savedShowModal} onClose={handleModalClose} >
                <ShowInfoAlert message="Saved Successfully!" />
            </Modal>
            <Formik
                initialValues={settings}
                validationSchema={systemSettingsSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
                <FormWrapper />
            </Formik>
        </>
    ) : (
        <Loader />
    )
}
