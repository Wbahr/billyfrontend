import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'
import SummaryModal from '../uiComponents/RMA/summaryModal'
import Modal from 'react-responsive-modal'

import { connect } from 'react-redux'
import {requestTesting} from '../uiComponents/RMA/redux/actionConsts'

const StyledBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

const StyledAccountContainer = styled.div`
  width: 744px;
  height: 100%;
  background-color: white;
  padding: 10px;
  margin: 20px 0;
`

const StyledLink = styled.div`
  background: linear-gradient(#bababa, #555555);
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  padding: 4px;
`
const data = [
      {
        orderDate: '10/1/2018',
        returnDate: '10/3/2018',
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
            quantityOpen: 1,
            promiseDate: '12/1/2018',
            trackingCode: '1234523d32f3',
            totalPrice: '$201.00',
            unitPrice: '100.50'
          },
          {
            itemId: 'ofwe-12ZVRK',
            customerPartNum: 'AZ16-12ZVRK',
            itemDesc: 'TEST ITEM -12ZVRK',
            quantityOrdered: 8,
            quantityOpen: 8,
            promiseDate: '12/1/2018',
            trackingCode: 'f245',
            totalPrice: '$4.00',
            unitPrice: '0.50'
          },
          {
            itemId: 'fsd16-1234VRK',
            customerPartNum: 'AZ16-12ZVRK',
            itemDesc: 'GEAR FOR MOTOR',
            quantityOrdered: 1,
            quantityOpen: 1,
            promiseDate: '12/1/2018',
            trackingCode: '4f2323',
            totalPrice: '$500.00',
            unitPrice: '500.00'
          }
        ]
      },
      {
        returnDate: '11/5/2018',
        orderNum: '34323448',
        poNum: '23422',
        total: '$171.00',
        status: 'Complete',
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
        returnDate: '10/4/2018',
        orderNum: '645532548',
        poNum: '23422',
        total: '$1,008.00',
        status: 'Complete',
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
        ]      },
      {
        returnDate: '10/1/2018',
        orderNum: '132123348',
        poNum: '23422',
        total: '$52.00',
        status: 'Complete',
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
        returnDate: '10/10/2018',
        orderNum: '98656548',
        poNum: '23422',
        total: '$883.00',
        status: 'Complete',
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
      }
    ]

class MainScreen extends React.Component {
  state = {
    showTable: true,
    showDetail: false,
    showModal: false,
    selectedOrder: {}
  }

  // componentWillMount() {
  //   const location = queryString.parse(location.search)
  //   let section = _.get(location,'section', null)
  //   if (!_.isNil(section)) {
  //     this.setState({ section: section})
  //   }
  // }

  viewDetails = (order) => {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item.orderNum === order) {
        this.setState({ selectedOrder: item })
        break
      }
    }
    this.setState({showTable: false, showDetail: true})
  }

  viewTable = () => {
    this.setState({showTable: true, showDetail: false, selectedOrder: {}})
  }

  onOpenModal = () => {
    this.setState({showModal: true})
  }

  onCloseModal = () => {
    this.setState({showModal: false})
  }

  render(){
    const {
      showModal,
      showDetail,
      showTable,
      selectedOrder
    } = this.state

    return(
      <StyledBackground>
        <StyledAccountContainer>
          {showTable ? <RMAtable viewDetails={this.viewDetails} data={data} /> : null }
          {showDetail ? <RMAdetails onBack={this.viewTable} selectedOrder={selectedOrder} /> : null}
          <button onClick={this.onOpenModal}>Open modal</button>
          <Modal open={showModal} onClose={this.onCloseModal} showCloseIcon={false} center>
            <SummaryModal onClose={this.onCloseModal}/>
          </Modal>
        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = { requestTesting }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
