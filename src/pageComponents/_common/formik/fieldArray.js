import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FieldArray, ErrorMessage, useFormikContext } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormikFormFieldContainer, FormikFormField, FormikFormFieldError } from 'styles/formikForm'
import { evaluate } from '../helpers/generalHelperFunctions'

const ButtonContainer = styled.div`
  display flex;
  padding: 0 0;
  div {
    cursor: pointer;
	margin: 0 4px;
	align-self: center;
  }
  input {
	  flex-grow: 1;
  }
`

const Label = styled.label`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  margin-bottom: -8px;
  width: max-content;
  padding: 2px;
  margin-left: 7px;
`

const DivAddMore = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-left: 18px;
  font-style: italic;
`

export default function FormikFieldArray({ name, label, addMore }){
    const { values } = useFormikContext()
    const valueArray = evaluate(values, name)
    const valueArrLen = valueArray?.length
    return (
        <FieldArray
            name={name}
            render={arrayHelpers => (
                <FormikFormFieldContainer style={{ maxWidth: '100%' }}>
                    <Label>{label}</Label>
                    {valueArrLen > 0 ? (
                        valueArray.map((elem, index) => (
                            <React.Fragment key={index}>
                                <ButtonContainer>
                                    <FormikFormField name={`${name}.${index}`} />

                                    <div onClick={() => arrayHelpers.remove(index)}>
                                        <FontAwesomeIcon icon="minus-circle" color="grey"/>
                                    </div>

                                    { ((index + 1) === valueArrLen && index < 4) && (
                                        <div onClick={() => arrayHelpers.insert(valueArrLen, '')}>
                                            <FontAwesomeIcon icon="plus-circle" color="#328EFC"/>
                                        </div>
                                    )}
                                </ButtonContainer>

                                <FormikFormFieldError>
                                    <ErrorMessage name={`${name}.${index}`} />
                                </FormikFormFieldError>
                            </React.Fragment>
                        ))
                    ) : (
                        <DivAddMore onClick={() => arrayHelpers.insert(0, '')}>
                            {addMore}
                            <FontAwesomeIcon icon="plus-circle" color="#328EFC"/>
                        </DivAddMore>
                    )}
                </FormikFormFieldContainer>
            )}
        />
    )
}

FormikFieldArray.propTypes = {
    name: PropTypes.string.isRequired,
    addMore: PropTypes.string.isRequired,
    label: PropTypes.string,
}
