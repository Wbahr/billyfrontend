import React from 'react'
// import styled from 'styled-components'
import ContentScreen from '../../containerComponents/contentScreen'
import ItemResult from './uiComponents/itemResult'
import ResultsSearch from './uiComponents/resultsSearch'

class SearchResultsPage extends React.Component {
  render(){
    return(
      <ContentScreen>
        <ResultsSearch />
        <ItemResult />
      </ContentScreen>
    )
  }
}

export default SearchResultsPage