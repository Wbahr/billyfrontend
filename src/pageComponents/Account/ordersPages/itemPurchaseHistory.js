import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useSortBy  } from 'react-table'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Context from '../../../setup/context'
import { format as dateFormat } from 'date-fns'
import AddedModal from '../../SearchResults/uiComponents/addedModal'
import _ from 'lodash'
import { CircularProgress } from '@material-ui/core'
import NumberFormat from 'react-number-format'
import { exportToExcel, exportToPdf, getCsvFormattedData, getImagePath } from '../../_common/helpers/generalHelperFunctions'
import { CSVLink } from 'react-csv'

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

const TableButton = styled.button`
  width: 110px;
	background-image: linear-gradient(to top left, #950f23, #DB1633);
	color: white;
	font-weight: 500;
	border: 0;
	border-radius: 5px;
`

const AddToCartInput = styled.input`
	margin-right: 5px;
	width: 50px;
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

export default function ItemPurchaseHistoryTable({ history }) {
    const context = useContext(Context)
    const didMountRef = useRef(false)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('')
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [showModal, setShowModal] = useState(false)
	
    useEffect(() => {
        context.getPurchaseHistory()
    }, [context.userInfo])
	
    const getFilter = ({ itemId, customerPartNumber, associatedOrderDetails }) => {
        const orderDetails = associatedOrderDetails.map(obj => Object.keys(obj).map(key => obj[key]).join('')).join('')
        const filter = orderDetails + itemId + customerPartNumber
        return filter.toUpperCase()
    }
	
    const applyFilters = (accum, row) => {
        if (
            (!filter.length || getFilter(row).includes(filter.toUpperCase()))
			&& (_.isNil(dateFrom) || Date.parse(row.lastDateOrdered) >= dateFrom.valueOf())
			&& (_.isNil(dateTo) || Date.parse(row.lastDateOrdered) <= dateTo.valueOf())
        ) {
            accum.push(row)
        }
        return accum
    }
	
    useEffect(() => {
        if (didMountRef) {
            const mutatedData = context.purchaseHistory.reduce(applyFilters, [])
            setData(mutatedData)
        }
        didMountRef.current = true
    }, [context.purchaseHistory, filter, dateFrom, dateTo])
	
    const handleViewOrderHistory = ({ row }) => () => {
        history.push(`/account/orders?filter=${row.values.itemId}`)
    }
	
    const handleAddToCartAmtChange = ({ data, row }) => ({ target: { value } }) => {
        const foundIdx = data.findIndex(d => d.itemId === row.values.itemId)
        if (foundIdx !== -1) {
            const dataCopy = data.slice()
            const cleanVal = value.replace(/\D/g, '')
            const addToCartAmt = cleanVal.length ? cleanVal : null
            dataCopy[foundIdx] = { ...data[foundIdx], addToCartAmt }
            setData(dataCopy)
        }
    }
	
    const handleAddToCart = ({ row }) => () => {
        const { addToCartAmt, invMastUid: frecno } = row.original
        const quantity = addToCartAmt ? parseInt(addToCartAmt) : 1
        setShowModal(true)
        context.addItem({ quantity, frecno })
    }
	
    const renderItemPrice = ({ row: { original, values } }) => {
        const byUid = ({ invMastUid }) => invMastUid === original.invMastUid
        const currentPrice = values.currentPrice
            ? values.currentPrice
            : context.itemPrices.find(byUid)?.unitPrice
        return  currentPrice ? (
            <NumberFormat value={currentPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
        ) : <span>...</span>
    }
	
    const renderQuantityAvailable = ({ row: { original, values } }) => {
        const byUid = ({ invMastUid }) => invMastUid === original.invMastUid
        const foundMatch = context.itemAvailabilities.find(byUid)
        const availability = values.quantityAvailable
            ? values.quantityAvailable
            : foundMatch?.availability
        const quantityAvailable = availability
            ? availability
            : foundMatch?.leadTimeDays && `Estimated Lead Time: ${foundMatch.leadTimeDays} days`
        return <span>{quantityAvailable ? quantityAvailable : 'Call us'}</span>
    }
		
    const columns = useMemo(
        () => [
            {
                Header: 'Item ID',
                accessor: 'itemId',
            },
            {
                Header: 'Image',
                accessor: 'itemImageUrl',
                Cell: props => <img src={getImagePath(props.value)} height={75} width={75} alt={props.row.values.itemId}/>
            },
            {
                Header: 'Last Date Ordered',
                accessor: 'lastDateOrdered',
                Cell: props => <span>{props.value && dateFormat(new Date(props.value), 'MM/dd/yyyy')}</span>
            },
            {
                Header: 'Last Qty Purchased',
                accessor: 'lastQuantityPurchased',
            },
            {
                Header: '# Times Ordered',
                accessor: 'numberTimesOrdered',
            },
            {
                Header: 'Total Qty Purchased',
                accessor: 'totalQuantityPurchased',
            },
            {
                Header: 'Current Price',
                accessor: 'currentPrice',
                Cell: renderItemPrice
            },
            {
                Header: 'Qty Available',
                accessor: 'quantityAvailable',
                Cell: renderQuantityAvailable
            },
            {
                Header: 'UOM',
                accessor: 'unitOfMeasure'
            },
            {
                Header: '',
                accessor: 'addToCartAmt',
                Cell: props => (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TableButton onClick={handleViewOrderHistory(props)}>Order History</TableButton>
                        </div>
                        <DivRow>
                            <AddToCartInput type="number" min={1} value={props.value === undefined ? 1 : props.value} onChange={handleAddToCartAmtChange(props)}/>
                            <TableButton onClick={handleAddToCart(props)}>Add to Cart</TableButton>
                        </DivRow>
                    </div>
                )
            },
            {
                Header: 'Filter',
                accessor: 'filter'
            }
        ],
        [context.itemAvailabilities, context.itemPrices, context.cart],
    )
    const tableProps = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                hiddenColumns: ['filter'],
                sortBy: [{
                    id: 'numberTimesOrdered',
                    desc: true
                }]
            },
        },
        useSortBy,
        usePagination
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
        state: { pageIndex, pageSize, sortBy },
    } = tableProps
	
    useEffect(() => {
        if (page.length) {
            const dataToFetchPricesFor = page
                .filter(d => !context.itemPrices.find(({ invMastUid }) => invMastUid === d.original.invMastUid))
                .map(({ original }) => original)
            if (dataToFetchPricesFor.length) context.getItemPrices(dataToFetchPricesFor)
			
            const dataToFetchAvailabilitiesFor = page
                .filter(d => !context.itemAvailabilities.find(({ invMastUid }) => invMastUid === d.original.invMastUid))
                .map(({ original }) => original)
            if (dataToFetchAvailabilitiesFor.length) context.getItemAvailabilities(dataToFetchAvailabilitiesFor)
        }
    }, [pageIndex, pageSize, sortBy, data])
	
    const exportIgnoreColumns = ['filter', 'addToCartAmt', 'itemImageUrl']
	
    const prepareDataForExport = ({ currentPrice, quantityAvailable, lastDateOrdered, ...rest }) => {
        const byUid = ({ invMastUid }) => invMastUid === rest.invMastUid
        return {
            ...rest,
            lastDateOrdered: lastDateOrdered ? dateFormat(new Date(lastDateOrdered), 'MM/dd/yyyy') : '',
            currentPrice: currentPrice || context.itemPrices.find(byUid)?.unitPrice,
            quantityAvailable: quantityAvailable || context.itemAvailabilities.find(byUid)?.availability
        }
    }
	
    const handleExcelExport = () => {
        if (data.length) {
            exportToExcel(data.map(prepareDataForExport), columns, 'Purchase History', exportIgnoreColumns)
        }
    }
	
    const handlePdfExport = () => {
        if (data.length) {
            exportToPdf(data.map(prepareDataForExport), columns, 'Purchase History', exportIgnoreColumns)
        }
    }
	
    return (
        <TableContainer>
            <h4>Item Purchase History</h4>
            <DivRow>
                <AirlineInput placeholder='Search PO#, Order #, Item ID' value={filter} onChange={(e) => {setFilter(e.target.value)}}></AirlineInput>
            </DivRow>
			
            <DivRow>
                {/* Date From */}
                <div>
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
				
                <DivRow>
                    {/*<ButtonExport>*/}
                    {/*<FontAwesomeIcon size='lg' icon="copy" color="grey"/>*/}
                    {/*</ButtonExport>*/}
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
                context.getPurchaseHistoryState.loading ? (
                    <SpinnerDiv>
                        <CircularProgress />
                    </SpinnerDiv>
                ) : (
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
                                            return (
                                                <TDrow key={i} {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </TDrow>
                                            )
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
            <AddedModal
                open={showModal}
                onClose={() => setShowModal(false)}
                text={'Added to Cart!'}
                timeout={900}
            />
        </TableContainer>
    )
}