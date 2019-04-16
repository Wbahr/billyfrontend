import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from '../uiComponents/RMA/accountSectionHeader'
import Input from '../uiComponents/common/input'
import ReactTable from "react-table"
import 'react-table/react-table.css'


const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

const StyledAccountContainer = styled.div`
  width: 744px;
  height: 75vh;
  background-color: white;
  padding: 10px;
`

const StyledLink = styled.div`
  border: 2px solid grey;
  background: grey;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
`
class MainScreen extends React.Component {
  // state = {
  //   startDate: new Date()
  // }

  // handleChange = () => {
  //   const {
  //     startDate
  //   } = this.state
  //
  //   console.log({startDate})
  // }


  render(){
    const data = [
    {
      orderDate: '10/3/2018',
      orderNum: '234548',
      poNum: '23422',
      total: '$201.00',
      status: 'Pending'
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
      Header: 'View Details',
      accessor: 'orderNum',
      Cell: props => <StyledLink>Click to View</StyledLink> // Custom cell components!
    },
    // {
    //   id: 'friendName', // Required because our accessor is not a string
    //   Header: 'Friend Name',
    //   accessor: d => d.friend.name // Custom value accessors!
    // },
    // {
    //   Header: props => <span>Friend Age</span>, // Custom header components!
    //   accessor: 'friend.age'
    // }
    ]

    return(
      <StyledBackground>
        <StyledAccountContainer>
          <AccountSectionHeader
            text={'Return Merchandise Authorization (RMA)'}
          />
          <Input
            placeholder={'Search PO #, Order #, or Item ID'}
          />

          <ReactTable
            data={data}
            columns={columns}
          />
        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

export default MainScreen
