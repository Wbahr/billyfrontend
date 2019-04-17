import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from './accountSectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/type'

const StyledRMAOrderDetails = styled.div`
  display: flex;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid #ccc;
`

const StyledRMAList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

class RMAdetails extends React.Component {



  render(){
    const data = [
    {
      orderDate: '10/3/2018',
      orderNum: '1234',
      poNum: '23422',
      total: '$201.00',
      status: 'Pending',
      packing: 'Partial',
      shippingAddress: {
        name: 'Bobby',
        address1: '690 Mulberry Drive',
        city: 'Nazareth',
        state: 'PA',
        zip: '18064'
      },
      items: [
        {
          itemId: 'AZ16-12ZVRK',
          customerPartNum: 'AZ16-12ZVRK',
          itemDesc: 'SCHMERSAL Keyed Interlock Schmeral AZ16-12ZVRK',
          quantityOrdered: 2,
          quantityOpen: 0,
          promiseDate: '12/1/2018',
          trackingCode: '1234523d32f3',
          totalPrice: '$201.00',
          unitPrice: '100.50'
        }
      ]
    },
    {
      orderDate: '11/5/2018',
      orderNum: '333448',
      poNum: '23422',
      total: '$171.00',
      status: 'Complete'
    },
    {
      orderDate: '10/4/2018',
      orderNum: '645548',
      poNum: '23422',
      total: '$1,008.00',
      status: 'Complete'
    },
    {
      orderDate: '10/1/2018',
      orderNum: '132348',
      poNum: '23422',
      total: '$52.00',
      status: 'Complete'
    },
    {
      orderDate: '10/10/2018',
      orderNum: '986548',
      poNum: '23422',
      total: '$883.00',
      status: 'Complete'
    },
    {
      orderDate: '10/4/2018',
      orderNum: '645548',
      poNum: '23422',
      total: '$1,008.00',
      status: 'Complete'
    }
  ]

    return(
      <React.Fragment>
        <AccountSectionHeader
          text={'RMA - Order #1234'}
        />
        <StyledRMAOrderDetails>
          <StyledRMAList>
            <StyledText0><StyledText1>Order Date:</StyledText1> 10/3/2018</StyledText0>
            <StyledText0><StyledText1>Order Number:</StyledText1> 1234</StyledText0>
            <StyledText0><StyledText1>P.O. Number:</StyledText1> 43234</StyledText0>
            <StyledText0><StyledText1>Status:</StyledText1> Complete</StyledText0>
            <StyledText0><StyledText1>Packing Basis:</StyledText1> Partial</StyledText0>
            <StyledText0><StyledText1>Order Total:</StyledText1> $171.00</StyledText0>
          </StyledRMAList>
          <StyledRMAList>
            <StyledText1>Ship-to Address:</StyledText1>
            <StyledText0>Sotek</StyledText0>
            <StyledText0>3590 Jeffrey Blvd</StyledText0>
            <StyledText0>Buffalo, NY 14219</StyledText0>
          </StyledRMAList>
        </StyledRMAOrderDetails>
      </React.Fragment>
    )
  }
}

export default RMAdetails
