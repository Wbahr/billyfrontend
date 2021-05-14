import React from 'react'
import styled from 'styled-components'
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
        transition: transform 0.5s;
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

const Button = styled.a`
    background-color: #246696;
    color: white;
    font-weight: bold;
    border-radius: 3px;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 0;
    padding: 10px 15px;
    &:hover{
        text-decoration: none;
        color:white;
    }
`
const PopDiv = styled.div`
    &:hover{
        transform: scale(1.1);
    }
`
export default function BlogPage() {
    return (
        <DivContainer>
            <HeaderDivDiv>
                <H1>Line Cards &amp; Brochures</H1>
                <ShortBorder></ShortBorder>
            </HeaderDivDiv>

            <MainContainer>
                <List>
                    <SideDiv>
                        <LineCardName text="Industry Flyers" />
                        <LinkDiv>
                            <A href="//airlinemedia.airlinehyd.com/Literature/HYDAC_Diesel_filtration.pdf">HYDAC Diesel Filtration</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Lincoln_Construction.pdf">Lincoln Lube Systems for Construction</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Lincoln_wastewater_flyer.pdf">Lincoln Lube Systems for Wastewater</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Airline_mobile_products.pdf">Mobile Products</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Hydraulic_Fracking.pdf">Products for Shale Gas Industry</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Wastewater_Products.pdf">Products for Wastewater Industry</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName text="Product Flyers" />
                        <LinkDiv>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Airline_offering_flyer.pdf">Airline's Offering</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/CalAmp_flyer.pdf#">CalAmp</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Eaton_MCC_Flyer.pdf">Eaton MCC</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Electrohyd_products.pdf">Electro-Hydraulic Products</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/HYDAC_filtration.pdf">HYDAC Filtration</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Icotek_flyer.pdf">Icotek Cable Entry</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Tool_Room_Guarding.pdf">MPSA Tool Room Machine Guard</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Phoenix_PLCnext.pdf">Phoenix PLCnext</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/PQiaB_PSL_Proface_flyer.pdf">PQube-in-a-Box</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Rexroth_DRn_Flyer.pdf">Rexroth DRn System</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/EcoShape_flyer.pdf">Rexroth EcoShape</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Rexroth_RPM_flyer.pdf">Rexroth RPM</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/SMC_Valve_Sizing_Chart.pdf">SMC Valve Sizing Chart</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName text="System &amp; Services Flyers" />
                        <LinkDiv>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Build_Anything_Flyer.pdf">Build Anything</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Ceiling_Grids.pdf">Ceiling Grids</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Panel_Flyer.pdf">Electrical Enclosures</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Framing_Services.pdf">Framing Services</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Workstations_Flyer.pdf">Lean Workstations</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Partitions_Structures_Flyer.pdf">Medical Partitions &amp; Structures</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Hydraulic_Safety_flyer.pdf">MPSA Hydraulic Safety</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Lab_Isolation_Enclosure_flyer.pdf">MPSA Laboratory Isolation Enclosure</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/restaurant-sdb-flyer.pdf">Restaurant Social Distancing Barriers</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Sound_Abatement_flyer.pdf">Sound Abatement</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName text="Manufacturer Flyers" />
                        <LinkDiv>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydac.pdf">HYDAC</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Omron_flyer.pdf">Omron</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/OSTI_flyer.pdf">Omron STI</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Phoenix_flyer.pdf">Phoenix Contact Elite Distributor</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Airline_Weg.pdf">Weg Flyer</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName text="Additional Brochures and Flyers" />
                        <LinkDiv>
                            <A href="//airlinemedia.airlinehyd.com/Literature/educational_outreach.pdf">Airline Educational Outreach Program</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Ashland_facility.pdf">Airline Ashland, VA Location</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Engineering_Fabrication.pdf">Engineering &amp; Fabrication</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Indramat_Repair.pdf">Indramat Repair</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Red_Pallet_Repair.pdf">Red Pallet Repair</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/refurb_and_repair_flyer.pdf">Repair and Refurb</A>
                            <A href="//airlinemedia.airlinehyd.com/Literature/Shop_Online.pdf">Shop Online</A>
                        </LinkDiv>
                    </SideDiv>
                    <SideDiv>
                        <LineCardName text="Manufacturers's Catalogs" />
                        <LinkDiv>
                            <A href="https://share.hsforms.com/1QtDhXW8ITASry2kp9tNnhw51h24">Catalog Request</A>
                        </LinkDiv>
                    </SideDiv>
                    <Blog1>
                        <Contact>Need More Information?</Contact>
                        <CallUs>We're here to help. Customer approvals and help requests are answered by our staff as promptly as possible during regular business hours.</CallUs>
                        <PopDiv><Button href="/pages/contact/contact-us">Contact Us</Button></PopDiv>
                    </Blog1>
                </List>
                <ThumbnailCol>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_line_card.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/airline_line_card_thumb.jpg"
                            text="Airline Hydraulics' Line Card"
                            alt="Airline Hydraulics linecard"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Capability_Statement.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/capabilitystatement_thumb2.jpg"
                            text="Capablities Statement"
                            alt="Airline Capablilities Statement"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_offering_flyer.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/airline_offering_thumb.jpg"
                            text="Products &amp; Services Overview"
                            alt="Airline Offering"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_corporate_brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/corporate_thumb.jpg"
                            text="Airline Corporate Brochure"
                            alt="Airline Corporate Brochure"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Preferred_Stock_Catalog.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/automation_preferred_stock_catalog_thumbnail.png"
                            text="Automation Preferred Stock Catalog"
                            alt="Automation Preferred Stock Catalog"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydraulic_Preferred_Products_Catalog.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/hydraulic_preferred_stock_catalog.jpg"
                            text="Hydraulic Preferred Products Catalog"
                            alt="Hydraulic Preferred Stock Catalog"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydraulic_Brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/hydraulic_products_services_thumb.jpg"
                            text="Hydraulic Components &amp; Services"
                            alt="Airline Hydraulic Hydraulic Product Service"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Automation_Solutions.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/automationsolutionsthumb.jpg"
                            text="Automation Solutions"
                            alt="Airline Hydraulics Automation Solutions"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydraulics_Aftermarket_Brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/aftermarket_thumb.jpg"
                            text="Aftermarket Services (Service Repair)"
                            alt="Aftermarket Services (Repair,Field Service,Maintenance,Installation,Start-up,Troubleshooting)"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/MPSA-safety-brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/machine_safeguarding_thumb.jpg"
                            text="Machine Safeguarding"
                            alt="Machine Safeguarding"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Tool_Room_Guarding.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/tool_guard_thumbnail.jpg"
                            text="Tool Room Guarding"
                            alt="Tool Room Guarding"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Hydraulic_Safety_flyer.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/hydsafetysolflyer.jpg"
                            text="Hydraulic Safety"
                            alt="Hydraulic Safety"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Mobile_Marine_brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/mobile_marine.jpg"
                            text="Fluid Power Solutions for Mobile &amp; Marine Applications"
                            alt="Fluid Power Solutions for Mobile and Marine Applications"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydraulics_Shale_Gas_Industry_brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/shale_gas_thumb.jpg"
                            text="Fluid Power Solutions for the Shale Gas Industry"
                            alt="Fluid Power Solutions for the Shale Gas Industry"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Hydraulics_Snow_and_Ice_brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/snow_and_ice_thumb.jpg"
                            text="Snow and Ice Brochure"
                            alt="Airline Hydraulics Snow and Ice Brochure"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Forestry_brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/forestry_thumb.png"
                            text="Forest Products Industry Brochure"
                            alt="Airline Hydraulics Forest Products"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_High_Pressure_Systems_Brochure.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/high_pressure_systems_thumb.jpg"
                            text="High Pressure Systems & Components"
                            alt="Airline Hydraulics High Pressure Systems & Components"
                        />
                    </ThumbnailDiv>
                    <ThumbnailDiv href="//airlinemedia.airlinehyd.com/Literature/Airline_Industrial_Facilities.pdf">
                        <LineCardThumbnail
                            src="//airlinemedia.airlinehyd.com/Literature/Thumbnails/ind_facilities_thumb.jpg"
                            text="Industrial Facilities Brochure"
                            alt="Airline Hydraulics Forest Products"
                        />
                    </ThumbnailDiv>
                </ThumbnailCol>
            </MainContainer>
        </DivContainer>
    )
}