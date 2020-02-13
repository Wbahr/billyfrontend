import React, {useState, useContext} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
// import Context from '../../../config/context'
import { injectStripe } from 'react-stripe-elements'
import PaymentManagerComponent from '../uiComponents/paymentManager'
import Select from '../../_common/select'

function ShiptoManagementPage() {
  // const context = useContext(Context);
  const [defaultShipTo, setDefaultShipTo] = useState(0)


  return(
    <div>
      <p>Default Ship To:</p>
        <Select
          value={defaultShipTo}
          setValue={setDefaultShipTo}
          options={[{'label': '123 Main Street - Nazareth, PA', 'value': 0},{'label': '999 Green Drive - Washington, NJ', 'value': 1}]}
        />
    </div>
  )
}

export default ShiptoManagementPage