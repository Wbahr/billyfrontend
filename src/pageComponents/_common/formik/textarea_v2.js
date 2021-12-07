import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field as FormikField } from 'formik'

const DivContainer = styled.div`
  display flex;
  flex-direction: column;
  height: 71px;
  padding: 0 8px;
`

const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -4px;
  // background-color: white;
  width: max-content;
  padding: 2px;
  margin-left: 7px;
`

const formikStyle = {
    padding: '0 8px',
    color: '#303030',
    fontSize: '16px',
    borderRadius: '1px',
    border: '1px solid #e1e1e1'
}

export default function TextArea({ type, disabled, name, label, placeholder, width, changeFunction, maxLength, rows, height, onFocus }){
    if (type === 'text' && _.isNil(changeFunction)){
        return (
            <DivContainer>
                {label && <Label htmlFor={label}>{`${label}`}</Label>}        
                <FormikField 
                    as="textarea"
                    name={name} 
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{ ...formikStyle, width: width || '400px', height: height || '40' }}
                    maxLength={maxLength}
                    rows={rows}
                    onFocus={onFocus}
                />
            </DivContainer>
        )
    } else if (type === 'text' && !_.isNil(changeFunction)){
        return (
            <DivContainer>
                {label && <Label htmlFor={label}>{`${label}`}</Label>}        
                <FormikField 
                    as="textarea"
                    name={name} 
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{ ...formikStyle, width: width || '400px', height: height || '40' }}
                    onChange={(e) => changeFunction(name, e.target.value)}
                    maxLength={maxLength}
                    rows={rows}
                />
            </DivContainer>
        )
    } else {
        return (
            <FormikField type={type} name={name} />
        )
    }
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.string
}

TextArea.defaultProps = {
    type: 'text',
    placeholder: '',
    maxLength: null,
    rows: '3'
}