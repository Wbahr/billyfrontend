import * as React from 'react'
import Select from 'react-select'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red
`

const LabelStyle = {
    color: '#606060',
    fontSize: '14px',
    fontWeight: 400,
    paddingLeft: '4px',
    marginBottom: '2px',
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
    changeFunction,
    isDisabled,
    ...props
}) => {
	
    const handleChange = option => {
        return !changeFunction ? setFieldValue(field.name, option.value) : changeFunction(field.name, option.value)
    }
	
    return (
        <div style={{ position: 'relative', margin: 'auto 0', width: width || '300px', padding: '0 8px', height: props.label ? '71px' : '' }}>
            {props.label && <label style={LabelStyle} htmlFor={field.name}>{props.label}</label>}
            <Select
                {...field}
                {...props}
                isDisabled={isDisabled}
                options={options}
                value={options?.find(option => option.value === field.value) || ''}
                onChange={handleChange}
                width='400px'
                styles={SelectStyle}
            />
			
            {!!isDisabled && (
                <input
                    type="hidden"
                    {...field}
                    value={field.value}
                />
            )}
			
            {touched[field.name] && errors[field.name] && (
                <ErrorMessage>{errors[field.name]}</ErrorMessage>
            )}
        </div>
    )
}

export default CustomSelectComponent