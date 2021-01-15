import gql from 'graphql-tag'
import { FRAGMENT_ITEM_AVAILABILITY } from 'config/gqlFragments/gqlItemFragments'

export const BEGIN_IMPERSONATION = gql`
  query BeginImpersonation ($customerId: Int){
    impersonationBegin(customerId: $customerId){
      success
      message
      authorizationInfo {
        token
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
      messages
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
      availabilityMessage
      itemMedia {
        path
        sequence
        itemMediaType
        mediaType
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
      invMastUid
      itemCode
      itemCodeUrlSanitized
      itemDesc
      mfgPartNo
      modelCode
      tariff
      unitSizeMultiple
      availability
      availabilityMessage
      itemMedia {
        path
        sequence
        mediaType
        itemMediaType
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
        priceReasonId
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
      unitOfMeasure
      isUnitConversion
      roundType
      unitSize
      spaType
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
			searchState {
				parentCategories {
					parentCategoryName
					parentCategoryDisplayName
					parentCategoryCount
					selected
				}
				childCategories {
					childCategoryName,
					childCategoryDisplayName
					childCategoryCount
					selected
				}
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

export const GET_PRICE_REASONS = gql`
  query GetPriceReasons {
    priceReasons {
      id
      priceReason
    }
  }
`