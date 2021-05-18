import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../uiComponents/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Span = styled.span`
    font-weight: bold;
`
const Div_1 = styled.div`
    margin-top: 30px;
`
const Div_2 = styled.div`
    margin-top: 30px;
`
const ServiceList = styled.p`
`
const HeaderDiv = styled.div`
`
const Ul = styled.ul`
    font-size: 12px;
`
const Li = styled.li`
`
const ServiceDiv = styled.div`
    width: 100%;
    max-width: 350px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    border: 2px solid #f2f3f4;
    border-radius: 10px;
    padding: 40px 15px 15px;
`
const Div_icon = styled.div`
    width: 200px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`
const AllServiceDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    justify-content: center;
    flex-wrap: wrap;
`
const ShowMoreBtn1 = styled.button`
  font-size: 12px;
  border: none;
  background-color: white;
`
const ShowMoreBtn2 = styled.button`
  font-size: 12px;
  border: none;
  background-color: white;
`
const ShowMoreBtn3 = styled.button`
  font-size: 12px;
  border: none;
  background-color: white;
`
export default function TransactionalServicesPage() {
    const [showText1, setShowText1] = useState(false)
    const [showText2, setShowText2] = useState(false)
    const [showText3, setShowText3] = useState(false)

    return (
        <>
            <Container>
                <HeaderDiv>
                    <Header text="Transactional Services" />
                </HeaderDiv>
                <AllServiceDiv>
                    <ServiceDiv>
                        <Div_icon>
                            <FontAwesomeIcon icon='shipping-fast' size="6x" color="#133752"/>
                        </Div_icon>
                        <Div_1>
                            <ServiceList><Span>Same-Day ServiceList</Span> on in-stock orders placed before 3:30 p.m. EST. Orders shipped from our main warehouse in Bensalem, PA will generally be delivered the next business day via UPS to many areas in the Northeastern United States.</ServiceList>
                        </Div_1>
                    </ServiceDiv>
                    <ServiceDiv>
                        <Div_icon>
                            <FontAwesomeIcon icon='truck-loading' size="6x" color="#133752"/>
                        </Div_icon>
                        <Div_2>
                            <ServiceList><Span>J.I.T. (Just-In-Time) Inventory Services</Span> ensure the products you need are available when you need them. Choose from the program below that best fits your needs:</ServiceList>
                            <Ul>
                                <Li><Span>Bin Stocking Programs —</Span>
                                    <ShowMoreBtn1 onClick={() => setShowText1(!showText1)}>{showText1 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn1>
                                    {showText1 && (
                                        <div>
                                            Let us know what your minimum/maximum stocking requirements are and Airline will help you by physically monitoring and replenishing the inventory levels at your facility.
                                        </div>
                                    )}
                                </Li>

                                <Li><Span>Allow Blanket Contracts —</Span>
                                    <ShowMoreBtn2 onClick={() => setShowText2(!showText2)}>{showText2 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn2>
                                    {showText2 && (
                                        <div>
                                            Allow you to reserve inventory stored at our warehouse facilities. This dedicated inventory will be shipped to you on your release dates. This eliminates concerns about product availability and lead times and reduces your carrying costs.
                                        </div>
                                    )}
                                </Li>
                                <Li><Span>Consignment Inventories —</Span>
                                    <ShowMoreBtn3 onClick={() => setShowText3(!showText3)}>{showText3 ? <><FontAwesomeIcon icon='minus-circle' size='1x' /> Show Less </> : <><FontAwesomeIcon icon='plus-circle' size='1x' /> Show More  </>} </ShowMoreBtn3>
                                    {showText3 && (
                                        <div>
                                            Are available to store Airline-owned products in the customer’s inventory at their facility. The customer issues a purchase order for materials as they are needed and Airline staff will monitor and replenish this inventory as it is used.
                                        </div>
                                    )}
                                </Li>
                            </Ul>
                        </Div_2>
                    </ServiceDiv>
                    <ServiceDiv>
                        <Div_icon>
                            <FontAwesomeIcon icon='user-edit' size="6x" color="#133752"/>
                        </Div_icon>
                        <Div_1>
                            <ServiceList><Span>Customer Part Number Program</Span> allows you to place orders using your own part numbers, which are cross-referenced in our system to the corresponding manufacturer's part number. Both numbers will appear on the order’s documentation.</ServiceList>
                        </Div_1>
                    </ServiceDiv>
                    <ServiceDiv>
                        <Div_icon>
                            <FontAwesomeIcon icon='database' size="6x" color="#133752"/>
                        </Div_icon>
                        <Div_1>
                            <ServiceList><Span>E.D.I. Trading Partner Program</Span> uses electronic data interchange standards to efficiently conduct business transactions such as order processing and billing. This program reduces transactional errors as well as overhead costs related to purchasing and accounting.</ServiceList>
                        </Div_1>
                    </ServiceDiv>
                    <ServiceDiv>
                        <Div_icon>
                            <FontAwesomeIcon icon='desktop' size="6x" color="#133752"/>
                        </Div_icon>
                        <Div_1>
                            <ServiceList><Span>E-Commerce Website</Span> Shop 24/7 on Airline's website to browse our inventory and get the latest product information. Log in to your account to view pricing, place an order, check order status, review your order history and more.</ServiceList>
                        </Div_1>
                    </ServiceDiv>
                    <ServiceDiv>
                        <Div_icon>
                            <FontAwesomeIcon icon='box-open' size="6x" color="#133752"/>
                        </Div_icon>
                        <Div_1>
                            <ServiceList><Span>Packaging to Meet Your Needs</Span> Airline can provide kitting, custom packaging, bar-coding, bulk packaging, preparation for overseas shipments or other specialized handling to meet your requirements or your customer’s specifications.</ServiceList>
                        </Div_1>
                    </ServiceDiv>
                </AllServiceDiv>
            </Container>
        </>
    )
}
