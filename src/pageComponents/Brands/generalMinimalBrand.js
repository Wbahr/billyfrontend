import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
import AcmeElectricPage from './minimalBrandsPages/acmeElectric'
// import AdaptallPage from './minimalBrandsPages/adaptall'
// import AdsensPage from './minimalBrandsPages/adsens'

// import _ from 'lodash'

const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

// class FullBrand extends React.Component {
//   componentWillMount(){
//     console.log('brand: ',this.props.brand)
//   }
//   render(){
//     const {
//       brand:{
//         companyName,
//         companyDescription,
//       }
//     } = this.props

//     return(
//       <>
//         <p>{companyName}</p>
//         <p>{companyDescription}</p>
//       </>
//     )
//   }
// }

// export default FullBrand

export default function GeneralMinimalBrand({history}) {
  const [pageComponent, setPageComponent] = useState()
  let { page } = useParams()

  const MinimalBrandPages = [
    {
      'label': 'AcmeElectric',
      'page': 'acme-electric'
    },
    {
      'label': 'Adaptall',
      'page': 'adaptall'
    },
    {
      'label': 'Adsens',
      'page': 'adsens'
    }
  ]
  useEffect(() => {
    if(page === 'acme-electric'){
      setPageComponent(<AcmeElectricPage/>)
    } else if (page === 'adaptall'){
      setPageComponent(<AcmeElectricPage/>) // Swap this when Adaptall page is completed
      // setPageComponent(<AdaptallPage/>)
    } else if (page === 'adsens'){
      setPageComponent(<AcmeElectricPage/>) // Swap this when Adsens page is completed
      // setPageComponent(<AdsensPage/>)
    } 
    
  }, [page])
      
  return(
    <> 
        {pageComponent}      
  

    </>
  )
}

GeneralMinimalBrand.propTypes = {
  history: PropTypes.object.isRequired
}