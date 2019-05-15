import React from 'react'
import ReactTable from "react-table"
import _ from 'lodash'
import 'react-table/react-table.css'
import styled from 'styled-components'
import AccountSectionHeader from '../common/sectionHeader'
import { PCenterAlign, PRightAlign, ButtonLink} from '../../styles/tables'
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
    selectedInvoice: null,
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
        this.setState({selectedInvoice: item})
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
      selectedInvoice,
      returnItems,
      totalRefund
    } = this.state

    const columns = [
      {
        Header: 'Due Date',
        accessor: 'dueDate'
      },
      {
        Header: 'Invoice Date',
        accessor: 'invoiceDate'
      },
      {
        Header: 'Invoice #',
        accessor: 'invoiceNum',
        filterable: true,
        Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
      },
      {
        Header: 'Order #',
        accessor: 'orderNum',
        filterable: true,
        Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
      },
      {
        Header: 'PO #',
        accessor: 'poNum',
        filterable: true,
        Cell: row => <PCenterAlign>{row.value}</PCenterAlign>
      },
      {
        Header: 'Amount Due',
        accessor: 'amountDue', // String-based value accessors!
        Cell: row => <PRightAlign>{row.value}</PRightAlign>
      },
      {
        Header: '',
        accessor: 'invoiceNum',
        sortable: false,
        Cell: row => <ButtonLink onClick={() => this.handleViewDetails(row.value)}>Pay Invoice</ButtonLink>
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
          text={'Invoice Payment'}
        />
        <ReactTable
          sortable={true}
          showPageSizeOptions={false}
          minRows={5}
          data={this.state.returnItems}
          columns={columns}
          noDataText={'No Outstanding Invoices Found'}
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          className="-striped -highlight"
        />
        {
         !_.isNil(selectedInvoice) ?
           <>
            <AccountSectionHeader
              text={`Return Details - ${selectedInvoice.rmaNum}`}
            />
           <StyledRMADetails>
            <StyledRMAList>
              <StyledText0><StyledText1>Return Date: </StyledText1>{selectedInvoice.returnDate}</StyledText0>
              <StyledText0><StyledText1>RMA Number: </StyledText1>{selectedInvoice.rmaNum}</StyledText0>
              <StyledText0><StyledText1>Invoice Number: </StyledText1>{selectedInvoice.invoiceNum}</StyledText0>
            </StyledRMAList>
            <StyledRMAList>
              <StyledText0><StyledText1>Return Total: </StyledText1>{selectedInvoice.returnTotal}</StyledText0>
              <StyledText0><StyledText1>Return Status: </StyledText1>{selectedInvoice.returnStatus}</StyledText0>
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
