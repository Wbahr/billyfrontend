import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Locations from './aboutSubPages/locationsPage'
import News from './aboutSubPages/newsPage'
import QualityPolicy from './aboutSubPages/qualityPolicyPage'
import TransactionalServices from './aboutSubPages/transactionalServicesPage'
import MissionStatement from './aboutSubPages/missionStatementPage'
import Events from './aboutSubPages/eventsPage'
import Careers from './aboutSubPages/careersPage'
import History from './aboutSubPages/historyPage'

export default function AboutPage() {
	const [pageComponent, setPageComponent] = useState()
	let { page } = useParams()

    const aboutPages = [
        {
            'label': 'Locations',
            'page': 'locations'
        },
        {
            'label': 'News',
            'page': 'news'
        },
        {
            'label': 'Quality Policy',
            'page': 'quality-policy'
        },
        {
            'label': 'Transactional Services',
            'page': 'transactional-services'
        },
        {
            'label': 'Mission/vision Statement',
            'page': 'mission-statement'
        },
        {
            'label': 'Careers',
            'page': 'careers'
        },
        {
            'label': 'Events',
            'page': 'events'
        },
        {
            'label': 'Our History',
            'page': 'our-history'
        }
        
    ]
    useEffect(() => {
        if (page === 'locations') {
            setPageComponent(<Locations />)
        }
        else if (page === 'news') {
            setPageComponent(<News />)
        }
        else if (page === 'quality-policy') {
            setPageComponent(<QualityPolicy />)
        }
        else if (page === 'transactional-services') {
            setPageComponent(<TransactionalServices />)
        }
        else if (page === 'mission-statement') {
            setPageComponent(<MissionStatement />)
        }
        else if (page === 'careers') {
            setPageComponent(<Careers />)
        }
        else if (page === 'events') {
            setPageComponent(<Events />)
        }
        else if (page === 'our-history') {
            setPageComponent(<History />)
        }
    }, [page])

	return (
    <>
      {pageComponent}
    </>
	)
}

AboutPage.propTypes = {
	history: PropTypes.object.isRequired
}