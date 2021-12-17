import React, { useState, useMemo, useContext } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useSortBy  } from 'react-table'
import { useQuery } from '@apollo/client'
import { GET_PREPAYMENTS } from '../../../setup/providerGQL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom' 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ButtonBlack } from '../../../styles/buttons'
import Context from '../../../setup/context'
import { format as dateFormat } from 'date-fns'
import { CircularProgress } from '@material-ui/core'

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

const SpanSort = styled.span`
	margin-left: 4px;
`

const DivSpacer = styled.div`
	margin: 0 8px;
`

const DivRow = styled.div`
	display: flex;
	align-items: center;
`

const DivRowDate = styled(DivRow)`
	margin-top: 16px;
`

const Pdate = styled.p`
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 400;
	font-size: 14px;
	margin: 0;
	margin-right: 4px;
	padding-top: 6px;
`

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

const RefundTextColor = styled.span`
	color: red;
`
const DivRowSpace = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

export default function OrdersTable() {
    const navigate = useNavigate()
    const context = useContext(Context)
    const [data, setData] = useState([])
    const [dateFrom, setDateFrom] = useState(null)
	
    useQuery(GET_PREPAYMENTS, {
        onCompleted: result => {
            setData(result.getRemittances)
        },
        variables: {
            startDate: dateFrom
        }
    })

    const columns = useMemo(
        () => [
            {
                Header: 'Date Created',
                accessor: 'createdDate', // accessor is the "key" in the data
                Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
            },
            {
                Header: 'Order #',
                accessor: 'orderNumber',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Amount Charged',
                accessor: 'amountCharged',
            },
            {
                Header: 'Amount To Charge',
                accessor: 'amountToCharge'
            },
            {
                Header: 'Processing Info',
                accessor: 'processingInfo',
            },
            {
                Header: 'Receipt Code',
                accessor: 'receiptCode',
            },
            {
                Header: 'Payment Method ID',
                accessor: 'paymentMethodId',
            },
            {
                Header: 'Payment System Customer ID',
                accessor: 'paymentSystemCustomerId',
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
            
        ],
        [],
    )
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
            data,
            initialState: {
                pageIndex: 0,
                sortBy: [
                    {
                        id: 'createdDate',
                        desc: true,
                    }
                ]
            },
        },
        useSortBy,
        usePagination
    )
	
    return (
        <TableContainer>
            <DivRowSpace>
                <h4>Downpayments</h4>
                <Link to='/admin-dashboard/downpayments/add'>
                    <ButtonBlack>Add Downpayment</ButtonBlack>
                </Link>
            </DivRowSpace>
            <DivRow>
                <div>
                    <DivRowDate>
                        <DivSpacer>
                            <FontAwesomeIcon icon="calendar" color="lightgrey"/>
                        </DivSpacer>
                        <Pdate>Date from:</Pdate>
                        <DatePicker
                            selected={Date.parse(dateFrom)}
                            onChange={(value) => setDateFrom(value)}
                        />
                        <DivSpacer onClick={() => {setDateFrom(null)}}>
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon="times-circle" color="lightgrey"/>
                        </DivSpacer>
                    </DivRowDate>
                </div>
            </DivRow>
            {
                context.getOrdersState.loading ? (
                    <SpinnerDiv>
                        <CircularProgress />
                    </SpinnerDiv>
                ) : (
                    <OverflowContainer>
                        <Table {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup, i) => (
                                    <TRheader key={i} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column, i) => (
                                            <THheader key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <SpanSort>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ?  <FontAwesomeIcon icon="caret-up" color="black"/>
                                                            :  <FontAwesomeIcon icon="caret-down" color="black"/>
                                                        : <FontAwesomeIcon icon="caret-down" color="lightgrey"/>}
                                                </SpanSort>
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
                                                        <TDrow {...cell.getCellProps()} isOrderDetail onClick={() => navigate(`/account/order-detail/${cell.value}`)}>
                                                            {cell.render('Cell')}
                                                        </TDrow>
                                                    )
                                                } else if (cell.column.id === 'total' && cell.value.props.value < 0 ) {
                                                    return (
                                                        <TDrow {...cell.getCellProps()}>
                                                            <RefundTextColor>
                                                                {cell.render('Cell')}
                                                            </RefundTextColor>	
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
                )
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
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <ButtonPagination onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </ButtonPagination>{' '}
                <ButtonPagination onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </ButtonPagination>{' '}
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <p>Results: {rows.length}</p>
            </div>
        </TableContainer>
    )
}