import React from 'react'
import styled from 'styled-components'
// import _ from 'lodash'

const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding 0;
  background-color: grey;
`

class FullBrand extends React.Component {
  componentWillMount(){
    console.log('brand: ',this.props.brand)
  }
  render(){
    const {
      brand:{
        companyName,
        companyDescription,
      }
    } = this.props

    return(
      <>
        <p>{companyName}</p>
        <p>{companyDescription}</p>
      </>
    )
  }
}

export default FullBrand
