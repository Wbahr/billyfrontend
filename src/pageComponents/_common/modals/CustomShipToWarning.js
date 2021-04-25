import Modal from '../modal'
import { Grid, Typography as Text } from '@material-ui/core'
import { ButtonRed } from '../../../styles/buttons'
import React from 'react'

export default function CustomShipToWarning({ open, onClose }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Grid container direction="column" justify="center" alignItems="center" wrap="nowrap">
                <Text variant="h5" color="primary">
                    Hello, I noticed you selected to save your custom ship to.
                </Text>
                <Text style={{ maxWidth: 570 }} align="center">
                    Just wanted to let you know that you will have to wait for this order to complete processing before
                    your new ship to will show up in the drop down the next time around.
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    This should only take a few minutes.
                </Text>
                <ButtonRed onClick={onClose}>Okay</ButtonRed>
            </Grid>
        </Modal>
    )
}