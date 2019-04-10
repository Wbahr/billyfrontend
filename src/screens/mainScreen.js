import React from 'react'
import styled from 'styled-components'
// import DatePicker from "react-datepicker"

const Header = styled.h1`
  color: green
`
class MainScreen extends React.Component {


  render(){
    return(
      <div>
        <Header>This is a test of styled components</Header>
      </div>
    )
  }
}

export default MainScreen
