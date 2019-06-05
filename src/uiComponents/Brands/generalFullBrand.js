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
  width: 25%;
`

const DivColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
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
        <StyledText0>{product.detail}</StyledText0>
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
      <DivRow>
        <DivColumn1>
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
