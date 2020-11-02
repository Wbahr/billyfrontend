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
import { useLazyQuery } from '@apollo/client'
import {QUERY_ITEM_SEARCH, GET_ITEMS_BY_ID} from '../../config/providerGQL'
import SkeletonItem from './uiComponents/skeletonItem'
import Context from '../../config/context'
import {buildSearchString, useDidUpdateEffect} from "../_common/helpers/generalHelperFunctions";
import {Pagination} from '@material-ui/lab'

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

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
`

const RESULT_SIZE = 24

const cleanSearchState = ({searchState: {brands, attributes, parentCategories, childCategories}}) => {
	const removeTypeName = ({__typename, ...rest}) => rest
	return {
		brands: brands.map(removeTypeName),
		attributes: attributes.map(({__typename, features, ...rest}) => ({ ...rest, features: features.map(removeTypeName) })),
		parentCategories: parentCategories.map(removeTypeName),
		childCategories: childCategories && childCategories.map(removeTypeName)
	}
}

export default function SearchResultsPage({history}) {
	
	const setQueryParam = (fieldName, value) => {
		const search = queryString.stringify({ ...queryString.parse(location.search), [fieldName]: value })
		history.push({ pathname: '/search', search })
	}
	
	const [parsedQueryString, setParsedQueryString] = useState(queryString.parse(location.search))
	
	useEffect(() => {
		setParsedQueryString(queryString.parse(location.search))
	}, [location.search])
	
	const { searchTerm, innerSearchTerms, sortType='relevancy', nonweb='false', resultPage,
		parentCategory, childCategory, brands: selectedBrands, ...selectedAttributes } = parsedQueryString
	
	const setInnerSearchTerms = newInnerSearchTerms => {
		setQueryParam('innerSearchTerms', newInnerSearchTerms.join(',') || void 0)
	}
	
	const setSortType = newSortType => setQueryParam('sortType', newSortType)
	
	const [searchData, setSearchData] = useState({results: [], totalResults: '--', isSearching: false})
	const handleSetSearchData = newSearchData => setSearchData({...searchData, ...newSearchData})
	const {results, totalResults, isSearching} = searchData
	
	const initialParentCategories = parentCategory ? [{parentCategoryName: parentCategory, parentCategoryDisplayName: parentCategory, selected: true}] : []
	const initialChildCategories = childCategory ? [{childCategoryName: childCategory, childCategoryDisplayName: childCategory, selected: true}] : []
	const initialAttributes = Object.keys(selectedAttributes)
		.map(attributeName => ({
			attributeName,
			features: selectedAttributes[attributeName]
				.split(',')
				.map(featureName => ({
					featureName,
					selected: true
				}))
		}))
	const initialBrands = selectedBrands ? selectedBrands.split(',').map(b => ({brandName: b, selected: true})) : []
	const initialSearchState = { brands: initialBrands, attributes: initialAttributes, parentCategories: initialParentCategories,
		childCategories: initialChildCategories, isSynced: false }
	
	const [searchState, setSearchState] = useState(initialSearchState)
	const { brands, attributes, parentCategories, childCategories, isSynced } = searchState
	
	const setBrands = brands => setSearchState({ ...searchState, brands, isSynced: false })
	const setAttributes = attributes => setSearchState({ ...searchState, attributes, isSynced: false })
	const setParentCategories = parentCategories => setSearchState({ ...searchState, childCategories: null, parentCategories, isSynced: false })
	const setChildCategories = childCategories => setSearchState({ ...searchState, childCategories, isSynced: false })
	
	const [showAddedToCartModal, setShowAddedToCartModal] = useState(false)
	const [locationsModalItem, setLocationsModalItem] = useState(null)
	const [detailsModalItem, setDetailsModalItem] = useState(null)
	const [ottoFindPart, setOttoFindPart] = useState(false)
	const [itemDetails, setItemDetails] = useState([])
	const [lastSearchPayload, setLastSearchPayload] = useState({})
	
	const {getItemAvailabilities, getItemPrices} = useContext(Context)
	
	useDidUpdateEffect(() => {
		if (ottoFindPart) {
			drift.api?.startInteraction({ interactionId: 126679 })
		} else {
			drift.api?.hideChat()
		}
	}, [ottoFindPart])
	
	useDidUpdateEffect(() => {
		if (!isSynced) {
			const parentCategory = parentCategories.find(cat => cat.selected)?.parentCategoryName
			const childCategory = childCategories && childCategories.find(cat => cat.selected)?.childCategoryName
			const selectedBrands = brands.filter(b => b.selected).map(b => b.brandName).join(',')
			const selectedAttributes = attributes.reduce((accum, {attributeName, features}) => {
				const selectedFeatures = features.filter(f => f.selected).map(f => f.featureName)
				if (selectedFeatures.length) accum[attributeName] = selectedFeatures.join(',')
				return accum
			}, {})
			
			history.replace(buildSearchString({
				searchTerm,
				innerSearchTerms,
				sortType,
				nonweb,
				resultPage: 1,
				parentCategory,
				childCategory,
				brands: selectedBrands,
				...selectedAttributes
			}))
			if (resultPage === '1') performItemSearch()
		}
	}, [searchState])
	
	useDidUpdateEffect(() => {
		if (resultPage === '1') {
			performItemSearch()
		} else {
			setQueryParam('resultPage', 1)
		}
	}, [searchTerm, innerSearchTerms, sortType])
	
	useEffect(() => {
		performItemSearch()
	}, [resultPage])
	
	const performItemSearch = () => {
		handleSetSearchData({isSearching: true})
		const payload = {
			search: {
				searchTerm,
				innerSearchTerms: innerSearchTerms ? innerSearchTerms.split(',') : [],
				searchType: nonweb === 'true' ? 'nonweb' :'web',
				sortType,
				resultPage,
				resultSize: RESULT_SIZE,
				searchState: {
					brands,
					parentCategories,
					childCategories,
					attributes,
				}
			}
		}
		setLastSearchPayload(payload)
		search({ variables: payload })
	}
	
	const [search, {variables}] = useLazyQuery(QUERY_ITEM_SEARCH, {
		fetchPolicy: 'no-cache',
		onCompleted: ({itemSearch}) => {
			if (variables.search === lastSearchPayload.search) {
				const searchState = cleanSearchState(itemSearch)
				setSearchState({ ...searchState, isSynced: true })
				parseSearchResults(itemSearch)
			}
		},
		onError: () => {
			throw 'Search Failed: show error boundary'
		}
	})
	
	function parseSearchResults({result, searchTotalCount}) {
		const invMastUids = result.map(i => i.frecno)
		getItemDetails({ variables: { invMastUids } })
		getItemAvailabilities(result)
		getItemPrices(result)
		
		if (results.length >= RESULT_SIZE * 2) setOttoFindPart(true)
		
		handleSetSearchData({results: result, totalResults: searchTotalCount, isSearching: false})
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
	
	const handleShowLocationsModal = (invMastUid) => setLocationsModalItem(invMastUid)

	const handleHideLocationsModal = () => setLocationsModalItem(null)

	const handleShowDetailsModal = (invMastUid, itemCode) => setDetailsModalItem({invMastUid, itemCode})

	const handleHideDetailsModal = () => setDetailsModalItem(null)
	
	const handleAddedToCart = () => setShowAddedToCartModal(true)
	
	const handleAddedToCartModal = () => setShowAddedToCartModal(false)
	
	const itemSearchResults = useMemo(() => results.map(result => (
		<ItemResult
			key={result.invMastUid}
			result={result}
			details={itemDetails.find(detail => detail.invMastUid === result.invMastUid) || {}}
			history={history}
			toggleDetailsModal={handleShowDetailsModal}
			toggleLocationsModal={handleShowLocationsModal}
			addedToCart={handleAddedToCart}
		/>
	)), [results, itemDetails])
	
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
	
	const PaginationComponent = () => (
		<PaginationContainer>
			<Pagination
				count={Math.ceil(totalResults / RESULT_SIZE)}
				page={parseInt(resultPage)}
				onChange={(e, page) => setQueryParam('resultPage', page)}
			/>
		</PaginationContainer>
	)
	
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
						innerSearchTerms={innerSearchTerms}
						setInnerSearchTerms={setInnerSearchTerms}
					/>
				</DivResultSummary>
				
				<PaginationComponent/>
				
				<DivSearchResultsContainer>
					{isSearching && <LoadingItems/>}
					{!isSearching && itemSearchResults}
				</DivSearchResultsContainer>
				
				<PaginationComponent/>
			</ResultsContainer>
			
			<AddedModal
				open={showAddedToCartModal}
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
				history={history}
			/>
		</DivContainer>
	)
}

const LoadingItems = () => (
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
)