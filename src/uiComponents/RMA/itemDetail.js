import React from 'react'
import styled from 'styled-components'

const StyledContainerDiv = styled.div`
   width: 724px;
`

const StyledHeader = styled.div`
   background-color: #404040;
   color: white;
`

const StyledPhoto = styled.div`

`

const StyledDetail = styled.div`

`

const StyledActions = styled.div`
   background-color: #bbbbbb;
`


}

class itemDetail extends React.Component {
  state = {
    input: ''
  }
}
  const change = (e) => {
    this.setState({input: e.target.value})
  }


  render(){

    return(
      <StyledContainerDiv>
        <input onChange={this.change} value={this.state.input}/>
      </StyledContainerDiv>
    )
  }
}

export default itemDetail
