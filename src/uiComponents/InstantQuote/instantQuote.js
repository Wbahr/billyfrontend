import React from 'react'
import styled from 'styled-components'
import IQCard from './iqCard'
import {CardElement, injectStripe} from 'react-stripe-elements';

// import styled from 'styled-components'
// import queryString from 'query-string'

const DivCardContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const DivCardContainerGrey = styled(DivCardContainer)`
  background-color: grey;
`

const DivRow = styled.div`
  display: flex;
`

const DivStripeCard = styled.div`
  width: 300px;
  background-color: white;
  padding: 8px;
  margin: 8px;
  border-radius: 2px;
`

const DivCard = styled.div`
  cursor: pointer;
  width: 300px;
  height: 200px;
  margin: 15px;
  border: 1px solid grey;
`
function noScroll(){
  window.scrollTo(0, 0)
}

class ProductConfigSearch extends React.Component {
  state = {
    type: ''
  }

  componentWillMount() {
    window.removeEventListener('scroll', noScroll)
  }

  scrollToQuestions = () => {
    document.getElementById('product').scrollIntoView({behavior: 'smooth'});
  }

  scrollToCards = () => {
    document.getElementById('cards').scrollIntoView({behavior: 'smooth'});
  }

  cardClick = (brand) => {
    this.setState({type: brand}, this.scrollToQuestions)
  }

  backClick = () => {
    this.setState({type: ""}, this.scrollToCards)
  }

  render(){

    return (
      <>
          <DivCardContainer id='cards'>
            <DivRow>
              <IQCard
                text='haskell'
                cardClick={this.cardClick}
              />
              <IQCard
                text='haskell'
                cardClick={this.cardClick}
              />
              <IQCard
                text='haskell'
                cardClick={this.cardClick}
              />
            </DivRow>
          </DivCardContainer>
          <DivCardContainerGrey id='product'>
            <span onClick={this.backClick}>back to cards</span>
            <DivStripeCard>
              <CardElement />
            </DivStripeCard>
          </DivCardContainerGrey>
      </>
    )
  }
}

export default injectStripe(ProductConfigSearch)
