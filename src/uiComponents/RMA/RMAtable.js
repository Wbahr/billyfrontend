import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from './accountSectionHeader'
import Input from '../common/input'
import ReactTable from "react-table"
import 'react-table/react-table.css'

const StyledLink = styled.div`
  background: linear-gradient(#bababa, #555555);
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  padding: 4px;
  
  :hover {
    background: linear-gradient(#555555, #bababa);
  };
`
class RMAtable extends React.Component {
  state = {
    showDetail: false
  }

  viewDetails = (order) => {
    console.log(`viewing details of ${order}`)
  }

  render(){
    const data = [
    {
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
          quantityOpen: 0,
          promiseDate: '12/1/2018',
          trackingCode: '1234523d32f3',
          totalPrice: '$201.00',
          unitPrice: '100.50'
        }
      ]
    },
    {
      returnDate: '11/5/2018',
      orderNum: '333448',
      poNum: '23422',
      total: '$171.00',
      status: 'Complete'
    },
    {
      returnDate: '10/4/2018',
      orderNum: '645548',
      poNum: '23422',
      total: '$1,008.00',
      status: 'Complete'
    },
    {
      returnDate: '10/1/2018',
      orderNum: '132348',
      poNum: '23422',
      total: '$52.00',
      status: 'Complete'
    },
    {
      returnDate: '10/10/2018',
      orderNum: '986548',
      poNum: '23422',
      total: '$883.00',
      status: 'Complete'
    },
    {
      returnDate: '10/4/2018',
      orderNum: '645548',
      poNum: '23422',
      total: '$1,008.00',
      status: 'Complete'
    }
  ]

  const columns = [
    {
      Header: 'Return Date',
      accessor: 'returnDate' // String-based value accessors!
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
      accessor: '',
      Cell: props => <StyledLink onClick={() => this.viewDetails('1234')}>Return Items</StyledLink> // Custom cell components!
    }]

    return(
      <React.Fragment>
        <AccountSectionHeader
          text={'Return Material Authorization (RMA)'}
        />
        <Input
          placeholder={'Search PO #, Order #, or Item ID'}
        />
        <ReactTable
          sortable={true}
          showPageSizeOptions={false}
          minRows={5}
          data={data}
          columns={columns}
        />
      </React.Fragment>
    )
  }
}

export default RMAtable
