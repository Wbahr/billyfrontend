import React from 'react'
import ReactTable from 'react-table'
import _ from 'lodash'
import 'react-table/react-table.css'
import AccountSectionHeader from '../_common/sectionHeader'
import Input from '../_common/form/input'
import { PCenterAlign, PRightAlign, ButtonLink } from '../../styles/tables'
import InvoicePaymentDetail from './invoicePaymentDetail'

class InvoicePaymentTable extends React.Component {
  state = {
    outstandingInvoices: [],
    selectedInvoice: null,
  }

  handleViewDetails = (selectedInvoiceNum) => {
    for (let i = 0; i < outstandingInvoices.length; i++){
      const invoice = outstandingInvoices[i]
      if (invoice.invoiceNum === selectedInvoiceNum){
        this.setState({ selectedInvoice: invoice })
        break
      }
    }
  }

  clearSelectedInvoice = () => {
    this.setState({ selectedInvoice: null })
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
        accessor: 'amountDue',
        Cell: row => <PRightAlign>{row.value}</PRightAlign>
      },
      {
        Header: '',
        accessor: 'invoiceNum',
        sortable: false,
        Cell: row => <ButtonLink onClick={() => this.handleViewDetails(row.value)}>Pay Invoice</ButtonLink>
      }
    ]

    if (_.isNil(selectedInvoice)){
      return (
        <>
          <AccountSectionHeader
            text={'Outstanding Invoices'}
          />
          <Input
            value={this.state.filterAll}
            placeholder={'Enter an Invoice Number'}
            onChange={this.filterAll}
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
      <InvoicePaymentDetail selectedInvoice={selectedInvoice} clearSelectedInvoice={this.clearSelectedInvoice} />
    }

  }
}

export default InvoicePaymentTable
