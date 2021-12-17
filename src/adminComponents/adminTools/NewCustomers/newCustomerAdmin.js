import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useLazyQuery } from '@apollo/client'
import Loader from 'pageComponents/_common/loader'
import { GET_NEW_CUSTOMERS, REJECT_NEW_CUSTOMER, APPROVE_NEW_CUSTOMER } from 'setup/providerGQL'
import { Link, useMatch } from 'react-router-dom'
import { ButtonRed, ButtonBlack } from 'styles/buttons'
import { ShowInfoAlert, ShowErrorAlert } from 'styles/alerts'
import { FormikStyleInput } from 'pageComponents/_common/formik/input_v2'
import DataGrid from 'pageComponents/_common/table'
import { FormikFormFieldContainer } from 'styles/formikForm'
import Modal from 'pageComponents/_common/modal'
import { format, parseISO } from 'date-fns'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

const DivRow = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`

const Styles = styled.div`
  padding: 1rem;
  height: 100%;
  flex: 1;
`


export default function NewCustomerAdmin() {
    const [newCustomers, setNewCustomers] = useState([])
    const [alertMessage, setAlertMessage] = useState(null)
    const [rejectId, setRejectId] = useState(null)
    const { path } = useMatch()

    const [rejectRegistrationMutation, { error: rejectError, loading: rejectLoading }] = useMutation(REJECT_NEW_CUSTOMER, {
        onCompleted: () => {
            setAlertMessage('Registration rejected.')
            setRejectId(null)
            loadNewCustomers()
        }
    })

    const [approveRegistrationCall, { error: approveError, loading: approveLoading }] = useMutation(APPROVE_NEW_CUSTOMER, {
        onCompleted: ({ approveRegistration: isApproved }) => {

            if (isApproved){
                setAlertMessage('Registration approved.')
            } else {
                setAlertMessage('There was an error approving this customer.')
            }

            loadNewCustomers()
        }
    })

    const [loadNewCustomers, { loading, error: getError }] = useLazyQuery(GET_NEW_CUSTOMERS, {
        fetchPolicy: 'no-cache',
        onCompleted: (result) => {
            setNewCustomers(result?.newCustomers || [])
        }
    })

    useEffect(() => {
        loadNewCustomers()
    }, [])
    
    const tableButtonStyle = { height: 24, fontSize: 'inherit' }
    
    const renderEditLink = ({ row: { values: { id } } }) => {
        return <Link to={`${path}/${id}`}>Edit</Link>
    }
    const formatDateTime = ({ value }) => format(parseISO(value), 'MMM do yy p')
    
    const renderApproveButton = ({ row: { values: { id } } }) => (
        <ButtonRed style={tableButtonStyle} disabled={approveLoading} onClick={handleApproveClick(id)}>
            Approve
        </ButtonRed>
    )
    
    const handleApproveClick = id => () => approveRegistrationCall({ variables: { id } })
    
    const renderRejectButton = ({ row: { values: { id } } }) => (
        <ButtonRed style={tableButtonStyle} disabled={rejectLoading} onClick={showRejectModal(id)}>
            Reject
        </ButtonRed>
    )
    
    const showRejectModal = id => () => setRejectId(id)

    const columns = React.useMemo(
        () => [
            {
                Header: 'Registration',
                columns: [
                    {
                        id: 'id', 
                        accessor: 'id',
                        Cell: renderEditLink
                    },
                    {
                        Header: 'Reg Id',
                        id: 'regId',
                        accessor: 'id',
                    },
                    {
                        Header: 'Date',
                        accessor: 'received',
                        Cell: formatDateTime
                    },
                ],
            },
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'JobTitle',
                        accessor: 'jobTitle',
                    },
                    {
                        Header: 'Claimed Customer ID',
                        accessor: 'customerIdP21',
                    },
                ],
            },
            {
                Header: 'Contact Methods',
                columns: [
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Phone',
                        accessor: 'phone',
                    },
                    {
                        Header: 'Ext.',
                        accessor: 'phoneExtension',
                    },
                    {
                        Header: 'Fax',
                        accessor: 'fax',
                    },
                ],
            },
            {
                Header: 'Shipping Info',
                columns: [
                    {
                        Header: 'Company',
                        accessor: 'shippingCompanyName',
                    },
                    {
                        Header: 'Address1',
                        accessor: 'shippingLine1',
                    },
                    {
                        Header: 'Address2',
                        accessor: 'shippingLine2',
                    },
                    {
                        Header: 'City',
                        accessor: 'shippingCity',
                    },
                    {
                        Header: 'State',
                        accessor: 'shippingState',
                    },
                    {
                        Header: 'Zip',
                        accessor: 'shippingZip',
                    },
                    {
                        Header: 'Country',
                        accessor: 'shippingCountry',
                    },
                ],
            },
            {
                Header: 'Billing Info',
                columns: [
                    {
                        Header: 'Company',
                        accessor: 'billingCompanyName',
                    },
                    {
                        Header: 'Address1',
                        accessor: 'billingLine1',
                    },
                    {
                        Header: 'Address2',
                        accessor: 'billingLine2',
                    },
                    {
                        Header: 'City',
                        accessor: 'billingCity',
                    },
                    {
                        Header: 'State',
                        accessor: 'billingState',
                    },
                    {
                        Header: 'Zip',
                        accessor: 'billingZip',
                    },
                    {
                        Header: 'Country',
                        accessor: 'billingCountry',
                    },
                ],
            },
            {
                Header: 'Actions',
                columns: [
                    {
                        id: 'approve',
                        accessor: '',
                        Cell: renderApproveButton
                    },
                    {
                        id: 'reject',
                        accessor: '',
                        Cell: renderRejectButton
                    }
                ],
            }
        ],
        [approveLoading, rejectLoading]
    )
    
    const error = rejectError || approveError || getError
    
    return (
        <Styles>
            {alertMessage && <ShowInfoAlert message={alertMessage} />}
            {error && error.networkError && <ShowErrorAlert message={error.networkError.result.detail} /> }
            {error && !error.networkError && <ShowErrorAlert message="An error occurred" />}
            <DataGrid columns={columns} data={newCustomers} loading={loading} />
            {rejectId && (
                <SelectRejectReasonModal
                    rejectId={rejectId}
                    rejectRegistrationMutation={rejectRegistrationMutation}
                    close={() => setRejectId(null)}
                />
            )}
        </Styles>
    )
}

function SelectRejectReasonModal({ rejectId, close, rejectRegistrationMutation }){
    const rejectReasons = ['Not enough information', 'Duplicate customer or contact', 'Potential Spam', 'Customer needs to call', 'Other...']
    const initialState = { reason: rejectReasons[0], customReason: '' }
    const [formValues, setFormValues] = useState(initialState)
    const [loading, setLoading] = useState(false)
    
    const changeHandler = ({ target: { name, value } }) => setFormValues({
        ...formValues,
        [name]: value
    })
    
    const handleRejectClick = () => {
        setLoading(true)
        rejectRegistrationMutation({
            variables: {
                id: rejectId,
                reason: formValues.customReason || formValues.reason
            }
        })
    }
    
    const showOtherField = formValues.reason === 'Other...'
    
    return (
        <Modal open={true} onClose={close}>
            <Container>
                <FormikFormFieldContainer>
                    <label htmlFor="reason">Select Reject Reason</label>
                    
                    <select name="reason" value={formValues.reason} onChange={changeHandler}>
                        {rejectReasons.map((r) => <option key={r} value={r}>{`${r}`}</option>)}
                    </select>
                </FormikFormFieldContainer>
                
                {showOtherField && (
                    <FormikStyleInput
                        label="Custom Reason (this will be sent to the customer)"
                        type="text"
                        name="customReason"
                        value={formValues.customReason}
                        onChange={changeHandler}
                    />
                )}
                
                {loading && <Loader/>}
                
                <DivRow>
                    <ButtonBlack onClick={close}>Cancel</ButtonBlack>
                    <ButtonRed onClick={handleRejectClick} disabled={loading}>
                        Reject
                    </ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )

}