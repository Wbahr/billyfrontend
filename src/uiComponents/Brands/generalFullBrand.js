import React from 'react'
import styled from 'styled-components'
import { StyledText0 } from '../../styles/fonts'
import SectionHeader from '../_common/sectionHeader'
// import _ from 'lodash'

const DivRow = styled.div`
  display: flex;
`

const DivColumn1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`

const DivColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`

const DivProductShortcuts = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 200px;
  border: 2px solid black;
  width: 200px;
`

const DivProductHeader = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 700;
  background-color: #535353;
  height: 35px;
  width: 100%;
  padding-left: 20px;
`

const DivProductDetail = styled.div`
  padding: 0 25px;
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
        <DivProductHeader id={product.name}>{product.name}</DivProductHeader>
        <DivProductDetail>
          <StyledText0>{product.detail}</StyledText0>
        </DivProductDetail>
        <div>
          {
            _.map(product.bullets, (bullet, index) => {
                if (index%2 === 0) {
                  return (
                    <ul>
                      <li>{bullet}</li>
                    </ul>
                  )
                } else {
                 return (
                    <ul>
                      <li>{bullet}</li>
                    </ul>
                  )
                }
              }
            )
          }
        </div>
      </div>
    )

    let productItems =  _.map(products, (product)=>
      <div>
        <a href={'#'+ product.name}>{product.name}</a>
      </div>
    )
    let productSummary = (
      <DivProductShortcuts>
        {productItems}
      </DivProductShortcuts>
    )

    return(
      <DivRow>
        <DivColumn1>
          {productSummary}
        </DivColumn1>
        <DivColumn2>
          <SectionHeader text={companyName} />
          <StyledText0>{companyDescription}</StyledText0>
          {productList}
        </DivColumn2>
      </DivRow>
    )
  }
}

export default GeneralFullBrand
