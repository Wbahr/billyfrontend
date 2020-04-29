import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, usePagination} from 'react-table'

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default function Orders() {

  const data = useMemo(
    () => [
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      },
      {
        order_date: 'Hello',
        order_no: 'World',
        po_no: '123132',
        buyer: 'Bpanczer',
        total: '$12.00',
        status: 'Completed'
      }
    ],
    [],
  )
  const columns = useMemo(
    () => [
      {
        Header: 'Order Date',
        accessor: 'order_date', // accessor is the "key" in the data
      },
      {
        Header: 'Order #',
        accessor: 'order_no',
      },
      {
        Header: 'PO #',
        accessor: 'po_no',
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
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  return(
    <TableContainer>
    <h4>Orders</h4>
    <input placeholder='Search PO#, Order #, Item ID'></input>
    <select>
      <option>All Orders</option>
    </select>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
          {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
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
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        </div>
      </TableContainer>
  )
}