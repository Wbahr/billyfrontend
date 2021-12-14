import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonBlack } from 'styles/buttons'
import { CircularProgress } from '@material-ui/core'
import SelectNewPaymentMethodComponent from './SelectNewPaymentMethodComponent'
import SelectExistingPaymentMethodsComponent from './SelectExistingPaymentMethodComponent'

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

const SelectPaymentMethodComponent = (props) => {
    const {
        order,
        selectPaymentMethodEvent,
        cancelEvent
    } = props

    
    const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false)
    const [isSavingPaymentMethod, setIsSavingPaymentMethod] = useState(false)

    const isStripeSavingEventHandler = (isSaving) => {
        setIsSavingPaymentMethod(isSaving)
    }

    const paymentSavedEventHandler = () => {
        selectPaymentMethodEvent()
    }

    return (
        <>
            <div>
                {
                    isSavingPaymentMethod ? (
                        <SpinnerDiv>
                            <CircularProgress />
                        </SpinnerDiv>
                    ) : (
                        <>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flexGrow: 2 }}>
                                    <SelectExistingPaymentMethodsComponent
                                        order={order}
                                        cancelEvent={cancelEvent}
                                        existingPaymentSavedEvent={paymentSavedEventHandler}
                                    />
                                </div>
                                <div style={{ flexGrow: 1 }}>
                                    <h4>OR</h4>
                                </div>
                                <div style={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ alignSelf: 'center' }}>
                                        {
                                            isNewPaymentMethod ? (
                                                <SelectNewPaymentMethodComponent
                                                    order={order}
                                                    isSavingEvent={isStripeSavingEventHandler}
                                                    newPaymentSavedEvent={paymentSavedEventHandler}
                                                /> 
                                            ) : (
                                                <ButtonBlack onClick={() => { setIsNewPaymentMethod(true) }}>Add a new Payment Method</ButtonBlack>
                                            )
                                        }                           
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default SelectPaymentMethodComponent