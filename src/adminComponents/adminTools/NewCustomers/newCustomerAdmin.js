import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useLazyQuery } from '@apollo/client'
import Loader from 'pageComponents/_common/loader'
import { useTable } from 'react-table'
import { GET_NEW_CUSTOMERS, REJECT_NEW_CUSTOMER, APPROVE_NEW_CUSTOMER } from 'config/providerGQL'
import { Link, useRouteMatch } from 'react-router-dom'
import { ButtonRed, ButtonBlack } from 'styles/buttons'
import { ShowInfoAlert, ShowErrorAlert } from 'styles/alerts'
import { FormikStyleInput } from 'pageComponents/_common/formik/input_v2'
import { FormikFormFieldContainer } from 'styles/formikForm'
import Modal from 'pageComponents/_common/modal'

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
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

//Note this can be made editable
//https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/editable-data?from-embed=&file=/src/App.js
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <th key={i} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, i) => {
                return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


export default function NewCustomerAdmin() {
  const [newCustomers, setNewCustomers] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectId, setRejectId] = useState(null)
  const [error, setError] = useState(null)
  const { path } = useRouteMatch()

  const handleRejectModalClose = () => {
    setShowRejectReasonModal(false)
  }

  const rejectRegistrationCall = (id) => {
    //Stash the ID and show modal, when the modal closes then mutuate on the stashed data.
    console.log('Stashing reject id ', id)
    setRejectId(id)
    setShowRejectReasonModal(true)
  }


  const [rejectRegistrationMutation, { error: rejectError, loading: rejectLoading }] = useMutation(REJECT_NEW_CUSTOMER, {
    onCompleted: () => {
      setAlertMessage('Registration rejected.')
      setRejectReason('')
      setRejectId(null)
      loadNewCustomers()
    }
  })

  const [approveRegistrationCall, { error: approveError, loading: approveLoading }] = useMutation(APPROVE_NEW_CUSTOMER, {
    onCompleted: () => {
      setAlertMessage('Registration approved.')
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
    console.log('starting reject call')
    if (rejectReason && rejectId) {
      rejectRegistrationMutation({ variables: { id: rejectId, reason: rejectReason } })
    } 
  }, [rejectReason])

  useEffect(() => {
    setError(rejectError || approveError || getError)
  }, [rejectError, approveError, getError])

  useEffect(() => {
    loadNewCustomers()
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Registration',
        columns: [
          {
            id: 'id', 
            accessor: 'id',
            Cell: ({ value }) => (<Link to={`${path}/${value}`}>Edit</Link>)
          },
          {
            Header: 'Reg Id',
            id: 'regId',
            accessor: 'id',
          },
          {
            Header: 'Date',
            accessor: 'received',
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
            accessor: 'id',
            Cell: ({ value }) => (<ButtonRed disabled={approveLoading} onClick={() => approveRegistrationCall({ variables: { id: value } })}>Approve</ButtonRed>)
          },
          {
            id: 'reject',
            accessor: 'id',
            Cell: ({ value }) => (<ButtonRed disabled={rejectLoading} onClick={() => rejectRegistrationCall(value)}>Reject</ButtonRed>)
          }
        ],
      }
    ],
    [approveLoading, rejectLoading]
  )

  return (
    <Styles>
      {alertMessage && <ShowInfoAlert message={alertMessage} />}
      {error && error.networkError && <ShowErrorAlert message={error.networkError.result.detail} /> }
      {error && !error.networkError && <ShowErrorAlert message="An error occurred" />}
      {loading && <Loader />}
      {newCustomers && <Table columns={columns} data={newCustomers} />}
      <SelectRejectReasonModal visible={showRejectReasonModal} valueCallback={setRejectReason} close={handleRejectModalClose}/>
    </Styles>
  )
}

function SelectRejectReasonModal({ valueCallback, visible, close }){
  const rejectReasons = ['Not enough information', 'Duplicate customer or contact', 'Potential Spam', 'Customer needs to call', 'Other...']
  const initialState = { reason: rejectReasons[0], customReason: '' }
  const [formValues, setFormValues] = useState(initialState)
  const [showOtherField, setShowOtherField] = useState(false)

  //Handle custom input box
  useEffect(() => {
    setShowOtherField(formValues.reason === 'Other...')
  }, [formValues.reason])

  const changeHandler = (event) => setFormValues({
    ...formValues,
    [event.target.name]: event.target.value
  })

  //Reset the form on load
  useEffect(() => {
    if (visible === true) {
      setFormValues(initialState)
    }
  }, [visible])
    
  return (
    <Modal open={visible} onClose={close}>
      <Container>
        <FormikFormFieldContainer>
          <label htmlFor="reason">Select Reject Reason</label>
          <select name="reason" value={formValues.reason} onChange={changeHandler}>
            {rejectReasons.map((r) => <option key={r} value={r}>{`${r}`}</option>)}
          </select>
        </FormikFormFieldContainer>
        {showOtherField && <FormikStyleInput label="Custom Reason (this will be sent to the customer)" type="text" name="customReason" value={formValues.customReason} onChange={changeHandler} />}
        <DivRow>
          <ButtonBlack onClick={close}>Cancel</ButtonBlack>
          <ButtonRed onClick={() => {
            close()
            valueCallback(formValues.customReason || formValues.reason)}
          }
          >
            Reject
          </ButtonRed>
        </DivRow>
      </Container>
    </Modal>
  )

}