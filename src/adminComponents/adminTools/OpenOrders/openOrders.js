// import _ from 'lodash'
import React, { useState, useMemo } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useTable, usePagination, useSortBy  } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-datepicker/dist/react-datepicker.css'
import { format as dateFormat } from 'date-fns'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1600px;
  margin: 28px auto;
  flex-grow: 99;
  align-items: center;
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

const DivRow = styled.div`
	display: flex;
	align-items: center;
`

const GET_OPEN_ORDERS = gql`
  query OrdersForEmployees{
    ordersForEmployees{
			orderNumber
			orderDate
			poNo
			orderType
			status
    }
  }
`

export default function OrderDatapage() {
	const [data, setOrderData] = useState([])

	useQuery(GET_OPEN_ORDERS, {
		fetchPolicy: 'no-cache',
		// variables: { orderNumber },
		onCompleted: result => {
			setOrderData(result.ordersForEmployees)
		}
	})

	const columns = useMemo(
		() => [
			{
				Header: 'Order Date',
				accessor: 'orderDate', // accessor is the "key" in the data
				Cell: props => <span>{dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
			},
			{
				Header: 'Order Type',
				accessor: 'orderType',
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

	return(
		<ContentScreenContainer>
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
					{page.map(row => {
						prepareRow(row)
						return (
							<TRrow {...row.getRowProps()}>
								{row.cells.map(cell => {
									if(cell.column.id === 'orderNumber') {
										return (
											<TDrow {...cell.getCellProps()} isOrderDetail>
												<a style={{cursor: 'pointer'}} href={`https://p21wc.airlinehyd.com/common/orderdetails.aspx?orderid=${cell.value}`} target='_blank' rel="noopener noreferrer">
													{cell.render('Cell')}
												</a>
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
					{[10, 25, 50, 100].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
				<p>Results: {_.isEmpty(data) ? 'Loading...' : rows.length}</p>
			</div>
		</ContentScreenContainer>
	)
}