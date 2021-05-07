import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import NewItemForm from './uiComponents/newItemForm'
import { useQuery, useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Button, CircularProgress, Grid } from '@material-ui/core'
import ItemCreationModal from './uiComponents/itemCreationModal'
import { getImagePath } from 'pageComponents/_common/helpers/generalHelperFunctions'
import { InputType } from 'pageComponents/_common/form/FormField'

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
    align-items: center;
	margin: 28px 0;
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
	margin: 16px auto;
	height: auto;
	justify-content: center;
`

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 16px 0;
    flex-wrap: wrap;
	button {
		margin: 0 5px;
	}
`

export default function ItemCreationPage({ history }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSupplier, setSelectedSupplier] = useState(0)
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [supplierList, setSupplierList] = useState([])
    const [unitsOfMeasureList, setUnitsOfMeasure] = useState([])
    const [productGroupsList, setProductGroups] = useState([])
    const [itemSearchResult, setItemSearchResult] = useState([])
    const [showNewItemForm, setShowNewItemForm] = useState(false)
    const [searched, setSearched] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [submitResponse, setSubmitResponse] = useState(null)
    
    useEffect(() => {
        if (searchTerm && selectedSupplier) {
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
            setSupplierList(data.suppliers.map(({ __typename, ...o }) => ({ ...o, value: o.id, label: o.name })))
            setUnitsOfMeasure(data.unitsOfMeasure.map(({ __typename, ...rest }) => rest))
            setProductGroups(data.productGroups.map(({ __typename, ...rest }) => rest))
        }
    })

    const [performItemSearch, { loading }] = useLazyQuery(QUERY_ITEM_SEARCH, {
        fetchPolicy: 'no-cache',
        onCompleted: data => {
            setSearched(true)
            setCurrentPage(currentPage + 1)
            setItemSearchResult([...itemSearchResult, ...data.itemSearch.result])
        }
    })
  
    function searchItems() {
        performItemSearch({
            variables: {
                searchParams: {
                    searchTerm: `${selectedSupplier.prefix || ''} ${searchTerm}`.trim(),
                    resultSize: 10,
                    sortType: 'relevancy',
                }
            }
        })
    }
  
    const handleChange = (e, value) => setSelectedSupplier(value)
  
    function resetItem() {
        setSearched(false)
        setSearchTerm('')
        setSelectedSupplier(null)
        setItemSearchResult([])
        setCurrentPage(1)
        setShowNewItemForm(false)
    }
  
    const mutateItemId = (itemId) => itemId.replace(/\s/g, '-')
  
    function showModal(response) {
        setSubmitResponse(response)
        if (response.success) {
            resetItem()
        }
    }
  
    const searchResultItems = itemSearchResult.map((element, index) => {
        const resultImage = getImagePath(element.thumbnail_image_path)
        const mutatedItemId = mutateItemId(element.itemCode)
        const href = `/product/${mutatedItemId}/${element.invMastUid}`
        return (
            <DivSearchItemContainer key={index}>
                <img src={resultImage} width="auto" height="125" alt={element.itemCode}/>
                <h6>{element.itemCode}</h6>
                <p>{element.itemDescription}</p>
                <a href={href} target="_blank" rel="noopener noreferrer">
                    View Details
                </a>
            </DivSearchItemContainer>
        )
    })
    
    const handlePartNoChange = e => {
        console.log('change', e.target.value.replace(/[^A-Za-z0-9 \-,./+=:()#]/, ''))
        setSearchTerm(e.target.value.replace(/[^A-Za-z0-9 \-,./+=:()#]/, ''))
    }
  
    return (
        <>
            {!!submitResponse && (
                <ItemCreationModal
                    submitResponse={submitResponse}
                    handleCloseModal={() => setSubmitResponse(null)}
                    history={history}
                />
            )}
            
            <ContentScreenContainer>
                <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', maxWidth: 500 }}>
                    <div style={{ maxWidth: '500px', flex: 1 }}>
                        <InputType
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={handlePartNoChange}
                            placeholder="Enter Manufacturer ID"
                            label="Manufacturer Part Number"
                        />
                    
                        <Grid container wrap="nowrap">
                            <InputType
                                style={{ margin: '16px 0' }}
                                type="select"
                                label="Supplier"
                                name="supplierNameSearch"
                                placeholder='Select a Supplier'
                                value={selectedSupplier}
                                onSelectChange={handleChange}
                                options={supplierList}
                            />
                            {!supplierList.length && <div style={{ marginTop: 35, marginLeft: 10 }}><CircularProgress size={25}/></div>}
                        </Grid>
                    </div>
                </div>
                
                <ButtonContainer>
                    <Button
                        disabled={loading}
                        onClick={resetItem}
                    >
                        Clear Item
                    </Button>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!searchEnabled || loading}
                        onClick={searchItems}
                    >
                        {loading ? 'Searching Items..' : 'Search for Item'}
                    </Button>
                </ButtonContainer>
                
                {searched && (
                    <>
                        <SearchResultsContainer>
                            {searchResultItems}
                            {searchResultItems.length === 0 && <p>No Items Found</p>}
                        </SearchResultsContainer>
                        
                        <ButtonContainer>
                            <Button
                                disabled={loading}
                                onClick={resetItem}
                            >
                                Clear Item
                            </Button>
                            
                            <Button
                                color="secondary"
                                disabled={(currentPage > maxPage) || loading || !searchResultItems.length}
                                onClick={searchItems}
                            >
                                {currentPage <= maxPage ? 'View more Items' : 'Contact Item Master'}
                            </Button>
                            
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={showNewItemForm}
                                onClick={() => setShowNewItemForm(true)}
                            >
                                Create a New Item
                            </Button>
                        </ButtonContainer>
                    </>
                )}
                
                {showNewItemForm && (
                    <NewItemForm
                        searchTerm={searchTerm}
                        selectedSupplier={selectedSupplier}
                        supplierList={supplierList}
                        unitsOfMeasureList={unitsOfMeasureList}
                        productGroupsList={productGroupsList}
                        clearForm={resetItem}
                        showModal={showModal}
                    />
                )}
            </ContentScreenContainer>
        </>
    )
}