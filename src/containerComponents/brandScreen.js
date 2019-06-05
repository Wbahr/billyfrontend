import React from 'react'
import _ from 'lodash'
import FullBrandPage from '../uiComponents/Brands/generalFullBrand'
import MinimalBrandPage from '../uiComponents/Brands/generalMinimalBrand'
import abb from '../uiComponents/Brands/jsonData/abb'
import queryString from 'query-string'

class BrandScreen extends React.Component {
  componentWillMount() {
    // const location = queryString.parse(location.search)
    // this.state({brandName:_.get(location,'brand', '')})
  }

  render(){
    let BrandComponent, BrandData
    let BrandName = 'abb'
    //for testing - get from query string

    switch(BrandName){
      case(BrandName):
        BrandData = abb
        break
    }

    const FullBrands = ['abb']
    const MinimalBrands = ['test']

    if (FullBrands.includes(BrandName)) {
      BrandComponent = <FullBrandPage brand={BrandData}/>
    } else if (MinimalBrands.includes(BrandName)) {
      BrandComponent = <MinimalBrandPage brand={BrandData}/>
    }
    return(
      <>
        {BrandComponent}
      </>
    )
  }
}

export default BrandScreen
