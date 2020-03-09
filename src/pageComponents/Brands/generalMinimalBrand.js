import React from 'react'
import styled from 'styled-components'
import AcmeElectricPage from './minimalBrandsPages/acmeElectric'

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

  const MiniMalBrandPage = [
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
      setPageComponent(<AdaptallPage/>)
    } else if (page === 'adsens'){
      setPageComponent(<AdsensPage/>)
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