import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useTable, usePagination, useSortBy  } from 'react-table'
import { formatTableData } from '../helpers/mutators'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format as dateFormat } from 'date-fns'
import Context from '../../../config/context'

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

const Select = styled.select`
	margin-left: 16px;
`

export default function InvoicesTable({ history }) {
  const context = useContext(Context)
  const didMountRef = useRef(false)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [showInvoiceType, setShowInvoiceType] = useState('all')
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)

  useEffect(() => {
    if (!didMountRef.current && context.invoiceCache.length === 0) {
      context.getInvoices()
    } else if (context.invoiceCache.length > 0) {
      const mutatedData = formatTableData('invoices', context.invoiceCache)
      filterData(mutatedData)
    }
  }, [context.invoiceCache])

  useEffect(() => {
    if (didMountRef) {
      const mutatedData = formatTableData('invoices', context.invoiceCache)
      filterData(mutatedData)
    }
    didMountRef.current = true
  }, [filter, showInvoiceType, dateFrom, dateTo])

  function filterData(data){
    // Apply search filter
    let mutatedData = data
    if (filter.length > 0) {
      mutatedData = mutatedData.filter(row => {
        const upperCaseFilter = filter.toUpperCase()
        return row.filter.includes(upperCaseFilter)
      })
    }
    // Apply showInvoiceType filter
    if (showInvoiceType !== 'all') {
      mutatedData = mutatedData.filter(row => {
        return row.status.includes(showInvoiceType)
      })
    }
    // Apply date filters
    if (!_.isNil(dateFrom)) {
      const epochDateFrom = dateFrom.valueOf()
      mutatedData = mutatedData.filter(row => { 
        return Date.parse(row.orderDate) >= epochDateFrom 
      })
    }
    if (!_.isNil(dateTo)) {
      const epochDateTo = dateTo.valueOf()
      mutatedData = mutatedData.filter(row => { 
        return Date.parse(row.orderDate) <= epochDateTo 
      })
    }
    setData(mutatedData)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Due Date',
        accessor: 'dueDate', // accessor is the "key" in the data
        Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
      },
      {
        Header: 'Invoice Date',
        accessor: 'invoiceDate', // accessor is the "key" in the data
        Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
      },
      {
        Header: 'Invoice #',
        accessor: 'invoiceNumber',
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
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Amount Due',
        accessor: 'amountDue',
      },
      {
        Header: 'Amount Paid',
        accessor: 'amountPaid',
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
            id: 'dueDate',
            desc: true
          }
        ]
      },
    },
    useSortBy,
    usePagination
  )

  return (
    <TableContainer>
      <h4>Invoices</h4>
      <DivRow>
        <AirlineInput placeholder='Search Invoice #, PO #, Order #, Item ID' value={filter} onChange={(e) => {setFilter(e.target.value)}}></AirlineInput>
        <Select style={{ width: '200px' }} value={showInvoiceType} onChange={(e) => setShowInvoiceType(e.target.value)}>
          <option value='all'>All Invoices</option>
          <option value='Open'>Open Invoices</option>
          <option value='Closed'>Closed Invoices</option>
        </Select>
      </DivRow>
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
          <FontAwesomeIcon style={{ 'cursor': 'pointer' }} icon="times-circle" color="lightgrey"/>
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
          <FontAwesomeIcon style={{ 'cursor': 'pointer' }} icon="times-circle" color="lightgrey"/>
        </DivSpacer>
      </DivRowDate>
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
                  } else if (cell.column.id === 'invoiceNumber') {
                    return (
                      <TDrow {...cell.getCellProps()} isOrderDetail onClick={() => history.push(`/account/invoice-detail/${cell.value}`)}>
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
        <p>Results: {rows.length} {!context.invoicesLoaded && '(Loading more Invoices...)'}</p>
      </div>
    </TableContainer>
  )
}