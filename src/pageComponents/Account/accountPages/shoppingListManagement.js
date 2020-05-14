import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import Context from '../../../config/context'
import { injectStripe } from 'react-stripe-elements'
import PaymentManagerComponent from '../uiComponents/paymentManager'
import Select from '../../_common/form/select'

export default function ShoppingListManagementPage() {
	// const context = useContext(Context);
	const [defaultShipTo, setDefaultShipTo] = useState(null)
	const [confirmDelete, setConfirmDelete] = useState(false)


	function handleDeleteShoppingList(){
		if(confirmDelete){
			console.log('deleting shopping list...')
			setConfirmDelete(false)
		} else {
			setConfirmDelete(true)
		}
	}

	return(
		<div>
			<p>Saved Shopping Lists:</p>
			<Select
				value={defaultShipTo}
				setValue={setDefaultShipTo}
				options={[{'label': 'Winter Maintenance', 'value': 0},{'label': 'Extruder A5 - 6 Month Replacement Parts', 'value': 1}]}
				placeholder='Select a Shopping List'
			/>
			{!_.isNil(null) &&
          <>
            <p onClick={()=>handleDeleteShoppingList()}>{confirmDelete ? 'Confirm Delete?' : 'Delete this Shopping List'}</p>
            <button>Copy to Cart</button>
            <button>Share</button>
          </>
			}
		</div>
	)
}