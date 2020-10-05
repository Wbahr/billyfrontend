import gql from 'graphql-tag'

export const FRAGMENT_ITEM_DETAIL = gql`
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

export const FRAGMENT_ITEM_DETAIL_BRANDS = gql`
    fragment Brands on ItemGraphType {
        brand {
            id
            name
            supplierId
            logoLink
        }
    }
`

export const FRAGMENT_ITEM_DETAIL_FEATURES = gql`
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

export const FRAGMENT_ITEM_DETAIL_MEDIA = gql`
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

export const FRAGMENT_ITEM_DETAIL_ASSOCIATED_ITEMS = gql`
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

export const FRAGMENT_ITEM_DETAIL_ITEM_LINKS = gql`
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

export const FRAGMENT_ITEM_DETAIL_TECH_SPECS = gql`
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
