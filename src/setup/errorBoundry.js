import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 99;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    margin: 0 auto;
  }
  h1 {
    height: max-content;
    margin: 0 auto;
  }
  h4 {
    color: rgb(219,22,51);
  }
`

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Container>
                    <img src="https://www.airlinehyd.com/customer/aihyco/images/error_message_image.png" width="325px" />
                    <h1>Something went wrong..</h1>
                    <h4>But we're on it!</h4>
                    <p>If you need immediate assistance, please call 800-999-7378.</p>
                </Container>
            )
        }

        return this.props.children 
    }
}