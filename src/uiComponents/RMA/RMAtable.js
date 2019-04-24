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

  handleViewDetails = (order) => {
    const {
      viewDetails
    } = this.props
    viewDetails(order)
  }

  render(){

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
      accessor: 'orderNum',
      Cell: row => <StyledLink onClick={() => this.handleViewDetails(row.value)}>Return Items</StyledLink> // Custom cell components!
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
          data={this.props.data}
          columns={columns}
        />
      </React.Fragment>
    )
  }
}

export default RMAtable
