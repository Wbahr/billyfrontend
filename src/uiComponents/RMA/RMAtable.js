import React from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'
import styled from 'styled-components'

import AccountSectionHeader from './accountSectionHeader'
import { PCenterAlign, PRightAlign, ButtonLink} from '../../styles/tables'
import _ from 'lodash'
import { StyledText0, StyledText1 } from '../../styles/fonts'

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F8F9F9;
  padding: 10px;
  margin: 10px 0;
`
const PItemDetail = styled.div`
  display: flex;
  justify-content: space-between;
`

const DivTotal = styled(StyledText1)`
  display: flex;
  justify-content: flex-end;
  padding: 10px 8px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`

const StyledRMADetails = styled.div`
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

class RMAtable extends React.Component {
  state = {
    showDetail: false,
    returnItems: [],
    selectedReturn: null,
    totalRefund: 0
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      returnItems: prevReturnItems
    } = prevState

    const {
      returnItems
    } = this.state

    if (prevReturnItems !== returnItems) {
      this.calculateRefundAndFee(returnItems)
    }
  }

  handleViewDetails = (selectedRMANum) => {
    for(let i = 0; i < returnItems.length; i++){
      let item = returnItems[i]
      if(item.rmaNum === selectedRMANum){
        this.setState({selectedReturn: item})
        break
      }
    }
  }

  calculateRefundAndFee = (returnItems) => {
    let totalRefund = 0
    let totalRestockingFee = 0
    let minRestockingFee = 15
    let restockingPercentage = 0.25

    for(let i = 0; i < returnItems.length; i++) {
      let item = returnItems[i]
      if (item.hasReturnFee) {
        totalRestockingFee += (item.returnQuantity * item.unitPrice) * restockingPercentage
      }
      totalRefund = totalRefund + (item.returnQuantity * item.unitPrice)
    }
    if (totalRestockingFee < minRestockingFee && totalRestockingFee !== 0) {
      totalRefund = totalRefund - minRestockingFee
      this.setState({totalRefund: totalRefund.toFixed(2)})
    } else {
      totalRefund = totalRefund - totalRestockingFee
      this.setState({totalRefund: totalRefund.toFixed(2)})
    }
  }

  render(){

    const {
      selectedReturn,
      returnItems
    } = this.state

    const columns = [
      {
        Header: 'Return Date',
        accessor: 'returnDate' // String-based value accessors!
      },
      {
        Header: 'RMA #',
        accessor: 'rmaNum',
        filterable: true,
        Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
      },
      {
        Header: 'Invoice #',
        accessor: 'invoiceNum',
        filterable: true,
        Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
      },
      {
        Header: 'Return Total',
        accessor: 'total', // String-based value accessors!
        Cell: row => <PRightAlign>{row.value}</PRightAlign>
      },
      {
        Header: 'Return Status',
        accessor: 'status', // String-based value accessors!
        Cell: row => <PCenterAlign>{row.value}</PCenterAlign>,
        id: 'status',
        filterable: true,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "complete") {
            return row[filter.id] >= 21;
          } else if (filter.value === "pending") {
            return row[filter.id] < 21;
          }
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{width: "100%"}}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show All</option>
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
          </select>
      },
      {
        Header: '',
        accessor: 'rmaNum',
        sortable: false,
        Cell: row => <ButtonLink onClick={() => this.handleViewDetails(row.value)}>View Details</ButtonLink>
      }
    ]

    let itemBars = []

    if (returnItems.length > 0) {
      _.each(returnItems, (item) => {
        itemBars.push(
          <DivItem>
            <PItemDetail>
              <StyledText1>{`AHC-${item.frecnoNum} - (Qty ${item.returnQuantity})`}</StyledText1>
              <StyledText0>{`$${(item.returnQuantity * item.unitPrice).toFixed(2)}`}</StyledText0>
            </PItemDetail>
            <PItemDetail>
              <StyledText0>{`Item ID: ${item.itemId}`}</StyledText0>
              {item.hasReturnFee ? <PItemRestockingFee
                as='div'>{`Restocking Fee: $${(item.returnQuantity * item.unitPrice * 0.25).toFixed(2)}`}</PItemRestockingFee> : null}
            </PItemDetail>
          </DivItem>
        )
      })
    }

    return(
      <React.Fragment>
        <AccountSectionHeader
          text={'Return Material Authorization (RMA)'}
        />
        <ReactTable
          sortable={true}
          showPageSizeOptions={false}
          minRows={5}
          data={this.state.returnItems}
          columns={columns}
          noDataText={'No Returns Found'}
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          className="-striped -highlight"
        />
        {
         !_.isNil(selectedReturn) ?
           <>
            <AccountSectionHeader
              text={`Return Details - ${selectedReturn.rmaNum}`}
            />
           <StyledRMADetails>
            <StyledRMAList>
              <StyledText0><StyledText1>Return Date: </StyledText1>{selectedReturn.returnDate}</StyledText0>
              <StyledText0><StyledText1>RMA Number: </StyledText1>{selectedReturn.rmaNum}</StyledText0>
              <StyledText0><StyledText1>Invoice Number: </StyledText1>{selectedReturn.invoiceNum}</StyledText0>
            </StyledRMAList>
            <StyledRMAList>
              <StyledText0><StyledText1>Return Total: </StyledText1>{selectedReturn.returnTotal}</StyledText0>
              <StyledText0><StyledText1>Return Status: </StyledText1>{selectedReturn.returnStatus}</StyledText0>
            </StyledRMAList>
           </StyledRMADetails>
             {itemBars}
           <DivTotal as='div'>
            {`Total: $${totalRefund}`}
           </DivTotal>
           </>
           : null
        }
      </React.Fragment>
    )
  }
}

export default RMAtable
