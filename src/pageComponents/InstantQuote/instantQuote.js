import React from 'react'
import styled from 'styled-components'
import IQCard from './iqCard'
import {CardElement} from '@stripe/react-stripe-js';

// import styled from 'styled-components'
// import queryString from 'query-string'

const DivCardContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const DivCardContainerGrey = styled(DivCardContainer)`
  background-color: grey;
  width: 50%;
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
    selectedCard: ''
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
    this.setState({selectedCard: brand}, this.scrollToQuestions)
  }

  backClick = () => {
    this.setState({selectedCard: ""}, this.scrollToCards)
  }

  render(){

    return (
      <>
          <DivCardContainer id='cards'>
            <DivRow>
              <IQCard
                text='Haskell Pump'
                selectedCard={this.state.selectedCard}
                cardClick={this.cardClick}
              />
              <IQCard
                text='Haskell Hydraulic'
                selectedCard={this.state.selectedCard}
                cardClick={this.cardClick}
              />
              <IQCard
                text='Haskell Pipe'
                selectedCard={this.state.selectedCard}
                cardClick={this.cardClick}
              />
            </DivRow>
          </DivCardContainer>
          <DivCardContainerGrey id='product'>
            <span onClick={this.backClick}>back to cards</span>
            <span>{this.state.selectedCard}</span>
            <DivStripeCard>
              <CardElement />
            </DivStripeCard>
          </DivCardContainerGrey>
      </>
    )
  }
}

export default ProductConfigSearch
