import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`

const P = styled.p`
  font-size: 14px;
  color: grey;
  margin: 0;
  margin-left: 4px;
`
export default function PasswordRequirements({password, confirmPassword, isValidPassword}) {
	const [hasMinLength, setHasMinLength] = useState(false);
	const [hasCapitals, setHasCapitals] = useState(false);
    const [hasLowers, setHasLowers] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [containsSymbol, setContainsSymbol] = useState(false);
    const [specialLength, setSpecialLength] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [hasThree, setHasThree] = useState(false);

	useEffect(() => {
		// Must be 8 or more characters long
		if(password.length >= 8) {
			setHasMinLength(true);
		} else {
			setHasMinLength(false);
        }
        
		// Captial letters
		if (/[A-Z]/.test(password)) {
			setHasCapitals(true)
		} else {
			setHasCapitals(false)
        }
        
		// Lowercase letters
		if (/[a-z]/.test(password)) {
			setHasLowers(true)
		} else {
			setHasLowers(false)
        }

        if(/[0-9]/.test(password)) {
            setHasNumber(true);
        } else {
            setHasNumber(false);
        }

        //Symbols
        if(/[\W]/.test(password)) {
            setContainsSymbol(true);
        } else {
            setContainsSymbol(false);
        }
        
        //14-length special 
        if(/.{14,}/.test(password)) {
            setSpecialLength(true);
        } else {
            setSpecialLength(false);
        }

		// Password and Confirm Password must match
		if ( hasMinLength && (password === confirmPassword)) {
			setValidMatch(true);
		} else {
			setValidMatch(false);
        }
        
        const sum = (hasCapitals ? 1 : 0) + (hasLowers ? 1 : 0) + (hasNumber ? 1 : 0) + (containsSymbol ? 1 : 0) + (specialLength ? 1 : 0);
        if(sum >= 3) {
            setHasThree(true);
        } else {
            setHasThree(false);
        }

        if (hasThree && validMatch) {
			isValidPassword(true);
		} else {
			isValidPassword(false);
		}
    });
    
    const colorFunc = (boolVal) => {
        if(boolVal) {
            return "#007bff";        
        } else {
            if(hasThree) {
                return "#555";
            } else {
                return "#950f23";
            }
        }
    };

    const shapeFunc = (boolVal) => {
        if(boolVal) {
            return faCheckCircle;        
        } else {
            if(hasThree) {
                return faCheckCircle;
            } else {
                return faTimesCircle;
            }
        }
    };

	return(
		<Container>
			<Row>{hasMinLength ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff"/> : <FontAwesomeIcon icon={faTimesCircle} color="#950f23"/>}<P>Must be 8 or more characters long</P></Row>
            <Row>{validMatch ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff"/> : <FontAwesomeIcon icon={faTimesCircle} color="#950f23"/>}<P>Password and Confirm Password must match</P></Row>
            <Row>And three of the following:&nbsp;{hasThree ? <FontAwesomeIcon icon={faCheckCircle} color="#007bff" /> : null}</Row>
			<Row><FontAwesomeIcon icon={shapeFunc(hasCapitals)} color={colorFunc(hasCapitals)}/><P>Contains an upper case character</P></Row>
			<Row><FontAwesomeIcon icon={shapeFunc(hasLowers)} color={colorFunc(hasLowers)}/><P>Contains a lower case character</P></Row>
            <Row><FontAwesomeIcon icon={shapeFunc(hasNumber)} color={colorFunc(hasNumber)}/><P>Contains a number</P></Row>
            <Row><FontAwesomeIcon icon={shapeFunc(containsSymbol)} color={colorFunc(containsSymbol)}/><P>Contains a symbol</P></Row>
            <Row><FontAwesomeIcon icon={shapeFunc(specialLength)} color={colorFunc(specialLength)}/><P>14 or more characters</P></Row>
		</Container>
	);
}
