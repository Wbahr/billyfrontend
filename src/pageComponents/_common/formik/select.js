import * as React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import Select from 'react-select'
import styled from '@emotion/styled'

const ErrorMessage = styled.div`
  color: red
`

const LabelStyle = {
	color: '#606060',
	fontSize: '14px',
	fontWeight: 400,
	paddingLeft: '4px',
	marginBottom: '-4px',
	// backgroundColor: 'white',
	width: 'max-content',
	padding: '2px',
	marginLeft: '7px'
}

const SelectStyle = {
	control: (provided) => ({
		...provided,
		minHeight: '40px',
		borderRadius: '1px',
		border: '1px solid #e1e1e1',
		marginTop: '-4px',
	}),
}

const CustomSelectComponent = ({
	field,
	form: { touched, errors, setFieldValue },
	options,
	width,
	useDefaultChange,
	changeFunction,
	...props
}) => {
	return (
		<div style={{margin: 'auto 0', width: width || '300px', padding: '0 8px', height: '71px'}}>
			{props.label && <label style={LabelStyle} htmlFor={field.name}>{props.label}</label>}
			<Select
				{...field}
				{...props}
				options={options}
				value={(options ? options.find(option => option.value === field.value) : '')}
				onChange={_.isNil(changeFunction) ? option =>{setFieldValue(field.name, (option).value)} : option => changeFunction(field.name, (option).value)}
				width='400px'
				styles={SelectStyle}
			/>
			{touched[field.name] && errors[field.name] && (
				<ErrorMessage>{errors[field.name]}</ErrorMessage>
			)}
		</div>
	)
}

export default CustomSelectComponent