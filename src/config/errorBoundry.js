import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-grow: 99;
  justify-content: center;
  width: 100%;
  height: 100%;
  h1 {
    height: max-content;
    margin: auto 0;
  }
`

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: true };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return(
        <Container>
          <h1>Something went wrong.</h1>
        </Container>
      )
    }

    return this.props.children; 
  }
}