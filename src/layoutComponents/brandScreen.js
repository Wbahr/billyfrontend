import React from 'react'
import FullBrandPage from '../pageComponents/Brands/generalFullBrand'
import MinimalBrandPage from '../pageComponents/Brands/generalMinimalBrand'
import abb from '../pageComponents/Brands/jsonData/abb'

class BrandScreen extends React.Component {

    render(){
        let BrandComponent, BrandData
        const BrandName = 'abb'
        //for testing - get from query string

        switch (BrandName){
        case (BrandName):
            BrandData = abb
            break
        }

        const FullBrands = ['abb', 'aventics', 'rexroth', 'eaton', 'parker', 'smc', 'hydac', 'omron', 'lincoln', 'haskel', 'butech', 'clippard', 'paccar', 'rittal', 'schmersal', 'ross', 'oriental', 'phoenix']
        // airline breaks
        // alkon goes right to website

        if (FullBrands.includes(BrandName)) {
            BrandComponent = <FullBrandPage brand={BrandData}/>
        } else {
            BrandComponent = <MinimalBrandPage brand={BrandData}/>
        }
        return (
            <>
                {BrandComponent}
            </>
        )
    }
}

export default BrandScreen
