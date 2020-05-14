import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import _ from 'lodash'
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
import gql from 'graphql-tag'
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

const QUERY_ITEM_SEARCH = gql`
	query ItemSearch($searchParams: ElasticSearchItemRequest!){
		itemSearch(searchParams: $searchParams){
			result
			count
			parentCategories {
				parentCategoryCount
				parentCategoryDisplayName
				parentCategoryName
			}
			childCategories {
				childCategoryCount
				childCategoryDisplayName
				childCategoryName
			}
			attributeCategories{
				categoryName
				categoryNameDisplay
				features{
					featureName
					featureNameDisplay
					itemCount
				}
			}
			brands{
				brandCount
				brandName
				brandNameDisplay
			}
		}
	}
`

export default function SearchResultsPage(props) {
	const didMountRef = useRef(false)
	const didSetDefaults = useRef(false)
	const prevHistoryRef = useRef()
	const performSearchRef = useRef(true)
	const search = queryString.parse(location.search)
	const [searchTerm, setSearchTerm] = useState(search.searchTerm)
	const [resultPage, setResultPage] = useState(search.resultPage)
	const [sortType, setSortType] = useState(search.sortType)
	const [searchResults, setSearchResults] = useState([])
	const [totalResults, setTotalResults] = useState('--')
	const [attributeCategories, setAttributeCategories] = useState([])
	const [filteredAttributeCategories, setFilteredAttributeCategories] = useState([])
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
	const [clearInnerSearch, setClearInnerSearch] = useState(false)
	const [newAttributeCategories, setNewAttributeCategories] = useState([])
	const [isSetNewCategories, setIsSetNewCategories] = useState(false)
	const [searchNonce, setSearchNonce] = useState(0)
	const [parentCategory, setParentCategory] = useState('')
	const [childCategory, setChildCategory] = useState('')
	const [ottoFindPart, setOttoFindPart] = useState(false)

	// Set search defaults for categories. This occurs before the first search is executed
	useEffect(() => {
		if (!didSetDefaults.current) {
			didSetDefaults.current = true
			prevHistoryRef.current = props.history.location
			let pathArray = props.history.location.pathname.slice(1).split('/')
			if(pathArray[1] === 'categories'){
				setParentCategory(pathArray[2])
				if(pathArray.length === 4){
					setChildCategory(pathArray[3])
				}
			}
		}
	})

	const [performItemSearch] = useLazyQuery(QUERY_ITEM_SEARCH, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			var itemSearchResult = data.itemSearch
			//If the number of retrieved results equals the requesting page size,
			//then enable the scroller to possibly load more.
			const search = queryString.parse(location.search)
			if(itemSearchResult.result.length == search.resultSize){
				setInfiniteScrollHasMore(true)
			}
			setSearchNonce(search.nonce)
			setNewAttributeCategories(itemSearchResult.attributeCategories)
			setBrands(_.get(itemSearchResult,'brands',[]))
			setParentCategories(itemSearchResult.parentCategories)
			setChildCategories(itemSearchResult.childCategories)
			parseQueryResults(itemSearchResult)
			setIsReplacingResults(false)
			setSearching(false)
		}
	})

	useEffect(() => {
		if (!didMountRef.current) {
			prevHistoryRef.current = props.history.location
			let pathArray = props.history.location.pathname.slice(1).split('/')
			if(pathArray[1] === 'categories'){
				setParentCategory(pathArray[2])
				if(pathArray.length === 4){
					setChildCategory(pathArray[3])
				}
			}

			didMountRef.current = true
		}
		const prevHistory = prevHistoryRef.current
		if(props.history.location.search !== prevHistory.search){
			let searchNew = queryString.parse(props.history.location.search)
			let searchOld = queryString.parse(prevHistory.search)
			setCheckedAttributeFilters([])

			if (searchOld.searchTerm !== searchNew.searchTerm || searchOld.sortType !== searchNew.sortType){
				setSearchResults([])
				setOttoFindPart(false)
				setSearchTerm(searchNew.searchTerm)
				loadFunc(true)
				setIsReplacingResults(true)
			}
			prevHistoryRef.current = props.history.location
			performSearchRef.current = true
		}
	})

	useEffect(() => {
		if(isSetNewCategories){
			setAttributeCategories(newAttributeCategories)
			setIsSetNewCategories(false)
		}
	}, [isSetNewCategories])

	useEffect(() => {
		setIsSetNewCategories(true)
	}, [searchNonce])

	useEffect(() => {
		if(currentPage > 0 && !isSearching){
			loadFunc()
		}
	}, [currentPage])

	// Execute additional search
	useEffect(() => {
		setSearchResults([])
		setOttoFindPart(false)
		setCurrentPage(0)
		setIsReplacingResults(true)
		loadFunc(true)
	}, [checkedAttributeFilters, checkedBrandFilters, parentCategory, childCategory])

	useEffect(()=> {
		if (!_.isNil(drift.api)){
			if (ottoFindPart) {
				drift.api.startInteraction({ interactionId: 126679 })
			} else {
				drift.api.hideChat()
			}
		}
	}, [ottoFindPart])

	function parseQueryResults(itemSearchData) {
		let additionalSearchResults = itemSearchData.result

		if(isReplacingResults){
			setSearchResults([...additionalSearchResults])
			setOttoFindPart(false)
		} else{
			if (searchResults.length >= 48) {
				setOttoFindPart(true)
			}
			setSearchResults([...searchResults, ...additionalSearchResults])
		}
		
		setTotalResults(itemSearchData.count)

	}

	function handleUpdateResults(updateObj){
		const search = queryString.parse(location.search)
		let query
		let update = Object.keys(updateObj)[0]
		switch(update){
		case 'searchTerm':
			setSearchTerm(updateObj.searchTerm)
			setResultPage(1)
			query = `?searchTerm=${updateObj.searchTerm}&resultSize=${search.resultSize}&resultPage=${1}&sortType=${search.sortType}&nonce=${search.nonce}`
			break
		case 'page':
			setResultPage(updateObj.page)
			query = `?searchTerm=${search.searchTerm}&resultSize=${search.resultSize}&resultPage=${updateObj.page}&sortType=${search.sortType}&nonce=${search.nonce}`
			break
		case 'sort':
			setSortType(updateObj.sort)
			query = `?searchTerm=${search.searchTerm}&resultSize=${search.resultSize}&resultPage=${search.resultPage}&sortType=${updateObj.sort}&nonce=${search.nonce}`
			break
		}
		setClearInnerSearch(true)
		props.history.push({
			pathname: '/search',
			search: query
		})
	}

	function handleUpdatedFeatureToggle(updatedState){
		setCheckedAttributeFilters(updatedState)
	}

	function handleUpdatedBrandToggle(selectedBrands){
		setCheckedBrandFilters(selectedBrands)
	}

	function handleUpdatedCategoryToggle(categoryType, selectedCategory){
		if(categoryType === 'parent'){
			setParentCategory(selectedCategory)
		} else {
			setChildCategory(selectedCategory)
		}
	}

	function loadFunc(isNewSearch){
		const search = queryString.parse(location.search)

		var resultSize = searchResults.length === 0 ? parseInt(search.resultSize) : 24
		
		setSearching(true)
		performItemSearch({
			variables: {
				searchParams: {
					searchTerm: search.searchTerm,
					searchType: search.nonweb === 'true' ? 'nonweb' :'web',
					resultSize: resultSize,
					resultPage: isNewSearch ? 1 : currentPage + 1,
					sortType: search.sortType,
					brandFilters: checkedBrandFilters,
					categoryFilter: {
						'parentCategory': parentCategory,
						'childCategory': childCategory
					},
					attributeFilters: checkedAttributeFilters.map(filter => {
						return {
							field: filter.field,
							values: filter.values
						}
					})
				}
			}
		})
	}

	function handleShowLocationsModal(freqno){
		setShowLocationsModal(true)
		setLocationsModalItem(freqno)
	}

	function handleHideLocationsModal(){
		setShowLocationsModal(false)
		setLocationsModalItem(null)
	}

	function handleShowDetailsModal(freqno, itemCode){
		setDetailsModalItem(freqno)
		setDetailsModalItemCode(itemCode)
		setShowDetailsModal(true)
	}

	function handleHideDetailsModal(){
		setShowDetailsModal(false)
		setDetailsModalItem(null)
		setDetailsModalItemCode(null)
	}

	function handleAddedToCart(){
		setShowAddedToCartModal(true)
	}

	function handleAddedToCartModal(){
		setShowAddedToCartModal(false)
	}

	function removeParentChildren(){
		setParentCategory('')
		setChildCategory('')
	}

	let SearchResults = _.map(searchResults, result => {
		return(
			<ItemResult 
				key={result.frecno} 
				result={result} 
				updateResults={handleUpdateResults} 
				history={props.history}
				showDetailsModal={showDetailsModal}
				toggleDetailsModal={(freqno, itemCode)=>{handleShowDetailsModal(freqno, itemCode)}}
				toggleLocationsModal={(freqno)=>{handleShowLocationsModal(freqno)}}
				addedToCart={()=>{handleAddedToCart()}}
			/>
		)
	})

	let AttributeFilters = attributeCategories.map((attribute, index) => {
		return <AttributeFilter 
			key={('' + index + attribute.categoryName)}
			categoryAttribute={attribute}
			attributeFeatureToggleStates={checkedAttributeFilters}
			updatedFeatureToggleEvent={handleUpdatedFeatureToggle}
			filteredAttributeCategories={filteredAttributeCategories}
		/>
	})

	return(
		<DivContainer>
			<AddedModal 
				open={showShowAddedToCartModal} 
				text={'Added to Cart!'} 
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
			<div>
				<CategoryFilter 
					isUpdating={isSearching}
					parentCategories={parentCategories}
					childCategories={childCategories}
					updatedCategoriesFilter={(categorieslevel, value)=>handleUpdatedCategoryToggle(categorieslevel, value)}
					selectedParent={parentCategory}
					selectedChild={childCategory}
					removeParent={()=>removeParentChildren()}
					removeChild={()=>setChildCategory('')}
				/>
				{ brands.length > 0 &&
					<BrandFilter 
						brands={brands}
						updatedBrandFilter={handleUpdatedBrandToggle}
					/>
				}

				{AttributeFilters}
			</div>
			<ResultsContainer>
				<DivResultSummary>
					<ResultsSummary 
						searchTerm={searchTerm}
						totalResults={totalResults}
						isSearching={isSearching}
						currentPage={currentPage}
					/>
					<ResultsSearch
						sortType={sortType}
						updateSearchTerm={(newSearchTerm) => handleUpdateResults({'searchTerm': searchTerm + ' ' + newSearchTerm})}
						updateSortType={(newSortType) => handleUpdateResults({'sort': newSortType})}
						handleClearedInnerSearch={()=> setClearInnerSearch(false)}
						clearInnerSearch={clearInnerSearch}
					/>
				</DivResultSummary>
				<InfiniteScroll
					pageStart={0}
					loadMore={() => {
						setInfiniteScrollHasMore(false)
						setCurrentPage(currentPage + 1)
					}}
					hasMore={infiniteScrollHasMore}
					threshold={3000}
				>
					<DivSearchResultsContainer>          
						{SearchResults}
						{(SearchResults.length < totalResults || totalResults === '--') &&
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
		</DivContainer>
	)
}