import React from 'react'
import styled from 'styled-components'

const MainDropdown = styled.select`
   width: 150px;
   height: 50px;
`

class Dropdown extends React.Component {
	render(){

		let Options = <option>Test</option>
		return(
			<MainDropdown>
				{Options}
			</MainDropdown>
		)
	}
}

export default Dropdown
