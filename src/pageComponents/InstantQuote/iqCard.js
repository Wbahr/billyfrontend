import React from 'react'
import styled from 'styled-components'

const DivCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 300px;
  height: 200px;
  margin: 15px;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 1px 9px lightgrey;
  &:hover {
    box-shadow: -1px 1px 9px #C8C8C8;
  }
`

const DivCardDark = styled(DivCard)`
  background-color: rgba(0,0,0,0.1);
`

const DivPic = styled.div`
  width: 75%;
  height: 150px;
  background-color: grey;
`

class IQCard extends React.Component {
  handleCardClick = () => {
    this.props.cardClick(this.props.text)
  }
  render(){
    const {
      text,
      selectedCard
    } = this.props

    // let imageSource
    // switch (text){
    // case 'haskell':
    //   imageSource = './img/ffdosk'
    //   break
    // default:
    //   imageSource = null
    // }
    if (selectedCard === '' || selectedCard === text) {
      return (
        <DivCard onClick={this.handleCardClick}>
          {/*<img source={imageSource} />*/}
          <DivPic />
          <span>{text}</span>
        </DivCard>
      )
    } else {
      return (
        <DivCardDark onClick={this.handleCardClick}>
          {/*<img source={imageSource} />*/}
          <DivPic />
          <span>{text}</span>
        </DivCardDark>
      )
    }

  }
}

export default IQCard
