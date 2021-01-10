import Category from './category'
import React, {useEffect, useState} from 'react'
import Loader from 'pageComponents/_common/loader';
import {useLazyQuery} from "@apollo/client";
import {CATEGORY_SEARCH} from "../../../config/providerGQL";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {cleanSearchState, useDidUpdateEffect} from '../../_common/helpers/generalHelperFunctions'
import AppBarPlugin from '../../SearchResults/plugins/AppBarPlugin'
import SearchContainer from '../../SearchResults/uiComponents/SearchContainer'
import DrawerPlugin from '../../SearchResults/plugins/DrawerPlugin'
import BrandsPlugin from '../../SearchResults/plugins/BrandsPlugin'
import AttributesPlugin from '../../SearchResults/plugins/AttributesPlugin'
import PaginationPlugin from "../../SearchResults/plugins/PaginationPlugin"
import SortPlugin from '../../SearchResults/plugins/SortPlugin'
import SearchTermsPlugin from "../../SearchResults/plugins/SearchTermsPlugin";
import {useSearchState} from "../../SearchResults/hooks";
import ResultSummaryPlugin from "../../SearchResults/plugins/ResultSummaryPlugin";
import {ArrowForward} from '@material-ui/icons'
import Carousel from '../../_common/Carousel'

const DivRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`

const DivCol = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	width: 100%;
`

const BorderContainer = styled.div`
	margin: 15px 10px;
  display: flex;
  flex-direction: column;
  width: ${props => {
  	const categoryName = props.children[0].props.children
		const approximateLetterWidth = 22;
  	if (categoryName.length * approximateLetterWidth > window.innerWidth) {
  		return 'min-content'
		} else {
			return 'max-content'
		}
}};
`

const H1 = styled.h1`
	text-transform: uppercase;
	font-size: 32px;
	letter-spacing: 2px;
`

const ShortBorder = styled.div`
	margin: 0 auto;
  border-bottom: 3px solid #B51F2B;
  width: 90%;
`

const RESULT_SIZE = 24

export default function CategorySearch({ match, history }) {
	
	const [categorySearch, setCategorySearch] = useState(null)
	const [resultPage, setResultPage] = useState(1)
	const [lastSearchPayload, setLastSearchPayload] = useState({})
	
	const [searchState, setSearchState, {setBrands, setAttributes, setSortType, setSearchTerms}] = useSearchState()
	const handleSetSearchState = newSearchData => setSearchState({...searchState, ...newSearchData})
	const { results, totalResults, searchTerms, sortType, brands, attributes, isSynced } = searchState
	
	const categoryUrlSlug = match.params.categoryUrlSlug
	const categoryName = categorySearch?.category?.name
	
	const [categorySearchApiCall, {variables}] = useLazyQuery(CATEGORY_SEARCH, {
		fetchPolicy: 'no-cache',
		onCompleted: ({categorySearch}) => {
			setCategorySearch(categorySearch)
			if (variables.searchParams === lastSearchPayload.searchParams) {
				const newSearchState = cleanSearchState({ searchState: categorySearch })
				const {result: results, searchTotalCount: totalResults} = categorySearch
				handleSetSearchState({ ...newSearchState, isSynced: true, isSearching: false, results, totalResults })
			}
		}
	})
	
	const performCategorySearch = () => {
		handleSetSearchState({isSearching: true})
		const payload = {
			searchParams: {
				categorySlug: categoryUrlSlug,
				innerSearchTerms: searchTerms,
				searchType: 'web',
				resultSize: RESULT_SIZE,
				resultPage,
				sortType,
				brands,
				attributes
			}
		}
		setLastSearchPayload(payload)
		return categorySearchApiCall({ variables: payload })
	}
	
	useDidUpdateEffect(() => {
		if (resultPage !== 1) {
			setResultPage(1)
		} else {
			performCategorySearch()
		}
	}, [categoryUrlSlug, sortType, searchTerms])
	
	useDidUpdateEffect(() => {
		if (!isSynced) {
			if (resultPage !== 1) {
				setResultPage(1)
			} else {
				performCategorySearch()
			}
		}
	}, [brands, attributes])
	
	useEffect(() => {
		performCategorySearch()
	}, [resultPage])
	
	const categoryList = (categorySearch?.category?.children || []).map(({urlSlug, name, imageUrl}) => (
		<Category
			key={urlSlug}
			size={results ? 'small' : 'normal'}
			text={name}
			linkTo={`/categories/${urlSlug}`}
			Image={<img src={imageUrl} alt={name} title={name}/>}
		/>
	))
	
	return !categorySearch ? (
			<Loader/>
		) : (
			<DivCol>
				<BreadCrumbs breadCrumbTrail={categorySearch?.category?.breadCrumbs?.breadcrumbTrail}/>
				
				<BorderContainer>
					<H1>{categoryName}</H1>
					<ShortBorder/>
				</BorderContainer>
				
				{results ? (
					<Carousel>
						<Category size='small' text="More Categories" Image={<ArrowForward style={{marginTop: 50}}/>} />
						{categoryList}
					</Carousel>
				) : (
					<DivRow style={{justifyContent: 'center'}}>
						{categoryList}
					</DivRow>
				)}
				
				{results && (
					<SearchContainer
						searchState={searchState}
						history={history}
					>
						<AppBarPlugin
							title={categoryName}
						/>
						<DrawerPlugin>
							<BrandsPlugin
								brands={brands}
								setBrands={setBrands}
							/>
							<AttributesPlugin
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						</DrawerPlugin>
						<ResultSummaryPlugin
							searchTerm={categoryName}
						/>
						<SortPlugin
							sortType={sortType}
							setSortType={setSortType}
						/>
						<SearchTermsPlugin
							searchTerms={searchTerms.join(',')}
							setSearchTerms={setSearchTerms}
						/>
						<PaginationPlugin
							page={resultPage}
							onPageChange={setResultPage}
							totalResults={totalResults}
						/>
					</SearchContainer>
				)}
				
				{!results && !categorySearch?.category?.children.length && (
					<EmptyCategory/>
				)}
			</DivCol>
	)
};

const BreadCrumbs = ({breadCrumbTrail}) => (
	<DivRow style={{paddingLeft: 10}}>
		<Link to="/categories">All Categories</Link>
		{(breadCrumbTrail || []).map(({urlSlug, name}) => (
			<React.Fragment key={urlSlug}>
				<span style={{margin: '0 3px'}}>&nbsp;&raquo;</span>
				<Link to={`/categories/${urlSlug}`}> {name}</Link>
			</React.Fragment>
		))}
	</DivRow>
)

const EmptyCategory = () => (
	<>
		<h2>This category is currently empty</h2>
		<p>Let us help: <a href="/contact-us">Customer Service</a></p>
		<p>Or call one of our reps <a href="tel:8009997378">(800) 999-7378</a></p>
		<DivRow><Link to="/categories">Back to all categories</Link></DivRow>
	</>
)
