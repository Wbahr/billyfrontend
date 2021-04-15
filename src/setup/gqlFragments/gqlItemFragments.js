import gql from 'graphql-tag'

export const FRAGMENT_ITEM_DETAIL = gql`
    fragment ItemDetails on ItemGraphType {
        availability
        brandId
        dateCreated
        dateModified
        extendedDesc
        hideOnWeb
        invMastUid
        itemCode
        itemCodeUrlSanitized
        itemDesc
        mfgPartNo
        modelCode
        popularity
        relevancy
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
        itemFeatures {
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
        itemMedia {
            path
            sequence
            itemMediaType
            mediaType
            mediaId
            altText
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
        itemLinks {
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
        itemTechSpecs {
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

export const FRAGMENT_ITEM_AVAILABILITY = gql`
    fragment ItemAvailability on ItemAvailability {
        invMastUid
        totalQuantity
        availability
        leadTimeDays
        leadTimeMessage
    }
`

export const FRAGMENT_ITEM_CUSTOMER_PART_NUMBER = gql`
    fragment ItemCustomerPartNumber on InvXRef {
        id
        invMastUid
        customerPartNumber
    }
`

export const FRAGMENT_ITEM_SOURCE_LOCATION = gql`
    fragment ItemSourceLocation on SourceLocation {
        invMastUid
        sourceLocId
        sourceLocName
    }
`
