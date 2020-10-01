import React, {useContext, useMemo, useEffect, useRef, useState} from 'react'
import _ from 'lodash'
import Select from '../../_common/form/select'
import AirlineInput from "../../_common/form/inputv2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CircularProgress} from "@material-ui/core";
import AddedModal from "../../SearchResults/uiComponents/addedModal";
import styled from "styled-components";
import {usePagination, useSortBy, useTable} from "react-table";
import Context from "../../../config/context";
import ShareShoppingListModal from '../../_common/modals/ShareShoppingListModal';
import SaveShoppingListModal from "../../_common/modals/SaveShoppingListModal";
import DeleteChickenModal from '../../_common/modals/DeleteChickenModal'
import {
	exportToExcel,
	exportToPdf,
	getCsvFormattedData,
    getImagePath,
	getRidOf__typename
} from "../../_common/helpers/generalHelperFunctions";
import NumberFormat from "react-number-format";
import {CSVLink} from "react-csv";

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
	background-image: linear-gradient(to top left, #950f23, #DB1633);
	color: white;
	font-weight: 500;
	border: 0;
	border-radius: 5px;
	margin-left: 5px;
`

const AddToCartInput = styled.input`
	margin-right: 5px;
	width: 50px;
`

const SpanSort = styled.span`
  margin-left: 4px;
`

const DivRow = styled.div`
  display: flex;
  align-items: center;
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

const SaveChangesButton = styled.button`
	cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top left, #001d3d, #003978);
  color: white;
  padding: 4px 12px;
  font-size: 20px;
  font-family: Proxima;
  font-weight: 600;
  border: none;
  svg {
    margin-right: 5px;
  }
`

const CancelChangesButton = styled.button`
	cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top left, #001d3d, #003978);
  color: white;
  padding: 4px 12px;
  font-size: 20px;
  font-family: Proxima;
  font-weight: 600;
  border: none;
  svg {
    margin-right: 5px;
  }
`

export default function ShoppingListManagementPage() {
	const context = useContext(Context)
	const didMountRef = useRef(false)
	const [shoppingListOptions, setShoppingListOptions] = useState([])
	const [selectedSavedList, setSelectedSavedList] = useState(null)
	const [selectedSharedList, setSelectedSharedList] = useState(null)
	const selectedList = selectedSavedList || selectedSharedList
	const [selectedUser, setSelectedUser] = useState(null)
	const [confirmDelete, setConfirmDelete] = useState(false)
	const [data, setData] = useState([])
	const [filter, setFilter] = useState('')
	const [showSaveModal, setShowSaveModal] = useState(false)
	const [showShareModal, setShowShareModal] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [listNotes, setListNotes] = useState()
	const [listName, setListName] = useState()
	const [listItems, setListItems] = useState()
	
	const userOptions = context.webUserContacts.map(({firstName, lastName, contactId}) => ({label: `${firstName} ${lastName || ''}`, value: contactId}))
	const loading = context.upsertShoppingListState?.loading
	
	useEffect(() => {
		if (!context.userInfo?.contactId) context.getWebUserContacts()
		context.getShoppingLists()
	}, [context.userInfo])
	
	const mapShoppingListOptions = list => ({label: list.name, value: list.id, ...list});
	
	useEffect(() => {
		if (context.userInfo.contactId) {
			setShoppingListOptions(context.shoppingLists.map(mapShoppingListOptions))
		} else {
			selectedUser && setShoppingListOptions(context.shoppingLists.map(mapShoppingListOptions))
		}
	}, [context.shoppingLists, selectedUser])
	
	useEffect(() => {
		setListName(selectedList?.name)
		setListNotes(selectedList?.notes)
		setListItems(selectedList?.items.map((item, idx) => ({ ...item, idx})))
	}, [selectedSharedList, selectedSavedList])
	
	const getFilter = row => Object.keys(row).map(key => row[key]).join(', ')
	
	const applyFilters = (accum, row) => {
		if ((!filter.length || getFilter(row).includes(filter.toUpperCase()))) {
			accum.push(row)
		}
		return accum
	}

	useEffect(() => {
		if (didMountRef) setData((listItems || []).reduce(applyFilters, []))
		didMountRef.current = true
	}, [listItems, filter])

	const handleDeleteClick = () => setConfirmDelete(true)
	
	const handleConfirmDelete = () => {
		context.upsertShoppingList({ ...selectedList, deleted: true })
			.then(() => {
				setSelectedSavedList(null)
				setConfirmDelete(false)
			})
	}
	
	const handleQuantityChange = (props) => ({target: {value}}) => {
		const {row: {original: {idx}}, listItems} = props
		const itemsCopy = listItems.slice()
		const cleanVal = value.replace(/\D/g, '')
		const quantity = cleanVal.length ? parseInt(cleanVal) : null
		itemsCopy[idx] = { ...itemsCopy[idx], quantity }
		setListItems(itemsCopy)
	}

	const handleAddToCart = ({row: {original: {idx, invMastUid: frecno}}}) => () => {
		const quantity = data[idx]?.quantity ? parseInt(data[idx].quantity) : 1
		setShowModal(true)
		context.addItem({quantity, frecno})
	}
	
	const handleCopyToCart = () => {
		context.addItems(selectedList.items.map(({invMastUid: frecno, customerPartNumberId, quantity}) => ({frecno, customerPartNumberId, quantity})))
		setShowModal(true)
	}
	
	const handleRemoveFromList = (props) => () => {
		const {row: {original: {idx}}, listItems} = props
		const itemsCopy = listItems.slice()
		itemsCopy.splice(idx, 1)
		setListItems(itemsCopy.map((item, idx) => ({ ...item, idx })))
	}
	
	const handleShareList = () => setShowShareModal(true)
	
	const handleSavedListChange = value => {
		setSelectedSharedList(null)
		setSelectedSavedList(context.shoppingLists.find(list => list.id === value))
	}
	
	const handleSharedListChange = value => {
		setSelectedSavedList(null)
		setSelectedSharedList(context.shoppingLists.find(list => list.id === value))
	}
	
	const handleUserChange = value => {
		setSelectedSharedList(null)
		setSelectedSavedList(null)
		setSelectedUser(userOptions.find(user => user.value === value))
	}
	
	const handleSaveChanges = () => {
		context.upsertShoppingList({
			id: selectedList.id,
			contactIdOwner: selectedList.contactIdOwner,
			name: listName,
			notes: listNotes,
			items: listItems,
			editors: selectedList.editors
		})
			.then(({data}) => {
				setSelectedSharedList(null)
				setSelectedSavedList(data.shoppingListEdit)
			})
	}
	
	const handleCancelChanges = () => {
		setSelectedSavedList({ ...selectedList })
	}
	
	const handleListNameChange = ({target: {value}}) => setListName(value)
	
	const handleListNotesChange = ({target: {value}}) => setListNotes(value)
	
	const saveCallback = newList => {
		setSelectedSharedList(null)
		setSelectedSavedList(getRidOf__typename(newList))
	}
	
	const renderItemPrice = ({row: {original, values}}) => {
		const byUid = ({invMastUid}) => invMastUid === original.invMastUid
		const currentPrice = values.currentPrice
			? values.currentPrice
			: context.itemPrices.find(byUid)?.unitPrice
		return currentPrice ? (
				<NumberFormat value={currentPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
			) : <span>...</span>
	}
	
	const renderQuantityAvailable = ({row: {original, values}}) => {
		const byUid = ({invMastUid}) => invMastUid === original.invMastUid
		const foundMatch = context.itemAvailabilities.find(byUid);
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
				accessor: 'itemCode',
			},
			{
				Header: 'Image',
				accessor: 'imageUrl',
				Cell: props => <img src={getImagePath(props.value)} height={75} width={75} alt={props.row.values.itemId}/>
			},
			{
				Header: 'AHC #',
				accessor: 'invMastUid',
				Cell: props => <span>AHC{props.value}</span>
			},
			{
				Header: 'Customer Part',
				accessor: 'customerPartNumber',
			},
			{
				Header: 'Description',
				accessor: 'itemDescription',
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
				Header: 'Quantity',
				accessor: 'quantity',
				Cell: props => {
					const qty = props.listItems?.[props.row.original.idx]?.quantity
					return (
						<AddToCartInput readOnly={selectedSharedList} type="number" min={1} value={qty === undefined ? 1 : qty} onChange={handleQuantityChange(props)}/>
					)
				}
			},
			{
				accessor: 'addToCartAmt',
				Cell: props => (
					<div>
						<DivRow>
							<TableButton onClick={handleAddToCart(props)}>Add to Cart</TableButton>
						</DivRow>
						{
							selectedSavedList && (
								<div style={{marginTop: 3}}>
									<TableButton onClick={handleRemoveFromList(props)}>Remove From List</TableButton>
								</div>
							)
						}
					</div>
				)
			},
			{
				Header: 'Filter',
				accessor: 'filter'
			}
		],
		[selectedList, context.itemAvailabilities, context.itemPrices],
	)

	const tableProps = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				hiddenColumns: ['filter'],
				sortBy: []
			},
			listItems
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
	} = tableProps;
	
	useEffect(() => {
		if (page.length) {
			const dataToFetchPricesFor = page
				.filter(d => !context.itemPrices.find(({invMastUid}) => invMastUid === d.original.invMastUid))
				.map(({original}) => original)
			if (dataToFetchPricesFor.length) context.getItemPrices(dataToFetchPricesFor)
			
			const dataToFetchAvailabilitiesFor = page
				.filter(d => !context.itemAvailabilities.find(({invMastUid}) => invMastUid === d.original.invMastUid))
				.map(({original}) => original)
			if (dataToFetchAvailabilitiesFor.length) context.getItemAvailabilities(dataToFetchAvailabilitiesFor);
		}
	}, [pageIndex, pageSize, sortBy, data])
	
	const Owner = () => {
		const owner = selectedSharedList && context.webUserContacts.find(user => user.contactId === selectedSharedList.contactIdOwner)
		return selectedSharedList && <p>Owned By: {owner?.firstName} {owner?.lastName}</p>
	}
	
	const SaveChanges = () => {
		const {notes, name, items} = selectedList || {}
		const isItemsListChanged = () => {
			if (items && listItems) {
				if (items.length !== listItems.length) return true
				for (let i = 0; i < items.length; i++) {
					if (items[i].itemCode !== listItems[i].itemCode || items[i].quantity !== listItems[i].quantity) {
						return true
					}
				}
				return false
			}
		}
		const sameAsOriginal = notes === listNotes && name === listName && !isItemsListChanged()
		return !sameAsOriginal && (
			<DivRow>
				<SaveChangesButton
					style={{marginBottom: 5}}
					onClick={handleSaveChanges}
				>
					{loading ? 'Saving...' : 'Save Changes'}
				</SaveChangesButton>
				
				<CancelChangesButton
					style={{marginBottom: 5, marginLeft: 10}}
					onClick={handleCancelChanges}
				>
					Cancel Changes
				</CancelChangesButton>
			</DivRow>
		)
	}
	
	
	const exportIgnoreColumns = ['filter', 'addToCartAmt', 'imageUrl']
	
	const prepareDataForExport = ({currentPrice, quantityAvailable, ...rest}) => {
		const byUid = ({invMastUid}) => invMastUid === rest.invMastUid
		return {
			...rest,
			currentPrice: currentPrice || context.itemPrices.find(byUid)?.unitPrice,
			quantityAvailable: quantityAvailable || context.itemAvailabilities.find(byUid)?.availability
		}
	}
	
	const handleExcelExport = () => {
		if (selectedList) {
			exportToExcel(selectedList.items.map(prepareDataForExport), columns, selectedList.name, exportIgnoreColumns)
		}
	}
	
	const handlePdfExport = () => {
		if (selectedList) {
			exportToPdf(selectedList.items.map(prepareDataForExport), columns, selectedList.name, exportIgnoreColumns)
		}
	}

	return (
		<div>
			<h4>Shopping Lists</h4>

			<DivRow>
				{ !context.userInfo.contactId && (
					<div>
						<p>Select User</p>
						<Select
							value={selectedUser}
							setValue={handleUserChange}
							options={userOptions}
							placeholder='Search by name'
							width={225}
						/>
					</div>
				)}
				
				<div>
					<p>Saved Shopping Lists</p>
					<Select
						value={selectedSavedList && shoppingListOptions.find(list => list.value === selectedSavedList.id)}
						setValue={handleSavedListChange}
						options={shoppingListOptions.filter(list => list.contactIdOwner === (context.userInfo.contactId || selectedUser?.value))}
						placeholder='Search lists by Name, Item'
						width={275}
					/>
				</div>
				
				<div>
					<p>Shared Shopping Lists</p>
					<Select
						value={selectedSharedList && shoppingListOptions.find(list => list.value === selectedSharedList.id)}
						setValue={handleSharedListChange}
						options={shoppingListOptions.filter(list => list.editors.find(e => e.contactId === (context.userInfo.contactId || selectedUser?.value)))}
						placeholder='Search lists by Name, Item'
						width={275}
					/>
				</div>
			</DivRow>
			
			<Owner/>
			
			{
				selectedList && (
					<div>
						<AirlineInput disabled={selectedSharedList} value={listName} onChange={handleListNameChange}/>
						<textarea readOnly={selectedSharedList} value={listNotes} onChange={handleListNotesChange} rows={3} style={{width: 500, marginTop: 10}}/>
					</div>
				)
			}
			
			<SaveChanges/>
			
			{ !selectedList && <TableButton onClick={() => setShowSaveModal(true)}>Add New List</TableButton> }

			<DivRow>
				{
					!!selectedList && (
						<DivRow>
							<TableButton onClick={handleCopyToCart}>Copy to Cart</TableButton>
							<TableButton onClick={() => setShowSaveModal(true)}>Save as new</TableButton>
						</DivRow>
					)
				}
				{
					selectedSavedList && (
						<DivRow>
							<TableButton onClick={handleShareList}>Share</TableButton>
							<TableButton onClick={handleDeleteClick}>{confirmDelete ? 'Confirm Delete?' : 'Delete this List'}</TableButton>
						</DivRow>
					)
				}
			</DivRow>
			
			<DivRow style={{marginTop: 20}}>
				<AirlineInput placeholder='Filter by AHC #, Item ID, Description' value={filter} onChange={(e)=>{setFilter(e.target.value)}}/>
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

			{
				context.getShoppingListsState?.loading ? (
					<SpinnerDiv>
						<CircularProgress />
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
			
			<SaveChanges/>
			
			<AddedModal
				open={showModal}
				onClose={() => setShowModal(false)}
				text={'Added to Cart!'}
				timeout={900}
			/>
			
			<ShareShoppingListModal
				open={showShareModal}
				hide={() => setShowShareModal(false)}
				shoppingList={selectedList || {}}
			/>
			
			<SaveShoppingListModal
				open={showSaveModal}
				hide={() => setShowSaveModal(false)}
				items={selectedList?.items || []}
				preSelectedUser={selectedUser}
				saveCallback={saveCallback}
			/>
			
			<DeleteChickenModal
				open={confirmDelete}
				hide={() => setConfirmDelete(false)}
				text={`Are you sure you want to delete list: ${selectedList?.name}?`}
				handleDelete={handleConfirmDelete}
			/>
		</div>
	)
}