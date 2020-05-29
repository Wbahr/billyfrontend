import gql from 'graphql-tag'

export const BEGIN_IMPERSONATION = gql`
  query BeginImpersonation ($customerId: Int){
    impersonationBegin(customerId: $customerId){
      success
      message
      authorizationInfo{
        token
        userInfo{
          companyId
          companyName
          firstName
          lastName
          role
          permissions
          limits{
            limitType
            limitValue
          }
        }
        impersonationUserInfo{
          customerId
          customerName
          customerIdP21
        }
      }
    }
  }
`

export const END_IMPERSONATION = gql`
  query EndImpersonation{
    impersonationEnd{
      success
      message
      authorizationInfo{
        token
        userInfo{
          companyId
          companyName
          firstName
          lastName
          role
          permissions
          limits{
            limitType
            limitValue
          }
        }
      }
    }
  }
`

export const GET_TAXES = gql`
  query GetCheckoutData($checkoutDataRequest: CheckoutDataRequestInputGraphType) {
    getCheckoutData(checkoutDataRequest: $checkoutDataRequest) {
      grandTotal
      subTotal
      tariffTotal
      taxTotal
      taxRate
      checkoutItems {
        frecno
        itemNotes
        itemTotalPrice
        itemTotalTariff
        itemUnitPrice
        quantity
        requestedShipDate
      }
    }
  }
`

export const GET_ITEM_BY_ID = gql`
  query ItemById($itemId: Int){
    itemDetails(invMastUid: $itemId) {
      anonPrice
      invMastUid
      itemCode
      itemDesc
      listPrice
      mfgPartNo
      modelCode
      tariff
      unitSizeMultiple
      availability
      availabilityMessage
      image {
        path
        sequence
        type
      }
    }
    customerPartNumbers(frecno: $itemId){
      customerPartNumber
      id
    }
  }
`
export const GET_ITEMS_BY_ID = gql`
  query GetItemDetails($invMastUids: [Int]){
    itemDetailsBatch(invMastUids: $invMastUids){
      anonPrice
      invMastUid
      itemCode
      itemDesc
      listPrice
      mfgPartNo
      modelCode
      tariff
      unitSizeMultiple
      availability
      availabilityMessage
      image {
        path
        sequence
        type
      }
    }
    customerPartNumbersBatch(invMastUids: $invMastUids){
      id
      invMastUid
      customerPartNumber
    }
  }
`

export const UPDATE_CART = gql`
  mutation UpdateCart($cartInfo: ShoppingCartUpdate){
    shoppingCart(cartUpdate: $cartInfo){
      token
      cartItems{
        frecno
        customerPartNumberId
        quantity
        itemNotes
        itemUnitPriceOverride
      }
      subtotal
      tariff
      orderNotes
      action
    }
  }
`

const QUERY_LOGIN = gql`
  query SubmitLogin($loginInfo: LoginInputGraphType){
    submitLogin(login: $loginInfo){
      success
      message
      isPasswordReset
      authorizationInfo{
        token
        userInfo {
          firstName
          lastName
          companyName
          companyId
          role
          permissions
          limits {
            limitType
            limitValue
          }
        }
      }
    }
  }
`

export const GET_ORDERS = gql`
  query {
    accountOrders{
      orderDate
      orderNumber
      poNo
      isQuote
      orderType
      status
      packingBasis
      total
      buyer
      shipToName
      shipToAddress1
      shipToAddress2
      shipToAddress3
      shipToCity
      shipToState
      shipToZip
      shipToCountry
      lineItems{
        invMastUid
        itemCode
        customerPartNumber
        customerPartNumberId
        quantityOrdered
        quantityOpen
        unitPrice
        totalPrice
        trackingNumbers{
          trackingNumber
          carrierId
        }
      }
    }
  }
`

export const GET_INVOICES = gql`
  query AccountInvoices($batchNumber: Int, $batchSize: Int){
    accountInvoices(batchNumber: $batchNumber, batchSize: $batchSize){
      invoiceNumber
      orderNumber
      orderDate
      invoiceDate
      termsDueDate
      netDueDate
      discDueDate
      orderedBy
      taker
      poNo
      totalAmount
      status
      discountAmount
      amountPaid
      isMine
      terms
      shipToName
      shipToAddress1
      shipToAddress2
      shipToAddress3
      shipToCity
      shipToState
      shipToZip
      shipToCountry
      billingName
      billingAddress1
      billingAddress2
      billingAddress3
      billingCity
      billingState
      billingZip
      billingCountry
      subTotal
      totalTax
      amountDue
      lineItems {
        invoiceLineId
        orderNumber
        isTaxItem
        isOtherItem
        invoiceLineType
        invoiceLineNumber
        orderLineNumber
        quantityRequested
        quantityShipped
        pricingQuantity
        invMastUid
        itemCode
        itemDescription
        customerPartNumber
        customerPartNumberId
        unitPrice
        itemTotalPrice
        trackingNumbers{
          trackingNumber
          carrierId
          carrierName
          trackingUrl
        }
      }
    }
  }
`

export const GET_INVOICE = gql`
	query AccountInvoice($invoiceNumber: String){
		accountInvoice(invoiceNumber: $invoiceNumber){
			invoiceNumber
      orderNumber
      orderDate
      invoiceDate
      termsDueDate
      netDueDate
      discDueDate
      orderedBy
      taker
      poNo
      totalAmount
      status
      discountAmount
      amountPaid
      isMine
      terms
      shipToName
      shipToAddress1
      shipToAddress2
      shipToAddress3
      shipToCity
      shipToState
      shipToZip
      shipToCountry
      billingName
      billingAddress1
      billingAddress2
      billingAddress3
      billingCity
      billingState
      billingZip
      billingCountry
      subTotal
      totalTax
      amountDue
      lineItems {
        invoiceLineId
        orderNumber
        isTaxItem
        isOtherItem
        invoiceLineType
        invoiceLineNumber
        orderLineNumber
        quantityRequested
        quantityShipped
        pricingQuantity
        invMastUid
        itemCode
        itemDescription
        customerPartNumber
        customerPartNumberId
        unitPrice
        itemTotalPrice
        trackingNumbers{
          trackingNumber
          carrierId
          carrierName
          trackingUrl
				}
			}
		}
	}
`