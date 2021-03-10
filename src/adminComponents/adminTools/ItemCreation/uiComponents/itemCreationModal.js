import React, { useContext } from 'react'
import { Button, Grid, Dialog, DialogTitle, DialogActions, Typography as Text } from '@material-ui/core'
import Context from '../../../../setup/context'

export default function ItemCreationModal({ submitResponse, handleCloseModal, history }) {
    const context = useContext(Context)
    const href = `/product/${submitResponse.itemId}/${submitResponse.invMastUid}`
    
    const handleAddToCart = () => {
        context.addItem({ frecno: submitResponse.invMastUid, quantity: 1 })
        history.push('/cart')
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