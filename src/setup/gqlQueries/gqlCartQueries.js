import gql from 'graphql-tag'
import { FRAGMENT_ITEM_DETAIL, FRAGMENT_ITEM_DETAIL_MEDIA,
    FRAGMENT_ITEM_AVAILABILITY,
    FRAGMENT_ITEM_CUSTOMER_PART_NUMBER,
    FRAGMENT_ITEM_SOURCE_LOCATION,
    FRAGMENT_ITEM_PRICE } from '../gqlFragments/gqlItemFragments'

export const GET_CART_DATA = gql`
    query CartDataQuery($itemsAndQuantities: [ItemAndQuantityInput]) {
        cartData(itemsAndQuantities: $itemsAndQuantities) {
            availabilities {
                ...ItemAvailability
            }
            customerPartNumbers {
                ...ItemCustomerPartNumber
            }
            itemDetails {
                ...ItemDetails
                ...Media
            }
            itemPrices {
                ...ItemPrice
            }
            sourceLocations {
                ...ItemSourceLocation
            }
            lineNoteAreas
        }
    }
	${FRAGMENT_ITEM_DETAIL}
	${FRAGMENT_ITEM_AVAILABILITY}
	${FRAGMENT_ITEM_CUSTOMER_PART_NUMBER}
    ${FRAGMENT_ITEM_PRICE}
    ${FRAGMENT_ITEM_SOURCE_LOCATION}
    ${FRAGMENT_ITEM_DETAIL_MEDIA}
`

export const GET_CART_AVAIILABILITIES = gql`
    query CartDataQuery($itemsAndQuantities: [ItemAndQuantityInput]) {
        cartData(itemsAndQuantities: $itemsAndQuantities) {
            availabilities {
                ...ItemAvailability
            }
        }
    }
	${FRAGMENT_ITEM_AVAILABILITY}
`