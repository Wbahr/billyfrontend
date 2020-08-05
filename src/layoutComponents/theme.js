import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export const airlineRedTheme = {
    mainColor: "#DB1633",
    mainColorHover: "#B51029",
    activeShadow: "black",
};

export const ErrorSummarySpan = styled.p`
  background-color: mistyrose;
  color: red;
  padding: 10px;
  border: 1px solid red;
  width: 350px;
  margin: 0 auto;
`

export function PleaseFixErrors({message}) {
    const ref = useRef(null);
    useEffect(() => {
        //When this component is displayed, scroll to it (the button on the form might be on the bottom of the page!)
        ReactDOM.findDOMNode(ref.current).scrollIntoView();
    });
	return (
		<ErrorSummarySpan ref={ref}><FontAwesomeIcon icon={faExclamationTriangle} />{message ? message : " Please correct the problems and try again"}</ErrorSummarySpan>
	);
}

export const ThemeButton = styled.button`
  background-color: ${props => props.theme.mainColor};
  color: white;
  font-weight: 600;
  border: 0;
  padding: 4px 8px;
  margin: 20px;
  box-shadow: 2px 2px 4px ${props => props.theme.activeShadow};
  &:hover{
    background-color: ${props => props.theme.mainColorHover};
  }
  &:active{
    background-color: ${props => props.theme.mainColorHover};
    box-shadow: 2px 2px 2px #000;
  }
`