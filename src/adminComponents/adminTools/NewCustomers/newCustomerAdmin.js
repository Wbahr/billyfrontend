import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useLazyQuery } from '@apollo/client'
import Loader from 'pageComponents/_common/loader'
import { useTable } from 'react-table'
import { GET_NEW_CUSTOMERS, REJECT_NEW_CUSTOMER, APPROVE_NEW_CUSTOMER } from 'config/providerGQL'
import { Link, useRouteMatch } from 'react-router-dom'
import { ButtonRed } from 'styles/buttons'

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
    });

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}


export default function NewCustomerAdmin() {
    const [newCustomers, setNewCustomers] = useState(null);
    let { path, url } = useRouteMatch();

    const [rejectRegistrationCall] = useMutation(REJECT_NEW_CUSTOMER, {
        onCompleted: () => {
            loadNewCustomers();
        }
    });

    const [approveRegistrationCall] = useMutation(APPROVE_NEW_CUSTOMER, {
        onCompleted: () => {
            loadNewCustomers();
        }
    });

    const [loadNewCustomers, { loading, error }] = useLazyQuery(GET_NEW_CUSTOMERS, {
        fetchPolicy: 'no-cache',
        onCompleted: (result) => {
            setNewCustomers(result?.newCustomers || []);
        }
    });

    useEffect(() => {
        loadNewCustomers();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        id: 'id',
                        accessor: 'contact.id',
                        Cell: ({ value }) => (<Link to={`${path}/${value}`}>Edit</Link>)
                    },
                    {
                        Header: 'First Name',
                        accessor: 'contact.firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'contact.lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'JobTitle',
                        accessor: 'contact.jobTitle',
                    },
                    {
                        Header: 'Claimed Customer ID',
                        accessor: 'contact.customerIdP21',
                    },
                ],
            },
            {
                Header: 'Contact Methods',
                columns: [
                    {
                        Header: 'Email',
                        accessor: 'contact.email',
                    },
                    {
                        Header: 'Phone',
                        accessor: 'contact.phone',
                    },
                    {
                        Header: 'Ext.',
                        accessor: 'contact.phoneExtension',
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
                        accessor: 'contact.id',
                        Cell: ({ value }) => (<ButtonRed onClick={() => approveRegistrationCall({ variables: { id: value } })}>Approve</ButtonRed>)
                    },
                    {
                        id: 'reject',
                        accessor: 'contact.id',
                        Cell: ({ value }) => (<ButtonRed onClick={() => rejectRegistrationCall({ variables: { id: value } })}>Reject</ButtonRed>)
                    }
                ],
            }
        ],
        []
    );

    if (loading) {
        return (<Loader />);
    } else if (newCustomers) {
        return (
            <Styles>
                <Table columns={columns} data={newCustomers} />
            </Styles>
        );
    } else {
        return null;
    }
}