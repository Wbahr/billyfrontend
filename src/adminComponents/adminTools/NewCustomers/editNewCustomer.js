import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router'
import Loader from 'pageComponents/_common/loader'
import { useQuery, useMutation } from '@apollo/client'
import { GET_NEW_CUSTOMER, SAVE_NEW_CUSTOMER } from 'setup/providerGQL'
import { ShowErrorAlert, ShowInfoAlert } from 'styles/alerts'
import { Link } from 'react-router-dom'
import NewCustomerForm, { mapToForm, mapToApi } from 'pageComponents/Signup/uiComponents/newCustomerForm'
import { editCustomerSchema } from 'pageComponents/Signup/validationSchemas'
import Modal from 'pageComponents/_common/modal'

export default function EditNewCustomer() {
  const { regId } = useParams()
  const { path } = useRouteMatch()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  const [saveNewCustomer, { error: errorSave }] = useMutation(SAVE_NEW_CUSTOMER, {
    onCompleted() {
      setSaved(true)
    }
  })

  const onSubmit = (values, { setSubmitting }) => {
    saveNewCustomer(mapToApi(values))
    setSubmitting(false)
  }

  const { loading, error: errorGet } = useQuery(GET_NEW_CUSTOMER, {
    fetchPolicy: 'no-cache',
    variables: {
      id: regId
    },
    onCompleted: result => {
      setData(mapToForm(result.newCustomer))
      console.log('Data Ready', mapToForm(result.newCustomer))
    }
  })

  //Collect up the errors into one object
  useEffect(() => {
    setError(errorGet || errorSave)
  }, [errorGet, errorSave])

  return (
    <>
      {loading && <Loader />}
      {!loading && error && error.networkError && <ShowErrorAlert message={error.networkError.result.detail} /> }
      {!loading && error && !error.networkError && <ShowErrorAlert message="An error occurred" />}
      {!loading && !errorGet && data && (
        <>
          <Modal open={saved} onClose={() => setSaved(false)} >
            <ShowInfoAlert message="Saved Successfully" />
            <Link to={`${path.split('/:')[0]}`}>Go Back to New Registrations</Link>
          </Modal>
          <NewCustomerForm 
            useExpandedMode={true}
            showCustomerLookup={true}
            newCustomerInitialValues={data} 
            validationSchema={editCustomerSchema} 
            onSubmit={onSubmit} 
            choosePasswordEnabled={false} 
            buttonText="Save Registration"
            data={data}
          />
        </>
      )}
      <Link to={`${path.split('/:')[0]}`}>Go back</Link>
    </>
  )
}