import _ from 'lodash'

export function formatRMAFormData(formValues) {
  let mutatedFormValues = {}
  for (let i = 0; i < formValues.length; i++) {
    if (formValues[i].willReturn) {
      mutatedFormValues[i] = _.pick(formValues[i],
         ['itemId', 'returnQuantity', 'willReturn'])
    }
  }
  return mutatedFormValues
}
