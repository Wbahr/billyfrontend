import React, { useState, useContext, useEffect } from 'react'
import { DebounceInput } from 'react-debounce-input'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce/lib'

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
        width,
        debounce
    } = props

    const unitIncrement = isUnitConversion ? unitSize || 1 : 1

    const [increment, setIncrement] = useState(0)
    const [debounceIncrement] = useDebounce(increment, 500)
    const [displayQuantity, setDisplayQuantity] = useState(quantity + increment)

    /*
    * Monitors the increment value (which changes with the + - buttons)
    * Updates the display quantity, but does not emit the new quantity to
    * the handleUpdate callback.
    */
    useEffect(() => {
        const newDisplayValue = quantity + increment

        if(isValueValid(newDisplayValue)){
            setDisplayQuantity(quantity + increment)
        }
    }, [increment])

    /*
    * Watches the increment value. Waits until the value is finished
    * changing before calculating the new quantity and emitting the
    * new quantity to the handleUpdate callback.
    */
    useEffect(() => {
        if(debounceIncrement){

            var newQuantity = quantity + debounceIncrement

            if(isValueValid(newQuantity)){
                handleUpdate(newQuantity)
            }

            setIncrement(0)
        }
    }, [debounceIncrement])

    /*
    * Ensure the provided quantity is a multiple of the unit increment.
    * If it is not, calculate the rounded value and emit it to the 
    * provided callback 'handleUpdate'
    */
    useEffect(() => {

        //If there is no unit increment, allow free-form typing input
        if(unitIncrement === 1 || roundType === 'N'){
            return
        }

        let newQuantity = quantity

        //If the quantity is not a multiple of its increment, round the quantity and emit it to the callback
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
                
                handleUpdate(newQuantity)
			}
		}
    })

    //The handler for the + and - buttons
    const incrementDecrementHandler = (amount) => {
        const enterAmount = Number(amount)

        if(debounce){
            const newQuantity = quantity + increment + enterAmount

            //Change the increment amount on every click unless the new quantity would become invalid.
            //The actual quantity update is debounced.
            if(isValueValid(newQuantity)){
                setIncrement(increment + enterAmount)
            }
        } else{
            var newQuantity = quantity + enterAmount
            console.log(`New Quantity - ${newQuantity}`)
            //Update the quantity immediately if the value is valid
            if(isValueValid(newQuantity)){
                handleUpdate(newQuantity)
            }
        }  
    }

    //The handler for manually entered values
    const textBoxChangeHandler = (event) => {
        const {
            target: {
                value
            }
        } = event

        handleUpdate(Number(value))
    }

    //Ensures the min/max constraints are met
    const isValueValid = (valueCandidate) => {
        if(!isNaN(min) && Number.isInteger(Number(min))
            && valueCandidate < Number(min)) 
            return false
        if(!isNaN(max) && Number.isInteger(Number(max))
            && valueCandidate > Number(max)) 
            return false

        return true
    }

    const stylesToApply = {
        fontSize: fontSize || '1rem',
        width: width || '60px'
    }

    return <div>

        <IncrementDecrementButton 
            onClick={(event) => { incrementDecrementHandler(-unitIncrement)}}
            style={{
                fontSize: stylesToApply.fontSize
            }}>
            -
        </IncrementDecrementButton>
        {
            debounce 
                ? <DebounceInput //This is for manual value entries
                    debounceTimeout={500}
                    readOnly={unitIncrement > 1}
                    onChange={(unitIncrement > 1 ? null : (event) => {
                        textBoxChangeHandler(event)
                    })}
                    value={displayQuantity}
                    step={unitIncrement || 1}
                    style={{
                        fontSize: stylesToApply.fontSize,
                        width: stylesToApply.width
                    }}
                /> 
                : <input 
                    readOnly={unitIncrement > 1}
                    onChange={(unitIncrement > 1 ? null : (event) => {
                        textBoxChangeHandler(event)
                    })}
                    value={quantity}
                    step={unitIncrement || 1}
                    style={{
                        fontSize: stylesToApply.fontSize,
                        width: stylesToApply.width
                    }}
                />
        }

        <IncrementDecrementButton 
            onClick={(event) => { incrementDecrementHandler(unitIncrement)}}
            style={{
                fontSize: stylesToApply.fontSize
            }}>
            +
        </IncrementDecrementButton>
    </div>
}

export default QuantityInput