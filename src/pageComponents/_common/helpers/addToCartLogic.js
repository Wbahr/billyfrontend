//The 'callback' is intended to be the react hook that sets the quantity of an item's quantity input.
export const handleSetQuantity = (event, isUnitConversion, unitIncrement, roundType, callback) => {
    const {target: {value}} = event

		var valueToSet = Number(value)

		if(Number.isInteger(valueToSet)) {
			if(isUnitConversion && valueToSet % unitIncrement !== 0){
				switch (roundType) {
					case 'U':
						valueToSet = valueToSet - (valueToSet % unitIncrement) + unitIncrement
						break;
					case 'D':
						valueToSet = valueToSet - (valueToSet % unitIncrement)
						break;
					case 'S':
						valueToSet = (valueToSet % unitIncrement) >= (valueToSet / 2)
							? valueToSet - (valueToSet % unitIncrement) + unitIncrement
							: valueToSet - (valueToSet % unitIncrement)
						break;
					case 'N':
						//Keep the value the same
						break;
					default:
						break;
				}
			}

			callback(0) //Resets the value. Prevents value from seemingly not properly updating.
			callback(valueToSet)
		}
		else {
			callback(0)
		}
}

export const initializeQuantity = (isUnitConversion, unitSize, callback) => {
    if(isUnitConversion){
        callback(unitSize)
    } else{
        callback(1)
    }
}