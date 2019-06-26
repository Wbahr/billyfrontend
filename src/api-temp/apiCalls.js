const url = 'https://preprodapi.airlinehyd.com'
// const token = 'hVa-Olr_iqUeJAp9ZlVrEm6b4pOT_6KimgT74xGOaoO1IngU7vdK4zarsx4i6ajSEyo1ycePpoCYcTnbJgydK1_3ughRrNxKmE9lM-6I5xjccF_dW1i9siLAa2xjD-923dZ8y6OFjTwaYSsAONLT4CtscjpPEv_CYzzkvnnlpDShpEve00hd_d-9R4RTmvVbqzE4O_dMcCvVZ0-YBFZGNu1bZTACZ2Tt-MHLs61w0ILPHjg9qmimDdYFrA72XJDIyE8gjcnw2Ob6zqq-FU7zGCZY20zGPklhvoFqcmqMGF4yNP1ZD0aW4zoBdGyDlQeJhgjUaQpeE-KLb2pcTabvGDe8a4rVemDJeRpR0B02zEc7yjCHu2oem1RVRUze7sO3Puf2OdMrisPyf4JMjvQthb-uT0tjHckuGG6dRODjfVfr74QJK0jlAMMJzj8t9SWWE-MrM5DAzDxPZnOkyiRPcthpiM7DPXyFbqng6bFfJ3byb2HcPsYO0S4bDF93iBFUVJdEuBUG_ZfunWpI8yYjYylxKXusZs2sXkuMpzhiMBQttLP8WXdGCaufqDvrnMinR9tLRX_2ryXdu-s7YJGlnmaNf9tY8arHNcuHoWnIFzO0inlw752QW6YpQOLT7fnH'
const token = 'DWTnJYovv4lZ4FO1mJtVWP18P7WkeJsZbB0wmgbMSLIpQuQdoRhUmxrJqezkTTLe5ZuJ4S5w9KMnq6gCUXI8-n56iAy5NEh8bJJZ0C7LqA9TP9ZzNq9Yw-1vy4Xx15SQK-YFJ44ktVJunlVJkN0_KM-egkyeOmtTeGOktA6F1EE5LglapQnvWkZV-A92hYcy3qTvBXoM4_zXf6pfeKAIa-_T7Q-_58m0IeLT3mbcygYoNgACTSbg5Xewd8KjvhSZ2eiL_aXws44sJJFtq0EkDwlL_8wBDtqEMSBCTp3MJxaTCa22AougVTjYaOlVSOjvbu3JrzfMs3Oq5V3KMIJJbQTs92j-M8dug4OVs4SQKCHIF0M6C-7lIZuW-XLyhMZ5uDAW55m2yvbhpR8WVFko5GeCUvZTYMWhMjVQDTuaZSDmRhKWzb3NdxxpI3nu_RRLVN-eEg3oMUz1WgWF15AfAVVB_3mKLoAewetYVBdJc1uRUYV5OnQ0fZ1fOqhdRixNajQxs3DZouO2mcOtGmgH-J6K_6QIDnD3qU_gGty6kGnYDeaPLsGFERpr9jcPX1qv'

export function getInvoice(invoiceNum) {
	// Default options are marked with *
	const endpoint = `/corvus/myaccount/get/invoices/${invoiceNum}?outputType=json`
	return fetch(url + endpoint, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
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

// UPDATE THIS ONCE I HAVE AN RMA
export function postRMA(data) {
	const endpoint = '/corvus/orders/rma'
	return fetch(url + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrer: 'no-referrer',
		body: JSON.stringify(data),
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

export function postInvoicePayment(data) {
	const endpoint = '/corvus/invoicepayment'
	return fetch(url + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrer: 'no-referrer',
		body: JSON.stringify(data),
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

export function updatePassword(data) {
	const endpoint = '/corvus/security/ChangePassword'
	return fetch(url + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrer: 'no-referrer',
		body: JSON.stringify(data),
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

export function updateEmail(data) {
	const endpoint = '/corvus/security/ChangeEmail'
	return fetch(url + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrer: 'no-referrer',
		body: JSON.stringify(data),
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

export function getUserData() {
	const endpoint = '/corvus/security/CurrentUser'
	return fetch(url + endpoint, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrer: 'no-referrer',
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

export function getSMCParts(searchTerm) {
	const endpoint = '/airline/smcsearch'
	return fetch(url + endpoint, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Authorization': 'bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
    body: JSON.stringify(searchTerm),
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
