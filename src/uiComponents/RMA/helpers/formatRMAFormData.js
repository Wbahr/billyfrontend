import _ from 'lodash'

export function formatRMAFormData(formValues) {
  let mutatedFormValues = []
  let j = 0
  for (let i = 0; i < formValues.length; i++) {
    if (formValues[i].willReturn) {
      mutatedFormValues[j] = _.pick(formValues[i],
         ['itemId', 'returnQuantity', 'willReturn'])
      j += 1
    }
  }
  return mutatedFormValues
}
