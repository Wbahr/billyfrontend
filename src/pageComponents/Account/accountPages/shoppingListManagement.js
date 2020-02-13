import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import Context from '../../../config/context'
import { injectStripe } from 'react-stripe-elements'
import PaymentManagerComponent from '../uiComponents/paymentManager'
import Select from '../../_common/select'

export default function ShoppingListManagementPage() {
  // const context = useContext(Context);
  const [defaultShipTo, setDefaultShipTo] = useState(0)


  return(
    <div>
      <p>Select a Shopping List:</p>
        <Select
          value={defaultShipTo}
          setValue={setDefaultShipTo}
          options={[{'label': 'Winter Maintenance', 'value': 0},{'label': 'Extruder A5 - 6 Month Replacement Parts', 'value': 1}]}
        />
    </div>
  )
}