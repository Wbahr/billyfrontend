import _ from 'lodash'

export function formatRMAFormData(formValues) {
  let mutatedFormValues = []
  let j = 0
  for (let i = 0; i < formValues.length; i++) {
    if (formValues[i].willReturn && Number(formValues[i].returnQuantity) > 0) {
      mutatedFormValues[j] = _.pick(formValues[i], ['itemId', 'returnQuantity', 'willReturn', 'returnReason'])
      switch (mutatedFormValues[j].returnReason) {
        case ('other'):
          mutatedFormValues[j].other = _.get(formValues[i],`otherDesc`,'')
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
