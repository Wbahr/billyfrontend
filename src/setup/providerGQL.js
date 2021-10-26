import gql from 'graphql-tag'
import { FRAGMENT_ITEM_AVAILABILITY } from 'setup/gqlFragments/gqlItemFragments'

export const BEGIN_IMPERSONATION = gql`
  query BeginImpersonation ($customerId: Int){
    impersonationBegin(customerId: $customerId){
      success
      message
      authorizationInfo {
        token
        refreshToken
        userInfo {
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
        impersonationUserInfo {
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
        refreshToken
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

//Variables example: {variables: {'searchString': 'blah'}}
export const IMPERSONATION_SEARCH = gql`
  query GetImpersonationCustomerList($searchString: String){
    getImpersonationCustomerList(searchString: $searchString){
      customerIdP21
      name
      id
    }
  }
`

export const GET_TAX_RATE = gql`
  query GetTaxRate($taxRateRequest: TaxRateRequest) {
    getTaxRate(taxRateRequest: $taxRateRequest)
  }
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($order: OrderInputDataInputGraphType){
    submitOrder(orderInput: $order){
      webReferenceId
      errorMessages
      checkoutType
      affiliateName
      itemsSubTotal
      taxTotal
      tariffTotal
      shippingCost
      grandTotal
      cartItems {
        invMastUid
        itemCode
        brand
        unitPrice
        quantity
      }
    }
  }
`

export const GET_ITEM_BY_ID = gql`
  query ItemById($itemId: Int){
    itemDetails(invMastUid: $itemId) {
      invMastUid
      itemCode
      itemCodeUrlSanitized
      itemDesc
      mfgPartNo
      modelCode
      tariff
      unitSizeMultiple
      availability
      itemMedia {
        path
        sequence
        itemMediaType
        mediaType
      }
      restrictedCustomers{
        name
        customerIdP21
      }
    }
    customerPartNumbers(invMastUid: $itemId){
      customerPartNumber
      id
    }
  }
`

export const GET_ITEMS_BY_ID = gql`
  query GetItemDetails($invMastUids: [Int]){
    itemDetailsBatch(invMastUids: $invMastUids){
      invMastUid
      itemCode
      itemCodeUrlSanitized
      itemDesc
      extendedDesc
      mfgPartNo
      modelCode
      tariff
      unitSizeMultiple
      availability
      itemMedia {
        path
        sequence
        mediaType
        itemMediaType
      }
      restrictedCustomers{
        name
        customerIdP21
      }
    }
  }
`

export const UPDATE_CART = gql`
  mutation UpdateCart($cartInfo: ShoppingCartUpdate){
    shoppingCart(cartUpdate: $cartInfo){
      token
      cartItems{
        uniqueId
        invMastUid
        customerPartNumberId
        quantity
        quoteLineQuantity
        quoteUnitPrice
        isQuoteLineActive
        itemNotes
        quoteLineId
        itemTotalTariff
        itemUnitPrice
        itemUnitPriceOriginal
        itemUnitPriceOverride
        airlineCost
        priceReasonId
        sourceLocId
        disposition
        promiseDate
        promiseDateOverride
        isDropship
      }
      subtotal
      tariff
      orderNotes
      action
    }
  }
`

export const ADD_CATALOG_ITEM = gql`
  mutation CatalogItemAdd($catalogItem: ShoppingCartCatalogItemAdd){
    shoppingCartAddCatalogItem(catalogItem: $catalogItem){
      token
      cartItems{
        uniqueId
        invMastUid
        customerPartNumberId
        quantity
        quoteLineQuantity
        quoteUnitPrice
        isQuoteLineActive
        itemNotes
        quoteLineId
        itemTotalTariff
        itemUnitPrice
        itemUnitPriceOriginal
        itemUnitPriceOverride
        airlineCost
        priceReasonId
        sourceLocId
        disposition
        promiseDate
        promiseDateOverride
        isDropship
      }
      subtotal
      tariff
      orderNotes
      action
    }
  }
`

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($changePasswordInfo: ChangePasswordGraphType) {
        changePassword(changePasswordInfo: $changePasswordInfo) {
            success
            message
        }
    }
`

export const QUERY_LOGIN = gql`
  query SubmitLogin($loginInfo: LoginInputGraphType){
    submitLogin(login: $loginInfo){
      success
      message
      isPasswordReset
      authorizationInfo{
        token
        refreshToken
        userInfo {
          firstName
          lastName
          companyName
          companyId
          role
          webUserId
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
      quoteRefNo
      promiseDate
      jobName
			lineItems{
        invMastUid
        itemCode
        customerPartNumber
        customerPartNumberId
        unitPrice
        quantityOrdered
        quantityOpen
        quoteLineId
        promiseDate
        disposition
			}
      quoteHeader {
        quoteId
        isCompleted
        expirationDate
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
			quoteRefNo
      quoteHeader {
        quoteId
        isCompleted
        expirationDate
      }
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
				quantityInvoiced
				unitPrice
				totalPrice
        quoteLineId
        promiseDate
        aroDays
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
`

