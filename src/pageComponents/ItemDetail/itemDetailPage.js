// import React, { useState, useEffect } from './node_modules/react'
// import queryString from './node_modules/query-string'
// import { GraphQLCall } from '../../config/api'
// import _ from './node_modules/lodash'
// // import styled from 'styled-components'
// import ItemResult from './uiComponents/itemResult'
// import ResultsSearch from './uiComponents/resultsSearch'

// function ItemDetailPage() {
//   // const [searchResults, setSearchResults] = useState([])
//   // const [searchTerm, setSearchTerm] = useState('')
  
//   // // Check for updates to Search Term in URL
//   // useEffect(() => {
//   //   const parsed = queryString.parse(location.search);
//   //   let searchTermParam = parsed.searchTerm
//   //   setSearchTerm(searchTermParam)
//   // })

//   // // Get New Search Term results when the searchTerm in state changes
//   // useEffect(() => {
//   //   let body = {"query" : `{itemSearch(searchParams: {searchTerm: "${searchTerm}"}){result}}`}
//   //   if (searchTerm !== ''){
//   //     GraphQLCall(JSON.stringify(body)).then((result) => parseQueryResults(result))
//   //   }
//   // }, [searchTerm])

//   function parseQueryResults(result) {
//     let searchResultArray = _.get(result,`data.itemSearch.result`, [])
//     console.log('searchResultArray', searchResultArray)
//     setSearchResults(searchResultArray)
//   }

//   return(
//     <>
//       <div>
//         <p>Test</p>
//       </div>
//     </>
//   )
// }

// export default ItemDetailPage