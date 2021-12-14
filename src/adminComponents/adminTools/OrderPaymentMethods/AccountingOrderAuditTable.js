import React, { useEffect, useMemo, useState } from 'react'
import { format as dateFormat } from 'date-fns'
import { useTable, usePagination, useSortBy  } from 'react-table'
import styled from 'styled-components'
import { DebounceInput } from 'react-debounce-input'

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
	padding: 20px 40px;
    margin: 0 auto 0 0;
`

const OverflowContainer = styled.div`
    overflow: auto;
`

const Table = styled.table`
    margin: 16px;
    width: 100%;
`

const TRheader = styled.tr`
	border-bottom: 1px solid gray;
`

const THheader = styled.th`
	padding: 8px 16px;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 500;
	font-size: 15px;
`

const TRrow = styled.tr`
	border-bottom: 1px solid lightgray;
`

const TDrow = styled.td`
	padding: 8px 16px;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-size: 15px;
	color: ${props => props.isOrderDetail ? '#0056b3' : 'black'};
	font-weight: ${props => props.isOrderDetail ? 400 : 300};
	cursor: ${props => props.isOrderDetail ? 'pointer' : 'default'};
`

const ButtonPagination = styled.button`
	cursor: pointer;
	background-color: black;
	color: white;
	border: 1px solid black;
	border-radius: 1px;
`

const AccountingOrderAuditTable = (props) => {
    const {
        order
    } = props

    const {
        savedPaymentMethods,
        activePaymentMethod,
        auditRecords
    } = order || {}

    //Combine the saved payment methods and active payment method into one list for a lookup array.
    //Filter out duplicates
    const allPaymentMethods = (
        activePaymentMethod 
            ? [...savedPaymentMethods, activePaymentMethod ] 
            : savedPaymentMethods
    ).filter((m, index, arr) => arr.indexOf(m) === index)

    const columns = useMemo(() => ([
        {
            Header: 'Field Changed',
            accessor: 'fieldAlias'
        },
        {
            Header: 'Old Value',
            accessor: 'oldValue',
            Cell: props => {
                if (props.value) {
                    const paymentMethod = allPaymentMethods.find(m => m.paymentSystemMethodId === props.value)

                    //Display the payment method name instead of the token if possible
                    if (paymentMethod){
                        return paymentMethod.name
                    }
                }

                return props.value
            }
        },
        {
            Header: 'New Value',
            accessor: 'newValue',
            Cell: props => {
                if (props.value) {
                    const paymentMethod = allPaymentMethods.find(m => m.paymentSystemMethodId === props.value)

                    //Display the payment method name instead of the token if possible
                    if (paymentMethod){
                        return paymentMethod.name
                    }
                }

                return props.value
            }
        },
        {
            Header: 'Employee',
            accessor: 'employee.name'
        },
        {
            Header: 'Date/Time',
            accessor: 'dateModified',
            Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy HH:mm a')}</span>
        },
    ]), [auditRecords])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: auditRecords,
            initialState: {
                pageIndex: 0,
                pageSize: 5,
                sortBy: [
                    {
                        id: 'dateModified',
                        desc: true,
                    }
                ]
            },
        },
        useSortBy,
        usePagination
    )

    return (
        <>
            <TableContainer>
                {
                    <OverflowContainer>
                        <Table {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup, i) => (
                                    <TRheader key={i} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column, i) => (
                                            <THheader key={i}>
                                                {column.render('Header')}
                                            </THheader>
                                        ))}
                                    </TRheader>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <TRrow key={i} {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                if (cell.column.id === 'orderNumber') {
                                                    return (
                                                        <TDrow {...cell.getCellProps()} isOrderDetail onClick={() => history.push(`/account/order-detail/${cell.value}`)}>
                                                            {cell.render('Cell')}
                                                        </TDrow>
                                                    )
                                                } else {
                                                    return (
                                                        <TDrow {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </TDrow>
                                                    )
                                                }
                                            })}
                                        </TRrow>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </OverflowContainer>
                }
                <div>
                    <ButtonPagination onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </ButtonPagination>{' '}
                    <ButtonPagination onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </ButtonPagination>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageCount}
                        </strong>{' '}
                    </span>
                    <ButtonPagination onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </ButtonPagination>{' '}
                    <ButtonPagination onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </ButtonPagination>{' '}
                    <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)) }}>
                        <option value={5}>Show 5</option>
                        <option value={10}>Show 10</option>
                    </select>
                    <p>Results: {rows.length}</p>
                </div>
            </TableContainer>
        </>
    )
}

export default AccountingOrderAuditTable