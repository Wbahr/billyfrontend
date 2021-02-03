import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import ShippingScheduleLineDisplay from '../uiComponents/scheduleLineDisplay'
import { packingBasis } from '../helpers/checkoutDropdownData'
import FormikFieldArray from '../../_common/formik/fieldArray'
import FormikCheckbox from '../../_common/formik/checkBox'
import Context from '../../../setup/context'
import { ButtonBlack, ButtonRed } from '../../../styles/buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/client'
import { SUBMIT_ORDER } from '../../../setup/providerGQL'
import ProcessingOrderModal from '../uiComponents/processingOrderModal'
import OrderFailedModal from '../uiComponents/orderFailedModal'

const SectionRow = styled.div`
	display: flew;
	justify-content: space-between;
`

const SectionContainer = styled.div`
	border: 1px solid whitesmoke;
	margin: 8px 0;
	padding: 8px 16px;
`

const SectionContainerBlue = styled(SectionContainer)`
	background-color: #e7f2ff;
`

const SectionContainerHalf = styled(SectionContainer)`
	width: 49%;
`

const DivAddressSection = styled.div`
	margin-bottom: 10px;
	p {
		font-size: 16px;
	}
`

const SectionTitle = styled.p`
	margin: 0;
	margin-bottom: 4px;
	font-size: 16px;
	font-weight: 500;
`
const SectionFields = styled.div`
	padding-left: 20px;
	p {
		margin: 0;
		margin-bottom: 2px;
		font-size: 14px;
		line-height: 18px;
	}
`

const P = styled.p`
	font-size: 14px;
	font-weight: 600;
	margin-right: 6px !important;
`

const Pbold = styled.p`
	font-size: 16px;
	font-weight: 600;
	line-height: 15px;
`

const DivTextRow = styled.div`
	display: flex;
`

const DivNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`

export default function ConfirmationScreen(props) {
    const {
        history,
        values: {
            schedule,
            shipto,
            billing: {
                sameAsShipping,
                ...billing
            },
            confirmationEmail: {
                sendToShipTo,
                imagesOnQuote
            }
        },
        paymentInfo,
        checkoutDropdownData,
        checkoutDropdownDataLabels,
        handleMoveStep,
        itemsDetails,
        itemsPrices,
        itemsCustomerPartNumbers,
        isStepValid,
        validateForm
    } = props

    useEffect(() => {
        validateForm() // this is the only page we want to validate on mount
    }, [])

    const { userInfo, emptyCart } = useContext(Context)
    const [submitting, setSubmitting] = useState(false)
    const [showOrderFailedModal, setShowOrderFailedModal] = useState(false)

    const [submitOrder] = useMutation(SUBMIT_ORDER, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ submitOrder }) => {
            const orderId = submitOrder?.webReferenceId || null
            if (orderId) {
                localStorage.removeItem('shoppingCartToken')
                emptyCart()
                history.push(`/order-complete/${orderId}`)
            } else {
                setShowOrderFailedModal(true)
            }
            setSubmitting(false)
        },
        onError: () => {
            setSubmitting(false)
            setShowOrderFailedModal(true)
        }
    })

    const handlePreviousClick = () => {
        if (history.location.pathname === '/create-quote') {
            handleMoveStep(1)
        } else {
            handleMoveStep(2)
        }
    }

    const handleCheckoutSubmit = () => {
        setSubmitting(true)
        submitOrder({
            variables: {
                order: {
                    ...props.values,
                    billing: { ...billing },
                    paymentSystemCustomerId: paymentInfo.paymentSystemCustomerId,
                    paymentMethodId: paymentInfo.paymentMethodId
                }
            }
        })
    }

    const CartDates = schedule.cartWithDates.map((item, index) => {
        const price = itemsPrices?.find(price => price.invMastUid === item.frecno)
        const details = itemsDetails?.find(detail => detail.invMastUid === item.frecno)
        const customerPartNumbers = itemsCustomerPartNumbers?.filter(part => part.invMastUid === item.frecno)

        return (
            <ShippingScheduleLineDisplay
                key={index}
                item={item}
                price={price}
                itemDetails={details}
                customerPartNumbers={customerPartNumbers}
                index={index}
            />
        )
    })

    const packingBasisName = packingBasis.find(elem => elem.value === schedule.packingBasisName)?.label
    const carrierName = checkoutDropdownDataLabels.carriers.find(elem => elem.value === shipto.carrierId)?.label

    return (
        <div>
            {(userInfo?.role === 'Impersonator' || userInfo?.role === 'AirlineEmployee') && (
                <SectionContainerBlue>
                    <SectionTitle>Confirmation Email</SectionTitle>
                    <FormikCheckbox value={sendToShipTo} label={`Send confirmation email to ${shipto.email}?`} name="confirmationEmail.sendToShipTo" />
                    <FormikFieldArray name="confirmationEmail.ccEmails" label="CC Emails" addMore="Add a CC email" />
                    {history.location.pathname === '/create-quote' && <FormikCheckbox value={imagesOnQuote} label="Include Images on Quotes?" name="confirmationEmail.imagesOnQuote" />}
                </SectionContainerBlue>
            )}

            <SectionRow>
                <SectionContainerHalf>
                    <SectionTitle>Ship To</SectionTitle>
                    <SectionFields>
                        <DivAddressSection>
                            <Pbold>{shipto.companyName}</Pbold>
                            <Pbold>{shipto.address1}</Pbold>
                            <Pbold>{shipto.address2}</Pbold>
                            <Pbold>{shipto.city}, {shipto.stateOrProvince} {shipto.zip} {shipto.country === 'us' ? 'USA' : 'Canada'}</Pbold>
                        </DivAddressSection>

                        <p>{shipto.phone}</p>
                        <p>{shipto.email}</p>

                        <DivTextRow>
                            <P>Carrier:</P>
                            <p>{carrierName}</p>
                        </DivTextRow>

                        <DivTextRow>
                            <P>Is Collect?</P>
                            <p>{shipto.isCollect === 0 ? 'No' : 'Yes'}</p>
                        </DivTextRow>

                        {shipto.isCollect === 1 && (
                            <DivTextRow>
                                <P>Collect Number:</P>
                                <p>{shipto.collectNumber}</p>
                            </DivTextRow>
                        )}
                    </SectionFields>
                </SectionContainerHalf>

                <SectionContainerHalf>
                    <SectionTitle>Bill To</SectionTitle>
                    <SectionFields>
                        <DivAddressSection>
                            <Pbold>{billing.companyName ? billing.companyName : billing.firstName + ' ' + billing.lastName}</Pbold>
                            <Pbold>{billing.address1}</Pbold>
                            <Pbold>{billing.address2}</Pbold>
                            <Pbold>{billing.city}, {billing.stateOrProvince} {billing.zip} {shipto.country === 'us' ? 'USA' : 'Canada'}</Pbold>
                        </DivAddressSection>

                        <p>{billing.phone}</p>
                        <p>{billing.email}</p>

                        <DivTextRow>
                            <P>Payment Method:</P>
                            <p>{billing.paymentMethod === 'purchase_order' ? 'Purchase Order' : 'Credit Card'}</p>
                        </DivTextRow>
                        {billing.paymentMethod === 'purchase_order' && checkoutDropdownData?.billingInfo.terms && (
                            <DivTextRow><P>Terms:</P><p>{checkoutDropdownData.billingInfo.terms}</p></DivTextRow>
                        )}

                        {billing.paymentMethod === 'credit_card' && (
                            <DivTextRow>
                                <P>Card Type:</P>
                                <p>{billing.cardType === 'new_card' ? 'New Card' : 'Saved Card'}</p>
                            </DivTextRow>
                        )}

                        <DivTextRow>
                            <P>Purchase Order:</P>
                            <p>{billing.purchaseOrder}</p>
                        </DivTextRow>
                    </SectionFields>
                </SectionContainerHalf>
            </SectionRow>

            <SectionContainer>
                <SectionTitle>Shipping Schedule</SectionTitle>
                <SectionFields>
                    <DivTextRow>
                        <P>Packing Basis:</P>
                        <p>{packingBasisName}</p>
                    </DivTextRow>
                    {shipto.shippingNotes && (
                        <DivTextRow>
                            <P>Shipping Notes:</P>
                            <p>{shipto.shippingNotes}</p>
                        </DivTextRow>
                    )}
                </SectionFields>
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Items</SectionTitle>
                <SectionFields>
                    {CartDates}
                </SectionFields>
            </SectionContainer>

            <DivNavigation>
                <ButtonBlack onClick={handlePreviousClick}>Previous</ButtonBlack>
                <ButtonRed disabled={!isStepValid} onClick={handleCheckoutSubmit}><FontAwesomeIcon icon='lock' size="sm" color="white" />Submit</ButtonRed>
            </DivNavigation>

            {submitting && <ProcessingOrderModal />}
            {showOrderFailedModal && <OrderFailedModal />}
        </div>
    )
}
