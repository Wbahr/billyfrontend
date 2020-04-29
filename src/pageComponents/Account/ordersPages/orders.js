import React, { useMemo } from 'react'
import {useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination} from 'react-table'

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
      }
    ],
    [],
  )
  const columns = useMemo(
    () => [
      {
        Header: 'Order Data',
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
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return(
    <div>

    </div>
    // <table {...getTableProps()}>
    //   <thead>
    //     {headerGroups.map(headerGroup => (
    //       <tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map(column => (
    //           <th {...column.getHeaderProps()}>
    //             {column.render('Header')}
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()}>
    //     {rows.map(row => {
    //       prepareRow(row)
    //       return (
    //         <tr {...row.getRowProps()}>
    //           {row.cells.map(cell => {
    //             return (
    //               <td {...cell.getCellProps()}>
    //                 {cell.render('Cell')}
    //               </td>
    //             )
    //           })}
    //         </tr>
    //       )
    //     })}
    //   </tbody>
    // </table>
  )
}