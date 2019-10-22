import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemService, { getItemById } from 'services/ItemService';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import styled from 'styled-components'

const GET_ITEM_BY_ID = gql`
    query ItemById($itemId: ID){
        items(invMastUid: $itemId) {
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
            itemDesc
            listPrice
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
    }
`;

const ItemDetailPage = () => {

    let { itemId } = useParams()

    const [item, setItem] = useState()

    const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
        variables: { itemId },
        onCompleted: result => {
            if (result.items.length) {
                setItem(result.items[0])
            } else {
                setItem(null);
            }
        }
    })

    if (loading) return <h1>Loading...</h1>
    if (error) return <p>{error}</p>
    return <>
        <div>
            {
                item
                    ? <p>{item.itemDesc}</p>
                    : <p>No item found</p>
            }
        </div>
    </>
}

export default ItemDetailPage