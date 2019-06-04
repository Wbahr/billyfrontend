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
    let BrandComponent
    //for testing - get from query string
    let BrandName = 'abb'
    let BrandData
    switch(BrandName){
      case 'abb':
        BrandData = abb
    }

    const FullBrands = ['abb']
    const MinimalBrands = ['test']

    if (FullBrands.includes(BrandName)) {
      BrandComponent = <FullBrandPage brand={eval(BrandData)}/>
    } else if (MinimalBrands.includes(BrandName)) {
      BrandComponent = <MinimalBrandPage brand={eval(BrandData)}/>
    }
    return(
      <>
        {BrandComponent}
      </>
    )
  }
}

export default BrandScreen
