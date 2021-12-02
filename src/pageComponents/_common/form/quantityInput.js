import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useDidUpdateEffect } from '../helpers/generalHelperFunctions'
import IncrementDecrementButton from '../IncrementDecrementButton'

const QuantityInput = (props) => {
    const {
        quantity,
        unitSize,
        roundType,
        handleUpdate,
        min,
        max,
    } = props
    const unitSizeVal = unitSize || 1

    const [displayQuantity, setDisplayQuantity] = useState(quantity)
    const [debouncedDisplayQuantity] = useDebounce(displayQuantity, 500)
    const nonDigitRegex = /\D/g
    const debounce = unitSizeVal > 1 || props.debounce

    useEffect(() => {
        setDisplayQuantity(quantity)
    }, [quantity])

    useDidUpdateEffect(() => {
        if (debouncedDisplayQuantity !== '') {
            handleUpdate(debouncedDisplayQuantity)
        }
    }, [debouncedDisplayQuantity])

    /*
    * Ensure the provided quantity is a multiple of the unit increment.
    * If it is not, calculate the rounded value and emit it to the
    * provided callback 'handleUpdate'
    */
    const getNewQuantity = () => {
        switch (roundType) {
        case 'U':
            return quantity - (quantity % unitSizeVal) + unitSizeVal

        case 'D':
            return quantity - (quantity % unitSizeVal)

        case 'S':
            return (quantity % unitSizeVal) >= (quantity / 2)
                ? quantity - (quantity % unitSizeVal) + unitSizeVal
                : quantity - (quantity % unitSizeVal)

        default:
            return 1
        }
    }

    useEffect(() => {
        //If there is no unit increment, allow free-form typing input
        if (unitSizeVal !== 1 && roundType !== 'N' && Number.isInteger(quantity) && (quantity % unitSizeVal !== 0)) {
            handleUpdate(getNewQuantity())
        }
    }, [quantity, unitSize])

    const incrementDecrementHandler = (amount) => {
        const newQuantity = displayQuantity + Number(amount)
        if (isValueValid(newQuantity)) {
            if (debounce) {
                setDisplayQuantity(newQuantity)
            } else {
                handleUpdate(newQuantity)
            }
        }
    }

    const handleQuantityUpdate = ({ target: { value } }) => {
        const cleanVal = value.replace(nonDigitRegex, '')
        if (debounce) {
            setDisplayQuantity(cleanVal === '' ? '' : Number(cleanVal) || 1)
        } else if (cleanVal !== '') {
            handleUpdate(Number(cleanVal) || 1)
        }
    }

    //Ensures the min/max constraints are met
    const isValueValid = (valueCandidate) => {
        if (!isNaN(min) && Number.isInteger(Number(min))
            && valueCandidate < Number(min) || valueCandidate === 0)
            return false
        if (!isNaN(max) && Number.isInteger(Number(max))
            && valueCandidate > Number(max) || valueCandidate === 0)
            return false

        return true
    }

    const fontSize = props.fontSize || '1rem'
    const width = props.width || '60px'

    return (
        <span>
            <IncrementDecrementButton
                onClick={() => incrementDecrementHandler(-unitSizeVal)}
                style={{ fontSize }}
            >
                -
            </IncrementDecrementButton>
            <input
                onChange={handleQuantityUpdate}
                value={debounce ? displayQuantity : quantity}
                step={unitSizeVal || 1}
                style={{ fontSize, width }}
            />
            <IncrementDecrementButton
                onClick={() => incrementDecrementHandler(unitSizeVal)}
                style={{ fontSize }}
            >
                +
            </IncrementDecrementButton>
        </span>
    )
}

export default QuantityInput
