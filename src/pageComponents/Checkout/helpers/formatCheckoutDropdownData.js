import _ from 'lodash'

//These functions drive the dropdown lists on the ship to page

export default function formatCheckoutDropdownData(data){
	let mutatedShipTos = formatShipToData(data.shipToAddresses)
	let mutatedCarriers = formatCarriers(data.carriers)
	let mutatedContacts = formatContacts(data.contacts)
	return {
		'shiptos': mutatedShipTos,
		'carriers': mutatedCarriers,
		'contacts': mutatedContacts
	}
}

function formatShipToData(data){
	let mutatedData = [{
		'label': 'Custom Ship To',
		'value': -1
	}]
	if(!_.isNil(data)){
		for(let i=0;data.length > i;i++){
			let element = data[i]
			mutatedData.push({
				'label': element.companyName + ' - ' + element.physAddress1 + ' ' + element.physCity +', ' + element.physState + ' ' + element.physPostalCode,
				'value': element.id
			})
		}
	}
	return mutatedData
}

function formatCarriers(data){
	let mutatedData = []
	if(!_.isNil(data)){
		for(let i=0;data.length > i;i++){
			let element = data[i]
			mutatedData.push({
				'label': element.name,
				'value': String(element.id) /* P21 carrier ID is a string */
			})
		}
    }
	return mutatedData
}

function formatContacts(data){
	let mutatedData = [{
		'label': 'Custom Contact',
		'value': -1
	}]
	if(!_.isNil(data)){
		for(let i=0;data.length > i;i++){
			let element = data[i]
			mutatedData.push({
				'label': element.firstName + ' ' + element.lastName,
				'value': element.id
			})
		}
	}
	return mutatedData
}