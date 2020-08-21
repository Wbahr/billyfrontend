import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router';
import Loader from 'pageComponents/_common/loader';
import { useQuery } from '@apollo/client';
import { GET_NEW_CUSTOMER } from 'config/providerGQL';
import { ShowErrorAlert } from 'styles/alerts';
import { Link } from 'react-router-dom';

export default function EditNewCustomer() {
    let { regId } = useParams();
    let { path } = useRouteMatch();
    const [data, setData] = useState({});

    const { loading, error } = useQuery(GET_NEW_CUSTOMER, {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
		variables: {
			'id': regId
		},
		onCompleted: result => {
			setData(result.newCustomer)
        }
    });
    console.log("Match", path);
    
    useEffect(() => console.log(data), [data]);

    if(loading) {
        return(<Loader />);
    } else if(error) {
        return (<>
            {error.networkError && <ShowErrorAlert message={error.networkError.result.detail} /> }
            {error && !error.networkError && <ShowErrorAlert message="An error occured" />}
            <Link to={`${path.split('/:')[0]}`}>Go back</Link>
        </>);
    } else {
        return <h2>{data.contact?.customerIdP21}</h2>
    } 
}