export const GET_ITEM_PRICE = gql`
  query GetItemPrices($items: [ItemQuantityInput]) {
    getItemPrices(items: $items) {
      invMastUid
      quantity
      totalPrice
      unitPrice
      unitOfMeasure
      spaNumber
      spaCost
      spaMargin
      roundType
      unitSize
      spaType
      listPrice
    }
  }
`

export const GET_ITEM_AVAILABILITY = gql`
  query GetItemAvailability($invMastUids: [Int]){
    itemAvailability(invMastUids: $invMastUids) {
      ...ItemAvailability
    }
  }
  ${FRAGMENT_ITEM_AVAILABILITY}
`

export const GET_ITEM_AVAILABILITIES_AND_LEAD_TIMES = gql`
  query GetCartItemAvailabilityAndLeadTimes($itemsAndQuantities: [ItemAndQuantityInput]){
    itemAvailabilityAndLeadTimes(itemsAndQuantities: $itemsAndQuantities) {
      ...ItemAvailability
    }
  }
  ${FRAGMENT_ITEM_AVAILABILITY}
`

export const GET_SHOPPING_LISTS = gql`
	query GetShoppingLists {
		shoppingList {
	    id
	    webUserIdOwner
	    name
	    notes
	    editors {
	      webUserId
	      firstName
	      lastName
	    }
	    shoppingListItems {
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
		  webUserIdOwner
		  name
		  notes
		  deleted
		  editors {
		    webUserId
        firstName
        lastName
		  }
		  shoppingListItems {
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
			webUserId
			firstName
			lastName
		}
	}
`

export const QUERY_ITEM_SEARCH = gql`
	query Search($search: SearchRequestInput) {
		itemSearch(searchParams: $search) {
			searchTerm
			searchType
			innerSearchTerms
			sortType
			resultPage
			resultSize
			searchTotalCount
      selectedCategory {
        categoryId
        categoryName
        categoryDisplayName
        categoryCount
      }
      childCategories {
        categoryId
        categoryName
        categoryDisplayName
        categoryCount
      }
			searchState {
				brands {
					brandName
					brandNameDisplay
					brandCount
					selected
				}
				attributes {
					attributeName
					attributeNameDisplay
					features {
						featureName
						featureNameDisplay
						featureCount
						selected
					}
				}
			}
			result
		}
	}
`

export const CATEGORY_SEARCH = gql`
	query CategorySearch($searchParams: CategorySearchRequest){
  categorySearch(searchParams: $searchParams){
    category{
      id
      name
      urlSlug
      imageUrl
      seoHtml
      breadCrumbs{
        breadCrumbUrl
        breadcrumbTrail{
          id
          name
          urlSlug
          imageUrl
          seoHtml
        }
      }
      children{
        id
        name
        urlSlug
        imageUrl
        seoHtml
        breadCrumbs{
          breadCrumbUrl
          breadcrumbTrail{
            id
            name
            urlSlug
            imageUrl
            seoHtml
          }
        }
      }
    }
    attributes {
      attributeName
      attributeNameDisplay
      features {
        featureName
        featureNameDisplay
        featureCount
        selected
      }
    }
    brands {
      brandName
      brandNameDisplay
      brandCount
      selected
    }
    innerSearchTerms
    resultPage
    resultSize
    searchType
    sortType
    searchTotalCount
    result
  }
}

`

export const QUERY_STOCK_AVAILABILITY = gql`
    query GetStockAvailability($invMastUid: Int){
        airlineStock(invMastUid: $invMastUid){
            invMastUid
            itemCode
            itemCodeUrlSanitized
            companyId
            locationId
            locationName
            quantityAvailable
        }
        factoryStock(invMastUid: $invMastUid){
            invMastUid
            factoryAvailability
            leadTimeDays
            factoryMessage
            modifiedBy
            modifiedDate
        }
    }
`

export const QUERY_STOCK_AVAILABILITY_BATCH = gql`
    query GetStockAvailabilityBatch($invMastUids: [Int]){
        airlineStockBatch(invMastUids: $invMastUids){
            invMastUid
            itemCode
            itemCodeUrlSanitized
            companyId
            locationId
            locationName
            quantityAvailable
        }
        factoryStockBatch(invMastUids: $invMastUids){
            invMastUid
            factoryAvailability
            leadTimeDays
            factoryMessage
            modifiedBy
            modifiedDate
        }
    }
`

export const SAVE_NEW_CUSTOMER = gql`
  mutation SaveRegistration($reg: NewCustomerRegistrationInputGraphType) {
		saveRegistration(reg: $reg)
  	}
`

//Get a list of new customers that have not been processed yet (form submitted, but customers & logins not created)
export const GET_NEW_CUSTOMERS = gql`
    query newCustomers{
        newCustomers{
            id
            customerIdP21
            received
            email
            fax
            firstName
            jobTitle
            lastName
            phone
            phoneExtension
            billingCity
            billingCompanyName
            billingCountry
            billingLine1
            billingLine2
            billingState
            billingZip
            shippingCity
            shippingCompanyName
            shippingCountry
            shippingLine1
            shippingLine2
            shippingState
            shippingZip
        }
    }
`

