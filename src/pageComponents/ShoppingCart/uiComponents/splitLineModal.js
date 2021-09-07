import React, { useState, useEffect, useContext } from 'react'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import { ButtonBlack } from '../../../styles/buttons'
import { Grid, Card, IconButton } from '@material-ui/core'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons'
import { getThumbnailImagePath } from '../../_common/helpers/generalHelperFunctions'
import QuantityInput from '../../_common/form/quantityInput'
import Context from '../../../setup/context'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-family: ProximaBold;
  }
  p {
    font-family: Proxima;
    text-align: center;
  }
  button {
    margin-top: 8px;
  }
`

const ItemCard = styled(Card)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 125px;
    height: 150px;
    margin: 5px;
    &:hover {
        transition: all 100ms ease;
        transform: scale(1.05);
    }
`

const Thumbnail = styled.img`
    width: 100px;
    height: 100px;
`

export default function SplitLineModal({ open, index, hideSplitLineModal, setCart, itemDetails, priceInfo }) {
    const {
        cart
    } = useContext(Context)

    const unitSize = priceInfo?.unitSize || 1
    const roundToNearestIncrement = (amt) => Math.ceil(amt / unitSize) * unitSize
    const splitQty = roundToNearestIncrement(Math.ceil((cart?.[index]?.quantity || 1) / 2))
    const initialLines = (!cart?.length || index >= cart.length) ? [] : [
        { ...cart[index], quantity: splitQty },
        { ...cart[index], quantity: cart[index].quantity - splitQty || 1, quoteLineId: null },
    ]

    const [lines, setLines] = useState(initialLines)

    useEffect(() => {
        setLines(initialLines)
    }, [open, priceInfo])

    function splitItem() {
        const frontCart = cart?.slice(0, index) || []// returns cart item before split item
        const backCart = cart?.slice(index + 1) || [] // returns cart item after split item
        setCart([...frontCart, ...lines.map(l => ({ ...l, uniqueId: null })), ...backCart])
    }

    const handleSplitClick = () => {
        splitItem()
        hideSplitLineModal()
    }

    const handleQtyUpdate = idx => quantity => {
        setLines(lines.map((l, i) => i === idx ? { ...l, quantity } : l))
    }

    const handleAddLine = () => {
        setLines([ ...lines, { ...cart[index], quantity: 1, quoteLineId: null } ])
    }

    const handleRemoveLine = idx => () => {
        const linesCopy = [...lines]
        linesCopy.splice(idx, 1)
        setLines(linesCopy)
    }

    return (
        <Modal open={open} onClose={hideSplitLineModal} contentStyle={{ maxWidth: 555, borderRadius: 5 }}>
            <Container>
                <h4>Split Line</h4>

                <Grid container>
                    {lines.map((cartItem, i) => (
                        <MiniSearchResultItem
                            key={i}
                            handleRemoveLine={handleRemoveLine(i)}
                            handleQtyUpdate={handleQtyUpdate(i)}
                            {...{ cartItem, itemDetails, priceInfo }}
                        />
                    ))}

                    <ItemCard style={{ cursor: 'pointer' }} onClick={handleAddLine}>
                        <AddIcon style={{ fontSize: 65 }} />
                    </ItemCard>
                </Grid>
                <ButtonBlack onClick={handleSplitClick}>Split</ButtonBlack>
            </Container>
        </Modal>
    )
}

const MiniSearchResultItem = ({ cartItem: { quantity }, itemDetails, priceInfo, handleQtyUpdate, handleRemoveLine }) => {
    const { unitSize, unitOfMeasure, roundType } = priceInfo || {}

    return (
        <ItemCard>
            <IconButton style={{ margin: 0, position: 'absolute', top: '-1px', left: '94px', padding: '4px' }} onClick={handleRemoveLine}>
                <CloseIcon/>
            </IconButton>

            <Thumbnail src={getThumbnailImagePath(itemDetails)}/>

            <div>
                <QuantityInput
                    quantity={quantity}
                    unitSize={unitSize}
                    unitOfMeasure={unitOfMeasure}
                    roundType={roundType}
                    handleUpdate={handleQtyUpdate}
                    min='0'
                />
            </div>
        </ItemCard>
    )
}
