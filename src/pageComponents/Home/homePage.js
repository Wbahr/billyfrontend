import React from 'react'
import styled from 'styled-components'
import FeaturedManufacturers from './featuredManufacturers'
import ShopOurProducts from './shopOurProducts'
import Banner from './uiComponents/banner'
// import ContentScreen from '../../containerComponents/contentScreen'
// import ItemResult from './uiComponents/itemResult'
// import ResultsSearch from './uiComponents/resultsSearch'


const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  margin: 28px auto;
  justify-content: space-between;
  flex-grow: 99;
`

class HomePage extends React.Component {

  render(){
    return(
      <>
        <Banner />
        <ContentScreenContainer>
          <ShopOurProducts {...this.props}/>
          <FeaturedManufacturers/>
        </ContentScreenContainer>
      </>
    )
  }
}

export default HomePage