import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useFilters, useGlobalFilter } from 'react-table'
import matchSorter from 'match-sorter'

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default function QuotesTable() {

  const data = useMemo(
    () => [
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      },
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      },
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      },
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      },
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      },
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      },
      {
        quote_date: 'Hello',
        quote_no: 'World',
        quote_ref_no: '123132',
        accessor: 'Bpanczer'
      }
    ],
    [],
  )
  const columns = useMemo(
    () => [
      {
        Header: 'Quote Date',
        accessor: 'quote_date', // accessor is the "key" in the data
      },
      {
        Header: 'Quote #',
        accessor: 'quote_no',
      },
      {
        Header: 'Quote Ref #',
        accessor: 'quote_ref_no',
      },
      {
        Header: 'Total',
        accessor: 'total',
      }
    ],
    [],
  )

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

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
    usePagination,
    useFilters,
    useGlobalFilter
  )

  return(
    <TableContainer>
    <h4>Open Quotes</h4>
    <input placeholder='Quote Reference #, Quote #, Item ID'></input>
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