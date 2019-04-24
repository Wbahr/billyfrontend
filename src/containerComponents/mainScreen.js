import React from 'react'
import styled from 'styled-components'
import RMAtable from '../uiComponents/RMA/RMAtable'
import RMAdetails from '../uiComponents/RMA/RMAdetails'
import SummaryModal from '../uiComponents/RMA/summaryModal'
import Modal from 'react-responsive-modal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
  height: 100%;
  background-color: white;
  padding: 10px;
  margin: 20px 0;
`

const StyledLink = styled.div`
  background: linear-gradient(#bababa, #555555);
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  padding: 4px;
`
class MainScreen extends React.Component {
  state = {
    showTable: true,
    showDetail: false,
    showModal: false
  }

  viewDetails = () => {
    this.setState({showTable: false, showDetail: true})
  }

  onOpenModal = () => {
    this.setState({showModal: true})
  }

  onCloseModal = () => {
    this.setState({showModal: false})
  }

  render(){
    const {
      showModal,
      showDetail,
      showTable
    } = this.state

    return(
      <StyledBackground>
        <StyledAccountContainer>
          {showTable ? <RMAtable viewDetails={this.viewDetails}/> : null }
          {showDetail ? <RMAdetails /> : null}
          <button onClick={this.onOpenModal}>Open modal</button>
          <Modal open={showModal} onClose={this.onCloseModal} showCloseIcon={false} center>
            <SummaryModal onClose={this.onCloseModal}/>
          </Modal>
        </StyledAccountContainer>
      </StyledBackground>
    )
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => bindActionCreators( { requestTesting }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
