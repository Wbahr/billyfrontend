import React, { useState, useEffect, useMemo, useContext } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import ItemResult from './uiComponents/itemResult'
import ResultsSearch from './uiComponents/resultsSearch'
import ResultsSummary from './uiComponents/resultsSummary'
import AttributeFilter from './uiComponents/attributeFilter'
import BrandFilter from './uiComponents/brandFilter'
import CategoryFilter from './uiComponents/categoryFilter'
import LocationsModal from './uiComponents/locationsModal'
import DetailsModal from './uiComponents/detailsModal'
import AddedModal from './uiComponents/addedModal'
import InfiniteScroll from 'react-infinite-scroller'
import { useLazyQuery } from '@apollo/client'
import {QUERY_ITEM_SEARCH, GET_ITEMS_BY_ID} from '../../config/providerGQL'
import  SkeletonItem from './uiComponents/skeletonItem'
import Context from '../../config/context'

const DivContainer = styled.div`
	display: flex;
`

const ResultsContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-left: 8px;
`

const DivResultSummary = styled.div`
	display: flex;
	flex-direction: column;
`

const DivSearchResultsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const cleanSearchState = ({searchState: {brands, attributes, parentCategories, childCategories}}) => {
	const removeTypeName = ({__typename, ...rest}) => rest
	return {
		brands: brands.map(removeTypeName),
		attributes: attributes.map(({__typename, features, ...rest}) => ({ ...rest, features: features.map(removeTypeName) })),
		parentCategories: parentCategories.map(removeTypeName),
		childCategories: childCategories && childCategories.map(removeTypeName)
	}
}

export default function SearchResultsPage(props) {
	const initialSearchState = { brands: [], attributes: [], parentCategories: [], childCategories: [], isSynced: false }
	const [searchState, setSearchState] = useState(initialSearchState)
	const { brands, attributes, parentCategories, childCategories, isSynced } = searchState
	const setBrands = brands => setSearchState({ ...searchState, brands, isSynced: false })
	const setAttributes = attributes => setSearchState({ ...searchState, attributes, isSynced: false })
	const setParentCategories = parentCategories => setSearchState({ ...searchState, childCategories: null, parentCategories, isSynced: false })
	const setChildCategories = childCategories => setSearchState({ ...searchState, childCategories, isSynced: false })
	
	const parsedQueryString = queryString.parse(location.search)
	const [searchTerm, setSearchTerm] = useState(parsedQueryString.searchTerm)
	const [sortType, setSortType] = useState(parsedQueryString.sortType)
	const [searchResults, setSearchResults] = useState([])
	const [totalResults, setTotalResults] = useState('--')
	const [isSearching, setSearching] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [isReplacingResults, setIsReplacingResults] = useState(false)
	const [infiniteScrollHasMore, setInfiniteScrollHasMore] = useState(false)
	const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)
	const [locationsModalItem, setLocationsModalItem] = useState(null)
	const [detailsModalItem, setDetailsModalItem] = useState(null)
	const [ottoFindPart, setOttoFindPart] = useState(false)
	const [itemDetails, setItemDetails] = useState([])
	
	const {getItemAvailabilities, getItemPrices} = useContext(Context)
	
	useEffect(() => {
		if (currentPage > 0 && !isSearching) loadItems()
	}, [currentPage])
	
	useEffect(() => {
		if (!isSynced) {
			setOttoFindPart(false)
			setCurrentPage(0)
			setIsReplacingResults(true)
			loadItems()
		}
	}, [searchTerm, sortType, isSynced])
	
	function loadItems() {
		const resultSize = !searchResults.length ? parseInt(parsedQueryString.resultSize) : 24
		setSearching(true)
		performItemSearch({
			variables: {
				search: {
					searchTerm: parsedQueryString.searchTerm,
					searchType: parsedQueryString.nonweb === 'true' ? 'nonweb' :'web',
					sortType: parsedQueryString.sortType,
					resultPage: currentPage+1,
					resultSize,
					searchState: {
						brands,
						parentCategories,
						childCategories,
						attributes,
					}
				}
			}
		})
	}
	
	const [performItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
		fetchPolicy: 'no-cache',
		onCompleted: ({itemSearch}) => {
			const search = queryString.parse(location.search)
			if (itemSearch.result.length === parseInt(search.resultSize)) setInfiniteScrollHasMore(true)
			const searchState = cleanSearchState(itemSearch)
			setSearchState({ ...searchState, isSynced: true })
			parseQueryResults(itemSearch)
			setIsReplacingResults(false)
			setSearching(false)
		}
	})
	
	function parseQueryResults(itemSearchData) {
		const invMastUids = itemSearchData.result.map(i => i.frecno)
		getItemAvailabilities(itemSearchData.result)
		getItemPrices(itemSearchData.result)
		getItemDetails({ variables: { invMastUids } })
		
		if (isReplacingResults) {
			setSearchResults(itemSearchData.result)
			setOttoFindPart(false)
		} else {
			if (searchResults.length >= 48) setOttoFindPart(true)
			setSearchResults([...searchResults, ...itemSearchData.result])
		}
		setTotalResults(itemSearchData.searchTotalCount)
	}
	
	const [getItemDetails] = useLazyQuery(GET_ITEMS_BY_ID, {
		fetchPolicy: 'no-cache',
		onCompleted: ({itemDetailsBatch, customerPartNumbersBatch}) => {
			const mergedDetails = itemDetailsBatch.map(details => ({
				...details,
				customerPartNumbers: customerPartNumbersBatch
					.filter(({invMastUid}) => details.invMastUid === invMastUid)
					.map(part => ({partNumber: part.customerPartNumber, partId: part.id}))
			}))
			setItemDetails([...itemDetails, ...mergedDetails])
		}
	})

	useEffect(() => {
		if (ottoFindPart) {
			drift.api?.startInteraction({ interactionId: 126679 })
		} else {
			drift.api?.hideChat()
		}
	}, [ottoFindPart])
	
	const setHistoryLocationSearch = (field, fieldName) => {
		const search = queryString.stringify({ ...queryString.parse(location.search), [fieldName || field]: field })
		props.history.push({ pathname: '/search', search })
	}
	
	useEffect(() => {
		setHistoryLocationSearch(searchTerm, 'searchTerm')
	}, [searchTerm])
	
	useEffect(() => {
		setHistoryLocationSearch(sortType, 'sortType')
	}, [sortType])
	
	const handleShowLocationsModal = (invMastUid) => setLocationsModalItem(invMastUid)

	const handleHideLocationsModal = () => setLocationsModalItem(null)

	const handleShowDetailsModal = (invMastUid, itemCode) => setDetailsModalItem({invMastUid, itemCode})

	const handleHideDetailsModal = () => setDetailsModalItem(null)
	
	const loadMore = () => {
		setInfiniteScrollHasMore(false)
		setCurrentPage(currentPage + 1)
	}
	
	const addSearchTerm = newSearchTerm => setSearchTerm(`${searchTerm} ${newSearchTerm}`)
	
	const handleAddedToCart = () => setShowAddedToCartModal(true)
	
	const handleAddedToCartModal = () => setShowAddedToCartModal(false)
	
	const itemSearchResults = useMemo(() => searchResults.map(result => (
		<ItemResult
			key={result.frecno}
			searchTerm={searchTerm}
			result={result}
			details={itemDetails.find(detail => detail.invMastUid === result.frecno) || {}}
			history={props.history}
			toggleDetailsModal={handleShowDetailsModal}
			toggleLocationsModal={handleShowLocationsModal}
			addedToCart={handleAddedToCart}
		/>
	)), [searchResults, itemDetails])
	
	const handleUpdateAttributes = index => newAttr => {
		const newAttributes = attributes.slice()
		newAttributes[index] = newAttr
		setAttributes(newAttributes)
	}

	const attributeFilters = useMemo(() => attributes.map((attribute, index) => (
		<AttributeFilter
			key={index}
			attribute={attribute}
			updateAttribute={handleUpdateAttributes(index)}
		/>
	)), [attributes])
	
	return (
		<DivContainer>
			<div>
				<CategoryFilter {...{isSearching, parentCategories, childCategories, setParentCategories, setChildCategories}} />
				{!!brands.length && <BrandFilter brands={brands} setBrands={setBrands}/>}
				{attributeFilters}
			</div>
			
			<ResultsContainer>
				<DivResultSummary>
					<ResultsSummary 
						searchTerm={searchTerm}
						totalResults={totalResults}
						isSearching={isSearching}
					/>
					<ResultsSearch
						sortType={sortType}
						setSortType={setSortType}
						addSearchTerm={addSearchTerm}
					/>
				</DivResultSummary>
				
				<InfiniteScroll
					pageStart={0}
					loadMore={loadMore}
					hasMore={infiniteScrollHasMore}
					threshold={3000}
				>
					<DivSearchResultsContainer>
						{!isReplacingResults && itemSearchResults}
						{(searchResults.length < totalResults || totalResults === '--') &&
							<>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
								<SkeletonItem/>
							</>
						}
					</DivSearchResultsContainer>
				</InfiniteScroll>
			</ResultsContainer>
			
			<AddedModal
				open={showShowAddedToCartModal}
				text="Added to Cart!"
				onClose={handleAddedToCartModal}
				timeout={900}
			/>
			
			<LocationsModal
				open={!!locationsModalItem}
				hideLocationsModal={handleHideLocationsModal}
				invMastUid={locationsModalItem}
			/>
			
			<DetailsModal
				open={!!detailsModalItem}
				hideDetailsModal={handleHideDetailsModal}
				detailsModalItem={detailsModalItem}
				history={props.history}
			/>
		</DivContainer>
	)
}