import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledText0 } from '../../styles/fonts'
import Locations from './aboutSubPages/locationsPage'
import News from './aboutSubPages/newsPage'
import QualityPolicy from './aboutSubPages/qualityPolicyPage'
import TransactionalServices from './aboutSubPages/transactionalServicesPage'
import MissionStatement from './aboutSubPages/missionStatementPage'

export default function AboutPage({ history }) {
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