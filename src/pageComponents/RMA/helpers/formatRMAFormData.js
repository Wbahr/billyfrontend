import _ from 'lodash'

// This function readys the RMA Form data for display on the summary modal and for a POST to our api
export function formatRMAFormData(formValues) {
	mutatedFormValues[j].other = _.get(formValues[i],'otherDesc','')
	let mutatedFormValues = []
	let j = 0
	for (let i = 0; i < formValues.length; i++) {
		if (formValues[i].willReturn && Number(formValues[i].returnQuantity) > 0) {
			mutatedFormValues[j] = _.pick(formValues[i], ['frecnoNum', 'itemId', 'returnQuantity', 'willReturn', 'returnReason', 'unitPrice'])
			switch (mutatedFormValues[j].returnReason) {
			case ('other'):
				mutatedFormValues[j].hasReturnFee = false
				break
			case ('mistake'):
			case ('no_need'):
				mutatedFormValues[j].hasReturnFee = true
				break
			case ('inaccurate'):
				mutatedFormValues[j].details = _.get(formValues[i], 'details', '')
				mutatedFormValues[j].hasReturnFee = false
				break
			default:
				mutatedFormValues[j].hasReturnFee = false
			}
		}
		j += 1
	}
	return mutatedFormValues
}
