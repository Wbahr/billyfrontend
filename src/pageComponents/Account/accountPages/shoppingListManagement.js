import React, { useContext, useMemo, useEffect, useState } from 'react'
import Select from '../../_common/form/select'
import AirlineInput from '../../_common/form/inputv2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid } from '@material-ui/core'
import AddedModal from '../../SearchResults/uiComponents/addedModal'
import styled from 'styled-components'
import Context from '../../../setup/context'
import ShareShoppingListModal from '../../_common/modals/ShareShoppingListModal'
import SaveShoppingListModal from '../../_common/modals/SaveShoppingListModal'
import DeleteChickenModal from '../../_common/modals/DeleteChickenModal'
import {
    exportToExcel,
    exportToPdf,
    getCsvFormattedData,
    getImagePath,
    getRidOf__typename, useDidUpdateEffect
} from '../../_common/helpers/generalHelperFunctions'
import NumberFormat from 'react-number-format'
import { CSVLink } from 'react-csv'
import QuantityInput from '../../_common/form/quantityInput'
import AirlineChip from '../../_common/styledComponents/AirlineChip'
import Table from '../../_common/table'

const TableButton = styled.button`
	background-image: linear-gradient(to top left, #950f23, #DB1633);
	color: white;
	font-weight: 500;
	border: 0;
	border-radius: 5px;
	margin-left: 5px;
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
    const [shoppingListOptions, setShoppingListOptions] = useState([])
    const [selectedSavedList, setSelectedSavedList] = useState(null)
    const [selectedSharedList, setSelectedSharedList] = useState(null)
    const selectedList = selectedSavedList || selectedSharedList
    const [selectedUser, setSelectedUser] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [filter, setFilter] = useState('')
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [listNotes, setListNotes] = useState()
    const [listName, setListName] = useState()
    const [listItems, setListItems] = useState([])
  
    const userOptions = context.webUserContacts.map(({ firstName, lastName, webUserId }) => ({ label: `${firstName} ${lastName || ''}`, value: webUserId }))
    const loading = context.upsertShoppingListState?.loading
  
    useEffect(() => {
        if (!context.userInfo?.webUserId) context.getWebUserContacts()
        context.getShoppingLists()
    }, [context.userInfo])
  
    const mapShoppingListOptions = list => ({ label: list.name, value: list.id, ...list })
  
    useEffect(() => {
        if (context.userInfo.webUserId) {
            setShoppingListOptions(context.shoppingLists.map(mapShoppingListOptions))
        } else {
            selectedUser && setShoppingListOptions(context.shoppingLists.map(mapShoppingListOptions))
        }
    }, [context.shoppingLists, selectedUser])
  
    useEffect(() => {
        setListName(selectedList?.name)
        setListNotes(selectedList?.notes)
        setListItems(selectedList?.shoppingListItems.map((item, idx) => ({ ...item, idx })))
    }, [selectedSharedList, selectedSavedList])
  
    const getFilter = row => Object.keys(row).map(key => row[key]).join(', ')
  
    const applyFilters = (accum, row) => {
        if ((!filter.length || getFilter(row).includes(filter.toUpperCase()))) {
            accum.push(row)
        }
        return accum
    }
  
    useDidUpdateEffect(() => {
        setFilteredData((listItems || []).reduce(applyFilters, []))
    }, [listItems, filter])
  
    const handleDeleteClick = () => setConfirmDelete(true)
  
    const handleConfirmDelete = () => {
        context.upsertShoppingList({ ...selectedList, deleted: true })
            .then(() => {
                setSelectedSavedList(null)
                setConfirmDelete(false)
            })
    }
  
    const handleQuantityChange = (props) => (quantity) => {
        const { row: { original: { idx } } } = props
        const itemsCopy = listItems.slice()
        itemsCopy[idx] = { ...itemsCopy[idx], quantity }
        setListItems(itemsCopy)
    }
  
    const handleAddToCart = ({ row: { original: { idx, invMastUid } } }) => () => {
        const quantity = listItems[idx]?.quantity ? parseInt(listItems[idx].quantity) : 1
        setShowModal(true)
        context.addItem({ quantity, invMastUid })
    }
  
    const handleCopyToCart = () => {
        context.addItems(selectedList.shoppingListItems.map(({ invMastUid, customerPartNumberId, quantity }) => ({ invMastUid, customerPartNumberId, quantity })))
        setShowModal(true)
    }
  
    const handleRemoveFromList = (props) => () => {
        const { row: { original: { idx } } } = props
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
            webUserIdOwner: selectedList.webUserIdOwner,
            name: listName,
            notes: listNotes,
            shoppingListItems: listItems,
            editors: selectedList.editors
        })
            .then(({ data }) => {
                setSelectedSharedList(null)
                setSelectedSavedList(data.shoppingListEdit)
            })
    }
  
    const handleCancelChanges = () => {
        setSelectedSavedList({ ...selectedList })
    }
  
    const handleListNameChange = ({ target: { value } }) => setListName(value)
  
    const handleListNotesChange = ({ target: { value } }) => setListNotes(value)
  
    const saveCallback = newList => {
        setSelectedSharedList(null)
        setSelectedSavedList(getRidOf__typename(newList))
    }
  
    const renderItemPrice = ({ row: { original, values } }) => {
        const byUid = ({ invMastUid }) => invMastUid === original.invMastUid
        const currentPrice = values.currentPrice
            ? values.currentPrice
            : context.itemPrices.find(byUid)?.unitPrice
        return currentPrice ? (
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
            : foundMatch?.leadTimeDays && `Estimated Lead Time: ${foundMatch.leadTimeDays} bus. days`
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
                    const qty = listItems?.[props.row.original.idx]?.quantity
                    const priceInfo = context.itemPrices.find(priceInfo => priceInfo.invMastUid === props.row.values.invMastUid)
                    return priceInfo ? (
                        <Grid container justify="center">
                            <span>Qty:</span>
                            <QuantityInput
                                quantity={qty || 1}
                                unitSize={priceInfo.unitSize}
                                unitOfMeasure={priceInfo.unitOfMeasure}
                                roundType={priceInfo.roundType}
                                handleUpdate={handleQuantityChange(props)}
                                min='0'
                            />
                            {(priceInfo.unitSize > 1) && (
                                <AirlineChip style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                                    X {priceInfo.unitSize}
                                </AirlineChip>
                            )}
                        </Grid>
                    ) : <div/>
                }
            },
            {
                accessor: 'addToCartAmt',
                Cell: props => {
                    const priceInfo = context.itemPrices.find(priceInfo => priceInfo.invMastUid === props.row.values.invMastUid)
                    return (
                        <div>
                            {priceInfo && (
                                <DivRow>
                                    <TableButton onClick={handleAddToCart(props)}>Add to Cart</TableButton>
                                </DivRow>
                            )}
                            {selectedSavedList && (
                                <div style={{ marginTop: 3 }}>
                                    <TableButton onClick={handleRemoveFromList(props)}>Remove From List</TableButton>
                                </div>
                            )}
                        </div>
                    )
                }
            }
        ],
        [selectedList, listItems, context.itemAvailabilities, context.itemPrices],
    )
  
    useEffect(() => {
        const dataToFetchPricesFor = filteredData
            .filter(d => !context.itemPrices.find(({ invMastUid }) => invMastUid === d.invMastUid))
        if (dataToFetchPricesFor.length) context.getItemPrices(dataToFetchPricesFor)
  
        const dataToFetchAvailabilitiesFor = filteredData
            .filter(d => !context.itemAvailabilities.find(({ invMastUid }) => invMastUid === d.invMastUid))
        if (dataToFetchAvailabilitiesFor.length) context.getItemAvailabilities(dataToFetchAvailabilitiesFor)
    }, [filteredData])
  
    const Owner = () => {
        const owner = selectedSharedList && context.webUserContacts.find(user => user.webUserId === selectedSharedList.webUserIdOwner)
        return selectedSharedList && <p>Owned By: {owner?.firstName} {owner?.lastName}</p>
    }
  
    const SaveChanges = () => {
        const { notes, name, shoppingListItems } = selectedList || {}
        const isItemsListChanged = () => {
            if (shoppingListItems && listItems) {
                if (shoppingListItems.length !== listItems.length) return true
                for (let i = 0; i < shoppingListItems.length; i++) {
                    if (shoppingListItems[i].itemCode !== listItems[i].itemCode || shoppingListItems[i].quantity !== listItems[i].quantity) {
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
                    style={{ marginBottom: 5 }}
                    onClick={handleSaveChanges}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </SaveChangesButton>
        
                <CancelChangesButton
                    style={{ marginBottom: 5, marginLeft: 10 }}
                    onClick={handleCancelChanges}
                >
                    Cancel Changes
                </CancelChangesButton>
            </DivRow>
        )
    }
  
  
    const exportIgnoreColumns = ['filter', 'addToCartAmt', 'imageUrl']
  
    const prepareDataForExport = ({ currentPrice, quantityAvailable, ...rest }) => {
        const byUid = ({ invMastUid }) => invMastUid === rest.invMastUid
        return {
            ...rest,
            currentPrice: currentPrice || context.itemPrices.find(byUid)?.unitPrice,
            quantityAvailable: quantityAvailable || context.itemAvailabilities.find(byUid)?.availability
        }
    }
  
    const handleExcelExport = () => {
        if (selectedList) {
            exportToExcel(selectedList.shoppingListItems.map(prepareDataForExport), columns, selectedList.name, exportIgnoreColumns)
        }
    }
  
    const handlePdfExport = () => {
        if (selectedList) {
            exportToPdf(selectedList.shoppingListItems.map(prepareDataForExport), columns, selectedList.name, exportIgnoreColumns)
        }
    }
  
    return (
        <div>
            <h4>Shopping Lists</h4>
      
            <DivRow style={{ position: 'relative', zIndex: 3 }}>
                { !context.userInfo.webUserId && (
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
                        options={shoppingListOptions.filter(list => list.webUserIdOwner === (context.userInfo.webUserId || selectedUser?.value))}
                        placeholder='Search lists by Name, Item'
                        width={275}
                    />
                </div>
        
                <div>
                    <p>Shared Shopping Lists</p>
                    <Select
                        value={selectedSharedList && shoppingListOptions.find(list => list.value === selectedSharedList.id)}
                        setValue={handleSharedListChange}
                        options={shoppingListOptions.filter(list => list.editors.find(e => e.webUserId === (context.userInfo.webUserId || selectedUser?.value)))}
                        placeholder='Search lists by Name, Item'
                        width={275}
                    />
                </div>
            </DivRow>
      
            <Owner/>
      
            {selectedList && (
                <div>
                    <AirlineInput disabled={selectedSharedList} value={listName} onChange={handleListNameChange}/>
                    <textarea readOnly={selectedSharedList} value={listNotes} onChange={handleListNotesChange} rows={3} style={{ width: 500, marginTop: 10 }}/>
                </div>
            )}
      
            <SaveChanges/>
      
            { !selectedList && <TableButton onClick={() => setShowSaveModal(true)}>Add New List</TableButton> }
      
            <DivRow>
                {!!selectedList && (
                    <DivRow>
                        <TableButton onClick={handleCopyToCart}>Copy to Cart</TableButton>
                        <TableButton onClick={() => setShowSaveModal(true)}>Save as new</TableButton>
                    </DivRow>
                )}
                {selectedSavedList && (
                    <DivRow>
                        <TableButton onClick={handleShareList}>Share</TableButton>
                        <TableButton onClick={handleDeleteClick}>{confirmDelete ? 'Confirm Delete?' : 'Delete this List'}</TableButton>
                    </DivRow>
                )}
            </DivRow>
      
            <DivRow style={{ marginTop: 20 }}>
                <AirlineInput placeholder='Filter by AHC #, Item ID, Description' value={filter} onChange={(e) => {setFilter(e.target.value)}}/>
                <ButtonExport onClick={handlePdfExport}>
                    <FontAwesomeIcon size='lg' icon="file-pdf" color="#ff0000"/>
                </ButtonExport>
                <ButtonExport onClick={handleExcelExport}>
                    <FontAwesomeIcon size='lg' icon="file-excel" color="#1d6f42"/>
                </ButtonExport>
                <CSVLink data={getCsvFormattedData(filteredData.map(prepareDataForExport), columns, exportIgnoreColumns)}>
                    <ButtonExport>
                        <FontAwesomeIcon size='lg' icon="file-csv" color="grey"/>
                    </ButtonExport>
                </CSVLink>
            </DivRow>
            
            <Table columns={columns} data={filteredData} loading={context.getShoppingListsState?.loading} stickyHeader />
      
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
                items={selectedList?.shoppingListItems || []}
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