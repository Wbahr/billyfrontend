import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

const IncrementDecrementButton = styled.button`
    box-shadow: none;
    border: none;
    color: ${props => props.theme.buttons.secondary.textColor};
    background-color: ${props => props.theme.buttons.secondary.backgroundColor};
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 0;
    height: 30px;
    font-weight: bold;
    width: 17px;
`

const QuantityInput = (props) => {
    const {
        quantity,
        unitOfMeasure, 
		isUnitConversion, 
        unitSize,
        roundType,
        handleUpdate,
        min,
        max,
        fontSize,
        width
    } = props

    const unitIncrement = isUnitConversion ? unitSize || 1 : 1

    /*
    * Ensure the provided quantity is a multiple of the unit increment.
    * If it is not, calculate the rounded value and emit it to the 
    * provided callback 'handleUpdate'
    */
    useEffect(() => {
        let newQuantity = quantity

        //If there is no unit increment, allow free-form typing input
        if(unitIncrement === 1 || roundType === 'N'){
            return
        }

        if(Number.isInteger(newQuantity)) {
			if(isUnitConversion && newQuantity % unitIncrement !== 0){
				switch (roundType) {
					case 'U':
                        newQuantity = newQuantity - (newQuantity % unitIncrement) + unitIncrement
						break;
					case 'D':
						newQuantity = newQuantity - (newQuantity % unitIncrement)
						break;
					case 'S':
						newQuantity = (newQuantity % unitIncrement) >= (newQuantity / 2)
							? newQuantity - (newQuantity % unitIncrement) + unitIncrement
							: newQuantity - (newQuantity % unitIncrement)
						break;
					default:
						break;
				}
			}

			handleUpdate(newQuantity)
		} else {
            handleUpdate(0)
        }
    })

    const changeQuantity = (amount) => {
        const enterAmount = Number(amount)

        var newQuantity = quantity + enterAmount
        if(!isNaN(min) && Number.isInteger(Number(min))
            && newQuantity < Number(min)) 
            return
        if(!isNaN(max) && Number.isInteger(Number(max))
            && newQuantity > Number(max)) 
            return

        handleUpdate(newQuantity)
    }

    const stylesToApply = {
        fontSize: fontSize || '1rem',
        width: width || '60px'
    }

    return <>
        <IncrementDecrementButton 
            onClick={(event) => { changeQuantity(-unitIncrement)}}
            style={{
                fontSize: stylesToApply.fontSize
            }}>
            -
        </IncrementDecrementButton>
        <input 
            readOnly={unitIncrement > 1}
            onChange={(unitIncrement > 1 ? null : (event) => {
                handleUpdate(Number(event.target.value))
            })}
            value={quantity}
            step={unitIncrement || 1}
            style={{
                fontSize: stylesToApply.fontSize,
                width: stylesToApply.width
            }}
        />
        <IncrementDecrementButton 
            onClick={(event) => { changeQuantity(unitIncrement)}}
            style={{
                fontSize: stylesToApply.fontSize
            }}>
            +
        </IncrementDecrementButton>
    </>
}

export default QuantityInput