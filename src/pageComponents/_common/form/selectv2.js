import * as React from 'react'
import Select from 'react-select'
import _ from 'lodash'
// import styled from '@emotion/styled'

// const ErrorMessage = styled.div`
//   color: red
// `

const LabelStyle = {
	color: '#606060',
	fontSize: '14px',
	fontWeight: 400,
	paddingLeft: '4px',
	marginBottom: '-4px',
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

function AirlineSelect(props){
	const {
		label,
		name,
		options,
		width,
		changeFunction,
		value,
		getOptionLabel,
		getOptionValue,
		isSearchable,
		placeholder
	} = props

	return (
		<div style={{margin: 'auto 0', width: width || '400px', height: '71px'}}>
			{label && <label style={LabelStyle} htmlFor={name}>{label}</label>}
			<Select
				options={options}
				value={(options ? options.find(option => option.id === value) : '')}
				onChange={option =>{changeFunction(option.id)}}
				width='400px'
				styles={SelectStyle}
				getOptionLabel={getOptionLabel}
				getOptionValue={getOptionValue}
				isSearchable={_.isNil(isSearchable) ? true : isSearchable}
				placeholder={_.isNil(placeholder) ? 'Select..' : placeholder}
			/>
			{/* {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )} */}
		</div>
	)
}

export default AirlineSelect