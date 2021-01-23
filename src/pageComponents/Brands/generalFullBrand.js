import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
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
			'page': 'oriental-motor'
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
		} else if (page === 'oriental-motor'){
			setPageComponent(<OrientalmotorPage/>)
		} else if (page === 'aventics'){
			setPageComponent(<AventicsPage/>)
		} else if (page === 'phoenix-contact'){
			setPageComponent(<PhoenixContactPage/>)
		}
    
	}, [page])
      
	return(
		<> 
			{pageComponent}      
  
		</>
	)
}

GeneralFullBrand.propTypes = {
	history: PropTypes.object.isRequired
}
