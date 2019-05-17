import Cookies from 'js-cookie'

const url = 'https:' + window.apiBaseUrl
const token = Cookies.get('b2bApiToken')

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
