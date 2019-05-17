import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import queryString from 'query-string'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'

import {requestTesting} from '../uiComponents/RMA/redux/actionConsts'

const DivContainer = styled.div`
  width: 100%;
  height: 100%;
`

class MainScreen extends React.Component {

  componentWillMount() {
    const location = queryString.parse(location.search)
    let section = _.get(location,'section', null)
    switch(section){
      case('Rmas'):
        this.setState({currentDisplay: 'ExistingRMAs'})
        break
      case('rma-summary'):
        this.setState({currentDisplay: 'RmaRequestList'})
        break
      default:
        this.setState({currentDisplay: ''})
    }
  }
  state = {
    currentDisplay: ''
  }

  render(){
    const {
      currentDisplay
    } = this.state

    return(
      <DivContainer>
        {currentDisplay === 'ExistingRMAs' && <RMAtable />}
        {currentDisplay === 'RMARequestDetail' && <RMAdetails />}
      </DivContainer>
    )
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = { requestTesting }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
