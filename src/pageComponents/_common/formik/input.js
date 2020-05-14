import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'

const DivContainer = styled.div`
    display flex;
    flex-direction: column;
    height: 71px;
  `

const MainInput = styled.input`
  width: 300px;
  height: 33px;
  padding: 0 8px;
`

const Label = styled.label`
  color: black;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin: 0;
`

const DivError = styled.div`
  color: #DB1633;
  font-size: 12px;
  font-weight: 500;
  padding-left: 8px;
`

export default function Input({
	type,
	disabled,
	name,
	label,
	placeholder,
	onChange
}){
	return(
		<DivContainer>
			{label && <Label htmlFor={label}>{`${label}:`}</Label>}        
			<Field name={name}>
				{({
					field,
					form,
					form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
					meta,
				}) => (
              <>
              <MainInput {...field} type={type} disabled={disabled} placeholder={placeholder} onChange={(e)=>{eval(onChange)}} />
              {(meta.touched && meta.error) && <DivError>{meta.error}</DivError>}
              </>
				)}
			</Field>
		</DivContainer>
	)
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.string
}

Input.defaultProps = {
	type: 'text',
	placeholder: ''
}