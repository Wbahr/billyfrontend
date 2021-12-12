import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import styled from 'styled-components'
import gql from 'graphql-tag'

import AccountingOrderSearchTable from './AccountingOrderSearchTable'
import { ButtonBlack } from 'styles/buttons'
import SelectPaymentMethodComponent from './SelectPaymentMethodComponent'
import { CircularProgress } from '@material-ui/core'

const SectionHeader = styled.h3`
    text-decoration: underline;
    margin-top: 10px;
`

const SpinnerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 50px;
`

const GET_ACCOUNTING_ORDER = gql`
  query OrdersForAccounting(
    $orderNumber: String
  ) {
    ordersForAccounting(
      orderNumber: $orderNumber
    ){
      totalResultCount
      orders {
        orderNumber
        webReferenceId
        customerIdErp
        dateCreated
        status
        activePaymentMethod {
            type
            name
            lastFour
            expiration
            paymentSystemMethodId
            isPrimary
        }
        customer {
            id
            name
            customerIdP21
            paymentSystemCustomerId
        }
        savedPaymentMethods {
            type
            name
            lastFour
            expiration
            paymentSystemMethodId
            isPrimary
        }
      }
    }
  }
`

const OrderPaymentMethods = (props) => {

    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isEditingPaymentMethod, setIsEditingPaymentMethod] = useState(false)

    //Fetch order information when a new customer is selected
    const orderSelectEventHandler = (selectedOrderNumber) => {
        setIsEditingPaymentMethod(false)
        setSelectedOrder(null)
        if (selectedOrderNumber){
            getOrder({
                variables: {
                    orderNumber: selectedOrderNumber
                }
            })
        }
    }

    const selectPaymentMethodHandler = () => {
        //refetch order info
        getOrder({
            variables: {
                orderNumber: selectedOrder.orderNumber
            }
        })
    }

    const cancelChangePaymentMethodHandler = () => {
        setIsEditingPaymentMethod(false)
    }

    const [getOrder, { loading: isSelectedOrderLoading }] = useLazyQuery(GET_ACCOUNTING_ORDER, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            const orders = result.ordersForAccounting.orders
            setSelectedOrder(orders.length ? orders[0] : null)
            setIsEditingPaymentMethod(false)
        }
    })

    return (
        <>
            <AccountingOrderSearchTable orderSelectEvent={orderSelectEventHandler} />

            <div style={{ padding: '16px' }}>
                {
                    !selectedOrder && !isSelectedOrderLoading && (
                        <div><h4>Select an order from the table above</h4></div>
                    )
                }

                {
                    isSelectedOrderLoading ? (
                        <SpinnerDiv>
                            <CircularProgress />
                        </SpinnerDiv>
                    ) : (
                        selectedOrder && (
                            <div>
                                <div>
                                    <SectionHeader>Selected order from {selectedOrder.customer.name}</SectionHeader>
                                    <h4>Order Number: {selectedOrder.orderNumber}, Web Reference#: {selectedOrder.webReferenceId}</h4>
                                </div>

                                <div>
                                    <SectionHeader>Active Payment Method</SectionHeader>
                                    <div>
                                        {
                                            selectedOrder.activePaymentMethod ? (
                                                <>
                                                    <p>{selectedOrder.activePaymentMethod.type} - {selectedOrder.activePaymentMethod.name}</p>
                                                    <p>Payment Method Token: {selectedOrder.activePaymentMethod.paymentSystemMethodId}</p>
                                                </>
                                            ) : (
                                                <p>None</p>
                                            )
                                        }
                                    </div>
                                    <div>
                                        {
                                            isEditingPaymentMethod ? (
                                                <>
                                                    <SectionHeader>Saved Payment Methods</SectionHeader>
                                                    <SelectPaymentMethodComponent
                                                        order={selectedOrder}
                                                        selectPaymentMethodEvent={selectPaymentMethodHandler}
                                                        cancelEvent={cancelChangePaymentMethodHandler}
                                                    />
                                                </>
                                            ) : (
                                                <ButtonBlack onClick={() => { setIsEditingPaymentMethod(true) }}>Change Payment Method</ButtonBlack>
                                            )
                                        }
                                                
                                    </div>
                                </div>
                            </div>
                    
                        )
                    )
                }
            </div>
            
            
        </>
    )
}

export default OrderPaymentMethods