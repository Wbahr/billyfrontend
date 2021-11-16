import React, { useEffect } from 'react'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import { DivNavigation } from '../../../styles/divs'
import PartForm from '../uiComponents/partForm'
import { FieldArray } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const DivAddMore = styled.div`
    cursor: pointer;
    font-size: 16px;
    margin-left: 18px;
    font-style: italic;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90px;
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
`

const PartContainer = styled.div`
    margin: 15px 0;
`

export default function PartsForm(props) {
    const { isStepValid, handleMoveStep, values, emptyPart, setFieldTouched } = props
    
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const handleContinueClick = () => {
        const disabled = !isStepValid
        if (disabled) {
            touchFields()
        } else {
            handleMoveStep(3)
        }
    }

    function touchFields() {
        const fields = [
            'type',
            'quantity',
            'manufacturer',
            'modelCode',
            'partNumber',
            'failure',
            'failureLocation',
            'fluidType',
            'toAirline',
            'toCustomer',
        ]
        values.parts.forEach((part, i) => {
            for (const field of fields) {
                setFieldTouched(`parts[${i}].${field}`, true)
            }
        })
    }

    return (
        <div>
            <FieldArray
                name='parts'
                render={arrayHelpers => (
                    <div>
                        {values?.parts?.map((part, idx) => {
                            return (
                                <PartContainer key={idx}>
                                    <Flex>
                                        <div>Part {idx + 1}</div>
                                        <div onClick={() => arrayHelpers.remove(idx)}>
                                            <FontAwesomeIcon icon="minus-circle" color="grey" />
                                        </div>
                                    </Flex>
                                    <PartForm {...{ ...props, idx }} />
                                </PartContainer>
                            )
                        })}
                        <DivAddMore onClick={() => arrayHelpers.insert(values?.parts?.length, emptyPart)}>
                            Add Part
                            <FontAwesomeIcon icon="plus-circle" color="#328EFC" />
                        </DivAddMore>
                    </div>
                )}
            />
            <DivNavigation>
                <ButtonBlack onClick={() => handleMoveStep(1)}>Previous</ButtonBlack>
                <ButtonRed onClick={handleContinueClick}>Continue</ButtonRed>
            </DivNavigation>
        </div>
    )
}