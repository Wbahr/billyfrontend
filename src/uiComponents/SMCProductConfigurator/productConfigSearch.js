import React from 'react'
import styled from 'styled-components'
import smclogo from '../../imgs/SMCLogo.png'
import Loader from '../_common/loader'
import { getSMCParts } from '../../api-temp/apiCalls'


const DivRow = styled.div`
  display: flex;
  align-items: center;
`
const DivContainer = styled.div`
  display: flex;
`

const DivResultsSummary = styled.div`
  display: flex;
  border-bottom: 1px #999 solid;
  align-items: center;
  justify-content: space-between;
`

const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const DivColumn1 = styled(DivColumn)`
  flex-grow: 4;
`

const DivResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`

const DivItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DivResultItem = styled.div`
  font-family: verdana;
  font-size: 14px;
  color: #337ab7;
  cursor: pointer;
  display: flex;
  height: 52px;
  border-bottom: 1px solid #999;
  :hover {
    font-weight: 600;
  }
`

const PresultSummary = styled.p`
  font-family: verdana;
  font-weight: 400;
`

const P = styled.p`
  font-family: verdana;
  color: #333
  font-size: 13px;
  margin: 0;
  max-width: 700px;
`

const Alink = styled.a`
  cursor: pointer;
  font-family: verdana;
  font-size: 12px;
  color: darkblue;
  text-decoration: underline;
`

const H1 = styled.h1`
  font-family: verdana;
  color: #777
  font-size: 16px;
  margin: 10px 0 6px 0;
`

const Img = styled.img`
  padding: 0 8px;
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

const searchResultsR = {
  'searchTerm': 'nossels',
  'searchResults': [
    // {
    //   'searchTerm': 'Actuator with double fittings - Brass',
    //   'img': 'https://content2.smcetech.com/image/small/3001D_US.jpg',
    //   'link': 'https://www.google.com'
    // },
    // {
    //   'searchTerm': 'Dual Connector with orange nossle',
    //   'img': 'https:////content2.smcetech.com/image/small/3001C_US.jpg',
    //   'link': 'https://www.bing.com'
    // }
  ]
}

class ProductConfigSearch extends React.Component {
  state = {
    searchResults: {},
    searchTerm: '',
    searching: false
  }

  handleSearchClick = () => {
   const {
     searchTerm,
     searching
   } = this.state

    if(!searching && searchTerm.length === 0) {
      this.setState({searching: true})
      getSMCParts(searchTerm).then(
      (response) => {
        if(response.ok) {
          this.setState({searchResults: response.searchResults, searching: false})
        } else {
          this.setState({searching: false})
        }
      })
    }
  }

  handleKeyPress = (e) => {
   if(e.key == 'Enter'){
     this.handleSearchClick()
    }
  }

  render(){
    const {
      searchResults,
      searchTerm,
      searching
    } = this.state

    let searchBar = (
      <DivRow>
        <InputSearch
          placeholder='Search for SMC Products...'
          value={searchTerm}
          onChange={(e) =>{this.setState({searchTerm: e.target.value})}}
          onKeyPress={this.handleKeyPress}
        />
        <ButtonSearch onClick={this.handleSearchClick}>
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
    let resultCount = searchResultsR.searchResults.length
    let Items = _.map(searchResultsR.searchResults, (result)=>
      <DivResultItem onClick={()=>{location.replace(result.link)}}>
        <Img src={result.img} width='50px' height='50px' />
        <p>{result.searchTerm}</p>
      </DivResultItem>
    )

    if (resultCount > 0) {
      let resultText = resultCount === 1 ? 'result' : 'results'
      searchResultsComponent = (
        <DivResultsContainer>
          <DivResultsSummary>
            <PresultSummary>{`Your search for '${searchResultsR.searchTerm}' returned ${resultCount} ${resultText}.`}</PresultSummary>
            <Alink href='https://preprod.airlinehyd.com/customer/aihyco/smc/pages/smcusa.aspx' >Back to Categories</Alink>
          </DivResultsSummary>
          <DivItemsContainer>
            {Items}
          </DivItemsContainer>
        </DivResultsContainer>
      )
    }
    return (
      <>
      <DivContainer>
        <DivColumn>
          <img src={smclogo} alt='smc-logo' height='50px' width='150px'/>
        </DivColumn>
        <DivColumn1>
          {searchBar}
          {resultCount !== 0 && searchResultsComponent}
          {searching && <Loader />}
        </DivColumn1>
      </DivContainer>
        {resultCount === 0 && brandDescription}
      </>
    )
  }
}

export default ProductConfigSearch
