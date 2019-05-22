import React from 'react'
import styled from 'styled-components'
import smclogo from '../../imgs/SMCLogo.png'

const DivRow = styled.div`
  display: flex;
  align-items: center;
`
const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DivResultsContainer = styled.div`
  display: flex;
`

const DivSearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const P = styled.p`
  font-family: verdana;
  color: #333
  font-size: 13px;
  margin: 0;
  max-width: 700px;
`

const H1 = styled.h1`
  font-family: verdana;
  color: #777
  font-size: 16px;
  margin: 10px 0 6px 0;
`

const InputSearch = styled.input`
  font-size: 18px;
  color: #333
  cursor: pointer;
  width: 450px
  height: 35px;
  padding: 0 25px;
  border: 1px #ccc solid;
  border-radius: 30px;
  box-shadow: 2px 3px 3px #ccc;
  outline: none;
  :hover {
    box-shadow: 3px 4px 3px #ccc;
  }
  :focus{
    box-shadow: 3px 4px 3px #ccc;
  }
  ::placeholder {
    color: #d1d1d1
  }
`

const ButtonSearch = styled.button`
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background-color: darkblue;
  border-radius: 30px;
  padding: 0 16px;
  margin-left: 12px;
  box-shadow: 2px 3px 3px #ccc;
  outline: none;
  :hover {
    box-shadow: 1px 1px 3px #ccc;
  }
  :active {
    box-shadow: 0 0 4px black inset;
  }
`

const searchResults = [
  // {
  //   'searchTerm': 'Actuator with double fittings - Aluminum',
  //   'img': '/this/is/where/the/iamge/is.jpg',
  //   'link': '/link/to/our/site'
  // },
  // {
  //   'searchTerm': 'Dual Connector with orange nossle',
  //   'img': '/this/is/where/the/iamge/is2.jpg',
  //   'link': '/link/to/our/site2'
  // }
]

class ProductConfigSearch extends React.Component {
  state = {
    searchResults: {},
    searchTerm: ''
  }

  render(){
    const {
      searchResults,
      searchTerm
    } = this.state

    let searchBar = (
      <DivRow>
        <img src={smclogo} alt='smc-logo' height='50px' width='150px'/>
        <InputSearch
          placeholder='Search for SMC Products...'
          value={searchTerm}
          onChange={(e) =>{this.setState({searchTerm: e.target.value})}}
        />
        <ButtonSearch>
          Search
        </ButtonSearch>
      </DivRow>
    )

    let brandDescription = (
      <>
        <H1>SMC Products</H1>
        <P>SMC Corporation of America provides a broad range of pneumatic and electric automation equipment to various
          industry segments, and is recognized as the global leader in the automation industry.</P>
      </>
    )

    let searchResultsComponent
    let resultCount = searchResults.length
    if (resultCount > 0) {
      searchResultsComponent = (
        <DivResultsContainer>
          <P>Back to Categories</P>
          <DivSearchResultsContainer>
            <p>{`${resultCount} results found for your search of '${searchTerm}'.`}</p>
          </DivSearchResultsContainer>
        </DivResultsContainer>
      )
    }
    return (
      <DivContainer>
        {searchBar}
        {brandDescription}
        {/*{searchResultsComponent}*/}
      </DivContainer>
    )
  }
}

export default ProductConfigSearch
