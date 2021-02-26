import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
import { useQuery, useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'
import AirlineInput from '../../../pageComponents/_common/form/inputv2'
import AirlineSelect from '../../../pageComponents/_common/form/selectv2'
import ItemCreationModal from './uiComponents/itemCreationModal'
import { getImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'

const QUERY_ITEM_CREATION_DATA = gql`
	query GetItemCreationData{
		suppliers{
			id
			name
			prefix: supplierPrefix
		}
		unitsOfMeasure{
			value: unitId
			label: unitDescription
		}
		productGroups{
			value: productGroupId
			label: productGroupDesc
		}
	}
`

const QUERY_ITEM_SEARCH = gql`
	query ItemSearch($searchParams: SearchRequestInput!){
		itemSearch(searchParams: $searchParams){
			result
			searchTotalCount
		}
	}
`

const ContentScreenContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	max-width: 1600px;
	margin: 28px auto;
	flex-grow: 99;
	align-items: center;
`

const DivSpacer = styled.div`
	margin: 5px 0px;
	display: flex;
	flex-direction: column;
`

const DivSearchItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
	padding: 5px;
	width: 225px;
	height: auto;
	text-align: center;
	justify-content: center;
	align-items: center;
	background-color: white;
	border: 1px solid grey;
	border-radius: 2px;
`

const SearchResultsContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 5px;
	align-self: center;
	margin: 28px auto;
	height: auto;
	justify-content: center;
`
const DivSearchInputWrapper = styled.div`
	max-width: 500px;
`

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 12px auto;
	button {
		margin: 0 16px;
	}
`

export default function ItemCreationPage() {
    const [searchTerm, setSearchTerm] = useState('') //Search term initial value
    const [selectedSupplier, setSelectedSupplier] = useState(null)
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [supplierList, setSupplierList] = useState([]) //Array to populate Supplier List
    const [unitsOfMeasureList, setUnitsOfMeasure] = useState([])
    const [productGroupsList, setProductGroups] = useState([])
    const [itemSearchResult, setItemSearchResult] = useState([]) //array to hold searched items
    const [showNewItemForm, setShowNewItemForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isSearching, setIsSearching] = useState(false)
    const [searched, setSearched] = useState(false)
    const [submitResponse, setSubmitResponse] = useState(null)
  
    useEffect(() => {
        if (searchTerm !== '' && (selectedSupplier !== '' && selectedSupplier !== null)) {
            setSearchEnabled(true)
        } else {
            if (searchEnabled) {
                setSearchEnabled(false)
            }
        }
    }, [searchTerm, selectedSupplier])
  
    const maxPage = 3
    useQuery(QUERY_ITEM_CREATION_DATA, {
        onCompleted: data => {
            setSupplierList(data.suppliers)
            setUnitsOfMeasure(unit(data.unitsOfMeasure))
            setProductGroups(data.productGroups)
        }
    })
    function unit(units) {
        const newUnits = []
        for (let i = 0; i < units.length; i++) {
            if (units[i].value !== 'EACH') {
                newUnits.push(units[i])
            }
        }
        return newUnits
    }
    const [performItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setCurrentPage(currentPage + 1)
            setIsSearching(false)
            setSearched(true)
            setItemSearchResult([...itemSearchResult, ...data.itemSearch.result])
        }
    })
  
  
    function searchItems() {
        setIsSearching(true)
        const index = supplierList.findIndex(elem => elem.id === selectedSupplier)
        const SearchTerm = _.isNil(supplierList[index].prefix) ? searchTerm : supplierList[index].prefix + ' ' + searchTerm
        performItemSearch({
            variables: {
                searchParams: {
                    searchTerm: SearchTerm,
                    resultSize: 10,
                    sortType: 'relevancy',
                }
            }
        })
    }
  
    function loadMoreItems() {
        searchItems()
    }
  
    function handleChange(newSelection) {
        setSelectedSupplier(newSelection)
    }
  
    function resetItem() {
        setSearchTerm('')
        setSelectedSupplier(null)
        setItemSearchResult([])
        setCurrentPage(1)
        setShowNewItemForm(false)
        setSearched(false)
    }
  
    function mutateItemId(itemId) {
        const mutatedItemId = itemId.replace(/\s/g, '-')
        return (mutatedItemId)
    }
  
    function showModal(response) {
        setSubmitResponse(response)
        if (response.success) {
            resetItem()
        }
    }
  
  
    const searchResultItems = []
    itemSearchResult.map((element, index) => {
        const resultImage = getImagePath(element.thumbnail_image_path)
    
        const mutatedItemId = mutateItemId(element.itemCode)
        searchResultItems.push(
            <DivSearchItemContainer key={index}>
                <img src={resultImage} width="auto" height="125" margin="28px 14px" alt={element.itemCode} ></img>
                <h6>{element.itemCode}</h6>
                <p>{element.itemDescription}</p>
                <a href={`/product/${mutatedItemId}/${element.invMastUid}`} target="_blank" rel="noopener noreferrer">View Details</a>
            </DivSearchItemContainer>
        )
    })
  
    return (
        <>
            {!_.isNil(submitResponse) && <ItemCreationModal submitResponse={submitResponse} handleCloseModal={() => setSubmitResponse(null)} />}
            <ContentScreenContainer>
                <DivSearchInputWrapper>
                    <DivSpacer>
                        <AirlineInput
                            label="Manufacturer ID:"
                            type="text"
                            placeholder="Enter Manufacturer ID"
                            name="itemIDSearch"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </DivSpacer>
                    <DivSpacer>
                        <AirlineSelect
                            label="Supplier Name:"
                            name="supplierNameSearch"
                            placeholder='Select a Supplier'
                            value={selectedSupplier}
                            options={[{ id: null, name: null, prefix: null }, ...supplierList]}
                            changeFunction={handleChange}
                            getOptionLabel={(option) => {
                                if (option.name === null) {
                                    return ('Select a Supplier')
                                } else {
                                    return (option.id + ' - ' + option.name)
                                }
                            }}
                            getOptionValue={(option) => option.name}
                            isClearable={true}
                            isLoading={supplierList.length === 0}
                        />
                    </DivSpacer>
                </DivSearchInputWrapper>
                <ButtonContainer>
                    <Button variant="contained" color="secondary" disabled={isSearching} onClick={() => resetItem()}>
                        Clear Item
                    </Button>
                    <Button variant="contained" color="primary" disabled={!searchEnabled || isSearching} onClick={() => { searchItems() }}>
                        {isSearching ? 'Searching Items..' : 'Search for Item'}
                    </Button>
                </ButtonContainer>
                {searched && (
                    <div>
                        <SearchResultsContainer>
                            {searchResultItems}
                            {searchResultItems.length === 0 && <p>No Items Found</p>}
                        </SearchResultsContainer>
                        <ButtonContainer>
                            <Button variant="contained" color="secondary" disabled={isSearching} onClick={() => resetItem()}>
                                Clear Item
                            </Button>
                            <Button variant="contained" color="primary" disabled={currentPage > maxPage || isSearching} onClick={() => loadMoreItems()}>
                                {currentPage <= maxPage ? 'View more Items' : 'Contact Item Master'}
                            </Button>
                            <Button variant="contained" color="primary" disabled={showNewItemForm} onClick={() => setShowNewItemForm(true)}>
                                Create a New Item
                            </Button>
                        </ButtonContainer>
                    </div>
                )}
                {showNewItemForm && (
                    <NewItemForm
                        searchTerm={searchTerm}
                        selectedSupplier={selectedSupplier}
                        supplierList={supplierList}
                        unitsOfMeasureList={unitsOfMeasureList}
                        productGroupsList={productGroupsList}
                        clearForm={() => resetItem()}
                        showModal={response => showModal(response)}
                    />
                )}
            </ContentScreenContainer>
        </>
    )
}