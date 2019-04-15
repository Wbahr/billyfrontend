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

const list = [
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
    return(
      <StyledBackground>
        <StyledAccountContainer>
          <AccountSectionHeader
            text={'Return Merchandise Authorization (RMA)'}
          />
          <Input
            placeholder={'Search PO #, Order #, or Item ID'}
          />

        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

export default MainScreen
