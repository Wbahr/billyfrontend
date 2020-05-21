import React from 'react'
import styled from 'styled-components'

const UlProgressBar = styled.ul`
margin: 0;

li {
	list-style-type: none;
	width: 25%;
	float: left;
	font-size: 12px;
	position: relative;
	text-align: center;
	text-transform: uppercase;
	color: #535353; 
}

li:before {
	width: 20px;
	height: 20px;
	content: '';
	line-height: 20px;
	border: 2px solid #535353;
	display: block;
	text-align: center;
	margin: 0 auto 10px auto;
	border-radius: 50%;
}

li:after {
	width: 100%;
	height: 2px;
	content: '';
	position: absolute;
	background-color: #7d7d7d;
	top: 10px;
	left: -50%;
	z-index: -1;
}

li:first-child:after {
	content: none;
}
` 

let LI = styled.li`
	cursor: ${props => props.cursor ? 'pointer' : 'default'};
	:before {
		background-color: ${props => props.validated ? '#000080' : 'white'};
	}
`

const LiSelected = styled.li`
	color: #535353 !important; 
	font-weight: 500;
	cursor: ${props => props.cursor ? 'pointer' : 'default'};
	:before {
		border-color: #007bff !important;
		background-color: ${props => props.validated ? '#afd5ff' : 'white'};
	}
`

export default function CheckoutProgress({stepLabels, step, clickMoveToStep, stepValidated}) {

	let Steps = stepLabels.map((stepName, index) =>{


		if (index === step) {
			return(<LiSelected cursor={stepValidated[index] || (index === step)} validated={stepValidated[index]} onClick={()=>clickMoveToStep(index)}>{stepName}</LiSelected>)
		} else {
			return(<LI cursor={stepValidated[index] || (index === step)} validated={stepValidated[index]} onClick={()=>clickMoveToStep(index)}>{stepName}</LI>)
		}
	})
	return(
		<>
			<UlProgressBar>
				{Steps}
			</UlProgressBar>
		</>
	)
}