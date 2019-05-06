import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import queryString from 'query-string'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'

import {requestTesting} from '../uiComponents/RMA/redux/actionConsts'

const StyledBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

const StyledAccountContainer = styled.div`
  width: 744px;
  min-height: 500px;
  background-color: white;
  padding: 10px;
  margin: 20px 0;
`

class MainScreen extends React.Component {
  state = {
    showTable: false,
    showDetail: true
  }

  // componentWillMount() {
  //   const location = queryString.parse(location.search)
  //   let section = _.get(location,'section', null)
  //   switch(section){
  //     case('rma'):
  //       this.setState({showTable: false, showDetail: true})
  //       break
  //     case('rma-summary'):
  //       this.setState({showTable: true, showDetail: false})
  //       break
  //     default:
  //       this.setState({showTable: false, showDetail: true})
  //       dispatch.getInvoice(invoice)
  //   }
  // }

  render(){
    const {
      showDetail,
      showTable
    } = this.state

    return(
      <StyledBackground>
        <StyledAccountContainer>
          {showTable ? <RMAtable data={data} /> : null }
          {showDetail ? <RMAdetails /> : null}
        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = { requestTesting }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
