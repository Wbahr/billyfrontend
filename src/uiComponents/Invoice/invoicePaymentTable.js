import React from 'react'
import ReactTable from "react-table"
import _ from 'lodash'
import 'react-table/react-table.css'
import AccountSectionHeader from '../common/sectionHeader'
import { PCenterAlign, PRightAlign, ButtonLink} from '../../styles/tables'
import InvoicePaymentDetail from './invoicePaymentDetail'

class InvoicePaymentTable extends React.Component {
  state = {
    outstandingInvoices: [],
    selectedInvoice: null,
  }

  handleViewDetails = (selectedInvoiceNum) => {
    for(let i = 0; i < outstandingInvoices.length; i++){
      let invoice = outstandingInvoices[i]
      if(invoice.invoiceNum === selectedInvoiceNum){
        this.setState({selectedInvoice: invoice})
        break
      }
    }
  }

  render(){

    const {
      selectedInvoice,
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

    if(_.isNil(selectedInvoice)){
      return(
        <>
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
        </>
      )
    } else {
      <InvoicePaymentDetail />
    }

  }
}

export default InvoicePaymentTable
