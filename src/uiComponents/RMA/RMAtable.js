import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from './accountSectionHeader'
import Input from '../common/input'
import ReactTable from "react-table"
import 'react-table/react-table.css'
import Callout from '../common/callout'

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
const PCenterAlign = styled.div`
  text-align: center;
`

const PRightAlign = styled.div`
  text-align: right;
`

class RMAtable extends React.Component {
  state = {
    showDetail: false,
    showNoResultsCallout: false
  }

  handleViewDetails = (order) => {
    const {
      viewDetails
    } = this.props
    viewDetails(order)
  }

  render(){

    const {
      showNoResultsCallout
    } = this.state

  const columns = [
    {
      Header: 'Return Date',
      accessor: 'returnDate' // String-based value accessors!
    },
    {
      Header: 'Order #',
      accessor: 'orderNum',
      // Cell: row => <PRightAlign>{row.value}</PRightAlign> // Custom cell components!
    },
    {
      Header: 'PO #',
      accessor: 'poNum', // String-based value accessors!
      Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
    },
    {
      Header: 'Total',
      accessor: 'total', // String-based value accessors!
      Cell: row => <PRightAlign>{row.value}</PRightAlign>
    },
    {
      Header: 'Complete',
      accessor: 'status', // String-based value accessors!
      Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
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
        {showNoResultsCallout ?
          <Callout text='No results found. Please note that orders placed over a year ago are not eligible for return and will not be displayed. Please contact us with any questions.'/> :
          null
        }
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
