import React, {useState} from 'react'
import _ from 'lodash'
import Select from '../../_common/form/select'

export default function ShoppingListManagementPage() {
	const [defaultShipTo, setDefaultShipTo] = useState(null)
	const [confirmDelete, setConfirmDelete] = useState(false)


	function handleDeleteShoppingList(){
		if(confirmDelete){
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