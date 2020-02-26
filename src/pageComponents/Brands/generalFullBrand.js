import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
import RexrothPage  from './featuredBrandsPages/rexroth'
import EatonPage from './featuredBrandsPages/eaton'
import ParkerPage from './featuredBrandsPages/parker'
import SmcPage from './featuredBrandsPages/smc'
import HydacPage from './featuredBrandsPages/hydac'
import OmronPage from './featuredBrandsPages/omron'
import LincolnPage from './featuredBrandsPages/lincoln'
import HaskelPage from './featuredBrandsPages/haskel'
import ButechPage from './featuredBrandsPages/butech'
import ClippardPage from './featuredBrandsPages/clippard'
import PaccarPage from './featuredBrandsPages/paccar'
import RittalPage from './featuredBrandsPages/rittal'
import SchmersalPage from './featuredBrandsPages/schmersal'
import RossPage from './featuredBrandsPages/ross'
import AbbPage from './featuredBrandsPages/abb'
import OrientalmotorPage from './featuredBrandsPages/orientalmotor'
import AventicsPage from './featuredBrandsPages/aventics'
import PhoenixContactPage from './featuredBrandsPages/phoenixContact'
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


export default function GeneralFullBrand({history}) {
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
      setPageComponent(<HaskelPage/>)
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
      
}
  return(
    <div> 
      
        {pageComponent}      
  
      
    </div>
  )
}

GeneralFullBrand.propTypes = {
  history: PropTypes.object.isRequired
}
