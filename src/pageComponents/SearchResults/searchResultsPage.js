import React from 'react'
import styled from 'styled-components'
import ContentScreen from '../../containerComponents/contentScreen'
import ItemResult from './uiComponents/itemResult'

class SearchResultsPage extends React.Component {
  render(){
    return(
      <ContentScreen>
        <ItemResult />
      </ContentScreen>
    )
  }
}

export default SearchResultsPage