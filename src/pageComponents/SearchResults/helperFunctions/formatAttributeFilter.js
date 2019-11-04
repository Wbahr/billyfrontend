export default function formatAttributeFilter(valves){
  let attributeFiltersArray = []
  let attributeKeys = Object.keys(valves)
  for(let i = 0; attributeKeys.length > i ; i++){
    let object = {
      'field': attributeKeys[i],
      'values':  valves[attributeKeys[i]]
    }
    attributeFiltersArray.push(object)
  }
  let mutatedValue = { "attributeFilters": attributeFiltersArray }
  return mutatedValue
}