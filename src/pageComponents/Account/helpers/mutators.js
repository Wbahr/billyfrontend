import _ from 'lodash'

export function formatTableData(type, data){
  let mutatedData = []
  switch(type){
    case 'orders':
      for(let i = 0; i < data.length; i++) {
        let elem = data[i]
        if(elem.type === 'Order'){
          let partNumbers = ''
          for(let j = 0; j < elem.lineItems.length ;j++) {
            let lineItem = elem.lineItems[j]
            partNumbers = partNumbers + ' ' + lineItem.itemCode
          }
          let filterField = elem.orderNumber + ' ' + elem.poNo + ' ' + partNumbers
          mutatedData.push(
            {
              'orderNumber': elem.orderNumber,
              'orderDate': elem.orderDate,
              'poNo': elem.poNo,
              'status': elem.status,
              'buyer': elem.buyer,
              'total': elem.total,
              'filter': filterField
            }
          )
        }
      }
      break
  }
  return mutatedData
}