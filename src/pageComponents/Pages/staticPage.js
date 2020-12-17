import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import ApolloClient, { useQuery } from '@apollo/client';
import FourOFourPage from 'pageComponents/Error/fourOFourPage';
import Loader from 'pageComponents/_common/loader';
import styled from 'styled-components'
import { matchPath } from 'react-router'
import { Link } from 'react-router-dom';
import  'style.scss';

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
//   width: 90%;
  justify-content: left;
`

const DivRowHeader = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 32px;
  letter-spacing : 2px;
  flex-direction: column;
  align-items: center;
`
const CrumbLink = styled(Link)`
    
`

const ShortBorder = styled.div`
    border-bottom: 3px solid #B51F2B;
    width: 10%;
    margin: 0 auto;
    padding: 5px
`

const CrumbContainer = styled.div`
    font-size: 1rem;
    text-transform: none;
    letter-spacing : normal;
`

const GET_STATIC_PAGE = gql`
    query GetStaticPage($pageId: String, $subPageId: String, $subSubPageId: String){
        getStaticPage(pageId: $pageId, subPageId: $subPageId, subSubPageId: $subSubPageId) {
            html
            javascript
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

            return <CrumbLink to={`${baseUrl}/${ancestor.pageIdPrimary}/${ancestor.pageIdSecondary}`}>{ancestor.name}</CrumbLink>;
        } else {
            return <CrumbLink to={`${baseUrl}/${ancestor.pageIdPrimary}`}>{ancestor.name}</CrumbLink>;
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
        <h1>{currentPageName}</h1>
        <CrumbContainer>
            {primaryCrumb && <>&nbsp;&#8627;&nbsp;</> }
            {primaryCrumb}
            {secondaryCrumb && <>&nbsp;&raquo;&nbsp;</>}
            {secondaryCrumb}
        </CrumbContainer>
    </>
    )
}

export default function StaticPage({ match }) {
    let pageId = match.params.pageId;
    let subPageId = match.params.subPageId || null;
    let subSubPageId = match.params.subSubPageId || null;

    const [pageName, setPageName] = useState('');
    const [pageHtml, setPageHtml] = useState(<Loader />);
    const [pageJs, setPageJs] = useState(';');
    const [pagePrimaryAncestor, setPagePrimaryAncestor] = useState(null);
    const [pagesecondaryAncestor, setPageSecondaryAncestor] = useState(null);

    const createMarkup = (htmlString) => { return { __html: htmlString } }

    useQuery(GET_STATIC_PAGE, {
        variables: { pageId, subPageId, subSubPageId },
        onCompleted: result => {
            if (result && result.getStaticPage) {
                setPageName(result.getStaticPage.name);
                setPageHtml(<div dangerouslySetInnerHTML={createMarkup(result.getStaticPage.html)} />);
                setPageJs(result.getStaticPage.javascript);
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
    });

    useEffect(() => { eval(pageJs); }, [pageJs]);

    return (
        <Container>
            <DivRowHeader>
                <Crumbs currentPageName={pageName} primary={pagePrimaryAncestor} secondary={pagesecondaryAncestor} baseUrl={match.path.split('/:')[0]} />
            </DivRowHeader>
            <ShortBorder />
            <DivRow>
                {pageHtml}
            </DivRow>
        </Container>
    )
}