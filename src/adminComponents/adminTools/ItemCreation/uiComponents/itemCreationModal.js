import React, { useContext } from 'react'
import { Button, Grid, Dialog, DialogTitle, DialogActions, Typography as Text } from '@mui/material'
import Context from '../../../../setup/context'
import { useNavigate } from 'react-router-dom'

export default function ItemCreationModal({ submitResponse, handleCloseModal }) {
    const context = useContext(Context)
    const navigate = useNavigate()
    const href = `/product/${submitResponse.itemId}/${submitResponse.invMastUid}`
    
    const handleAddToCart = () => {
        context.addItem({ invMastUid: submitResponse.invMastUid, quantity: 1 })
        navigate('/cart')
    }
    
    return (
        <Dialog open onClose={handleCloseModal} maxWidth="sm">
            <Grid container direction="column" alignItems="center" style={{ padding: 8 }}>
                {submitResponse.success ? (
                    <>
                        <DialogTitle>Item Created!</DialogTitle>
                        <Text align="center">Item ID: {submitResponse.itemId}</Text>
                        <a href={href} target="_blank" rel="noopener noreferrer">View Details</a>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>
                                Create New Item
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        <DialogTitle>Item Creation Failed</DialogTitle>
                        {(submitResponse.messages || []).map(string => <Text align="center" key={string}>{string}</Text>)}
                        <Text align="center">{submitResponse.message}</Text>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={handleCloseModal}>
                                Edit Item
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Grid>
        </Dialog>
    )
}