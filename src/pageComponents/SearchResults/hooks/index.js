import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router'

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


export const useSearchQueryParams = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const setQueryParam = (fieldName, value) => {
        let search = ''
        if (value){
            search = queryString.stringify({ ...queryString.parse(location.search), [fieldName]: value })
        } else {
            const parsed = queryString.parse(location.search)
            delete parsed[fieldName]
            search = queryString.stringify(parsed)
        }

       navigate({ pathname: '/search', search })
    }
	
    const clearSetQueryParam = () => {
        const { searchTerm } = queryString.parse(location.search)
        const search = queryString.stringify({ searchTerm })
        navigate({ pathname: '/search', search })
    }

    const getParsedQueryString = () => {
        const parsed = queryString.parse(location.search)
        const { searchTerm, innerSearchTerms, sortType, nonweb, selectedCategoryId, resultPage, brands, ...selectedAttributes } = parsed
        return { searchTerm, innerSearchTerms, sortType, nonweb, selectedCategoryId, resultPage, brands, selectedAttributes }
    }
	
    const [parsedQueryString, setParsedQueryString] = useState(getParsedQueryString)
	
    useEffect(() => {
        setParsedQueryString(getParsedQueryString())
    }, [location.search])
	
    const { searchTerm, innerSearchTerms='', sortType='relevancy', nonweb='false', resultPage, 
        selectedCategoryId, brands: selectedBrands, selectedAttributes } = parsedQueryString
	
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
	
    return [{ brands, attributes, sortType, searchTerm, selectedCategoryId, searchTerms: innerSearchTerms, nonweb, resultPage, }, setQueryParam, clearSetQueryParam]
}