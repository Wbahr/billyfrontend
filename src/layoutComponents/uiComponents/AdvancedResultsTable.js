import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
	padding: 0px 20px;
    margin: 0 auto 0 0;
    height: 250px;
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
	padding: 3px 16px;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 500;
	font-size: 15px;
`

const TRrow = styled.tr`
    border-bottom: 1px solid lightgray;
    cursor: pointer;
`

const TDrow = styled.td`
	padding: 8px 16px;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-size: 15px;
	color: 'black';
	font-weight: 400;
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

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

export default function AdvancedResultsTable({ impersonate, data, loading }) {

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'customerIdP21',
            },
            {
                Header: 'Customer',
                accessor: 'customerName',
            },
            {
                Header: 'Terms',
                accessor: 'resultString',
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
            },
        },
        useSortBy,
        usePagination
    )

    return (
        <TableContainer>
            {
                loading ? (
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
                                                            ? <FontAwesomeIcon icon="caret-up" color="black" />
                                                            : <FontAwesomeIcon icon="caret-down" color="black" />
                                                        : <FontAwesomeIcon icon="caret-down" color="lightgrey" />}
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
                                        <TRrow key={i} {...row.getRowProps()} onClick={() => impersonate(row.original.customerIdP21)}>
                                            {row.cells.map((cell, idx) => {
                                                return (
                                                    <TDrow {...cell.getCellProps()} key={idx}>
                                                        {cell.render('Cell')}
                                                    </TDrow>
                                                )
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