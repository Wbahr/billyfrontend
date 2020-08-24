import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router';
import Loader from 'pageComponents/_common/loader';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NEW_CUSTOMER, SAVE_NEW_CUSTOMER } from 'config/providerGQL';
import { ShowErrorAlert } from 'styles/alerts';
import { Link } from 'react-router-dom';
import NewCustomerForm from 'pageComponents/Signup/uiComponents/newCustomerForm';
import { newCustomerSchema } from 'pageComponents/Signup/validationSchemas';

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

    return (
        <>
            {loading && <Loader />}
            {!loading && error && error.networkError && <ShowErrorAlert message={error.networkError.result.detail} /> }
            {!loading && error && !error.networkError && <ShowErrorAlert message="An error occured" />}
            {!loading && !error && <EditForm data={data}/>}
            <Link to={`${path.split('/:')[0]}`}>Go back</Link>
        </>
    );
}

function EditForm(data) {
    const [saved, setSaved] = useState(false);
	const [saveNewCustomer] = useMutation(SAVE_NEW_CUSTOMER,
		{
			onCompleted() {
				setSaved(true);
			}
		}
	);

	const onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => { 
			saveNewCustomer(map(values));
			setSubmitting(false);
		}, 1000);
	};

	if(saved === true) {
		return <Summary />
	} else {
		return (
			<NewCustomerForm 
				newCustomerInitialValues={data} 
				newCustomerSchema={newCustomerSchema} 
				onSubmit={onSubmit} 
				choosePasswordEnabled={false} 
				buttonText="Save"
				showCustomerLookup={true} />
		);
	}
}