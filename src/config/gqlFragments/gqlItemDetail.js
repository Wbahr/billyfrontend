import gql from 'graphql-tag'

const FRAGMENT_ITEM_DETAIL = gql`
    fragment ItemDetails on ItemGraphType {
        anonPrice
        assembly
        availability
        availabilityMessage
        cBrandId
        dateCreated
        dateModified
        extendedDesc
        filters
        hideOnWeb
        invMastUid
        itemCode
        itemCodeUrlSanitized
        itemDesc
        mfgPartNo
        modelCode
        p21ItemDesc
        p21NonWeb
        popularity
        preferredSourceLoc
        relevancy
        restrictedCustomerCodes
        rootCategoryUids
        showPrice
        supplierId
        tariff
        unitSizeMultiple
    }
`

const FRAGMENT_ITEM_DETAIL_BRANDS = gql`
    fragment Brands on ItemGraphType {
        brand {
            id
            name
            supplierId
            logoLink
        }
    }
`

const FRAGMENT_ITEM_DETAIL_FEATURES = gql`
    fragment Features on ItemGraphType {
        feature {
            createDate
            createdBy
            invMastUid
            lastModifiedDate
            modifiedBy
            sequence
            text
            type
            id
        }
    }
`

const FRAGMENT_ITEM_DETAIL_MEDIA = gql`
    fragment Media on ItemGraphType {
        image {
            path
            sequence
            itemMediaType
            mediaType
            mediaId
        }
    }
`

const FRAGMENT_ITEM_DETAIL_ASSOCIATED_ITEMS = gql`
    fragment AssociatedItems on ItemGraphType{
        associatedItems {
            associatedInvMastUid
            createDate
            createdBy
            invMastUid
            lastModifiedDate
            modifiedBy
            quantity
            type
            id
        }
    }
`

const FRAGMENT_ITEM_DETAIL_ITEM_LINKS = gql`
    fragment ItemLinks on ItemGraphType {
        itemLink {
            audienceType
            createDate
            createdBy
            invMastUid
            lastModifiedDate
            linkPath
            linkType
            modifiedBy
            sequence
            thumbnail
            title
            id
        }
    }
`

const FRAGMENT_ITEM_DETAIL_TECH_SPECS = gql`
    fragment TechSpecs on ItemGraphType {
        techSpec {
            attributeId
            createDate
            createdBy
            invMastUid
            lastModifiedDate
            modifiedBy
            name
            sequence
            id
            value
        }
    }
`

export const GET_MAIN_ITEM_BY_ID = gql`
	query ItemById($itemId: Int) {
		customerPartNumbers(frecno: $itemId){
			customerPartNumber
			id
		}
		itemDetails(invMastUid: $itemId) {
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
`

export const GET_ACCESSORY_ITEM_DETAILS = gql`
	query GetAccessoryItems($invMastUids: [Int]){
		itemDetailsBatch(invMastUids: $invMastUids){
			...ItemDetails
			...Media
		}
	}
	${FRAGMENT_ITEM_DETAIL}
	${FRAGMENT_ITEM_DETAIL_MEDIA}
`

export const GET_SHOPPING_CART_ITEM_DETAIL = gql`
    query GetShoppingCartItemsDetails($invMastUids: [Int]){
        itemDetailsBatch(invMastUids: $invMastUids){
            ...ItemDetails
        }
    }
    ${FRAGMENT_ITEM_DETAIL}
`

export const GET_ITEM_CUSTOMER_PART_NUMBERS = gql`
    query GetCustomerPartNumbers($invMastUids: [Int]){
        customerPartNumbersBatch(invMastUids: $invMastUids){
            invMastUid
			customerPartNumber
			id
		}
    }
`
