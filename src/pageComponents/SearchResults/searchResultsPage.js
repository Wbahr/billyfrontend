import React, { useState, useEffect, useMemo } from 'react'
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
import {QUERY_ITEM_SEARCH} from '../../config/providerGQL'
import  SkeletonItem from './uiComponents/skeletonItem'

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

export default function SearchResultsPage(props) {
	const parsedQueryString = queryString.parse(location.search)
	const [searchTerm, setSearchTerm] = useState(parsedQueryString.searchTerm)
	const [sortType, setSortType] = useState(parsedQueryString.sortType)
	const [searchResults, setSearchResults] = useState([])
	const [totalResults, setTotalResults] = useState('--')
	const [attributeCategories, setAttributeCategories] = useState([])
	const [brands, setBrands] = useState([])
	const [parentCategories, setParentCategories] = useState([])
	const [childCategories, setChildCategories] = useState([])
	const [isSearching, setSearching] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [checkedAttributeFilters, setCheckedAttributeFilters] = useState([])
	const [checkedBrandFilters, setCheckedBrandFilters] = useState([])
	const [isReplacingResults, setIsReplacingResults] = useState(false)
	const [infiniteScrollHasMore, setInfiniteScrollHasMore] = useState(false)
	const [showDetailsModal, setShowDetailsModal] = useState(false)
	const [showShowAddedToCartModal, setShowAddedToCartModal] = useState(false)
	const [locationsModalItem, setLocationsModalItem] = useState(null)
	const [detailsModalItem, setDetailsModalItem] = useState(null)
	const [detailsModalItemCode, setDetailsModalItemCode] = useState(null)
	const [showLocationsModal, setShowLocationsModal] = useState(false)
	const [parentCategory, setParentCategory] = useState('')
	const [childCategory, setChildCategory] = useState('')
	const [ottoFindPart, setOttoFindPart] = useState(false)
	
	useEffect(() => {
		if (currentPage > 0 && !isSearching) loadItems()
	}, [currentPage])
	
	useEffect(() => {
		// setCheckedAttributeFilters([]) //TODO: Should we really reset filters when a keyword gets added?
		setOttoFindPart(false)
		setCurrentPage(0)
		setIsReplacingResults(true)
		loadItems()
	}, [searchTerm, sortType, checkedAttributeFilters, checkedBrandFilters, parentCategory, childCategory])
	
	function loadItems() {
		const resultSize = !searchResults.length ? parseInt(parsedQueryString.resultSize) : 24
		setSearching(true)
		performItemSearch({
			variables: {
				searchParams: {
					searchTerm: parsedQueryString.searchTerm,
					searchType: parsedQueryString.nonweb === 'true' ? 'nonweb' :'web',
					resultSize: resultSize,
					resultPage: currentPage+1,
					sortType: parsedQueryString.sortType,
					brandFilters: checkedBrandFilters,
					categoryFilter: { parentCategory, childCategory },
					attributeFilters: checkedAttributeFilters
				}
			}
		})
	}
	
	const [performItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
		fetchPolicy: 'no-cache',
		onCompleted: ({itemSearch}) => {
			//If the number of retrieved results equals the requesting page size, then enable the scroller to possibly load more.
			const search = queryString.parse(location.search)
			if (itemSearch.result.length === parseInt(search.resultSize)) setInfiniteScrollHasMore(true)
			if (!attributeCategories.length) setAttributeCategories(itemSearch.attributeCategories)
			setBrands(itemSearch.brands || [])
			setParentCategories(itemSearch.parentCategories)
			setChildCategories(itemSearch.childCategories)
			parseQueryResults(itemSearch)
			setIsReplacingResults(false)
			setSearching(false)
		}
	})
	
	function parseQueryResults(itemSearchData) {
		if (isReplacingResults) {
			setSearchResults(itemSearchData.result)
			setOttoFindPart(false)
		} else {
			if (searchResults.length >= 48) setOttoFindPart(true)
			setSearchResults([...searchResults, ...itemSearchData.result])
		}
		setTotalResults(itemSearchData.count)
	}

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
	
	useEffect(() => {
		setSearchTerm(parsedQueryString.searchTerm)
	}, [parsedQueryString.searchTerm])
	
	const addSearchTerm = newSearchTerm => {
		setSearchTerm(`${searchTerm} ${newSearchTerm}`)
	}
	
	function handleUpdatedCategoryToggle(categoryType, selectedCategory) {
		if (categoryType === 'parent') {
			setParentCategory(selectedCategory)
		} else {
			setChildCategory(selectedCategory)
		}
	}

	function handleShowLocationsModal(freqno) {
		setShowLocationsModal(true)
		setLocationsModalItem(freqno)
	}

	function handleHideLocationsModal() {
		setShowLocationsModal(false)
		setLocationsModalItem(null)
	}

	function handleShowDetailsModal(freqno, itemCode) {
		setDetailsModalItem(freqno)
		setDetailsModalItemCode(itemCode)
		setShowDetailsModal(true)
	}

	function handleHideDetailsModal() {
		setShowDetailsModal(false)
		setDetailsModalItem(null)
		setDetailsModalItemCode(null)
	}

	function handleAddedToCart() {
		setShowAddedToCartModal(true)
	}

	function handleAddedToCartModal() {
		setShowAddedToCartModal(false)
	}

	function removeParentChildren() {
		setParentCategory('')
		setChildCategory('')
	}
	
	const loadMore = () => {
		setInfiniteScrollHasMore(false)
		setCurrentPage(currentPage + 1)
	}
	
	const itemSearchResults = useMemo(() => searchResults.map(result => (
		<ItemResult
			key={result.frecno}
			searchTerm={searchTerm}
			result={result}
			history={props.history}
			toggleDetailsModal={handleShowDetailsModal}
			toggleLocationsModal={handleShowLocationsModal}
			addedToCart={handleAddedToCart}
		/>
	)), [searchResults])

	const attributeFilters = useMemo(() => attributeCategories.map((attribute, index) => (
		<AttributeFilter
			key={index}
			categoryAttribute={attribute}
			checkedAttributeFilters={checkedAttributeFilters}
			setCheckedAttributeFilters={setCheckedAttributeFilters}
		/>
	)), [attributeCategories, checkedAttributeFilters])

	return (
		<DivContainer>
			<div>
				<CategoryFilter 
					isUpdating={isSearching}
					parentCategories={parentCategories}
					childCategories={childCategories}
					updatedCategoriesFilter={handleUpdatedCategoryToggle}
					selectedParent={parentCategory}
					selectedChild={childCategory}
					removeParent={removeParentChildren}
					removeChild={() => setChildCategory('')}
				/>
				{ !!brands.length &&
					<BrandFilter
						brands={brands}
						updatedBrandFilter={setCheckedBrandFilters}
					/>
				}
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
				open={showLocationsModal}
				hideLocationsModal={handleHideLocationsModal}
				invMastUid={locationsModalItem}
			/>
			
			<DetailsModal
				open={showDetailsModal}
				hideDetailsModal={handleHideDetailsModal}
				invMastUid={detailsModalItem}
				itemCode={detailsModalItemCode}
				history={props.history}
			/>
		</DivContainer>
	)
}