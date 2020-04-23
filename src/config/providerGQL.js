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