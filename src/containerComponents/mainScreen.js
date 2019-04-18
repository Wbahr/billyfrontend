import React from 'react'
import styled from 'styled-components'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'


const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
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
class MainScreen extends React.Component {
  state = {
    showDetail: false
  }

  viewDetails = (order) => {
    console.log(`viewing details of ${order}`)
  }

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

  const columns = [
    {
      Header: 'Order Date',
      accessor: 'orderDate' // String-based value accessors!
    },
    {
      Header: 'Order #',
      accessor: 'orderNum',
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },
    {
      Header: 'PO #',
      accessor: 'poNum' // String-based value accessors!
    },
    {
      Header: 'Total',
      accessor: 'total' // String-based value accessors!
    },
    {
      Header: 'Complete',
      accessor: 'status' // String-based value accessors!
    },
    {
      Header: '',
      accessor: 'orderNum',
      Cell: props => <StyledLink onClick={() => this.viewDetails('1234')}>View Details</StyledLink> // Custom cell components!
    }]

    return(
      <StyledBackground>
        <StyledAccountContainer>
          {/*<RMAtable/>*/}
          <RMAdetails />
        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

export default MainScreen
