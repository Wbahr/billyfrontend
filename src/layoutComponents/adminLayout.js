import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { airlineRedTheme } from '../styles/theme'

const MainScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-top: 24px;
`

export default function AdminLayout(props) {
	// state = {
	//   stripe: null,
	//   currentDisplay: 'Search'
	// }

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