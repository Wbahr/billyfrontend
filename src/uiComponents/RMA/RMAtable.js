import React from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'

import AccountSectionHeader from './accountSectionHeader'
import { PCenterAlign, PRightAlign, ButtonLink} from '../../styles/tables'

class RMAtable extends React.Component {
  state = {
    showDetail: false,
    returnItems: [],
    selectedReturn: null
  }

  handleViewDetails = (order) => {
    const {
      viewDetails
    } = this.props
    viewDetails(order)
  }

  render(){

    const {
      selectedReturn
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
        Cell: row => <ButtonLink onClick={() => this.handleViewDetails(row.value)}>View Details</ButtonLink>
      }
    ]

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
           </>
           : null
        }
      </React.Fragment>
    )
  }
}

export default RMAtable
