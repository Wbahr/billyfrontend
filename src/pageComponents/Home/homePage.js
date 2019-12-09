import React from 'react'
import styled from 'styled-components'
import FeaturedManufacturers from './uiComponents/featuredManufacturers'
import ShopOurProducts from './uiComponents/shopOurProducts'
import Banner from './uiComponents/banner'
import SuggestedSearch from './uiComponents/suggestedSearch'
// import ContentScreen from '../../containerComponents/contentScreen'
// import ItemResult from './uiComponents/itemResult'
// import ResultsSearch from './uiComponents/resultsSearch'


const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1400px;
  margin: 28px auto;
  justify-content: space-between;
  flex-grow: 99;
`

class HomePage extends React.Component {

  render(){
    return(
      <>
        {/* <SuggestedSearch /> */}
        <Banner/>
        <ContentScreenContainer>
          <ShopOurProducts {...this.props}/>
          <FeaturedManufacturers/>
        </ContentScreenContainer>
      </>
    )
  }
}

export default HomePage