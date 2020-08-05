import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { airlineRedTheme } from './theme'

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`

export default function EmptyLayout(props) {
	// state = {
	//   stripe: null,
	//   currentDisplay: 'Search'
	// }
	//NOTE use useEffect with no listener props for componentDidMount
	// componentDidMount() {
	//   if (window.Stripe) {
	//     this.setState({stripe: window.Stripe('pk_test_SQ8ib6LMt1YpCE7nVDFenpmH00PWAbBTk0')})
	//   } else {
	//     document.querySelector('#stripe-js').addEventListener('load', () => {
	//       // Create Stripe instance once Stripe.js loads
	//       this.setState({stripe: window.Stripe('pk_test_SQ8ib6LMt1YpCE7nVDFenpmH00PWAbBTk0')})
	//     })
	//   }
	// }
	return(
		<ThemeProvider theme={airlineRedTheme}>
			<MainScreenContainer>
				{props.children}
			</MainScreenContainer>
		</ThemeProvider>
	)
}

