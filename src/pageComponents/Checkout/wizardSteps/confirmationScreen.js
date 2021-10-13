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
    display: flex;
    flex-wrap: wrap;
	justify-content: space-between;
`

const SectionContainer = styled.div`
	border: 1px solid whitesmoke;
	margin: 8px 0;
    padding: 8px 16px;
    max-width: 100%;
`

const SectionContainerBlue = styled(SectionContainer)`
	background-color: #e7f2ff;
`

const SectionContainerHalf = styled(SectionContainer)`
    width: 49%;
    @media(max-width: 500px) {
        width: 100%;
    }
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
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`

const Container = styled.div`
    max-width: 100%;
`

export default function ConfirmationScreen(props) {
    const {
        history,
        values: {
            schedule,
            shipto,
            billing: {
                cardIsValid,
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
        itemsCustomerPartNumbers,
        isStepValid,
        validateForm,
        setFieldValue
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

            const {
                webReferenceId,
                errorMessages,
                checkoutType,
                affiliateName, //Company Name or Person's Name
                itemsSubtotal,
                taxTotal,
                tariffTotal,
                shippingCost,
                grandTotal,
                cartItems
            } = submitOrder

            if (orderId){
                const dataLayer = window.dataLayer || [] 
                dataLayer.push({ 
                    event: 'transaction',
                    ecommerce: { 
                        purchase: { 
                            actionField: { 
                                id: webReferenceId, // Required 
                                affiliation: affiliateName, 
                                revenue: grandTotal,  // Total transaction value (incl. tax and shipping) 
                                tax: taxTotal, 
                                shipping: shippingCost
                            }, 
                            products: cartItems.map(item => {
                                return { 
                                    name: item.invMastUid, // Name or ID is required. 
                                    id: item.itemCode, 
                                    price: item.unitPrice, 
                                    brand: item.brand, 
                                    quantity: item.quatity, 
                                }
                            }) 
                        } 
                    } 
                })
            }

            if (webReferenceId) {
                localStorage.removeItem('shoppingCartToken')
                emptyCart()
                if (checkoutType === 'quote') {
                    history.push(`/quote-complete/${webReferenceId}`)
                } else {
                    history.push(`/order-complete/${webReferenceId}`)
                }
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
            handleMoveStep(0)
        } else {
            handleMoveStep(1)
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
    
    const handleCheckboxChange = name => ({ target: { checked } }) => setFieldValue(name, checked)

    const CartDates = schedule.cartWithDates.map((item, index) => {
        const price = item.itemUnitPrice
        const details = itemsDetails?.find(detail => detail.invMastUid === item.invMastUid)
        const customerPartNumbers = itemsCustomerPartNumbers?.filter(part => part.invMastUid === item.invMastUid)

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
        <Container>
            {(userInfo?.isAirlineEmployee) && (
                <SectionContainerBlue>
                    <SectionTitle>Confirmation Email</SectionTitle>
                    <FormikCheckbox
                        value={sendToShipTo}
                        label={`Send confirmation email to ${shipto.email}?`}
                        name="confirmationEmail.sendToShipTo"
                        onChange={handleCheckboxChange('confirmationEmail.sendToShipTo')}
                    />
                    <FormikFieldArray name="confirmationEmail.ccEmails" label="CC Emails" addMore="Add a CC email" />
                    {history.location.pathname === '/create-quote' && (
                        <FormikCheckbox
                            value={imagesOnQuote}
                            label="Include Images on Quotes?"
                            name="confirmationEmail.imagesOnQuote"
                            onChange={handleCheckboxChange('confirmationEmail.imagesOnQuote')}
                        />
                    )}
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
                            <p>{!shipto.isCollect ? 'No' : 'Yes'}</p>
                        </DivTextRow>

                        {shipto.isCollect && (
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
                <ButtonRed disabled={!isStepValid} onClick={handleCheckoutSubmit}>
                    <FontAwesomeIcon icon='lock' size="sm" color="white" />
                    Submit {history.location.pathname === '/create-quote' ? 'Quote' : 'Order'}
                </ButtonRed>
            </DivNavigation>

            {submitting && <ProcessingOrderModal isQuote={history.location.pathname === '/create-quote'} />}
            {showOrderFailedModal && <OrderFailedModal />}
        </Container>
    )
}
