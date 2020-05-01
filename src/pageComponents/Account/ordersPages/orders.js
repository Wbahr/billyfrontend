import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { useTable, useGlobalFilter, usePagination, useFilters, useSortBy  } from 'react-table'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import OrderDatapage from 'adminComponents/adminTools/OrderData/orderData'
import { formatTableData } from '../helpers/mutators'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  font-weight: 300;
  font-size: 15px;
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

const GET_ORDERS = gql`
query Orders{
    accountOrders {
      orderNumber
      orderDate
      poNo
      type
      status
      total
      buyer
      lineItems {
        invMastUid
        itemCode
        customerPartNumber
        quantity
        unitPrice
      }
    }
  }
`

export default function OrdersTable() {
  const didMountRef = useRef(false)
  const [originalData, setOriginalData] = useState([])
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [showOrderType, setShowOrderType] = useState('all')
  
  useQuery(GET_ORDERS, {
    onCompleted: response => {
      const mutatedOrders = formatTableData('orders', response.accountOrders)
      setOriginalData(mutatedOrders)
      setData(mutatedOrders)
    }
  })

  useEffect(() => {
    if (didMountRef) {
      if (filter.length > 0) {
        let mutatedData = originalData.filter(row => {
          let upperCaseFilter = filter.toUpperCase()
          if (showOrderType === 'all') {
            return row.filter.includes(upperCaseFilter)
          } else {
            return (row.filter.includes(upperCaseFilter) && row.status.includes(showOrderType))
          }
        })
        setData(mutatedData)
      } else {
        setData(originalData)
      }
    }
    didMountRef.current = true
  }, [filter, showOrderType])

  const columns = useMemo(
    () => [
      {
        Header: 'Order Date',
        accessor: 'orderDate', // accessor is the "key" in the data
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
        Header: 'Buyer',
        accessor: 'buyer',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'Status',
        accessor: 'status',
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
      initialState: { pageIndex: 0, hiddenColumns: ['filter']},
    },
    useSortBy,
    usePagination
  )

  return(
    <TableContainer>
    <h4>Orders</h4>
    <AirlineInput placeholder='Search PO#, Order #, Item ID' value={filter} onChange={(e)=>{setFilter(e.target.value)}}></AirlineInput>
    <select style={{width: "200px"}} value={showOrderType} onChange={(e)=>setShowOrderType(e.target.value)}>
      <option value='all'>All Orders</option>
      <option value='Completed'>Completed Orders</option>
      <option value='Open'>Open Orders</option>
      <option value='Credit Hold'>Credit Hold Orders</option>
    </select>
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <TRheader {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <THheader {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <SpanSort>
                    {column.isSorted
                      ? column.isSortedDesc
                        ?  <FontAwesomeIcon icon="caret-up" color="lightgrey"/>
                        :  <FontAwesomeIcon icon="caret-down" color="lightgrey"/>
                      : ''}
                </SpanSort>
              </THheader>
            ))}
          </TRheader>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return (
            <TRrow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TDrow {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TDrow>
                )
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
        </div>
      </TableContainer>
  )
}