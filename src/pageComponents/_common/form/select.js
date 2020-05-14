import * as React from 'react'
import Select from 'react-select'

const LabelStyle = {
	color: '#606060',
	fontSize: '14px',
	fontWeight: 400,
	paddingLeft: '4px',
	marginBottom: '-4px',
	backgroundColor: 'white',
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

const SelectComponent = ({
	options,
	width,
	value,
	setValue,
	...props
}) => {

	return (
		<div style={{margin: 'auto 0', width: width || '300px', padding: '0 8px', height: '71px'}}>
			{props.label && <label style={LabelStyle} htmlFor={field.name}>{props.label}</label>}
			<Select
				{...props}
				options={options}
				value={value}
				onChange={option => setValue(option.value)}
				width='400px'
				styles={SelectStyle}
			/>
		</div>
	)
}

export default SelectComponent