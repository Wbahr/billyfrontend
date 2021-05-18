import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import FourOFourPage from 'pageComponents/Error/fourOFourPage'
import Loader from 'pageComponents/_common/loader'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import  'style.scss'
import { Helmet } from 'react-helmet'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  padding: 0 10px;
  margin: 50px auto;
`

const DivRow = styled.div`
  display: flex;
  justify-content: left;
  margin: 0 auto;
`

const DivRowHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 32px;
  letter-spacing : 2px;
  font-family: verdana;
  color: #333;
`
const PageName = styled.h1`
    text-align: center;
`
const CrumbLink = styled(Link)`
    padding: 0 10px;
    text-transform: capitalize;
    letter-spacing: 1px;
    color:  #246696;
    font-weight: bold;
`

const ShortBorder = styled.div`
    border-bottom: 3px solid #B51F2B;
    width: 10%;
    margin: 15px auto;
    padding: 5px;
`

const CrumbContainer = styled.div`
    font-size: 1rem;
    text-transform: none;
    justify-content: flex-start;
`

const GET_STATIC_PAGE = gql`
    query GetStaticPage($pageId1: String, $pageId2: String, $pageId3: String, $pageId4: String){
        getStaticPage(pageId1: $pageId1, pageId2: $pageId2, pageId3: $pageId3, pageId4: $pageId4) {
            html
            javascript
            name
            metaTitle
            metaDescription
            primaryAncestor {
               name
               pageIdPrimary
               pageIdSecondary
               pageIdTertiary
            }
            secondaryAncestor {
              name
              pageIdPrimary
              pageIdSecondary
              pageIdTertiary
            }
            tertiaryAncestor {
                name
                pageIdPrimary
                pageIdSecondary
                pageIdTertiary
            }
        }
    }
`

function Crumb({ baseUrl, ancestor }) {
    if (ancestor) {
        if (ancestor.pageIdTertiary) {
            return <CrumbLink to={`${baseUrl}/${ancestor.pageIdPrimary}/${ancestor.pageIdSecondary}/${ancestor.pageIdTertiary}`}>{ancestor.name}</CrumbLink>
        } else if (ancestor.pageIdSecondary) {
            return <CrumbLink to={`${baseUrl}/${ancestor.pageIdPrimary}/${ancestor.pageIdSecondary}`}>{ancestor.name}</CrumbLink>
        } else {
            return <CrumbLink to={`${baseUrl}/${ancestor.pageIdPrimary}`}>{ancestor.name}</CrumbLink>
        }
    } else {
        return null
    }
}

function Crumbs({ name, primaryAncestor, secondaryAncestor, tertiaryAncestor, baseUrl }) {
    return (
        <>
            <PageName>
                {name}
                <ShortBorder />
            </PageName>
            <CrumbContainer>
                {primaryAncestor && <> &#9751;<Crumb baseUrl={baseUrl} ancestor={primaryAncestor}/></>}
                {secondaryAncestor && <>&nbsp;&raquo;&nbsp;<Crumb baseUrl={baseUrl} ancestor={secondaryAncestor}/></>}
                {tertiaryAncestor && <>&nbsp;&raquo;&nbsp;<Crumb baseUrl={baseUrl} ancestor={tertiaryAncestor}/></>}
            </CrumbContainer>
        </>
    )
}

export default function StaticPage({ match }) {
    const pageId1 = match.params.pageId1
    const pageId2 = match.params.pageId2 || null
    const pageId3 = match.params.pageId3 || null
    const pageId4 = match.params.pageId4 || null
    

    const {  data: { getStaticPage={} }={}, error } = useQuery(GET_STATIC_PAGE, {
        variables: { pageId1, pageId2, pageId3, pageId4 }
    })

    return (
        <Container>
            <Helmet>
                <title>{getStaticPage.metaTitle || 'Airline Hydraulics'}</title>
                <meta name="description" content={getStaticPage.metaDescription || 'Airline Hydraulics Corporation'}/>
                {getStaticPage.javascript && (
                    <script type="text/javascript">
                        {getStaticPage.javascript}
                    </script>
                )}
            </Helmet>
            
            <DivRowHeader>
                <Crumbs {...getStaticPage} baseUrl={match.path.split('/:')[0]} />
            </DivRowHeader>
            
            <DivRow>
                {getStaticPage.html
                    ? <div dangerouslySetInnerHTML={{ __html: getStaticPage.html }} />
                    : error
                        ? <FourOFourPage/>
                        : <Loader/>
                }
            </DivRow>
        </Container>
    )
}
