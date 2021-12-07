import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { format as dateFormat } from 'date-fns'
import { useTable, usePagination, useSortBy  } from 'react-table'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'
import gql from 'graphql-tag'
import { DebounceInput } from 'react-debounce-input'
import CustomerSearch from 'pageComponents/_common/CustomerSearch'
import { useHistory } from 'react-router-dom'

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

const DivFilterItems = styled.div`
	display: flex;
	align-items: center;
`

const DivFilterItem = styled.div`
    flex-grow: 1;
    display: flex;
`

const Label = styled.p`
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 400;
	font-size: 14px;
	margin: 0;
	margin-right: 4px;
	padding-top: 2px;
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

const GET_ACCOUNTING_ORDERS = gql`
  query OrdersForAccounting(
    $filterText: String,
    $pageNumber: Int,
    $pageSize: Int,
    $orderStatus: String,
    $airlineCustomerId: Int,
    $paymentSystemMethodId: String,
    $orderNumber: String
  ) {
    ordersForAccounting(
      filterText: $filterText,
      pageNumber: $pageNumber,
      pageSize: $pageSize,
      orderStatus: $orderStatus,
      airlineCustomerId: $airlineCustomerId,
      paymentSystemMethodId: $paymentSystemMethodId,
      orderNumber: $orderNumber
    ){
      totalResultCount
      orders {
        orderNumber
        webReferenceId
        customerIdErp
        dateCreated
        status
        activePaymentMethod {
            type
            name
            lastFour
            expiration
            paymentSystemMethodId
            isPrimary
        }
        customer {
            id
            name
            customerIdP21
            paymentSystemCustomerId
        }
      }
    }
  }
`

const OrderPaymentMethods = (props) => {

    const history = useHistory()

    const [orderData, setOrderData] = useState({
        totalResultCount: 0,
        orders: []
    })

    const [textFilter, setTextFilter] = useState('')
    const [selectedCustomerFilter, setSelectedCustomerFilter] = useState(null)
    const [orderStatusFilter, setOrderStatusFilter] = useState('all')


    const [selectedOrderNumber, setSelectedOrderNumber] = useState(null)

    const { error, loading: isOrdersLoading } = useQuery(GET_ACCOUNTING_ORDERS, {
        onCompleted: result => {
            setOrderData(result.ordersForAccounting)
        },
        variables: {
            filterText: textFilter,
            orderStatus: orderStatusFilter,
            airlineCustomerId: selectedCustomerFilter?.id
        }
    })

    const orderSelectHandler = (event, tableProps) => {
        if (event.target.checked) {
            setSelectedOrderNumber(tableProps.row.values.orderNumber)
        } else {
            setSelectedOrderNumber(null)
        }
    }
    
    const columns = useMemo(() => ([
        {
            Header: 'Select',
            Cell: props => (
                <span>
                    <input 
                        type='checkbox' 
                        onChange={(event) => {orderSelectHandler(event, props)}} 
                        checked={props.row.values.orderNumber === selectedOrderNumber}
                    />
                </span>
            )
        },
        {
            Header: 'Order #',
            accessor: 'orderNumber',
        },
        {
            Header: 'Web Ref #',
            accessor: 'webReferenceId'
        },
        {
            Header: 'P21 Customer #',
            accessor: 'customerIdErp'
        },
        {
            Header: 'Customer Name',
            accessor: 'customer.name'
        },
        {
            Header: 'Date Created',
            accessor: 'dateCreated', // accessor is the "key" in the data
            Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
        },
        
    ]), [selectedOrderNumber])

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
            data: orderData.orders,
            initialState: {
                pageIndex: 0,
                sortBy: [
                    {
                        id: 'dateCreated',
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
                <h4>Update Order Payment Methods</h4>
            </DivRowSpace>
            <DivFilterItems>
                <DivFilterItem>
                    <Label>Filter Orders:</Label>
                    <DebounceInput 
                        type='text' 
                        value={textFilter} 
                        onChange={(event) => {setTextFilter(event.target.value)}} 
                        debounceTimeout={1500} 
                        forceNotifyByEnter={true} 
                        forceNotifyOnBlur={true}
                        placeholder="Order#, Web Ref#, Customer#"
                    />
                </DivFilterItem>
                <DivFilterItem>
                    <Label>{selectedCustomerFilter ? 'Customer' : 'Select Customer'}:</Label>
                    <CustomerSearch customer={selectedCustomerFilter} setCustomer={setSelectedCustomerFilter} />
                </DivFilterItem>
                <DivFilterItem>
                    <Label>Order Status:</Label>
                    <select value={orderStatusFilter} onChange={(event) => { setOrderStatusFilter(event.target.value) }}>
                        <option value='all'>All</option>
                        <option value='open'>Open</option>
                        <option value='complete'>Complete</option>
                        <option value='credit-hold'>Credit Hold</option>
                        <option value='cancelled'>Cancelled</option>
                    </select>
                </DivFilterItem>
            </DivFilterItems>
            {
                isOrdersLoading ? (
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
                                                        <TDrow {...cell.getCellProps()} isOrderDetail onClick={() => history.push(`/account/order-detail/${cell.value}`)}>
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

export default OrderPaymentMethods