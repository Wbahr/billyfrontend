import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  align-items: center;
  p {
    text-align: center;
  }
`

const PpartTitle = styled.p`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 18px;
  color: #000000 !important;
`

export default function ItemCreationModal({ submitResponse, handleCloseModal }) {

    let PopupContent
    if (submitResponse.success){
        PopupContent =(
            <DivContainer>
                <PpartTitle>Item Created!</PpartTitle>
                <p>Item ID: {submitResponse.itemId}</p>
                <a href={`/product/${submitResponse.itemId}/${submitResponse.invMastUid}`} target="_blank" rel="noopener noreferrer">View Details</a>
                <Button variant="contained" color="secondary" onClick={() => {handleCloseModal()}}>
                    Create New Item
                </Button>
            </DivContainer>
        )
    } else {
        PopupContent =(
            <DivContainer>
                <PpartTitle>Item Creation Failed</PpartTitle>
                <p>{submitResponse.message}</p>
                <Button variant="contained" color="secondary" onClick={() => {handleCloseModal()}}>
                    Edit Item
                </Button>
            </DivContainer>
        )
    }

    return (
        <Popup open={true} onClose={() => {handleCloseModal()}} closeOnDocumentClick contentStyle={{ maxWidth: '300px', borderRadius: '3px' }}>
            {PopupContent}
        </Popup>
    )
}