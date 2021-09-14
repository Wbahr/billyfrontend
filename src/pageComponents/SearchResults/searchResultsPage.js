import React, { useState, useEffect,  } from 'react'
import { useLazyQuery } from '@apollo/client'
import { QUERY_ITEM_SEARCH } from '../../setup/providerGQL'
import { buildSearchString, useDidUpdateEffect, cleanSearchState } from '../_common/helpers/generalHelperFunctions'
import AppBarPlugin from './plugins/AppBarPlugin'
import DrawerPlugin from './plugins/DrawerPlugin'
import BrandsPlugin from './plugins/BrandsPlugin'
import AttributesPlugin from './plugins/AttributesPlugin'
import SortPlugin from './plugins/SortPlugin'
import SearchTermsPlugin from './plugins/SearchTermsPlugin'
import PaginationPlugin from './plugins/PaginationPlugin'
import SearchContainer from './uiComponents/SearchContainer'
import { useSearchState, useSearchQueryParams } from './hooks'
import CategoriesPlugin from './plugins/CategoriesPlugin'
import ResultSummaryPlugin from './plugins/ResultSummaryPlugin'

const RESULT_SIZE = 24

export default function SearchResultsPage({ history }) {
    const [searchQueryParams, setQueryParam, clearSetQueryParam] = useSearchQueryParams(history)
    const { 
        sortType, 
        searchTerm, 
        searchTerms, 
        resultPage, 
        nonweb, 
        selectedCategoryId,
    } = searchQueryParams

    const setSearchTerms = newInnerSearchTerms => {
        setQueryParam('innerSearchTerms', newInnerSearchTerms.join(',') || void 0)
        handleSetSearchState({ searchTerms: newInnerSearchTerms })
    }

    const setSortType = newSortType => {
        setQueryParam('sortType', newSortType)
        handleSetSearchState({ sortType: newSortType })
    }

    const setCategoryId = newCategoryId => {
        setQueryParam('selectedCategoryId', newCategoryId)
        handleSetSearchState({ selectedCategoryId: newCategoryId })
    }

    const queryParamSearchState = { ...searchQueryParams, isSynced: false, results: [], totalResults: '--', isSearching: false }
    const [searchState, setSearchState, { setBrands, setAttributes }] = useSearchState(queryParamSearchState)
    const handleSetSearchState = newSearchData => setSearchState({ ...searchState, ...newSearchData })
    const { totalResults, isSynced, brands, attributes, category, childCategories } = searchState

    const [lastSearchPayload, setLastSearchPayload] = useState({})

    useDidUpdateEffect(() => {
        if (!isSynced) {
            const selectedBrands = brands.filter(b => b.selected).map(b => b.brandName).join(',')
            const selectedAttributes = attributes.reduce((accum, { attributeName, features }) => {
                const selectedFeatures = features.filter(f => f.selected).map(f => f.featureName)
                if (selectedFeatures.length) accum[attributeName] = selectedFeatures.join(',')
                return accum
            }, {})

            history.replace(buildSearchString({
                searchTerm,
                innerSearchTerms: searchTerms,
                sortType,
                nonweb,
                selectedCategoryId,
                resultPage: 1,
                brands: selectedBrands,
                ...selectedAttributes
            }))

            if (resultPage === '1') performItemSearch()
        }
    }, [searchState.brands, searchState.attributes])

    useDidUpdateEffect(() => {
        if (resultPage === '1') {
            performItemSearch()
        } else {
            setQueryParam('resultPage', 1)
        }
    }, [searchTerm, searchTerms, sortType, nonweb, selectedCategoryId])

    useEffect(() => {
        performItemSearch()
    }, [resultPage])

    useDidUpdateEffect(() => { //When the header searchbar changes the query string the local search state needs to reset and perform a new search
        if (!searchQueryParams.brands.length
			&& !searchQueryParams.attributes.length //If these contain values, that means the search state updated the query string, so we do not need to reset
        ) {
            setSearchState(queryParamSearchState)
        }
    }, [searchQueryParams.brands.length, searchQueryParams.attributes.length])

    const performItemSearch = () => {
        handleSetSearchState({ isSearching: true })
        const payload = {
            search: {
                searchTerm,
                innerSearchTerms: searchTerms ? searchTerms.split(',') : [],
                searchType: nonweb === 'true' ? 'nonweb' :'web',
                sortType,
                selectedCategoryId,
                resultPage,
                resultSize: RESULT_SIZE,
                searchState: {
                    brands,
                    attributes
                }
            }
        }
        setLastSearchPayload(payload)
        search({ variables: payload })
    }

    const clearFilter = () => {
        clearSetQueryParam()
    }

    const [search, { variables }] = useLazyQuery(QUERY_ITEM_SEARCH, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ itemSearch }) => {
            if (variables.search === lastSearchPayload.search) {
                const newSearchState = cleanSearchState(itemSearch)
                handleSetSearchState({ ...newSearchState, isSynced: true, results: itemSearch.result, totalResults: itemSearch.searchTotalCount, isSearching: false })
            }
        },
        onError: () => {
            throw 'Search Failed: show error boundary'
        }
    })

    const handlePageChange = page => setQueryParam('resultPage', page)

    return (
        <SearchContainer
            searchTerm={searchTerm}
            searchState={searchState}
            history={history}
        >
            <AppBarPlugin
                title="Search Results"
            />
            <DrawerPlugin>
                <CategoriesPlugin 
                    category={category}
                    childCategories={childCategories}
                    setCategoryId={setCategoryId}
                />
                <BrandsPlugin
                    brands={searchState.brands}
                    setBrands={setBrands}
                />
                <AttributesPlugin
                    attributes={searchState.attributes}
                    setAttributes={setAttributes}
                />
            </DrawerPlugin>
            <ResultSummaryPlugin
                searchTerm={searchTerm}
            />
            <SortPlugin
                sortType={sortType}
                setSortType={setSortType}
            />
            <SearchTermsPlugin
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
                clearFilter={clearFilter}
            />
            <PaginationPlugin
                page={resultPage}
                onPageChange={handlePageChange}
                totalResults={totalResults}
            />
        </SearchContainer>
    )
}
