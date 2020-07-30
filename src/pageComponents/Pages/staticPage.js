import React, { useState } from 'react'
import gql from 'graphql-tag'
import ApolloClient, { useQuery } from '@apollo/client';
import FourOFourPage from 'pageComponents/Error/fourOFourPage';
import Loader from 'pageComponents/_common/loader';

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

export default function StaticPage({ match }) {
    let pageId = match.params.pageId;
    let subPageId = match.params.subPageId || null;
    let subSubPageId = match.params.subSubPageId || null;

    const [pageHtml, setPageHtml] = useState(<Loader/>);

    function createMarkup(htmlString) {
        return { __html: htmlString };
    }

    useQuery(GET_STATIC_PAGE, {
        variables: { pageId, subPageId, subSubPageId },
		onCompleted: result => {
            if(result && result.getStaticPage) {
                setPageHtml(<div dangerouslySetInnerHTML={createMarkup(result.getStaticPage.html)} />);
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
    <>
        {pageHtml}
    </>
    )
}