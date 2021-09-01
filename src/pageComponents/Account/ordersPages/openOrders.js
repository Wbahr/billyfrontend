/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useSortBy  } from 'react-table'
import { formatTableData } from '../helpers/mutators'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import NumberFormat from 'react-number-format'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../setup/context'
import ExportButtons from '../uiComponents/exportButtons'
import { format as dateFormat } from 'date-fns'

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 1200px;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
	padding: 20px 40px;
	margin: 0 auto 0 0;
`

const Table = styled.table`
	margin: 16px;
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

export default function OpenOrdersTable({ history }) {
    const context = useContext(Context)
    const didMountRef = useRef(false)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('')
    const [showOrderType] = useState('all')
    const [dateFrom, setDateFrom] = useState()
    const [dateTo, setDateTo] = useState()

    const isNil = val => val == null
    
    useEffect(() => {
        if (!didMountRef.current && context.ordersCache.length === 0) {
            context.getOrders()
        } else if (context.ordersCache.length > 0) {
            const mutatedData = formatTableData('open-orders', context.ordersCache)
            setData(mutatedData)
        }
    }, [context.ordersCache])

    useEffect(() => {
        if (didMountRef) {
            let mutatedData = formatTableData('open-orders', context.ordersCache)
            // Apply search filter
            if (filter.length > 0) {
                mutatedData = mutatedData.filter(row => {
                    const upperCaseFilter = filter.toUpperCase()
                    return row.filter.includes(upperCaseFilter)
                })
            }
            // Apply showOrderType filter
            if (showOrderType !== 'all') {
                mutatedData = mutatedData.filter(row => {
                    return row.status.includes(showOrderType)
                })
            }
            // Apply date filters
            if (!isNil(dateFrom)) {
                const epochDateFrom = dateFrom.valueOf()
                mutatedData = mutatedData.filter(row => { 
                    return Date.parse(row.orderDate) >= epochDateFrom 
                })
            }
            if (!isNil(dateTo)) {
                const epochDateTo = dateTo.valueOf()
                mutatedData = mutatedData.filter(row => { 
                    return Date.parse(row.orderDate) <= epochDateTo 
                })
            }
            setData(mutatedData)
        }
        didMountRef.current = true
    }, [filter, showOrderType, dateFrom, dateTo])

    const columns = useMemo(
        () => [
            {
                Header: 'Order Date',
                accessor: 'orderDate', // accessor is the "key" in the data
                Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
            },
            {
                Header: 'Order #',
                accessor: 'orderNumber',
            },
            {
                Header: 'PO #',
                accessor: 'poNo',
            },
            {
                Header: 'Promise Date',
                accessor: 'promiseDate', // accessor is the "key" in the data
                Cell: props => {
                    const formattedDate = dateFormat(new Date(props.value), 'MM/dd/yyyy') 
                    return <span>{formattedDate === '12/31/49' ? 'TBD' : formattedDate}</span>
                }              
            },
            {
                Header: 'Item ID',
                accessor: 'invMastUid',
            },
            {
                Header: 'Customer Part',
                accessor: 'customerPartNumber',
            },
            {
                Header: 'Qty Open / Ordered',
                accessor: 'qtyRemaining',
            },
            {
                Header: 'Unit $',
                accessor: 'unitPrice',
                Cell: props => {
                    return <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
                }
            },
            {
                Header: 'Ext $',
                accessor: 'extPrice',
                Cell: props => {
                    return <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
                }
            },
            {
                Header: 'Filter',
                accessor: 'filter'
            }
        ],
        [],
    )
    const exportColumns = useMemo(
        () => [
            {
                Header: 'Order Date',
                accessor: 'formattedOrderDate', // accessor is the "key" in the data
            },
            {
                Header: 'Order #',
                accessor: 'orderNumber',
            },
            {
                Header: 'PO #',
                accessor: 'poNo',
            },
            {
                Header: 'Promise Date',
                accessor: 'formattedPromiseDate', // accessor is the "key" in the data
            },
            {
                Header: 'Item ID',
                accessor: 'invMastUid',
            },
            {
                Header: 'Customer Part',
                accessor: 'customerPartNumber',
            },
            {
                Header: 'Qty Open / Ordered',
                accessor: 'qtyRemaining',
            },
            {
                Header: 'Unit $',
                accessor: 'unitPrice',
            },
            {
                Header: 'Ext $',
                accessor: 'extPrice',
            },
            {
                Header: 'Filter',
                accessor: 'filter'
            }
        ],
        [],
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows, //all rows
        prepareRow,
        page, // current page in rows
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
                hiddenColumns: ['filter'],
                sortBy: [
                    {
                        id: 'orderDate',
                        desc: true
                    }
                ]
            },
        },
        useSortBy,
        usePagination
    )

    // let copyData = clipboardData(columns, data)
    return (
        <TableContainer>
            <h4>Open Orders Report</h4>
            {/* <CopyToClipboard text={copyData}>
				<button>copy</button>
		</CopyToClipboard> */}
            <DivRow>
                <AirlineInput placeholder='Search PO#, Order #, Item ID' value={filter} onChange={(e) => {setFilter(e.target.value)}}></AirlineInput>
            </DivRow>
            <DivRow>
                <div>
                    {/* Date From */}
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
                    {/* Date To */}
                    <DivRowDate>
                        <DivSpacer>
                            <FontAwesomeIcon icon="calendar" color="lightgrey"/>
                        </DivSpacer>
                        <Pdate>Date to:</Pdate>
                        <DatePicker
                            selected={Date.parse(dateTo)}
                            onChange={(value) => setDateTo(value)}
                        />
                        <DivSpacer onClick={() => {setDateTo(null)}}>
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon="times-circle" color="lightgrey"/>
                        </DivSpacer>
                    </DivRowDate>
                </div>
                <ExportButtons data={data} columns={exportColumns} title='Open Orders' />
            </DivRow>
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
                                {row.cells.map((cell, i) => {
                                    if (cell.column.id === 'orderNumber') {
                                        return (
                                            <TDrow key={i} {...cell.getCellProps()} isOrderDetail onClick={() => history.push(`/account/order-detail/${cell.value}`)}>
                                                {cell.render('Cell')}
                                            </TDrow>
                                        )
                                    } else {
                                        return (
                                            <TDrow key={i} {...cell.getCellProps()}>
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
            {/* 
				Pagination can be built however you'd like. 
				This is just a very basic UI implementation:
			*/}
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