import { useEffect, useState } from 'react'
import queryString from 'query-string'

const initialSearchState = {
    results: [],
    totalResults: '--',
    isSearching: false,
    sortType: 'relevancy',
    searchTerms: []
}

export const useSearchState = (initialValue) => {
    const [searchState, setSearchState] = useState(initialValue || initialSearchState)
    const setBrands = brands => setSearchState({ ...searchState, brands, isSynced: false })
    const setAttributes = attributes => setSearchState({ ...searchState, attributes, isSynced: false })
    const setSortType = sortType => setSearchState({ ...searchState, sortType })
    const setSearchTerms = searchTerms => setSearchState({ ...searchState, searchTerms })
    return [searchState, setSearchState, { setBrands, setAttributes, setSortType, setSearchTerms }]
}


export const useSearchQueryParams = (history) => {
    const setQueryParam = (fieldName, value) => {
        const search = queryString.stringify({ ...queryString.parse(location.search), [fieldName]: value })
        history.push({ pathname: '/search', search })
    }
	
    const getParsedQueryString = () => {
        const parsed = queryString.parse(location.search)
        const { searchTerm, innerSearchTerms, sortType, nonweb, resultPage, brands, ...selectedAttributes } = parsed
        return { searchTerm, innerSearchTerms, sortType, nonweb, resultPage, brands, selectedAttributes }
    }
	
    const [parsedQueryString, setParsedQueryString] = useState(getParsedQueryString)
	
    useEffect(() => {
        setParsedQueryString(getParsedQueryString())
    }, [history.location.search])
	
    const { searchTerm, innerSearchTerms='', sortType='relevancy', nonweb='false', resultPage, 
        brands: selectedBrands, selectedAttributes } = parsedQueryString
	
    const attributes = Object.keys(selectedAttributes)
        .map(attributeName => ({
            attributeName,
            features: selectedAttributes[attributeName]
                .split(',')
                .map(featureName => ({
                    featureName,
                    selected: true
                }))
        }))
    const brands = selectedBrands ? selectedBrands.split(',').map(b => ({ brandName: b, selected: true })) : []
	
    return [{ brands, attributes, sortType, searchTerm, searchTerms: innerSearchTerms, nonweb, resultPage }, setQueryParam]
}