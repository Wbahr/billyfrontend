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

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($order: OrderInputDataInputGraphType){
    submitOrder(orderInput: $order){
      webReferenceId
      messages
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
        airlineCost
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
			orderNumber
			orderDate
			poNo
			buyer
			total
			isQuote
			status
			isMine
			lineItems{
				invMastUid
				itemCode
				customerPartNumber
				customerPartNumberId
			}
		}
	}
`

export const GET_ORDERS_DETAIL = gql`
	query AccountOrderDetails($orderNumber: String){
		accountOrderDetails(orderNumber: $orderNumber){
			orderNumber
			orderDate
			poNo
			buyer
			total
			isQuote
			orderType
			status
			packingBasis
			promiseDate
			isMine
			shipToName
			shipToAddress1
			shipToAddress2
			shipToAddress3
			shipToCity
			shipToState
			shipToZip
			shipToCountry
			lineItems{
				lineItemId
				orderNumber
				lineNumber
				invMastUid
				itemCode
				customerPartNumber
				customerPartNumberId
				quantityOrdered
				quantityOpen
				unitPrice
				totalPrice
				trackingNumbers{
					carrierId
					carrierName
					trackingNumber
					trackingUrl
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
			invoiceDate
			termsDueDate
			netDueDate
			poNo
			status
			amountDue
			amountPaid
			isMine
			lineItems{
				invMastUid
				itemCode
				customerPartNumber
				customerPartNumberId
			}
    }
  }
`

export const GET_INVOICE = gql`
	query AccountInvoiceDetail($invoiceNumber: String){
		accountInvoiceDetail(invoiceNumber: $invoiceNumber){
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

export const GET_PURCHASE_HISTORY = gql`
  query GetPurchaseHistory {
    purchaseHistory {
      invMastUid
      itemId
      customerPartNumber
      lastDateOrdered
      lastQuantityPurchased
      totalQuantityPurchased
      quantityAvailable
      numberTimesOrdered
      leadTimeDays
      unitOfMeasure
      itemImageUrl
      associatedOrderDetails {
        orderNumber
        pONumber
        webReferenceNumber
      }
    }
  }
`;

export const GET_ITEM_PRICE = gql`
  query GetItemPrices($items: [ItemQuantityInput]) {
    getItemPrices(items: $items) {
      invMastUid
      quantity
      totalPrice
      unitPrice
    }
  }
`

export const GET_ITEM_AVAILABILITY = gql`
  query GetItemAvailability($invMastUids: [Int]){
    itemAvailability(invMastUids: $invMastUids) {
      invMastUid
      availability
      leadTimeDays
    }
  }
`

export const GET_SHOPPING_LISTS = gql`
	query GetShoppingLists {
		shoppingList {
	    id
	    contactIdOwner
	    name
	    notes
	    editors {
	      contactId
	      firstName
	      lastName
	    }
	    items {
	      invMastUid
	      itemCode
	      quantity
	      customerPartNumber
		    customerPartNumberId
		    itemDescription
		    imageUrl
	    }
	  }
  }
`

export const UPDATE_SHOPPING_LISTS = gql`
	mutation ShoppingListUpdate($shoppingList: ShoppingListInput) {
		shoppingListEdit(shoppingList: $shoppingList) {
		  id
		  contactIdOwner
		  name
		  notes
		  deleted
		  editors {
		    contactId
		    firstName
		    lastName
		  }
		  items {
	      invMastUid
	      itemCode
	      quantity
	      customerPartNumber
		    customerPartNumberId
		    itemDescription
		    imageUrl
		  }
		}
	}
`

export const GET_WEB_USER_CONTACTS = gql`
	query GetWebUserContacts {
		webUsers {
			contactId
			firstName
			lastName
		}
	}
`

export const GET_CHECKOUT_DATA = gql`
  query RetrieveCheckoutData {
    getCheckoutDropdownData{
      shipToAddresses{
        id
        name
        companyName
        physAddress1
        physAddress2
        physAddress3
        physCity
        physState
        physPostalCode
        physCountry
        collectNumberUps
      }
      carriers{
        freightMultiplier
        noAutoAllocation
        otherShippingMethodFlag
        shippingMethodName
        shippingMethodUid
        shippingMethodValue
        showInListFlag
      }
      contacts{
        id
        firstName
        lastName
        phoneNumber
        email
      }
      termsDescription
      customerPhysicalAddress{
        id
        name
        companyName
        physAddress1
        physAddress2
        physAddress3
        physCity
        physState
        physPostalCode
        physCountry
      }
    }
  }
`

export const GET_PAYMENT_METHOD_INFO = gql`
	query GetPaymentMethodInfo ($paymentMethodRequest: PaymentMethodInfoRetrieve){
		paymentMethodInfo(paymentMethodInfo: $paymentMethodRequest){
			paymentSystemSecretKey
			paymentSystemCustomerId
			paymentMethods{
				paymentMethodId
				paymentSystemCustomerId
				type
				card{
					brand
					expirationMonth
					expirationYear
					lastFour
				}
			}
		}
	}
`