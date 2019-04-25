import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from './accountSectionHeader'
import 'react-table/react-table.css'
import { StyledText0, StyledText1 } from '../../styles/fonts'
import RMAform from './RMAform'

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

class RMAdetails extends React.Component {

  componentWillMount () {
    console.log('selected order:', this.props.selectedOrder)
  }

  handleOnback = () => {
    const {
      onBack
    } = this.props
    console.log('back 1')
    onBack()
  }

  render(){
    const {
      selectedOrder:{
        orderDate,
        orderNum,
        poNum,
        total,
        status,
        packing,
        shippingAddress,
        items
      }
    } = this.props

    console.log('tiems', items)

    return(
      <React.Fragment>
        <AccountSectionHeader
          text={`RMA - Invoice #${orderNum}`}
        />
        <StyledRMAOrderDetails>
          <StyledRMAList>
            <StyledText0><StyledText1>Order Date: </StyledText1>{orderDate}</StyledText0>
            <StyledText0><StyledText1>Order Number: </StyledText1>{orderNum}</StyledText0>
            <StyledText0><StyledText1>P.O. Number: </StyledText1>{poNum}</StyledText0>
            <StyledText0><StyledText1>Status: </StyledText1>{status}</StyledText0>
            <StyledText0><StyledText1>Packing Basis: </StyledText1>{packing}</StyledText0>
            <StyledText0><StyledText1>Order Total: </StyledText1>{total}</StyledText0>
          </StyledRMAList>
          <StyledRMAList>
            <StyledText1>Ship-to Address:</StyledText1>
            <StyledText0>{shippingAddress.name}</StyledText0>
            <StyledText0>{shippingAddress.address1}</StyledText0>
            <StyledText0>{shippingAddress.city + ', ' + shippingAddress.state + ' ' + shippingAddress.zip}</StyledText0>
          </StyledRMAList>
        </StyledRMAOrderDetails>
        <RMAform onBack={this.handleOnback} items={items} />
      </React.Fragment>
    )
  }
}

export default RMAdetails
