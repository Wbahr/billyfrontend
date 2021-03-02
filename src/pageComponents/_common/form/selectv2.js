import * as React from 'react'
import Select from 'react-select'

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
        <div style={{ margin: 'auto 0', width: width || '400px', height: '71px' }}>
            {label && <label style={LabelStyle} htmlFor={name}>{label}</label>}
            <Select
                options={options}
                value={value}
                onChange={option => {changeFunction(null, name, getOptionValue(option), option)}}
                width='400px'
                styles={SelectStyle}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                isSearchable={isSearchable}
                placeholder={placeholder ? placeholder : 'Select..'}
            />
            {/* {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )} */}
        </div>
    )
}

export default AirlineSelect