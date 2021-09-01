import React from 'react'
import { format as dateFormat } from 'date-fns'
import NumberFormat from 'react-number-format'

const isNil = val => val == null

export function formatTableData(type, data, orderId){
    let mutatedData = []
    switch (type){
    case 'orders':
        for (let i = 0; i < data.length; i++) {
            const elem = data[i]
            if (!elem.isQuote){
                let partNumbers = ''
                for (let j = 0; j < elem.lineItems.length ;j++) {
                    const lineItem = elem.lineItems[j]
                    partNumbers = partNumbers + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
                }
                let filterField = elem.orderNumber + ' ' + elem.poNo + ' ' + partNumbers + ' ' + elem.buyer
                filterField = filterField.toUpperCase()
                const displayTotal = <NumberFormat value={elem.total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale/>
                mutatedData.push(
                    {
                        orderNumber: elem.orderNumber,
                        orderDate: elem.orderDate,
                        poNo: elem.poNo,
                        status: elem.status,
                        buyer: elem.buyer,
                        total: displayTotal,
                        filter: filterField,
                        orderType: elem.orderType
                    }
                )
            }
        }
        break
    case 'open-orders':
        for (let i = 0; i < data.length; i++) {
            const elem = data[i]
            if (!elem.isQuote && elem.status === 'Open'){
                for (let j = 0; j < elem.lineItems.length ;j++) {
                    const lineItem = elem.lineItems[j]
                    if (lineItem.quantityOpen > 0) {
                        let filterField = elem.poNo + ' ' + elem.orderNumber + ' '
                        filterField = filterField.toUpperCase()
                        mutatedData.push(
                            {
                                orderNumber: elem.orderNumber,
                                orderDate: elem.orderDate,
                                poNo: elem.poNo,
                                promiseDate: elem.promiseDate,
                                qtyRemaining: `${lineItem.quantityOpen} / ${lineItem.quantityOrdered}`,
                                invMastUid: lineItem.invMastUid,
                                customerPartNumber: lineItem.customerPartNumber,
                                unitPrice: lineItem.unitPrice.toFixed(2),
                                extPrice: (lineItem.unitPrice * lineItem.quantityOrdered).toFixed(2),
                                filter: filterField,
                                formattedOrderDate: isNil(elem.orderDate) ? '--' :dateFormat(new Date(elem.orderDate), 'MM/dd/yyyy'),
                                formattedPromiseDate: isNil(elem.promiseDate) ? '--' :dateFormat(new Date(elem.promiseDate), 'MM/dd/yyyy'),
                            }
                        )
                    }
                    
                }
                
            }
        }
        break
    case 'quotes':
        for (let i = 0; i < data.length; i++) {
            const elem = data[i]
            if (elem.isQuote){
                let partNumbers = ''

                for (let j = 0; j < elem.lineItems.length ;j++) {
                    const lineItem = elem.lineItems[j]
                    partNumbers = partNumbers + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
                }
                
                let filterField = elem.orderNumber + ' ' + partNumbers
                filterField = filterField.toUpperCase()

                const displayTotal = '$' + elem.total.toFixed(2)
                mutatedData.push(
                    {
                        quoteNumber: elem.orderNumber,
                        quoteDate: elem.orderDate,
                        quoteRefNo: elem.quoteRefNo,
                        total: displayTotal,
                        status: elem.status,
                        filter: filterField,
                        quoteId: elem.quoteHeader?.quoteId,
                        isCompleted: elem.quoteHeader?.isCompleted,
                        expirationDate: elem.quoteHeader?.expirationDate
                    }
                )
            }
        }
        break
    case 'order-detail':
        for (let i = 0; i < data.length; i++) {
            const elem = data[i]
            if (elem.orderNumber === orderId){
                mutatedData = elem
                break
            }
        }
        break
    case 'invoices':
        for (let i = 0; i < data.length; i++) {
            const elem = data[i]
            let partNumbers = ''
            for (let j = 0; j < elem.lineItems.length ;j++) {
                const lineItem = elem.lineItems[j]
                partNumbers = partNumbers + ' ' + lineItem.itemCode + ' ' + lineItem.customerPartNumber
            }
            let filterField = elem.orderNumber + ' ' + elem.invoiceNumber + ' ' + elem.poNo + ' ' + partNumbers
            filterField = filterField.toUpperCase()
            const amountPaid = '$' + elem.amountPaid.toFixed(2)
            const amountDue = '$' + elem.amountDue.toFixed(2)
            mutatedData.push(
                {
                    dueDate: elem.netDueDate,
                    invoiceDate: elem.invoiceDate,
                    invoiceNumber: elem.invoiceNumber,
                    orderNumber: elem.orderNumber,
                    poNo: elem.poNo,
                    status: elem.status,
                    amountPaid: amountPaid,
                    amountDue: amountDue,
                    filter: filterField,
                }
            )
        }		
        break
    }
    return mutatedData
}

export function clipboardData(headers, data){
    let mutatedData = ''
    for (let i = 0; i < headers.length ;i++){
        const header = headers[i].Header
        if (!isNil(header) && header !== 'Filter'){
            mutatedData += header + ' '
        }
    }
    for (let j = 0; j < data.length ;j++){
        const dataObj = data[j]
        mutatedData += dataObj.orderNumber + ' ' + dataObj.orderDate + ' ' + dataObj.poNo + ' ' + dataObj.status + ' ' + dataObj.buyer + '  ' + dataObj.total
    }

    return mutatedData
}