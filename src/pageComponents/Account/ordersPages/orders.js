/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useTable, usePagination, useSortBy  } from 'react-table'
import { formatTableData } from '../helpers/mutators'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../config/context'
import { format as dateFormat } from 'date-fns'
import {parse} from 'query-string';
import {CircularProgress} from "@material-ui/core";
import {exportToExcel, exportToPdf, getCsvFormattedData} from "../../_common/helpers/generalHelperFunctions";
import { CSVLink } from "react-csv";


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

const ButtonExport = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border: 1px solid lightgrey;
	border-radius: 5px;
	margin: 10px 4px;
	&:hover {
		background-color: whitesmoke;
	}
`

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

export default function OrdersTable({ history }) {
	const context = useContext(Context)
	const [data, setData] = useState([])
	const [filter, setFilter] = useState('')
	const [showOrderType, setShowOrderType] = useState('all')
	const [dateFrom, setDateFrom] = useState(null)
	const [dateTo, setDateTo] = useState(null)
	
	useEffect(() => {
		if (!context.ordersCache.length) context.getOrders()
		
		const search = history.location.search
		if (search && search.includes('filter')) {
			setFilter(parse(search).filter)
		}
	}, []);
	
	useEffect(() => {
		let mutatedData = formatTableData('orders', context.ordersCache)
		// Apply search filter
		if (filter.length > 0) {
			mutatedData = mutatedData.filter(row => {
				let upperCaseFilter = filter.toUpperCase()
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
		if (!_.isNil(dateFrom)) {
			let epochDateFrom = dateFrom.valueOf()
			mutatedData = mutatedData.filter(row => {
				return Date.parse(row.orderDate) >= epochDateFrom
			})
		}
		if (!_.isNil(dateTo)) {
			let epochDateTo = dateTo.valueOf()
			mutatedData = mutatedData.filter(row => {
				return Date.parse(row.orderDate) <= epochDateTo
			})
		}
		setData(mutatedData)
	}, [context.ordersCache, filter, showOrderType, dateFrom, dateTo])
	
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
	
	const exportIgnoreColumns = ['filter']
	const prepareDataForExport = ({total, ...rest}) => ({...rest, total: total.props.value})
	
	const handleExcelExport = () => {
		if (data.length) {
			exportToExcel(data.map(prepareDataForExport), columns, 'Orders', exportIgnoreColumns)
		}
	}
	
	const handlePdfExport = () => {
		if (data.length) {
			exportToPdf(data.map(prepareDataForExport), columns, 'Orders', exportIgnoreColumns)
		}
	}
	
	return(
		<TableContainer>
			<h4>Orders</h4>
			<DivRow>
				<AirlineInput placeholder='Search PO#, Order #, Item ID' value={filter} onChange={(e)=>{setFilter(e.target.value)}}></AirlineInput>
				<Select style={{width: '200px'}} value={showOrderType} onChange={(e)=>setShowOrderType(e.target.value)}>
					<option value='all'>All Orders</option>
					<option value='Completed'>Completed Orders</option>
					<option value='Open'>Open Orders</option>
					<option value='Credit Hold'>Credit Hold Orders</option>
				</Select>
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
							onChange={(value)=>setDateFrom(value)}
						/>
						<DivSpacer onClick={()=>{setDateFrom(null)}}>
							<FontAwesomeIcon style={{'cursor': 'pointer'}} icon="times-circle" color="lightgrey"/>
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
							onChange={(value)=>setDateTo(value)}
						/>
						<DivSpacer onClick={()=>{setDateTo(null)}}>
							<FontAwesomeIcon style={{'cursor': 'pointer'}} icon="times-circle" color="lightgrey"/>
						</DivSpacer>
					</DivRowDate>
				</div>
				<DivRow>
					<ButtonExport>
						<FontAwesomeIcon size='lg' icon="copy" color="grey"/>
					</ButtonExport>
					<ButtonExport onClick={handlePdfExport}>
						<FontAwesomeIcon size='lg' icon="file-pdf" color="#ff0000"/>
					</ButtonExport>
					<ButtonExport onClick={handleExcelExport}>
						<FontAwesomeIcon size='lg' icon="file-excel" color="#1d6f42"/>
					</ButtonExport>
					<CSVLink data={getCsvFormattedData(data.map(prepareDataForExport), columns, exportIgnoreColumns)}>
						<ButtonExport>
							<FontAwesomeIcon size='lg' icon="file-csv" color="grey"/>
						</ButtonExport>
					</CSVLink>
				</DivRow>
			</DivRow>
			
			{
				context.getOrdersState.loading ? (
					<SpinnerDiv>
						<CircularProgress color=""/>
					</SpinnerDiv>
				) : (
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
												<TDrow {...cell.getCellProps()} isOrderDetail onClick={()=>history.push(`/account/order-detail/${cell.value}`)}>
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
				)
			}
			
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