export const GET_NEW_CUSTOMER = gql`
    query getNewCustomer($id: Int) {
        newCustomer(id: $id) {
            id
            customerIdP21
            email
            fax
            firstName
            jobTitle
            lastName
            phone
            phoneExtension
            billingCity
            billingCompanyName
            billingCountry
            billingLine1
            billingLine2
            billingState
            billingZip
            shippingCity
            shippingCompanyName
            shippingCountry
            shippingLine1
            shippingLine2
            shippingState
            shippingZip
        }
    }
`

//Pass a registrationCustomerID (from GET_NEW_CUSTOMERS) to reject the account request. It will
// not be available in subsequent GET_NEW_CUSTOMERS requests.
//Variables: { "id": 19 }
export const REJECT_NEW_CUSTOMER = gql`
    mutation rejectReg($id: Int, $reason: String) {
        rejectRegistration(id: $id, reason: $reason)
    }
`
//Pass a registrationCustomerID to import the account into (or associate an existing account in) P21 and
// create a login record from the associated contact
//Variables: { "id": 18 }
export const APPROVE_NEW_CUSTOMER = gql`
    mutation approveReg($id: Int) {
        approveRegistration(id: $id)
    }
`

export const GET_ALL_SETTINGS = gql`
    query appSettings {
        appSettings {
            newCustomerNotificationEmails
            contactUsNotificationEmails
            emailFrom
            siteBaseUrl
            adminDashNewCustomersRelativeUrl
            orderConfirmationEmailRecipients
        }
    }
`

export const SAVE_ALL_SETTINGS = gql`
    mutation saveAppSettings($settings: saveAppSettings) {
        saveAppSettings(settings: $settings)
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
        carrierId
        shippingNote
        shipToPackingBasis
      }
      carriers {
        id
        name
      }
      contacts {
        id
        firstName
        lastName
        phoneNumber
        email
      }
      billingInfo {
        requiresPONumber
        terms
        isNetTerms
        address1
        address2
        city
        state
        zip
        country
        companyName
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

export const GET_ROOT_CATEGORIES_HOMEPAGE =  gql`
  query GetRootCategoriesHomepage {
    getAllRootCategories{
      id
      name
      urlSlug
      imageUrl
    }
  }
`

export const GET_ROOT_CATEGORIES_HEADER = gql`
{
    getAllRootCategories {
        id
        name
        urlSlug
        imageUrl
        seoHtml
    }
}
`

export const GET_ROOT_CATEGORIES_PAGE = gql`
{
    getAllRootCategories {
        id
        name
        urlSlug
        imageUrl
        seoHtml
    }
}
`

export const GET_ALL_USER_CARTS = gql`
    query GetAllEmployeeCarts {
        employeeCarts {
            customerId
            customerName
            shoppingCartItemCount
        }
    }
`

export const MERGE_CART_TO_CUSTOMER = gql`
  mutation copyShoppingCartToCustomer($customerId: Int){
    copyShoppingCartToCustomer(customerId: $customerId) {
        customerId
        cartItems{
          invMastUid
        }
    }
  }
`

export const GET_PRICE_REASONS = gql`
  query GetPriceReasons {
    priceReasons {
      id
      priceReason
    }
  }
`

export const ADD_PREPAYMENT = gql`
  mutation a($thing : PrepaymentModel) {
    addPrepayment(prepayment: $thing) {
      amountToCharge
      orderNumber
      paymentSystemCustomerId
      paymentMethodId
      amountCharged
      status
      id
      createdDate
      processingInfo
      receiptCode
    }
  }
`

export const GET_PREPAYMENTS = gql`
  query getRemittances($startDate: DateTime) {
    getRemittances(startDate: $startDate) {
      amountCharged
      amountToCharge
      createdDate
      id
      orderNumber
      paymentMethodId
      paymentSystemCustomerId
      processingInfo
      receiptCode
      status
    }
  } 
`

export const ADVANCED_IMPERSONATION_SEARCH = gql`
  query ImpersonationCustomerAdvancedSearch(
    $searchType: String, 
    $searchString: String,
    $address1: String,
    $city: String,
    $stateCode: String,
    $postalCode: String,
    $contactFirstName: String,
    $contactLastName: String
  ){
    customerImpersonateAdvancedSearch(
      searchType: $searchType, 
      searchString: $searchString,
      address1: $address1,
      city: $city,
      stateCode: $stateCode,
      postalCode: $postalCode,
      contactFirstName: $contactFirstName,
      contactLastName: $contactLastName){
        customerIdP21
        customerName
        resultString
    }
  }
`

export const GET_HOMEPAGE = gql`
  query getMarketingData{
    getMarketingData {
      html
      href
      imageUrl
      key
      sectionName
      sort
      title
    }
  }
`

export const GET_AUTHENTICATION_HEARTBEAT = gql`
  mutation AuthenticationHeartbeat {
    authenticationHeartbeat
  }
`