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
    showExistingRMAsTable: false,
    showRMARequestDetail: true
  }

  // componentWillMount() {
  //   const location = queryString.parse(location.search)
  //   let section = _.get(location,'section', null)
  //   switch(section){
  //     case('rma'):
  //       this.setState({showExistingRMAsTable: false, showRMARequestDetail: true})
  //       break
  //     case('rma-summary'):
  //       this.setState({showExistingRMAsTable: true, showRMARequestDetail: false})
  //       break
  //     default:
  //       this.setState({showExistingRMAsTable: false, showRMARequestDetail: true})
  //       dispatch.getInvoice(invoice)
  //   }
  // }

  render(){
    const {
      showExistingRMAsTable,
      showRMARequestDetail
    } = this.state

    return(
      <StyledBackground>
        <StyledAccountContainer>
          {showExistingRMAsTable && <RMAtable />}
          {showRMARequestDetail && <RMAdetails />}
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
