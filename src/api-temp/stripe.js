const newapi = '127.0.0.1/:5000'
const token = 'DWTnJYovv4lZ4FO1mJtVWP18P7WkeJsZbB0wmgbMSLIpQuQdoRhUmxrJqezkTTLe5ZuJ4S5w9KMnq6gCUXI8-n56iAy5NEh8bJJZ0C7LqA9TP9ZzNq9Yw-1vy4Xx15SQK-YFJ44ktVJunlVJkN0_KM-egkyeOmtTeGOktA6F1EE5LglapQnvWkZV-A92hYcy3qTvBXoM4_zXf6pfeKAIa-_T7Q-_58m0IeLT3mbcygYoNgACTSbg5Xewd8KjvhSZ2eiL_aXws44sJJFtq0EkDwlL_8wBDtqEMSBCTp3MJxaTCa22AougVTjYaOlVSOjvbu3JrzfMs3Oq5V3KMIJJbQTs92j-M8dug4OVs4SQKCHIF0M6C-7lIZuW-XLyhMZ5uDAW55m2yvbhpR8WVFko5GeCUvZTYMWhMjVQDTuaZSDmRhKWzb3NdxxpI3nu_RRLVN-eEg3oMUz1WgWF15AfAVVB_3mKLoAewetYVBdJc1uRUYV5OnQ0fZ1fOqhdRixNajQxs3DZouO2mcOtGmgH-J6K_6QIDnD3qU_gGty6kGnYDeaPLsGFERpr9jcPX1qv'

export function getStripeUser(apitoken) {
	const endpoint = '/stripe/user'
	return fetch(newapi + endpoint, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
	})
		.then(function(response){
			if(response.ok){
				return response.json()
			}
			throw new Error('Bad Request.')
		}).catch(function(error) {
			return {'error': 'Bad Request. Try again.'}
		})
}

export function createStripeUser(apitoken, stripeToken) {
	const endpoint = '/stripe/user/create'
	return fetch(newapi + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
	})
		.then(function(response){
			if(response.ok){
				return response.json()
			}
			throw new Error('Bad Request.')
		}).catch(function(error) {
			return {'error': 'Bad Request. Try again.'}
		})
}

export function stripeTokenHandler(paymentToken) {
	const endpoint = '/stripe/savePaymentMethod'
	return fetch(newapi + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: {
			'paymentToken': paymentToken,
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
	})
		.then(function(response){
			if(response.ok){
				return response.json()
			}
			throw new Error('Bad Request.')
		}).catch(function(error) {
			return {'error': 'Bad Request. Try again.'}
		})
}