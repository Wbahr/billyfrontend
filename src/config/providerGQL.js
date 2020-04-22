import gql from 'graphql-tag'

export const UPDATE_SHOPPING_CART = gql`
  mutation UpdateShoppingCart($cartData: ShoppingCartUpdateInputGraphType) {
    updateShoppingCart(cartUpdate: $cartData) {
      token
      cartData
      orderNotes
      subtotal
      tariff
      cartItems{
        frecno
        airlineCost
        quantity
      }
    }
  }
`

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