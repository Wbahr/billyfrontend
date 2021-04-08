import { useBlockLayout, usePagination, useResizeColumns, useSortBy, useTable } from 'react-table'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel
} from '@material-ui/core'
import Loader from '../loader'
import React from 'react'
import styled from 'styled-components'

const PaperContainer = styled(Paper)`
  .sort {
    display: flex;

    svg {
      display: none;
    }

    &:hover svg {
      display: inline-block;
    }
  }

  .show {
    svg {
      display: inline-block;
    }
  }

  .truncate {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .resize-table {
    display: inline-block;

    .th {
      padding: 16px 20px 16px 16px;
    }

    .th, .td {
      position: relative;

      .resizer {
        background: inherit;
        display: inline-block;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        touch-action: none;

        span {
          display: block;
          height: 75%;
          width: 2px;
          margin: 25% 10px 0 10px;
          background: lightgray;

          &.isResizing {
            background: black;
          }
        }
      }
    }
  }
`

export default function DataGrid({ columns, data, loading, dense, stickyHeader }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data
        },
        useSortBy,
        usePagination,
        useBlockLayout,
        useResizeColumns
    )
    
    const handleChangePage = (e, page) => gotoPage(page)
    
    const handleChangeRowsPerPage = (e) => setPageSize(e.target.value)
    
    return (
        <PaperContainer>
            <TableContainer>
                <Table
                    {...getTableProps()}
                    size={dense ? 'small' : 'medium'}
                    stickyHeader={stickyHeader || stickyHeader === undefined}
                    className="resize-table"
                >
                    <TableHead>
                        {headerGroups.map(THead)}
                    </TableHead>
                    
                    <TableBody {...getTableBodyProps()}>
                        {page.map(TBody(prepareRow))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {loading && <Loader/>}
            
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </PaperContainer>
    )
}

const TBody = prepareRow => row => {
    prepareRow(row)
    return (
        <TableRow {...row.getRowProps()} className="tr">
            {row.cells.map(TD)}
        </TableRow>
    )
}

const TD = ({ getCellProps, render }) => (
    <TableCell className="td truncate" {...getCellProps()}>
        {render('Cell')}
    </TableCell>
)

const THead = ({ getHeaderGroupProps, headers }) => (
    <TableRow {...getHeaderGroupProps()} className="tr">
        {headers.map(TH)}
    </TableRow>
)

const TH = ({ getHeaderProps, getSortByToggleProps, isSorted, isSortedDesc, getResizerProps, isResizing, render }) => (
    <TableCell {...getHeaderProps(getSortByToggleProps())} className="th truncate">
        <TableSortLabel
            active={isSorted}
            direction={isSortedDesc ? 'desc' : 'asc'}
            className={`sort${isSorted ? ' show' : ''}`}
        >
            <span className="truncate">{render('Header')}</span>
        </TableSortLabel>
        
        <div
            {...getResizerProps()}
            className="resizer"
        >
            <span className={isResizing ? 'isResizing' : ''}/>
        </div>
    </TableCell>
)