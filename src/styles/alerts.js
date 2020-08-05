import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export const Alert = styled.div`
  border-radius: 2px;
  padding: 4px 8px;
  margin-bottom: 8px;
`

export const ErrorAlert = styled(Alert)`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;;
`

export const InfoAlert = styled(Alert)`
  color: #0c5460;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
`

//A message box area for forms that displays a message, no icon
export function ShowAlert({message}) {
  const ref = useRef(null);
  useEffect(() => {
      //When this component is displayed, scroll to it (the button on the form might be on the bottom of the page!)
      ReactDOM.findDOMNode(ref.current).scrollIntoView();
  });
  return (
    <Alert ref={ref}>{message}</Alert>
  );
}

//A message box area for forms that displays an informational alert
export function ShowInfoAlert({message}) {
  const ref = useRef(null);
  useEffect(() => {
      //When this component is displayed, scroll to it (the button on the form might be on the bottom of the page!)
      ReactDOM.findDOMNode(ref.current).scrollIntoView();
  });
  return (
    <InfoAlert ref={ref}><FontAwesomeIcon icon={faInfoCircle} />{message}</InfoAlert>
  );
}

//A message box area for forms that displays an error alert
export function ShowErrorAlert({message}) {
  const ref = useRef(null);
  useEffect(() => {
      //When this component is displayed, scroll to it (the button on the form might be on the bottom of the page!)
      ReactDOM.findDOMNode(ref.current).scrollIntoView();
  });
  return (
    <ErrorAlert ref={ref}><FontAwesomeIcon icon={faExclamationTriangle} /> {message}</ErrorAlert>
  );
}


