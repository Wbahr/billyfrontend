import _ from 'lodash'

export function emailIsValid (email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function requiredField(value) {
	let valid = true
	if (_.isNil(value)) {
		valid = false
	} else if (value.length === 0) {
		valid = false
	}
	return valid
}

export const getRidOf__typename = ({__typename, editors, items, ...rest}) => (
	{ ...rest, editors: editors.map(({__typename, ...rest1}) => rest1), items: items.map(({__typename, ...rest2}) => rest2) }
)