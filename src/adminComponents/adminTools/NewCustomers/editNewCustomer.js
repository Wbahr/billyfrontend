import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router';
import Loader from 'pageComponents/_common/loader';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NEW_CUSTOMER, SAVE_NEW_CUSTOMER } from 'config/providerGQL';
import { ShowErrorAlert, ShowInfoAlert } from 'styles/alerts';
import { Link } from 'react-router-dom';
import NewCustomerForm, { mapToForm, mapToApi } from 'pageComponents/Signup/uiComponents/newCustomerForm';
import { editCustomerSchema } from 'pageComponents/Signup/validationSchemas';
import Modal from 'pageComponents/_common/modal';

export default function EditNewCustomer() {
    let { regId } = useParams();
    let { path } = useRouteMatch();
    const [data, setData] = useState(null);
    
    const { loading, error } = useQuery(GET_NEW_CUSTOMER, {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
		variables: {
			'id': regId
		},
		onCompleted: result => {
			setData(mapToForm(result.newCustomer));
			console.log("Data Ready", mapToForm(result.newCustomer));
        }
    });

    return (
        <>
            {loading && <Loader />}
            {!loading && error && error.networkError && <ShowErrorAlert message={error.networkError.result.detail} /> }
            {!loading && error && !error.networkError && <ShowErrorAlert message="An error occured" />}
            {!loading && !error && data && <EditForm data={data}/>}
            <Link to={`${path.split('/:')[0]}`}>Go back</Link>
        </>
    );
}

function EditForm({data}) {
	const [saved, setSaved] = useState(false);
	let { path } = useRouteMatch();
	const [saveNewCustomer] = useMutation(SAVE_NEW_CUSTOMER, {
        onCompleted() {
            setSaved(true);
        }
	});

	const onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => { 
			saveNewCustomer(mapToApi(values));
			setSubmitting(false);
		}, 1000);
	};

	return (
		<>
			<Modal open={saved} onClose={()=> setSaved(false)} >
				<ShowInfoAlert message="Saved Successfully" />
				<Link to={`${path.split('/:')[0]}`}>Go Back to New Registrations</Link>
			</Modal>
			<NewCustomerForm 
				newCustomerInitialValues={data} 
				validationSchema={editCustomerSchema} 
				onSubmit={onSubmit} 
				choosePasswordEnabled={false} 
				buttonText="Save Registration"
				showCustomerLookup={true} 
				data={data}/>
			
		</>
	);
}