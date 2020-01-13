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

export function formatCurrency(number){
  let formattedCurrency
  if(isNaN(number)){
    formattedCurrency = '--'
  } else {
    console.log('nubme', typeof number)
    formattedCurrency = Number(number).toFixed(2)
    formattedCurrency = '$' + formattedCurrency
  }
  return formattedCurrency
}
