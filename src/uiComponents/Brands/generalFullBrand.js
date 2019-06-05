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

class GeneralFullBrand extends React.Component {
  componentWillMount(){
    console.log('brand: ',this.props.brand)
  }
  render(){
    const {
      brand:{
        companyName,
        companyDescription,
        products
      }
    } = this.props

    let productList = _.map(products, (product)=>
      <div>
        <p>{product.name}</p>
        <p>{product.detail}</p>
        <div>
          {
            _.map(product.bullets, (bullet) => (
              <ul>
                <li>{bullet}</li>
              </ul>
            ))
          }
        </div>
      </div>
    )

    return(
      <>
        <p>{companyName}</p>
        <p>{companyDescription}</p>
        {productList}
      </>
    )
  }
}

export default GeneralFullBrand
