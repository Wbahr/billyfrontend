import React from 'react'
import styled from 'styled-components'

const ContentScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`

class ContentScreen extends React.Component {
  render(){
    return(
      <ContentScreenContainer>
        <div>
          <p>Test Div</p>
        </div>
      </ContentScreenContainer>
    )
  }
}

export default ContentScreen