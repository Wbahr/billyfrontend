import React, { useState, useEffect, useContext } from 'react'
import Modal from '../../_common/modal'
import styled from 'styled-components'
import Context from '../../../setup/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import AirlineInput from '../../_common/form/inputv2'
import AirlineSelect from '../../_common/form/select'
import { ALLOW_ZERO } from '../../_common/constants/overrideReasons'

const DivRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
`

const DivItem = styled.div`
    margin: 0 4px;
`

const PriceInfoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
`

const PriceInfoItem = styled.div`
    width: 33.33%;
    padding-left: 5px;
`

const LabelInline = styled.label`
    padding: 0 8px;
    color: #303030;
    font-size: 16px;
    border-radius: 1px;
    border: 1px solid #e1e1e1;
    margin-left: 5px;
    width: 100px;
    background-color: #e3e3e3;
`

const Label = styled.label`
    margin: 0;
    font-size: 12px;
    font-style: italic;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
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

export default function EditPriceModal({ open, hideEditPriceModal, setCartItem, data }) {
    const [itemPrice, setItemPrice] = useState(0)
    const [margin, setMargin] = useState(0)
    const [selectedReason, setSelectedReason] = useState(null)
    const { editPriceReasonCodes } = useContext(Context)
    const [originalPrice, setOriginalPrice] = useState()

    const {
        spaType,
        spaNumber,
        spaCost,
        spaMargin
    } = data || {}

    const reasonCodeOptions = editPriceReasonCodes.map(code => ({ label: code.priceReason, value: code.id }))

    useEffect(() => {
        if (data) {
            setItemPrice(data.itemPrice)
            setMargin(calculateMargin(data.itemPrice))
            setSelectedReason(reasonCodeOptions.find(code => code.value === data.priceReasonId))
            setOriginalPrice(data.itemPrice)
        }
    }, [data])

    function handleReset() {
        setItemPrice(data.cartItem.quoteUnitPrice ?? data.originalItemPrice)
        setMargin(calculateMargin(data.cartItem.quoteUnitPrice ?? data.originalItemPrice))
        setSelectedReason(null)
    }

    function calculateMargin(price) {
        const newMargin = (price - data.airlineCost) / price
        return (newMargin * 100).toFixed(1)
    }

    const handleChangePrice = type => (e, maskValue, floatValue) => {
        if (type === 'price') {
            setItemPrice(floatValue)
            setMargin(calculateMargin(floatValue))
        } else {
            setMargin(floatValue)
            setItemPrice(parseFloat((data.airlineCost / (1 - (floatValue / 100))).toFixed(2)))
        }
    }

    const handleCancel = () => {
        handleReset()
        hideEditPriceModal()
    }

    const handleSave = () => {
        if (itemPrice === (data?.cartItem.quoteUnitPrice ?? data.originalItemPrice)) {
            setCartItem({ ...data?.cartItem, itemUnitPriceOverride: null, priceReasonId: null })
        } else {
            setCartItem({ ...data?.cartItem, itemUnitPriceOverride: itemPrice, priceReasonId: selectedReason.value })
        }
        hideEditPriceModal()
    }

    const handleReasonCodeChange = value => {
        setSelectedReason(reasonCodeOptions.find(code => code.value === value))
    }

    const saveDisabled = (itemPrice === data?.cartItem?.itemUnitPriceOverride && selectedReason?.value === data?.cartItem?.priceReasonId)
        || (itemPrice === (data?.cartItem.quoteUnitPrice ?? data?.originalItemPrice) && !data?.cartItem?.priceReasonId)
        || (itemPrice !== (data?.cartItem.quoteUnitPrice ?? data?.originalItemPrice) && !selectedReason?.value)
        || (itemPrice === 0 && !ALLOW_ZERO.includes(selectedReason?.value))

    return (
        <Modal
            open={open}
            onClose={hideEditPriceModal}
            contentStyle={{ maxWidth: 400, borderRadius: 3 }}
        >
            <Container>
                <h4>Edit Item Price</h4>
                <PriceInfoRow>
                    <PriceInfoItem>
                        <Label>Price: (orig. ${originalPrice}) 
                        </Label>
                        <AirlineInput
                            type="currency"
                            value={itemPrice}
                            width='100px'
                            onChange={handleChangePrice('price')}
                        />
                    </PriceInfoItem>

                    <PriceInfoItem>
                        <Label>Margin: </Label>
                        <AirlineInput
                            type="percent"
                            value={margin}
                            width='100px'
                            onChange={handleChangePrice('margin')}
                        />
                    </PriceInfoItem>

                    <PriceInfoItem>
                        <Label>Airline Cost: </Label>
                        <AirlineInput
                            type="currency"
                            disabled={true}
                            value={data?.airlineCost}
                            width='100px'
                        />
                    </PriceInfoItem>
                    <PriceInfoItem>
                        <Label>SPA Type: </Label>
                        <LabelInline>{spaType || 'N/A'}</LabelInline>
                    </PriceInfoItem>
                    <PriceInfoItem>
                        <Label>SPA Margin: </Label>
                        <LabelInline>{spaMargin ? `${spaMargin * 100}%` : 'N/A'}</LabelInline>
                    </PriceInfoItem>
                    <PriceInfoItem>
                        <Label>SPA Cost: </Label>
                        <LabelInline>{spaCost ? `$${spaCost.toFixed(2)}` : 'N/A'}</LabelInline>
                    </PriceInfoItem>
                    <DivItem>
                        <Label>SPA Number: </Label>
                        <LabelInline>{spaNumber || 'N/A'}</LabelInline>
                    </DivItem>
                </PriceInfoRow>

                {itemPrice !== data?.originalItemPrice && (
                    <AirlineSelect
                        label="Reason"
                        options={reasonCodeOptions}
                        value={selectedReason}
                        setValue={handleReasonCodeChange}
                    />
                )}

                {itemPrice === 0 && !ALLOW_ZERO.includes(selectedReason?.value) &&
                    <div>Reason must be sample or corrective action for $0 price.</div>
                }

                <DivRow>
                    <ButtonBlack onClick={handleCancel}>Cancel</ButtonBlack>
                    <ButtonBlack onClick={handleReset}>Reset</ButtonBlack>
                    <ButtonRed
                        onClick={handleSave}
                        disabled={saveDisabled}
                    >
                        Save
                    </ButtonRed>
                </DivRow>
            </Container>
        </Modal>
    )
}
