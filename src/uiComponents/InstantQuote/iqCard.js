import React from 'react'
import styled from 'styled-components'

const DivCard = styled.div`
  cursor: pointer;
  width: 300px;
  height: 200px;
  margin: 15px;
  border: 1px solid grey;
`

class IQCard extends React.Component {
  handleCardClick = () => {
    this.props.cardClick(this.props.text)
  }
  render(){
    const {
      text
    } = this.props

    let imageSource
    switch(text){
      case 'haskell':
        imageSource = './img/ffdosk'
        break
      default:
        imageSource = null
    }

    return (
      <DivCard onClick={this.handleCardClick}>
        {/*<img source={imageSource} />*/}
        <p>{text}</p>
      </DivCard>
    )
  }
}

export default IQCard
