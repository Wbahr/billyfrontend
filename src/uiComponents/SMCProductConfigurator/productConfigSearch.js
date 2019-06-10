import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import smclogo from '../../imgs/manufacturerLogos/smc.png'
import Loader from '../_common/loader'
import { getSMCParts } from '../../api-temp/apiCalls'

const DivRow = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    min-width: 320px;
    max-width: 480px;
  }
`
const DivContainer = styled.div`
  display: flex;
   @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    width: auto;
    flex-direction: column;
   } 
`

const DivResultsSummary = styled.div`
  display: flex;
  border-bottom: 1px #999 solid;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`

const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
   @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    width: 100vw;
    padding: 0 4px;
   }
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
  display: flex;
  align-items: center;
  font-family: verdana;
  font-size: 14px;
  color: #337ab7;
  cursor: pointer;
  display: flex;
  height: 52px;
  border-bottom: 1px solid #999;
  padding: 4px 0;
  :hover {
    font-weight: 600;
  }
  p {
    margin: 0;
  }
`

const DivNoResults = styled.div`
  display: flex;
  align-items: center;
  color: #DB1633;
  font-size: 16px;
  font-family: verdana;
  font-weight: 500;
  margin: 12px 0;
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
  color: #2786C2;
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
  :focus {
    outline: none;
  }
`

class ProductConfigSearch extends React.Component {
  state = {
    searchResults: {},
    searchTerm: '',
    searchedTerm: '',
    searching: false,
    noSearchResults: false
  }

  componentWillMount() {
    const location = queryString.parse(_.get(location,'search',null))
    if (!_.isNil(location)){
      let smcSearchTerm = _.get(location,'smcSearchTerm', null)
      if (!_.isNil(smcSearchTerm)) {
        this.setState({searchTerm: smcSearchTerm}, () => this.handleSearchClick())
      }
    }

  }

  handleSearchClick = () => {
   const {
     searchTerm,
     searching
   } = this.state

    if(!searching && searchTerm.length !== 0) {
      this.setState({searching: true, searchResults: {}, noSearchResults: false})
      getSMCParts(searchTerm).then(
      (response) => {
        if (_.isNil(response.length)){
          this.setState({searchResults: response, searchedTerm: searchTerm ,searching: false, noSearchResults: true})
        } else {
          this.setState({searchResults: response, searchedTerm: searchTerm ,searching: false})
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
      searchedTerm,
      searching,
      noSearchResults
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
          {searching ? 'Searching..' : 'Search'}
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
    let Items = _.map(searchResults, (result)=>
      <DivResultItem onClick={()=>{location.replace(window.location.origin + 'customer/aihyco/smc/pages/smcusa.aspx?cat=' + result.XmlId)}}>
        <Img src={result.Img} height='50px' width='auto' />
        <p>{result.ResultName}</p>
      </DivResultItem>
    )

    if (resultCount > 0) {
      let resultText = resultCount === 1 ? 'result' : 'results'
      searchResultsComponent = (
        <DivResultsContainer>
          <DivResultsSummary>
            <PresultSummary>{`Your search for '${searchedTerm}' returned ${resultCount} ${resultText}.`}</PresultSummary>
            <Alink href={'/customer/aihyco/smc/pages/smcusa.aspx'} >Back to Categories</Alink>
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
          <img src={smclogo} alt='smc-logo' height='48px' width='150px'/>
        </DivColumn>
        <DivColumn1>
          {searchBar}
          {_.isNil(resultCount) && brandDescription}
          {noSearchResults && <DivNoResults>{`We're Sorry, no SMC Products found for '${searchedTerm}'.`}</DivNoResults>}
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
