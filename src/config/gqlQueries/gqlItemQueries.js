import gql from 'graphql-tag'
import { FRAGMENT_ITEM_DETAIL, FRAGMENT_ITEM_DETAIL_ASSOCIATED_ITEMS,
		FRAGMENT_ITEM_DETAIL_BRANDS, FRAGMENT_ITEM_DETAIL_FEATURES,
		FRAGMENT_ITEM_DETAIL_ITEM_LINKS, FRAGMENT_ITEM_DETAIL_MEDIA,
		FRAGMENT_ITEM_DETAIL_TECH_SPECS, FRAGMENT_ITEM_AVAILABILITY,
		FRAGMENT_ITEM_CUSTOMER_PART_NUMBER } from 'config/gqlFragments/gqlItemFragments'

export const GET_ITEM_DETAIL_PAGE_ITEM_INFO = gql`
	query ItemById($invMastUid: Int) {
		customerPartNumbers(frecno: $invMastUid){
			...ItemCustomerPartNumber
		}
		itemAvailabilitySingular(invMastUid: $invMastUid){
			...ItemAvailability
		}
		itemDetails(invMastUid: $invMastUid) {
			...ItemDetails
			...Brands
			...Features
			...Media
			...AssociatedItems
			...ItemLinks
			...TechSpecs
		}
	}
	${FRAGMENT_ITEM_DETAIL}
	${FRAGMENT_ITEM_DETAIL_BRANDS}
	${FRAGMENT_ITEM_DETAIL_FEATURES}
	${FRAGMENT_ITEM_DETAIL_MEDIA}
	${FRAGMENT_ITEM_DETAIL_ASSOCIATED_ITEMS}
	${FRAGMENT_ITEM_DETAIL_ITEM_LINKS}
	${FRAGMENT_ITEM_DETAIL_TECH_SPECS}
	${FRAGMENT_ITEM_AVAILABILITY}
	${FRAGMENT_ITEM_CUSTOMER_PART_NUMBER}
`

export const GET_ACCESSORY_ITEMS_INFO = gql`
	query GetAccessoryItems($invMastUids: [Int]){
		itemAvailability(invMastUids: $invMastUids){
			...ItemAvailability
		}
		itemDetailsBatch(invMastUids: $invMastUids){
			...ItemDetails
			...Media
		}
	}
	${FRAGMENT_ITEM_DETAIL}
	${FRAGMENT_ITEM_DETAIL_MEDIA}
	${FRAGMENT_ITEM_AVAILABILITY}
`

export const GET_SHOPPING_CART_ITEM_DETAIL = gql`
    query GetShoppingCartItemsDetails($invMastUids: [Int]){
        itemDetailsBatch(invMastUids: $invMastUids){
            ...ItemDetails
			image {
				path
				sequence
				itemMediaType
				mediaType
				mediaId
			}
        }
    }
    ${FRAGMENT_ITEM_DETAIL}
`

export const GET_CHECKOUT_ITEM_DETAIL = gql`
    query GetShoppingCartItemsDetails($invMastUids: [Int]){
        itemDetailsBatch(invMastUids: $invMastUids){
            ...ItemDetails
			image {
				path
				sequence
				itemMediaType
				mediaType
				mediaId
			}
        }
    }
    ${FRAGMENT_ITEM_DETAIL}
`

export const GET_ITEM_CUSTOMER_PART_NUMBERS = gql`
    query GetCustomerPartNumbers($invMastUids: [Int]){
        customerPartNumbersBatch(invMastUids: $invMastUids){
            ...ItemCustomerPartNumber
		}
    }
	${FRAGMENT_ITEM_CUSTOMER_PART_NUMBER}
`