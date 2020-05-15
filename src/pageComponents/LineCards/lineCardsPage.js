import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import LineCardName from './uiComponents/lineCardName'
import LineCardThumbnail from './uiComponents/LineCardThumbnail'

const DivContainer = styled.div`
    width: 1300px;
    margin: 50px auto;
    
`
const HeaderDivDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    // margin: 40px 0 20px;
    align-items: center;
`
const H1 = styled.h2`
    font-family: verdana;
    color: #333;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 15px;
    letter-spacing: 2px;
`
const ShortBorder = styled.div`
    border-bottom: 3px solid #B51F2B;
    width: 10%;
`
const CardList = styled.div`
`
const SideDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
`
const LinkDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const A = styled.a`
    text-decoration: none;
    line-height: 2;
`
const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    flex: 1;
    border-right: 2px solid #f2f3f4;
`
const ThumbnailCol = styled.div`
    display: flex;
    flex: 3;
    margin-top: 80px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-self: flex-start;
`
const ThumbnailDiv = styled.a`
    margin: 0 40px 40px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    color: #555555;
    width: 206px;
    text-align: center;
    &:hover{
        transform: scale(1.1);
    }
`
const MainContainer = styled.div`
    display: flex;
`
const Blog1 = styled.div`
    margin-top: 40px;
    margin-right: 30px;
    padding: 20px 5px;
    background-color: #f2f3f4;
    text-align: center;
`
const Contact = styled.p`
    color: #B51F2B;
    font-weight: bold;
    font-size: 20px;
`
const CallUs = styled.p`
    padding: 0 10px;
    font-size: 14px;
    text-align: left;
`
const Number = styled.a`
`
const Button = styled.a`
    border: 0;
    background-color: #B51F2B;
    color: white;
    padding: 5px 20px;
    border-radius: 30px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    &:hover{
        text-decoration: none;
        color:white;
        }
`
const ButtonDiv = styled.div`
    &:hover{
        transform: scale(1.1);
        }
`
export default function BlogPage({ history }) {
    return (
        <DivContainer>
            <HeaderDivDiv>
                <H1>Line Cards & Brochures</H1>
                <ShortBorder></ShortBorder>
            </HeaderDivDiv>

            <MainContainer>
                <List>
                    <SideDiv>
                        <LineCardName
                            text='Industry Flyers' />
                        <LinkDiv>
                            <A href="#">HYDAC Diesel Filtration</A>
                            <A href="#">Lincoln Lube Systems for Construction</A>
                            <A href="#">Lincoln Lube Systems for Wastewater</A>
                            <A href="#">Mobile Products</A>
                            <A href="#">Products for Shale Gas Industry</A>
                            <A href="#">Products for Wastewater Industry</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName
                            text='Product Flyers' />
                        <LinkDiv>
                            <A href="#">Airline's Offering</A>
                            <A href="#">CalAmp</A>
                            <A href="#">Eaton MCC</A>
                            <A href="#">Electro-Hydraulic Products</A>
                            <A href="#">HYDAC Filtration</A>
                            <A href="#">Icotek Cable Entry</A>
                            <A href="#">MPSA Tool Room Machine Guard</A>
                            <A href="#">Phoenix PLCnext</A>
                            <A href="#">PQube-in-a-Box</A>
                            <A href="#">Rexroth DRn System</A>
                            <A href="#">Rexroth EcoShape</A>
                            <A href="#">Rexroth RPM</A>
                            <A href="#">SMC Valve Sizing Chart</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName
                            text='System & Services Flyers' />
                        <LinkDiv>
                            <A href="#">Build Anything</A>
                            <A href="#">Ceiling Grids</A>
                            <A href="#">Electrical Enclosures</A>
                            <A href="#">Framing Services</A>
                            <A href="#">Lean Workstations</A>
                            <A href="#">Medical Partitions & Structures</A>
                            <A href="#">MPSA Hydraulic Safety</A>
                            <A href="#">MPSA Laboratory Isolation Enclosure</A>
                            <A href="#">Sound Abatement</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName
                            text='Manufacturer Flyers' />
                        <LinkDiv>
                            <A href="#">HYDAC</A>
                            <A href="#">Omron</A>
                            <A href="#">Omron STI</A>
                            <A href="#">Phoenix Contact Elite Distributor</A>
                            <A href="#">Weg Flyer</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName
                            text='Additional Brochures and Flyers' />
                        <LinkDiv>
                            <A href="#">Airline Educational Outreach Program</A>
                            <A href="#">Airline Ashland, VA Location</A>
                            <A href="#">Engineering & Fabrication</A>
                            <A href="#">Indramat Repair</A>
                            <A href="#">Red Pallet Repair</A>
                            <A href="#">Repair and Refurb</A>
                            <A href="#">Shop Online</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName
                            text="Manufacturers's Catalogs" />
                        <LinkDiv>
                            <A href="#">Search By Manufacturer</A>
                        </LinkDiv>
                    </SideDiv>
                    <Blog1>
                        <Contact>Need More Information?</Contact>
                        <CallUs>We're here to help. Customer approvals and help requests are answered by our staff as promptly as possible during regular business hours.</CallUs>
                        <ButtonDiv><Button href="mailto:customer.service@airlinehyd.com">Contact Us</Button></ButtonDiv>
                    </Blog1>
                </List>
                <ThumbnailCol>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/Airline%20line%20card%20thumb.jpg'
                            text="Airline Hydraulics' Line Card"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/CapabilityStatement_thumb2.jpg'
                            text='Capablities Statement'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Airline_offering_thumb.jpg'
                            text='Products & Services Overview'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/corporate_thumb.jpg'
                            text='Airline Corporate Brochure'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Automation_preferred_stock_catalog_thumbnail.png'
                            text='Automation Preferred Stock Catalog'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/Hydraulic_Preferred_Stock_Catalog.jpg'
                            text='Hydraulic Preferred Products Catalog'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Hydraulic_Products_Services_thumb.jpg'
                            text='Hydraulic Components & Services'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/AutomationSolutionsthumb.jpg'
                            text='Automation Solutions'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Aftermarket%20Thumb.jpg'
                            text='Aftermarket Services (Service Repair)'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Machine_Safeguarding_thumb.jpg'
                            text='Machine Safeguarding'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Tool%20Guard%20Thumbnail.jpg'
                            text='Tool Room Guarding'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/HydSafetySolFlyer.jpg'
                            text='Hydraulic Safety'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/Mobile_Marine.jpg'
                            text='Fluid Power Solutions for Mobile & Marine Applications'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Shale%20Gas%20Thumb.jpg'
                            text='Fluid Power Solutions for the Shale Gas Industry'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/Snow%20and%20Ice%20thumb.jpg'
                            text='Snow and Ice Brochure'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/customer/aihyco/images/forestry_thumb.png'
                            text='Forest Products Industry Brochure'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/high_pressure_systems_thumb.jpg'
                            text='High Pressure Systems Brochure'
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="#">
                        <LineCardThumbnail
                            src='https://www.airlinehyd.com/literature_catalog/Airline/Thumbnails/Ind_Facilities_thumb.jpg'
                            text='Industrial Facilities Brochure'
                        />
                    </ThumbnailDiv>

                </ThumbnailCol>
            </MainContainer>
        </DivContainer>
    )
}