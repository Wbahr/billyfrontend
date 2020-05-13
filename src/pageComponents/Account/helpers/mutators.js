import React from 'react'
import _ from 'lodash'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'

export function formatTableData(type, data, orderId){
  let mutatedData = []
  switch(type){
    case 'orders':
      for(let i = 0; i < data.length; i++) {
        let elem = data[i]
        if(!elem.isQuote){
          let partNumbers = ''
          for(let j = 0; j < elem.lineItems.length ;j++) {
            let lineItem = elem.lineItems[j]
            partNumbers = partNumbers + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
          }
          let filterField = elem.orderNumber + ' ' + elem.poNo + ' ' + partNumbers + ' ' + elem.buyer
          filterField = filterField.toUpperCase()
          let displayTotal = <NumberFormat value={elem.total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
          let epoch = Date.parse(elem.orderDate)
          let formattedDate = dateFormat(new Date(epoch), 'MM/dd/yyyy')
          mutatedData.push(
            {
              'orderNumber': elem.orderNumber,
              'orderDate': formattedDate,
              'poNo': elem.poNo,
              'status': elem.status,
              'buyer': elem.buyer,
              'total': displayTotal,
              'filter': filterField,
              'orderType': elem.orderType
            }
          )
        }
      }
      break
    case 'open-orders':
      for(let i = 0; i < data.length; i++) {
        let elem = data[i]
        if(!elem.isQuote && elem.status === 'Open'){
          let epoch = Date.parse(elem.orderDate);
          let formattedDate = dateFormat(new Date(epoch), 'MM/dd/yyyy')
          for(let j = 0; j < elem.lineItems.length ;j++) {
            let lineItem = elem.lineItems[j]
            let unitPrice = <NumberFormat value={lineItem.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
            let extPrice = 
            <NumberFormat value={lineItem.unitPrice * lineItem.quantityOrdered} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
            let filterField = elem.poNo + ' ' + elem.orderNumber + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
            filterField = filterField.toUpperCase()
            mutatedData.push(
              {
                'orderNumber': elem.orderNumber,
                'orderDate': formattedDate,
                'line': j + 1,
                'poNo': elem.poNo,
                'promiseDate': '1/1/2020',
                'itemId': lineItem.itemCode,
                'customerPartId': lineItem.customerPartNumber,
                'qtyRemaining': `${lineItem.quantityOpen} / ${lineItem.quantityOrdered}`,
                'unitPrice': unitPrice,
                'extPrice':  extPrice,
                'filter': filterField
              }
            )
          }
        }
      }
      break
      case 'quotes':
      for(let i = 0; i < data.length; i++) {
        let elem = data[i]
        if(elem.isQuote){
          let partNumbers = ''
          for(let j = 0; j < elem.lineItems.length ;j++) {
            let lineItem = elem.lineItems[j]
            partNumbers = partNumbers + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
          }
          let filterField = elem.orderNumber + ' ' + partNumbers
          filterField = filterField.toUpperCase()
          let displayTotal = '$' + elem.total.toFixed(2)
          let epoch = Date.parse(elem.orderDate)
          let formattedDate = dateFormat(new Date(epoch), 'MM/dd/yyyy')
          mutatedData.push(
            {
              'quoteNumber': elem.orderNumber,
              'quoteDate': formattedDate,
              'quoteRefNo': 'quoteRefNo',
              'total': displayTotal,
              'filter': filterField,
            }
          )
        }
      }
        break
      case 'order-detail':
        for(let i = 0; i < data.length; i++) {
          let elem = data[i]
          if(elem.orderNumber === orderId){
            mutatedData = elem
            break
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