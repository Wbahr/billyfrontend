import React from 'react'
import styled from 'styled-components'
import { StyledText0 } from '../../styles/fonts'
import SectionHeader from '../_common/sectionHeader'
import Rexroth  from './featuredBrandsPage/rexroth'
import Eaton from './featuredBrandsPages/eaton'
import Parker from './featuredBrandsPages/parker'
import Smc from './featuredBrandsPages/smc'
import Hydac from './featuredBrandsPage/hydac'
import Omron from './featuredBrandsPages/omron'
import Lincoln from './featuredBrandsPages/lincoln'
import Haskel from './featuredBrandsPages/haskel'
import Butech from './featuredBrandsPages/butech'
import Clippard from './featuredBrandsPages/clippard'
import Paccar from './featuredBrandsPages/paccar'
import Rittal from './featuredBrandsPages/rittal'
import Schmersal from './featuredBrandsPages/schmersal'
import Ross from './featuredBrandsPages/ross'
import Abb from './featuredBrandsPages/abb'
import Orientalmotor from './featuredBrandsPages/orientalmotor'
import Aventics from './featuredBrandsPages/adventics'
import PhoenixContact from './featuredBrandsPages/phoenixContact'
// import _ from 'lodash'

const DivRow = styled.div`
  display: flex;
`

const DivColumn1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`

const DivColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`

const DivProductShortcuts = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 200px;
  border: 2px solid black;
  width: 200px;
`

const DivProductHeader = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 700;
  background-color: #535353;
  height: 35px;
  width: 100%;
  padding-left: 20px;
`

const DivProductDetail = styled.div`
  padding: 0 25px;
`

class GeneralFullBrand extends React.Component {
  componentWillMount(){
    console.log('brand: abb ',this.props.brand)
  }
  render(){
    const {
      brand:{
        companyName,
        companyDescription,
        products
      }
    } = this.props

    let productList = _.map(products, (product)=>
      <div>
        <DivProductHeader id={product.name}>{product.name}</DivProductHeader>
        <DivProductDetail>
          <StyledText0>{product.detail}</StyledText0>
        </DivProductDetail>
        <div>
          {
            _.map(product.bullets, (bullet, index) => {
                if (index%2 === 0) {
                  return (
                    <ul>
                      <li>{bullet}</li>
                    </ul>
                  )
                } else {
                 return (
                    <ul>
                      <li>{bullet}</li>
                    </ul>
                  )
                }
              }
            )
          }
        </div>
      </div>
    )

    let productItems =  _.map(products, (product)=>
      <div>
        <a href={'#'+ product.name}>{product.name}</a>
      </div>
    )
    let productSummary = (
      <DivProductShortcuts>
        {productItems}
      </DivProductShortcuts>
    )

    return(
      <DivRow>
        <DivColumn1>
          {productSummary}
        </DivColumn1>
        <DivColumn2>
          <SectionHeader text={companyName} />
          <StyledText0>{companyDescription}</StyledText0>
          {productList}
        </DivColumn2>
      </DivRow>
    )
  }
}

export default GeneralFullBrand



export default function FullBrand({history}) {
  const [pageComponent, setPageComponent] = useState()
  let { page } = useParams()

  const FeaturedPage = [
    {
      'label': 'Rexroth',
      'page': 'rexroth'
    },
    {
      'label': 'Eaton',
      'page': 'eaton'
    },
    {
      'label': 'Parker',
      'page': 'parker'
    },
    {
      'label': 'SMC',
      'page': 'smc'
    },
    {
      'label': 'Hydac',
      'page': 'hydac'
    },
    {
      'label': 'Omron',
      'page': 'omron'
    },
    {
      'label': 'Lincoln',
      'page': 'lincoln'
    },
    {
      'label': 'Haskel',
      'page': 'haskel'
    },
    {
      'label': 'Butech',
      'page': 'butech'
    },
    {
      'label': 'Clippard',
      'page': 'clippard'
    },
    {
      'label': 'Paccar',
      'page': 'paccar'
    },
    {
      'label': 'Rittal',
      'page': 'rittal'
    },
    {
      'label': 'Schmersal',
      'page': 'schmersal'
    },
    {
      'label': 'Ross',
      'page': 'ross'
    },
    {
      'label': 'Abb',
      'page': 'abb'
    },
    {
      'label': 'Orientalmotor',
      'page': 'orientalmotor'
    },
    {
      'label': 'Aventics',
      'page': 'aventics'
    },
    {
      'label': 'Phoenix-contact',
      'page': 'phoenix-contact'
    }
  ]
  useEffect(() => {
    if(page === 'rexroth'){
      setPageComponent(<RexrothPage/>)
    } else if (page === 'eaton'){
      setPageComponent(<EatonPage/>)
    } else if (page === 'parker'){
      setPageComponent(<ParkerPage/>)
    } else if (page === 'smc'){
      setPageComponent(<SmcPage/>)
    } else if (page === 'hydac'){
      setPageComponent(<HydacPage/>)
    } else if (page === 'omron'){
      setPageComponent(<OmronPage/>)
    } else if (page === 'lincoln'){
      setPageComponent(<LincolnPage/>)
    } else if (page === 'haskel'){
      setPageComponent(<HasKelPage/>)
    } else if (page === 'butech'){
      setPageComponent(<ButechPage/>)
    } else if (page === 'clippard'){
      setPageComponent(<ClippardPage/>)
    } else if (page === 'paccar'){
      setPageComponent(<PaccarPage/>)
    } else if (page === 'rittal'){
      setPageComponent(<RittalPage/>)
    } else if (page === 'schmersal'){
      setPageComponent(<SchmersalPage/>)
    } else if (page === 'ross'){
      setPageComponent(<RossPage/>)
    } else if (page === 'abb'){
      setPageComponent(<AbbPage/>)
    } else if (page === 'orientalmotor'){
      setPageComponent(<OrientalmotorPage/>)
    } else if (page === 'aventics'){
      setPageComponent(<AventicsPage/>)
    } else if (page === 'phoenix-contact'){
      setPageComponent(<PhoenixContactPage/>)
    }
    
  }, [page])

  return(
    <div>
     
    </div>
  )
}

