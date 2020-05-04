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
            partNumbers = partNumbers + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
          }
          let filterField = elem.orderNumber + ' ' + elem.poNo + ' ' + partNumbers
          let displayTotal = '$' + elem.total.toFixed(2)
          let epoch = Date.parse(elem.orderDate);
          let DateObj = new Date(epoch)
          let formattedDate = DateObj.getFullYear() + '/' +  (DateObj.getMonth() + 1) + '/' + DateObj.getDate()
          mutatedData.push(
            {
              'orderNumber': elem.orderNumber,
              'orderDate': formattedDate,
              'poNo': elem.poNo,
              'status': elem.status,
              'buyer': elem.buyer,
              'total': displayTotal,
              'filter': filterField
            }
          )
        }
      }
      break
  }
  return mutatedData
}

export function clipboardData(headers, data){
  let mutatedData = ''
  for(let i = 0; i < headers.length ;i++){
    let header = headers[i].Header
    if(!_.isNil(header) && header !== 'Filter'){
      mutatedData += header + ' '
    }
  }
  for(let j = 0; j < data.length ;j++){
    let dataObj = data[j]
    mutatedData += dataObj.orderNumber + ' ' + dataObj.orderDate + ' ' + dataObj.poNo + ' ' + dataObj.status + ' ' + dataObj.buyer + '  ' + dataObj.total
  }

  return mutatedData
}