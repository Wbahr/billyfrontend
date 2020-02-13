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
          options={[{'label': 'Warehouse 1 - 123 Main Street Nazareth, PA 18064', 'value': 0},{'label': 'Main Manufacturing Facility - 999 Green Drive - Washington, NJ 08865', 'value': 1}]}
          width='600px'
        />
    </div>
  )
}

export default ShiptoManagementPage