import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from './accountSectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/type'
import Button from '../common/button'

const StyledRMAOrderDetails = styled.div`
  display: flex;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid #ccc;
`

const StyledRMAList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 10px;
`

const StyledRMAListGrey = styled(StyledRMAList)`
  background-color: #E9E6E5;
  width: 40%;
  padding-top: 10px;
`

const StyledRMAItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRMAItemDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  height: 20px;
 
  background-color: #404040;
  color: white;
  font-family: verdana;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
`

const StyledRMAItemPhotoContainer = styled.div`
  width: 20%;
`

const StyledRMAItemDetailsContainer = styled.div`
  display: flex;
`

const StyledRMAItemActionsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #bbbbbb;
  height: 45px;
`

const StyledSubmitButtonContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
`

const StyledCheckbox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  padding-right: 18px;
`

const StyledInput = styled.input`
  width: 30px;
  height: 20px;
  border-radius: 1px;
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

        <StyledRMAItemDetailContainer>
          <StyledRMAItemDetailHeader>
            <p>1</p>
            <p>Item ID: AZ16-12ZVRK</p>
            <p>387819</p>
          </StyledRMAItemDetailHeader>
          <StyledRMAItemDetailsContainer>
            <StyledRMAItemPhotoContainer></StyledRMAItemPhotoContainer>
            <StyledRMAListGrey>
              <StyledText0><StyledText1>Order Date:</StyledText1> 10/3/2018</StyledText0>
              <StyledText0><StyledText1>Order Number:</StyledText1> 1234</StyledText0>
              <StyledText0><StyledText1>P.O. Number:</StyledText1> 43234</StyledText0>
              <StyledText0><StyledText1>Status:</StyledText1> Complete</StyledText0>
            </StyledRMAListGrey>
            <StyledRMAListGrey>
              <StyledText0><StyledText1>Order Date:</StyledText1> 10/3/2018</StyledText0>
              <StyledText0><StyledText1>Order Number:</StyledText1> 1234</StyledText0>
              <StyledText0><StyledText1>P.O. Number:</StyledText1> 43234</StyledText0>
              <StyledText0><StyledText1>Status:</StyledText1> Complete</StyledText0>
            </StyledRMAListGrey>
          </StyledRMAItemDetailsContainer>
          <StyledRMAItemActionsContainer>
            <StyledCheckbox type='checkbox'/>
            <p>Return <StyledInput /> of 5</p>
          </StyledRMAItemActionsContainer>
        </StyledRMAItemDetailContainer>
        <StyledSubmitButtonContainer>
          <Button text='Submit Return Request' />
        </StyledSubmitButtonContainer>
      </React.Fragment>
    )
  }
}

export default RMAdetails
