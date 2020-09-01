import React, { useState } from 'react'
import gql from 'graphql-tag'
import ApolloClient, { useQuery } from '@apollo/client';
import FourOFourPage from 'pageComponents/Error/fourOFourPage';
import Loader from 'pageComponents/_common/loader';
import styled from 'styled-components'
import { matchPath } from 'react-router'
import { Link } from 'react-router-dom';
import 'style.css'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
`

const DivRow = styled.div`
  display: flex;
//   width: 90%;
  justify-content: left;
`

const DivRowHeader = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 32px;
  letter-spacing : 2px;
`

const GET_STATIC_PAGE = gql`
    query GetStaticPage($pageId: String, $subPageId: String, $subSubPageId: String){
        getStaticPage(pageId: $pageId, subPageId: $subPageId, subSubPageId: $subSubPageId) {
            html
            name
            primaryAncestor {
               name
               pageIdPrimary
               pageIdSecondary
            }
            secondaryAncestor {
              name
              pageIdPrimary
              pageIdSecondary
            }
        }
    }
`

function Crumb({ baseUrl, ancestor }) {
    if (ancestor) {
        if (ancestor.pageIdSecondary) {
            const match = matchPath(baseUrl,)

            return <Link to={`${baseUrl}/${ancestor.pageIdPrimary}/${ancestor.pageIdSecondary}`}>{ancestor.name}</Link>;
        } else {
            return <Link to={`${baseUrl}/${ancestor.pageIdPrimary}`}>{ancestor.name}</Link>;
        }
    } else {
        return null;
    }
}

function Crumbs({ currentPageName, primary, secondary, baseUrl }) {
    let primaryCrumb = null;
    let secondaryCrumb = null;

    if (primary) {
        primaryCrumb = <Crumb baseUrl={baseUrl} ancestor={primary}></Crumb>
    }
    if (secondary) {
        secondaryCrumb = <Crumb baseUrl={baseUrl} ancestor={secondary}></Crumb>
    }
    return (<>
        {primaryCrumb}
        {primaryCrumb && <>&nbsp;&raquo;&nbsp;</>}
        {secondaryCrumb}
        {secondaryCrumb && <>&nbsp;&raquo;&nbsp;</>}
        <p>{currentPageName}</p>
    </>
    )
}

export default function StaticPage({ match }) {
    let pageId = match.params.pageId;
    let subPageId = match.params.subPageId || null;
    let subSubPageId = match.params.subSubPageId || null;

    const [pageName, setPageName] = useState('');
    const [pageHtml, setPageHtml] = useState(<Loader />);
    const [pagePrimaryAncestor, setPagePrimaryAncestor] = useState(null);
    const [pagesecondaryAncestor, setPageSecondaryAncestor] = useState(null);

    const createMarkup = (htmlString) => { return { __html: htmlString } }

    useQuery(GET_STATIC_PAGE, {
        variables: { pageId, subPageId, subSubPageId },
        onCompleted: result => {
            if (result && result.getStaticPage) {
                setPageName(result.getStaticPage.name);
                setPageHtml(<div dangerouslySetInnerHTML={createMarkup(result.getStaticPage.html)} />);
                setPagePrimaryAncestor(result.getStaticPage.primaryAncestor);
                setPageSecondaryAncestor(result.getStaticPage.secondaryAncestor);
            } else {
                console.log("Unknown page", pageId, subPageId, subSubPageId);
                setPageHtml(<FourOFourPage />)
            }
        },
        onError: () => {
            console.log("Unknown page", pageId, subPageId, subSubPageId);
            setPageHtml(<FourOFourPage />)
        }
    })

    return (
        <Container>
            <DivRowHeader>
                <Crumbs currentPageName={pageName} primary={pagePrimaryAncestor} secondary={pagesecondaryAncestor} baseUrl={match.path.split('/:')[0]} />
            </DivRowHeader>
            <DivRow>
                {pageHtml}
            </DivRow>
        </Container>
    )
}