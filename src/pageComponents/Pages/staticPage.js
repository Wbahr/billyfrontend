import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import FourOFourPage from 'pageComponents/Error/fourOFourPage'
import Loader from 'pageComponents/_common/loader'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import  'style.scss'

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
    padding: 5px
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

function Crumbs({ currentPageName, primary, secondary, tertiary, baseUrl }) {
    let primaryCrumb = null
    let secondaryCrumb = null
    let tertiaryCrumb = null

    if (primary) {
        primaryCrumb = <Crumb baseUrl={baseUrl} ancestor={primary}/>
    }
    if (secondary) {
        secondaryCrumb = <Crumb baseUrl={baseUrl} ancestor={secondary}/>
    }
    if (tertiary) {
        tertiaryCrumb = <Crumb baseUrl={baseUrl} ancestor={tertiary}/>
    }
    return (
        <>
            <PageName>{currentPageName}
                <ShortBorder />
            </PageName>
            <CrumbContainer>
                {primaryCrumb && <> &#9751;</> }
                {primaryCrumb}
                {secondaryCrumb && <>&nbsp;&raquo;&nbsp;</>}
                {secondaryCrumb}
                {tertiaryCrumb && <>&nbsp;&raquo;&nbsp;</>}
                {tertiaryCrumb}
            </CrumbContainer>
        </>
    )
}

export default function StaticPage({ match }) {
    const pageId1 = match.params.pageId1
    const pageId2 = match.params.pageId2 || null
    const pageId3 = match.params.pageId3 || null
    const pageId4 = match.params.pageId4 || null

    const [pageName, setPageName] = useState('')
    const [pageHtml, setPageHtml] = useState(<Loader />)
    const [pageJs, setPageJs] = useState(';')
    const [pagePrimaryAncestor, setPagePrimaryAncestor] = useState(null)
    const [pageSecondaryAncestor, setPageSecondaryAncestor] = useState(null)
    const [pageTeritaryAncestor, setPageTeriaryAncestor] = useState(null)

    const createMarkup = (htmlString) => ({ __html: htmlString })

    useQuery(GET_STATIC_PAGE, {
        variables: { pageId1, pageId2, pageId3, pageId4 },
        onCompleted: result => {
            if (result && result.getStaticPage) {
                setPageName(result.getStaticPage.name)
                setPageHtml(<div dangerouslySetInnerHTML={createMarkup(result.getStaticPage.html)} />)
                setPageJs(result.getStaticPage.javascript)
                setPagePrimaryAncestor(result.getStaticPage.primaryAncestor)
                setPageSecondaryAncestor(result.getStaticPage.secondaryAncestor)
                setPageTeriaryAncestor(result.getStaticPage.tertiaryAncestor)
            } else {
                setPageHtml(<FourOFourPage />)
            }
        },
        onError: () => {
            setPageHtml(<FourOFourPage />)
        }
    })

    useEffect(() => {
        eval(pageJs)
    }, [pageJs])

    return (
        <Container>
            <DivRowHeader>
                <Crumbs currentPageName={pageName} primary={pagePrimaryAncestor} secondary={pageSecondaryAncestor} tertiary={pageTeritaryAncestor} baseUrl={match.path.split('/:')[0]} />
            </DivRowHeader>
            <DivRow>
                {pageHtml}
            </DivRow>
        </Container>
    )
}
