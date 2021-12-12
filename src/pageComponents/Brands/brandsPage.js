import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

const H1Div = styled.div`
    width: 100%;
    padding: 70px 0 25px;
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (max-width: 574px){
		padding: 50px 0 25px;
	}
`
const H1 = styled.h1`
    display: flex;
    margin: auto;
	font-size: 38px;
    text-transform: uppercase;
    color: #333;
    letter-spacing: 1px;
    font-family: verdana;
    @media (max-width: 375px){
		font-size: 30px;
	}
`
const H4Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 100px 0 0;
`
const H4 = styled.h4`
    display: flex;
    margin: auto;
    font-size: 25px;
`
const BorderLine = styled.div`
    display: flex;
    border-bottom: 3px solid #B51F2B;
    width: 10%;
    margin: auto;
    padding: 10px 0;
`
const HeaderContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url(https://airlinemedia.airlinehyd.com/Static_pages/Brands/brands-bg.jpg);
    background-size: cover;
    background-position: 50% 0px;
    background-repeat: no-repeat;
    background-color: black;
    height: 200px;
    margin-bottom: 50px;
`
const Container = styled.div`
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
`
const FullBrandsDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`
const BrandsImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 10px 25px;
 `
const Link = styled.a`
`
const BrandsImg = styled.img`
    width: 100%;
    max-width: 150px;
    align-items: center;
    @media (max-width: 768px){
		max-width: 125px;
	}
`
const AlphabetListDiv = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    padding: 20px 0 0;
`
const LongBorderLine = styled.div`
    display: flex;
    border-bottom: 1px solid #ebe7e7;
    width: 90%;
    margin: 0 auto;
    margin-top: 24px;
    margin-bottom: 24px;
 `
const H6 = styled.h6`
    display: flex;
    font-weight: bold;
    margin: 0 auto;
    text-transform: uppercase;
    color: #555555;
    letter-spacing: 10px;
`
const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 88%;
`
const LetterDiv = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
`
const ListDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 2; 
`
const Ul = styled.ul`
    list-style-type: none;
    font-weight: 200;
`
const CompanyList = styled.a`
    text-decoration: none;
    color: #555555;
    font-size: 12px;
    font-weight: bold;
    &:hover{
        color: #007bff;
    }
`
const CategoryDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 20px;
`
const CategoryName = styled.div`
    display: flex;
    flex: 1;
`
const CategoryP = styled.p`
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0;
    color: #555555;
`
const ProductDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    margin: auto;  
`
const CompanyListDiv = styled.div`
    display: flex;
    flex: 1;
    font-size: 11px;
    color: #555555; 
`
const ProductBorder = styled.div`
    display: flex;
    border-bottom: 1px solid #ebe7e7;
    width: 70%;
`
const BrandList = styled.a`
    text-decoration: none;
    color: #007bff;
    font-size: 12px;
    &:hover{
        color: #246696;
    } 
`
const Li = styled.li`
    padding: 4px 0;
`
export default function BrandsPage() {

    return (
        <>
            <HeaderContainer>
                <Helmet>
                    <title>Manufacturers | Airline Hydraulics</title>
                </Helmet>
                <H1Div>
                    <H1>Featured Manufacturers</H1>
                    <BorderLine/>
                </H1Div>
            </HeaderContainer>
            <Container>
                <FullBrandsDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/rexroth">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Rexroth-Logo_RGB.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/eaton">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Eaton_logo.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/parker">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/parker_logo.jpg" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/butech">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/BuTech_Logo.png" />
                        </Link>
                    </BrandsImgDiv>
                </FullBrandsDiv>
                <FullBrandsDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/paccar">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/paccar-logo.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/haskel">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Haskel.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/pages/rittal">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/RITTAL.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/schmersal">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/schmersal.png" />
                        </Link>
                    </BrandsImgDiv>
                
                </FullBrandsDiv>
                <FullBrandsDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/ross">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ROSS_LOGO.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/abb">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/ABB_logo.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/oriental-motor">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/oriental-motor.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/pages/brands/icotek">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/icotek/icotek_logo1.png" />
                        </Link>
                    </BrandsImgDiv>
                </FullBrandsDiv>
                <FullBrandsDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/phoenix-contact">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/phoenix-contact-logo.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/omron">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/OMRON_logo.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/hydac">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/hydac.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/lincoln">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Lincoln_SKF_condensed%20RGB%20nobkgrd.jpg" />
                        </Link>
                    </BrandsImgDiv>
               
                </FullBrandsDiv>
                <FullBrandsDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/clippard">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Clippard.png" />
                        </Link>
                    </BrandsImgDiv>
                    <BrandsImgDiv>
                        <Link href="/Brands/featured/smc">
                            <BrandsImg src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/SMC%20Elite%20Dist%20web.png" />
                        </Link>
                    </BrandsImgDiv>
                </FullBrandsDiv>

                <H4Div>
                    <H4>Product Categories</H4>
                    <BorderLine/>
                </H4Div>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>HYDRAULIC COMPONENTS</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="https://www.aventics.com/en/" target="_blank" rel="noopener noreferrer">Aventics</CompanyList> - Cylinders </Li>
                            <Li><CompanyList href="https://www.boschrexroth.com/en/us/" target="_blank" rel="noopener noreferrer">Bosch Rexroth</CompanyList> - Pumps, Motors, Cylinders, Valves, Filters, Manifolds, Power Units, Controllers, Rineer Motors &amp; Oil Control Valves</Li>
                            <Li><CompanyList href="https://www.bucherhydraulics.com/30971/start/start.aspx" target="_blank" rel="noopener noreferrer">Bucher</CompanyList> - Command Controls Cartridge Valves Monarch Power Units</Li>
                            <Li><CompanyList href="http://www.casappa.com/" target="_blank" rel="noopener noreferrer">Casappa</CompanyList> - Piston Pumps, Gear Pumps, Flow Dividers</Li>
                            <Li><CompanyList href="http://www.cervisinc.com/" target="_blank" rel="noopener noreferrer">Cervis</CompanyList> - Controllers &amp; Remote Controllers</Li>
                            <Li><CompanyList href="http://www.damanifolds.com/" target="_blank" rel="noopener noreferrer">Daman</CompanyList> - Bar Manifolds, Custom Manifolds &amp; Modules</Li>
                            <Li><CompanyList href="http://www.flowezyfilters.com/" target="_blank" rel="noopener noreferrer">Flow Ezy</CompanyList> - Strainers</Li>
                            <Li><CompanyList href="http://www.fulflo.com/" target="_blank" rel="noopener noreferrer">Fulflo </CompanyList> - Directional, Pressure &amp; Flow Valves</Li>
                            <Li><CompanyList href="http://www.geartek.com/" target="_blank" rel="noopener noreferrer">Geartek</CompanyList> - Gear Pumps</Li>
                            <Li><CompanyList href="http://www.hannacylinders.com/" target="_blank" rel="noopener noreferrer">Hanna</CompanyList> - General-Type Cylinders</Li>
                            <Li><CompanyList href="http://www.hedland.com/" target="_blank" rel="noopener noreferrer">Hedland</CompanyList> - Flow Meters</Li>
                            <Li><CompanyList href="http://www.enovationcontrols.com/" target="_blank" rel="noopener noreferrer">High Country Tek</CompanyList> - Mobile Controllers &amp; Modules</Li>
                            <Li><CompanyList href="http://www.hydacusa.com/" target="_blank" rel="noopener noreferrer">HYDAC</CompanyList> - Accumulators, Filters, Instrumentation, Cylinders, Cartridge Valves, Manifolds, Cooling, Diagnostics, Accessories, Bieri High-Pressure Hydraulic Components</Li>
                            <Li><CompanyList href="http://www.hydroleduc.com/en/" target="_blank" rel="noopener noreferrer">Hydro Leduc</CompanyList> - Micro-Hydraulics, Piston Pumps, Piston Motors</Li>
                            <Li><CompanyList href="http://www.kpm-usa.com/" target="_blank" rel="noopener noreferrer">Kawasaki</CompanyList> - Staffa Piston Pumps &amp; Piston Motors</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.kobelt.com/" target="_blank" rel="noopener noreferrer">Kobelt</CompanyList> - Controllers &amp; Remote Controllers</Li>
                            <Li><CompanyList href="http://www.kybfluidpower.com/" target="_blank" rel="noopener noreferrer">KYB</CompanyList> - Hydrostar Piston Motors</Li>
                            <Li><CompanyList href="http://www.lehighfluidpower.com/" target="_blank" rel="noopener noreferrer">Lehigh Fluid Power</CompanyList> - General-Type Cylinders</Li>
                            <Li><CompanyList href="http://www.magnom.com/" target="_blank" rel="noopener noreferrer">Magnom Filters</CompanyList> - Magnetic Filtration</Li>
                            <Li><CompanyList href="http://www.milwaukeecylinder.com/" target="_blank" rel="noopener noreferrer">Milwaukee Cylinder</CompanyList> - Basic &amp; NFPA-Type Cylinders</Li>
                            <Li><CompanyList href="http://www.nasonptc.com/" target="_blank" rel="noopener noreferrer">Nason</CompanyList> - Compact Hydraulic Cylinders, NFPA Cylinders</Li>
                            <Li><CompanyList href="http://www.oemcontrols.com/" target="_blank" rel="noopener noreferrer">OEM Controls</CompanyList> - Joysticks &amp; Controllers</Li>
                            <Li><CompanyList href="http://www.parker.com/" target="_blank" rel="noopener noreferrer">Parker</CompanyList> - Low-Speed High-Torque Motors</Li>
                            <Li><CompanyList href="http://www.permco.com/" target="_blank" rel="noopener noreferrer">Permco</CompanyList> - Gear Pumps &amp; Motors, Vane Pumps &amp; Motors, Flow Dividers &amp; Intensifiers</Li>
                            <Li><CompanyList href="http://www.settimafm.com/" target="_blank" rel="noopener noreferrer">Settima</CompanyList> - Continuum® Helical Gear Pumps &amp; Screw Pumps</Li>
                            <Li><CompanyList href="/pages/brands/temposonics" target="_blank" rel="noopener noreferrer">Temposonics</CompanyList> - Linear Displacement Transducers</Li>
                            <Li><CompanyList href="http://www.thermasys.com/" target="_blank" rel="noopener noreferrer">Thermal Transfer</CompanyList> - Air-to-Oil &amp; Water-to-Oil Type Coolers </Li>
                            <Li><CompanyList href="http://voith.com/en/products-services/power-transmission/hydraulic-systems-and-components-10206.html" target="_blank" rel="noopener noreferrer">Voith</CompanyList> - Internal Gear Pumps</Li>
                            <Li><CompanyList href="http://www.walvoil.com/" target="_blank" rel="noopener noreferrer">Walvoil </CompanyList> - Mobile Monoblock &amp; Sectional Valves &amp; Operators</Li>
                            <Li><CompanyList href="http://yatesind.com/" target="_blank" rel="noopener noreferrer">Yates Industries</CompanyList> -General-Type Cylinders </Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>HOSE, CONNECTORS &amp; ACCESSORIES</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.parker.com/" target="_blank" rel="noopener noreferrer">Parker</CompanyList>  </Li>
                            <Li><CompanyList href="http://www.parker.com/indhose" target="_blank" rel="noopener noreferrer">Adaptall</CompanyList> - JIC, Seal-Lock, Pipe Adapters </Li>
                            <Li><CompanyList href="http://www.alkoncorp.com/" target="_blank" rel="noopener noreferrer">Alkon</CompanyList> - Industrial Brass</Li>
                            <Li><CompanyList href="http://www.anchorfluidpower.com/" target="_blank" rel="noopener noreferrer">Anchor</CompanyList> - Flanges &amp; Ball Valves</Li>
                            <Li><CompanyList href="http://www.apollovalves.com/" target="_blank" rel="noopener noreferrer">Apollo</CompanyList> - Ball Valves </Li>
                            <Li><CompanyList href="http://www.aventics.com/en" target="_blank" rel="noopener noreferrer">Aventics </CompanyList> - Tubing &amp; Push-to-Connect Fittings</Li>
                            <Li><CompanyList href="http://www.camozzi-usa.com/" target="_blank" rel="noopener noreferrer">Camozzi</CompanyList> - Nickel-Plated Brass, Tube &amp; Pneumatic Fittings</Li>
                            <Li><CompanyList href="http://www.clippard.com/" target="_blank" rel="noopener noreferrer">Clippard</CompanyList> - Barb Fittings &amp; Push-to-Connect Fittings</Li>
                            <Li><CompanyList href="http://www.dixonquickcoupling.com/" target="_blank" rel="noopener noreferrer">Dixon Quick Coupling</CompanyList> - Hydraulic Quick Couplings </Li>
                            <Li><CompanyList href="http://www.dmic.com/" target="_blank" rel="noopener noreferrer">DMIC</CompanyList> - Ball Valves, Check Valves, Flow Controls, Fluid Connector Systems </Li>
                            <Li><CompanyList href="http://www.dynamicfc.com/" target="_blank" rel="noopener noreferrer">Dynamic</CompanyList> - Gauges </Li>
                            <Li><CompanyList href="http://www.hannay.com/" target="_blank" rel="noopener noreferrer">Hannay Reels</CompanyList> - Hose Reels</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.hydacusa.com/" target="_blank" rel="noopener noreferrer">HYDAC</CompanyList> - Ball Valves, Clamps, Accessories</Li>
                            <Li><CompanyList href="http://www.ldi-industries.com/" target="_blank" rel="noopener noreferrer">LDI Industries</CompanyList> - Vescor Reservoirs &amp; Accessories </Li>
                            <Li><CompanyList href="https://linktechcouplings.com/" target="_blank" rel="noopener noreferrer">LinkTech </CompanyList> - Chrome Plated &amp; Thermoplastic Couplings</Li>
                            <Li><CompanyList href="http://www.newageindustries.com/" target="_blank" rel="noopener noreferrer">New Age Industries</CompanyList> - Fluoropolymer &amp; Thermoplastic Tubing</Li>
                            <Li><CompanyList href="http://www.noshok.com/" target="_blank" rel="noopener noreferrer">Noshok</CompanyList> - Instrumentation, Gauges, Valves, Accessories</Li>
                            <Li><CompanyList href="http://www.rectus.de/" target="_blank" rel="noopener noreferrer">Rectus</CompanyList> - Pneumatic Connect Couplings</Li>
                            <Li><CompanyList href="http://www.smcusa.com/" target="_blank" rel="noopener noreferrer">SMC</CompanyList> - Plastic &amp; Metal Push-to-Connect Fittings, Full Line Teflon Compression Fittings</Li>
                            <Li><CompanyList href="http://www.stcvalve.com/" target="_blank" rel="noopener noreferrer">STC</CompanyList> - Push-to-Connect Plastic &amp; Metal Fittings</Li>
                            <Li><CompanyList href="http://www.superswivels.com/" target="_blank" rel="noopener noreferrer">Super Swivels -</CompanyList> - Hydraulic Swivels</Li>
                            <Li><CompanyList href="http://www.snap-titequickdisconnects.com/" target="_blank" rel="noopener noreferrer">Snap-tite</CompanyList> - Quick Connect Couplings &amp; Valves</Li>
                            <Li><CompanyList href="http://www.twintecinc.com/" target="_blank" rel="noopener noreferrer">Twintec </CompanyList> - Pneumatic &amp; Electrical Multi-Port Manifolds, Enclosure Disconnects</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>

                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>PNEUMATIC COMPONENTS</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.allenair.com" target="_blank" rel="noopener noreferrer">Allenair</CompanyList> - Linear, Specialty, &amp; Engineered Cylinders </Li>
                            <Li><CompanyList href="http://www.aventics.com" target="_blank" rel="noopener noreferrer">Aventics</CompanyList> - Formerly Bosch Rexroth Actuators, Air Cylinders, Air Prep Equipment, Valves, Rotary Index Tables, Vacuum Components, Marine &amp; Mobile Pneumatic Engine Controls</Li>
                            <Li><CompanyList href="http://www.camozzi-usa.com" target="_blank" rel="noopener noreferrer">Camozzi</CompanyList> - Nickel-Plated Push-to-Connect Fittings, Flow Controls, Valves, FRLs, Cylinders</Li>
                            <Li><CompanyList href="http://www.clippard.com" target="_blank" rel="noopener noreferrer">Clippard</CompanyList> - Actuators &amp; Air Cylinders, Connectors, Valves, Miniature Logic Control Devices</Li>
                            <Li><CompanyList href="http://www.cylval.com" target="_blank" rel="noopener noreferrer">Cylinder &amp; Valves</CompanyList> - Linear Cylinders</Li>
                            <Li><CompanyList href="http://www.deltrol.com" target="_blank" rel="noopener noreferrer">Deltrol</CompanyList>  - NSF Valves</Li>
                            <Li><CompanyList href="http://www.greencocylinders.com" target="_blank" rel="noopener noreferrer">Greenco Duramaster</CompanyList>- Greenco - Rodless Cylinders Duramaster - Rod-Type Cylinders, Air Over Oil Tanks</Li>
                            <Li><CompanyList href="http://www.hannacylinders.com" target="_blank" rel="noopener noreferrer">Hanna Cylinders</CompanyList> - Tie-Rod &amp; Custom-Engineered Cylinders</Li>
                            <Li><CompanyList href="http://www.ingersollrandproducts.com" target="_blank" rel="noopener noreferrer">HyperCyl</CompanyList> - Up to 20-Ton Capacity Pneumatic Press Cylinders</Li>
                            <Li><CompanyList href="http://www.knf.com" target="_blank" rel="noopener noreferrer">KNF</CompanyList> - Compressors, Vacuum Pumps, Liquid Pumps</Li>
                            <Li><CompanyList href="http://www.lexairinc.com" target="_blank" rel="noopener noreferrer">Lexair</CompanyList> - Liquid, Mechanical, Manual, &amp; Air Pilot Valves</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.milwaukeecylinder.com" target="_blank" rel="noopener noreferrer">Milwaukee Cylinder</CompanyList> - Linear Cylinders</Li>
                            <Li><CompanyList href="http://www.motioncontrolsllc.com" target="_blank" rel="noopener noreferrer">Motion Controls </CompanyList> - Linear, Specialty &amp; Engineered Cylinders</Li>
                            <Li><CompanyList href="http://www.nasonptc.com" target="_blank" rel="noopener noreferrer">Nason </CompanyList> - Pressure Switches &amp; Transducers, NFPA &amp; Specialty Cylinders</Li>
                            <Li><CompanyList href="http://www.parker.com" target="_blank" rel="noopener noreferrer">Parker</CompanyList> - Skinner Solenoid Valves, Media Valves</Li>
                            <Li><CompanyList href="http://www.rosscontrols.com" target="_blank" rel="noopener noreferrer">Ross Controls</CompanyList> - Manifolds, Flow Controls, FRLs, Manual Valves, Air-Piloted Valves, Safety Valves, Solenoid Valves, Check Valves, Needle Valves</Li>
                            <Li><CompanyList href="http://www.smcusa.com" target="_blank" rel="noopener noreferrer">SMC</CompanyList> - Valves, Cylinders, Connectors, FRLs, Air Dryers, Temperature Control, Grippers, Slides, Switches, Vacuum Components</Li>
                            <Li><CompanyList href="http://www.stcvalve.com" target="_blank" rel="noopener noreferrer">STC</CompanyList> - Valves, Valve Manifolds, Cylinders, Actuators, Connectors, Tube Fittings</Li>
                            <Li><CompanyList href="http://www.turck.us" target="_blank" rel="noopener noreferrer">Turck</CompanyList> - Pressure Transmitters &amp; Sensors, Flow Monitors, Cylinder &amp; Valve Position Sensors</Li>
                            <Li><CompanyList href="http://www.twintecinc.com" target="_blank" rel="noopener noreferrer">Twintec</CompanyList> - Multiport Pneumatic Connectors</Li>
                            <Li><CompanyList href="http://www.vacuforce.co" target="_blank" rel="noopener noreferrer">Vacuforce</CompanyList> - Suction Cups, Regenerative Blowers, VacuumPumps, Generators, Sensor Switches</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>LUBRICATION EQUIPMENT</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.bijurdelimon.com/" target="_blank" rel="noopener noreferrer">Bijur Delimon</CompanyList> - Automatic Centralized Grease and Oil Systems, Farval Dualine Systems, Open Gear Spray Systems, Air/Oil Systems, Programmable Controllers and Monitoring Equipment. </Li>
                            <Li><CompanyList href="http://www.lincolnindustrial.com/" target="_blank" rel="noopener noreferrer">Lincoln Lubrication</CompanyList> - Automated Lubrication Systems, Orsco Chain Lube Systems, Construction &amp; Mobile Vehicle Lube Systems &amp; Lubrication Components</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.skf.com/lubrication" target="_blank" rel="noopener noreferrer">SKF</CompanyList> - Automated Lubrication Systems, Circulating Oil Systems, Oil &amp; Air Lubrication Systems, Lubrication Systems for Special Applications, Construction &amp; Mobile Vehicle Lube Systems &amp; Lubrication Components</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>WINCHES &amp; GEAR DRIVES</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.paccarwinch.com/" target="_blank" rel="noopener noreferrer">Paccar</CompanyList> - Planetary &amp; Worm Gear Winches &amp; Gear Drives BRANDS: Braden &amp; Gearmatic </Li>
                            <Li><CompanyList href="http://www.team-twg.com/" target="_blank" rel="noopener noreferrer">TWG</CompanyList> - Planetary &amp; Worm Gear Winches &amp; Gear Drives BRANDS: Pullmaster, DP Winch, Gear Products, Lantec, &amp; Tulsa Winch  </Li>
                            <Li><CompanyList href="http://www.camozzi-usa.com" target="_blank" rel="noopener noreferrer">Camozzi</CompanyList> - Nickel-Plated Push-to-Connect Fittings, Flow Controls, Valves, FRLs, Cylinders</Li>
                            <Li><CompanyList href="http://www.clippard.com" target="_blank" rel="noopener noreferrer">Clippard</CompanyList> - Actuators &amp; Air Cylinders, Connectors, Valves, Miniature Logic Control Devices</Li>
                        </Ul>

                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.paccarwinch.com/" target="_blank" rel="noopener noreferrer">Paccar</CompanyList> - Linear Cylinders</Li>
                            <Li><CompanyList href="http://www.motioncontrolsllc.com" target="_blank" rel="noopener noreferrer">Motion Controls </CompanyList> - Linear, Specialty &amp; Engineered Cylinders</Li>
                            <Li><CompanyList href="http://www.nasonptc.com" target="_blank" rel="noopener noreferrer">Nason </CompanyList> - Pressure Switches &amp; Transducers, NFPA &amp; Specialty Cylinders</Li>
                            <Li><CompanyList href="http://www.parker.com" target="_blank" rel="noopener noreferrer">Parker</CompanyList> - Skinner Solenoid Valves, Media Valves</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>ALUMINUM STRUCTURAL FRAMING &amp; ACCESSORIES</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.boschrexroth-us.com/" target="_blank" rel="noopener noreferrer">Bosch Rexroth </CompanyList> - Aluminum Structural Framing &amp; Accessories Industrial Hand Tools &amp; Tightening Systems</Li>
                            <Li><CompanyList href="https://www.bucherhydraulics.com/34980/Products/Dyna-Lift/Applications/image.aspx" target="_blank" rel="noopener noreferrer">Bucher </CompanyList> - Ergonomic Lift Systems</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="https://gsmna.com/" target="_blank" rel="noopener noreferrer">GSM</CompanyList> - Welded Steel &amp; Stainless Steel Machine GuardingComponents</Li>
                            <Li><CompanyList href="http://www.milagon.com/" target="_blank" rel="noopener noreferrer">Milagon </CompanyList> - Ergonomic Mats &amp; Work Chairs</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>AUTOMATION &amp; CONTROL PRODUCTS</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.abb.us/" target="_blank" rel="noopener noreferrer">ABB</CompanyList> - AC/DC VFDs, Motors </Li>
                            <Li><CompanyList href="https://automation.omron.com/en/us/products/category/robotics" target="_blank" rel="noopener noreferrer">Adept Robotics</CompanyList> - Collaborative Robots, Scara Robots, Six-Axis Robots, Parallel Robots, Mobile Robots</Li>
                            <Li><CompanyList href="http://www.applied-motion.com/" target="_blank" rel="noopener noreferrer">Applied Motion Products</CompanyList> - Stepper/Servo Drives &amp; Motors</Li>
                            <Li><CompanyList href="http://www.asidrives.com/" target="_blank" rel="noopener noreferrer">ASI Drives</CompanyList> - Automated Guided Vehicles (AGVs)</Li>
                            <Li><CompanyList href="http://www.bannerengineering.com/" target="_blank" rel="noopener noreferrer">Banner Engineering</CompanyList> - Photoelectric Sensors, Fiber Optic Sensors, Wireless I/O, Vision Inspection Sensors, LED Lighting &amp; Indication</Li>
                            <Li><CompanyList href="http://www.beijerelectronics.com/" target="_blank" rel="noopener noreferrer">Beijer</CompanyList>  - HMIs &amp; Industrial PCs</Li>
                            <Li><CompanyList href="http://www.boschrexroth-us.com/" target="_blank" rel="noopener noreferrer">Bosch Rexroth Control</CompanyList>- Rotary &amp; Linear Servo Motors &amp; Drives, Integrated Motor/Drive, Motion Controllers, HMIs, Integrated Safety, I/O, Explosion-Proof Motors, Industrial Hand Tools &amp; Tightening Systems</Li>
                            <Li><CompanyList href="http://www.boschrexroth-us.com/" target="_blank" rel="noopener noreferrer">Bosch Rexroth Linear</CompanyList> - Ball/Roller Rail, Ball/Roller Screws, Linear Modules, Cartesian Systems, Conveyor Systems, Round Shafting &amp; Bushings</Li>
                            <Li><CompanyList href="http://www.calamp.com/" target="_blank" rel="noopener noreferrer">CalAmp</CompanyList> - Wireless Long Haul, Cellular &amp; LAN Communication Devices</Li>
                            <Li><CompanyList href="http://www.cgimotion.com/" target="_blank" rel="noopener noreferrer">CGI</CompanyList> - Inline &amp; Right-Angle Precision Gear Boxes</Li>
                            <Li><CompanyList href="http://www.copleycontrols.com/" target="_blank" rel="noopener noreferrer">Copley Controls</CompanyList> - Controllers, Stepper &amp; Servo Drives</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">Eaton</CompanyList> - VFDs, PLCs, HMIs, HMIs with Control, Industrial PCs, Remote I/O &amp; Connectivity, Control Wiring Solutions, Proximity &amp; Photo Sensors, Limit Switches, Energy Monitors</Li>
                            <Li><CompanyList href="http://www.edriveactuators.com/" target="_blank" rel="noopener noreferrer">E-Drive</CompanyList> - Precision High-Thrust Linear Actuators</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">ELPRO by Eaton</CompanyList> - Industrial Wireless Solutions</Li>
                            <Li><CompanyList href="http://www.gamweb.com/" target="_blank" rel="noopener noreferrer">GAM</CompanyList> - Gearboxes, Servo Couplings, Mounting Accessories</Li>
                            <Li><CompanyList href="http://www.idec.com/" target="_blank" rel="noopener noreferrer">IDEC</CompanyList> - PLCs, HMIs, Controls</Li>
                            <Li><CompanyList href="http://www.joycedayton.com/" target="_blank" rel="noopener noreferrer">Joyce Dayton</CompanyList> - Jack Screws, Bellows</Li>
                            <Li><CompanyList href="http://www.maplesystems.com/" target="_blank" rel="noopener noreferrer">Maple Systems</CompanyList> - HMIs, PLCs, HMI Accessories &amp; Software</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="https://www.microscan.com/en-us" target="_blank" rel="noopener noreferrer">Microscan</CompanyList> - Barcode Readers, Machine Vision Technology</Li>
                            <Li><CompanyList href="http://www.murrinc.com/" target="_blank" rel="noopener noreferrer">Murr</CompanyList> - IP20 &amp; IP67 Remote I/O, Ethernet Switches</Li>
                            <Li><CompanyList href="https://automation.omron.com/en/us/" target="_blank" rel="noopener noreferrer">Omron</CompanyList> - Temperature &amp; Process Controllers, Servo Drives &amp; Motors, VFDs, Photo &amp; Proximity Sensors, Machine Automation Controllers &amp; PLCs, Remote I/O, HMIs, Industrial PCs, Vision &amp; Identification Sensors &amp; Systems, Laser Marking</Li>
                            <Li><CompanyList href="http://www.opto22.com/" target="_blank" rel="noopener noreferrer">Opto 22</CompanyList> - Wireless I/O, Fieldbus/Distributed I/O, Controllers, PACs with Open Architecture, Solid State Relays</Li>
                            <Li><CompanyList href="http://www.orientalmotor.com/" target="_blank" rel="noopener noreferrer">Oriental Motor</CompanyList> - Stepper Motors &amp; Drives (2 and 5 Phase), Closed Loop Steppers, AC/DC Fractional HP Motors &amp; Drives, Electro-Mechanical Actuators, Fans</Li>
                            <Li><CompanyList href="http://www.pepperl-fuchs.us/" target="_blank" rel="noopener noreferrer">Pepperl + Fuchs</CompanyList> - Industrial Sensors, RFID Systems, Encoders, AS-Interface Solutions</Li>
                            <Li><CompanyList href="http://www.phoenixcontact.com/us" target="_blank" rel="noopener noreferrer">Phoenix Contact</CompanyList> - Wireless I/O &amp; Networking, IP20 &amp; IP67 Remote I/O, HMIs, Industrial PCs, PLCs &amp; Programmable Relays, Ethernet &amp; Fieldbus Cabling/Infrastructure, IIoT Solutions</Li>
                            <Li><CompanyList href="http://www.profaceamerica.com/" target="_blank" rel="noopener noreferrer">Proface</CompanyList> - HMIs, HMIs with Control, Industrial Computers</Li>
                            <Li><CompanyList href="https://qcconveyors.com/" target="_blank" rel="noopener noreferrer">QC Conveyors</CompanyList> - Conveying Systems</Li>
                            <Li><CompanyList href="https://robotiq.com/" target="_blank" rel="noopener noreferrer">Robotiq </CompanyList> - Plug + Play Grippers &amp; Components for Collaborative Robots</Li>
                            <Li><CompanyList href="http://www.smcusa.com/" target="_blank" rel="noopener noreferrer">SMC</CompanyList> - Fieldbus/Distributed I/O, Electro-Mechanical Linear &amp; Rotary Actuators</Li>
                            <Li><CompanyList href="/pages/brands/temposonics" target="_blank" rel="noopener noreferrer">Temposonics</CompanyList> - Linear Displacement Transducers</Li>
                            <Li><CompanyList href="https://www.turck.us/en/" target="_blank" rel="noopener noreferrer">Turck</CompanyList> - Ultrasonic &amp; Proximity Sensors, Encoders, Fieldbus/Distributed I/O, Cables, Accessories</Li>
                            <Li><CompanyList href="http://www.unitronics.com/" target="_blank" rel="noopener noreferrer">Unitronics</CompanyList> - HMIs &amp; HMIs with Contro</Li>
                            <Li><CompanyList href="http://www.weg.net/institutional/US/en/" target="_blank" rel="noopener noreferrer">WEG</CompanyList> - Electric Motors, Soft Starters, Industrial Controls, Variable Frequency Drives</Li>
                            <Li><CompanyList href="http://www.wittenstein-us.com/" target="_blank" rel="noopener noreferrer">Wittenstein</CompanyList> - In-Line &amp; Right Angle Servo Gearheads, Precision Rack/Pinion, Precision Linear &amp; Rotary Actuators</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>ELECTRICAL COMPONENTS</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.abb.us/" target="_blank" rel="noopener noreferrer">ABB</CompanyList> - Motor Controls, Circuit Protection, Pilot Devices, Signal Converters </Li>
                            <Li><CompanyList href="http://www.aerosusa.com/" target="_blank" rel="noopener noreferrer">AerosUSA</CompanyList> - Flexible Conduit, Connectors, Cable Glands, Accessorie</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">Arrow Hart by Eaton</CompanyList> - Wiring Devices, Pin &amp; Sleeve Connectors, Twist Lock Plugs &amp; Receptacles</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">B-Line by Eaton</CompanyList> - Cable Tray, Enclosures, Safety Grating</Li>
                            <Li><CompanyList href="http://www.bannerengineering.com/" target="_blank" rel="noopener noreferrer">Banner Engineering</CompanyList> - Control Cabinet Lighting, LED Indicators</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">Bussmann by Eaton</CompanyList>  - Fuses, Fuse Blocks &amp; Holders, Power Distribution</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">Crouse-Hinds by Eaton</CompanyList> - Explosion-Proof Enclosures &amp; Accessories</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">Eaton</CompanyList> -Motor Control, Circuit Protection, Pilot Devices, VFDs, UPS Systems, Power Distribution</Li>
                            <Li><CompanyList href="https://www.hammfg.com/" target="_blank" rel="noopener noreferrer">Hammond Manufacturing</CompanyList> - Industrial &amp; IT Enclosures, Heating Products, Fans, Coolers</Li>
                            <Li><CompanyList href="http://www.hammondpowersolutions.com/" target="_blank" rel="noopener noreferrer">Hammond Power Solutions </CompanyList> - Reactors, Transformers, Power Distribution &amp; Busbar</Li>
                            <Li><CompanyList href="http://www.icotek.com/us/" target="_blank" rel="noopener noreferrer">Icotek</CompanyList> - Cable Entry Systems, Grounding Systems</Li>
                            <Li><CompanyList href="http://www.lutze.com/" target="_blank" rel="noopener noreferrer">Lutze</CompanyList> - VFD &amp; Servo Cables, Tray Cable</Li>
                            <Li><CompanyList href="http://www.meltric.com/" target="_blank" rel="noopener noreferrer">Meltric</CompanyList>Pin &amp; Sleeve Connectors, Switch Rated Plugs &amp; Receptacles</Li>
                            <Li><CompanyList href="http://ep-us.mersen.com/" target="_blank" rel="noopener noreferrer">Mersen</CompanyList> - Fuses, Fuse Holders, Surge Protection</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.meltric.com/" target="_blank" rel="noopener noreferrer">Meltric</CompanyList>Pin &amp; Sleeve Connectors, Switch Rated Plugs &amp; Receptacles</Li>
                            <Li><CompanyList href="http://ep-us.mersen.com/" target="_blank" rel="noopener noreferrer">Mersen</CompanyList> - Fuses, Fuse Holders, Surge Protection</Li>
                            <Li><CompanyList href="http://ep-us.mersen.com/" target="_blank" rel="noopener noreferrer">Mersen</CompanyList> - Fuses, Fuse Holders, Surge Protection</Li>
                            <Li><CompanyList href="http://www.murrinc.com/" target="_blank" rel="noopener noreferrer">Murr</CompanyList> - Cables, Connectors, 24VDC Power Distribution, Power Supplies</Li>
                            <Li><CompanyList href="https://automation.omron.com/en/us/" target="_blank" rel="noopener noreferrer">Omron</CompanyList> - Relays, Power Supplies, Limit Switches, Timers, Counters</Li>
                            <Li><CompanyList href="http://www.opto22.com/" target="_blank" rel="noopener noreferrer">Opto 22</CompanyList> - Solid State Relays</Li>
                            <Li><CompanyList href="http://www.orientalmotor.com/" target="_blank" rel="noopener noreferrer">Oriental Motor</CompanyList> -Fans, Blowers &amp; Ventilation</Li>
                            <Li><CompanyList href="http://www.panduit.com/" target="_blank" rel="noopener noreferrer">Panduit</CompanyList> - Wire Duct, Terminals, Grounding Systems, Labels &amp; Identification</Li>
                            <Li><CompanyList href="https://www.phoenixcontact.com/us" target="_blank" rel="noopener noreferrer">Phoenix Contact</CompanyList> - Terminal Blocks, Power Supplies, Sensor &amp; Actuator Cables, 24VDC Power Distribution, Circuit Protection, Relays</Li>
                            <Li><CompanyList href="http://www.powerstandards.com/" target="_blank" rel="noopener noreferrer">PSL</CompanyList> - NIST-Cert. Power Quality Metering &amp; Monitoring</Li>
                            <Li><CompanyList href="/pages/rittal" target="_blank" rel="noopener noreferrer">Rittal</CompanyList> - Industrial &amp; IT Enclosures, Climate Control, Busbar Systems</Li>
                            <Li><CompanyList href="http://www.turck.us/en/" target="_blank" rel="noopener noreferrer">Turck</CompanyList> - Sensor &amp; Acutator Cables, IP67 Power Supplies </Li>
                            <Li><CompanyList href="http://www.weg.net/institutional/US/en/" target="_blank" rel="noopener noreferrer">WEG</CompanyList> - Circuit Breakers, Terminal Blocks, Contactors, Motor Starters, Overload Relays, Pilot Devices</Li>
                            <Li><CompanyList href="/pages/werma" target="_blank" rel="noopener noreferrer">Werma</CompanyList> - Stack Lights, SCADA Systems</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>LIQUID &amp; GAS PRESSURE PRODUCTS</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="https://www.haskel.com/" target="_blank" rel="noopener noreferrer">BuTech</CompanyList> - Low, Medium, &amp; High Pressure Valves</Li>
                            <Li><CompanyList href="http://www.haskel.com/" target="_blank" rel="noopener noreferrer">Haskel </CompanyList> - Air &amp; Hydraulic-Driven Gas Boosters, Air-Driven Liquid Pumps &amp; Amplifiers, Pressure Systems, Accessories, Low, Medium &amp; High Pressure Valves</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.smcusa.com/" target="_blank" rel="noopener noreferrer">SMC</CompanyList> - Air Pressure Amplifiers, High-Pressure Regulators, High-Purity Filters, Cryogenic Valves, Liquid Solenoid Pumps, AP Tech Regulator</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>PROCESS CONTROL &amp; COMPONENTS</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.psgdover.com/all-flo" target="_blank" rel="noopener noreferrer">ALL-FLO</CompanyList> -Air-Operated Double-Diaphragm (AODD) Pumps &amp; Fluid-Handling Solutions </Li>
                            <Li><CompanyList href="http://www.hydacusa.com/" target="_blank" rel="noopener noreferrer">HYDAC </CompanyList> - Process, Water &amp; Diesel Filtration, Coaxial &amp; Direct-Acting Valves</Li>
                            <Li><CompanyList href="https://automation.omron.com/en/us/" target="_blank" rel="noopener noreferrer">Omron</CompanyList> - PID Controllers, Monitoring Relays, Panel Meters </Li>
                            <Li><CompanyList href="http://www.opto22.com/" target="_blank" rel="noopener noreferrer">Opto 22</CompanyList> - Wireless I/O, Fieldbus/Distributed I/O, Controllers, PACs with Open Architecture, Solid State Relays</Li>
                            <Li><CompanyList href="http://www.parker.com/" target="_blank" rel="noopener noreferrer">Parker</CompanyList> - Industrial Hose Gold Ring &amp; Skinner Process Valves</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.pepperl-fuchs.us/" target="_blank" rel="noopener noreferrer">Pepperl + Fuchs</CompanyList> - Isolated Barriers, Purge Systems, Level Measurement </Li>
                            <Li><CompanyList href="http://www.phoenixcontact.com/us" target="_blank" rel="noopener noreferrer">Phoenix Contact</CompanyList> - Signal Conditioners, Fieldbus Barriers, Energy Monitors</Li>
                            <Li><CompanyList href="http://www.powerstandards.com/" target="_blank" rel="noopener noreferrer">PSL</CompanyList> - NIST-Certified Power Quality Metering &amp; Monitoring</Li>
                            <Li><CompanyList href="http://www.smcusa.com/" target="_blank" rel="noopener noreferrer">SMC</CompanyList> - Pneumatic Filters, Air-Driven Pumps, Process Chillers, Pneumatic Process Valves, Air-Driven Teflon Pumps, Liquid Solenoid Pumps</Li>
                            <Li><CompanyList href="http://www.turck.us/en/" target="_blank" rel="noopener noreferrer">Turck</CompanyList> - Level/Temperature/Flow Transducers, Zener Barriers</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>
                <CategoryDiv>
                    <CategoryName>
                        <CategoryP>MACHINE SAFETY PRODUCTS &amp; SERVICES</CategoryP>
                    </CategoryName>
                    <ProductBorder/>
                </CategoryDiv>
                <ProductDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="http://www.mpsasafety.com/" target="_blank" rel="noopener noreferrer">Airline’s Machine &amp; Process Safety Assessment (MPSA)</CompanyList> - Machine risk assessment and safety surveys; OSHA-compliant machine guarding (with or without integrated safety controls); point-of-operation guards for machine tools; machine safety training and other safety services.</Li>
                            <Li><CompanyList href="http://new.abb.com/low-voltage/products/safety-products" target="_blank" rel="noopener noreferrer">ABB</CompanyList> - Jokab Safety Switches, Programmable Safety Controllers, Light Curtains</Li>
                            <Li><CompanyList href="http://www.bannerengineering.com/" target="_blank" rel="noopener noreferrer">Banner Engineering </CompanyList> - Programmable Safety Controllers, Safety Relays, Safety Light Curtains, Interlock Switches</Li>
                            <Li><CompanyList href="http://www.eaton.com/" target="_blank" rel="noopener noreferrer">Eaton</CompanyList> - Safety Relays, Safety Interlock Switches, Safety Position Switches Guarding Enclosure Elements</Li>
                        </Ul>
                    </CompanyListDiv>
                    <CompanyListDiv>
                        <Ul>
                            <Li><CompanyList href="https://gsmna.com/" target="_blank" rel="noopener noreferrer">GSM</CompanyList> - Machine Guarding Enclosure Elements to Meet Robotic Asembly Cell Standards</Li>
                            <Li><CompanyList href="http://www.industrial.omron.us/" target="_blank" rel="noopener noreferrer">Omron STI</CompanyList> - Programmable Safety Controllers, Safety Relays, Safety Light Curtains &amp; Scanners, Safety Mats, Interlock Switches</Li>
                            <Li><CompanyList href="http://www.phoenixcontact.com/us" target="_blank" rel="noopener noreferrer">Phoenix Contact</CompanyList> - Programmable Safety Controllers, Safety Relays, Safety Bridge I/O</Li>
                            <Li><CompanyList href="http://www.rosscontrols.com/" target="_blank" rel="noopener noreferrer">Ross Controls</CompanyList> - Pneumatic Safety Valves, ISO 13849 Compliant</Li>
                            <Li><CompanyList href="http://www.schmersalusa.com/" target="_blank" rel="noopener noreferrer">Schmersal</CompanyList> - Safety Sensors &amp; Switches, Safety Relays, Light Curtains</Li>
                        </Ul>
                    </CompanyListDiv>
                </ProductDiv>

                {/*........................... All Manufacturers.......................................... */}

                <H4Div>
                    <H4>All Manufacturers</H4>
                    <BorderLine/>
                </H4Div>
                <AlphabetListDiv>
                    <H6>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z #</H6>
                </AlphabetListDiv>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>A</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.airlinehyd.com/pages/brands/ABB" target="_blank" rel="noopener noreferrer">ABB</BrandList></li>
                            <li><BrandList href="https://new.abb.com/low-voltage/products/safety-products">ABB (Jokab)</BrandList></li>
                            <li><BrandList href="https://acmeelectric.com/">Acme Electric</BrandList></li>
                            <li><BrandList href="/pages/brands/adaptall">Adaptall</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.airlinehyd.com/pages/brands/adsens">Adsens</BrandList></li>
                            <li><BrandList href="https://www.airlinehyd.com/">Airline</BrandList></li>
                            <li><BrandList href="https://www.ascairstarter.com/">Air Starter Components</BrandList></li>
                            <li><BrandList href="https://www.alkoncorp.com/">Alkon</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.psgdover.com/all-flo/">All-Flo</BrandList></li>
                            <li><BrandList href="https://allenair.com/">Allenair</BrandList></li>
                            <li><BrandList href="https://www.anchorfluidpower.com/index.html">Anchor</BrandList></li>
                            <li><BrandList href="http://www.apollovalves.com/">Apollo Ball Valves	</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.applied-motion.com/">Applied Motion Products</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>B</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.bannerengineering.com/us/en.html" target="_blank" rel="noopener noreferrer">Banner Engineering</BrandList></li>
                            <li><BrandList href="https://www05.beijerelectronics.com/">Beijer</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.bell-everman.com/">Bell-Everman</BrandList></li>
                            <li><BrandList href="/brands/featured/rexroth">Bosch Rexroth</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://brennaninc.com/">Brennan Industries</BrandList></li>
                            <li><BrandList href="https://www.bucherhydraulics.com/30971/start/start.aspx">Bucher Hydraulics</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.haskel.com/en-us/products/butech-high-pressure-valves">BuTech</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>C</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.calamp.com/" target="_blank" rel="noopener noreferrer">CalAmp</BrandList></li>
                            <li><BrandList href="https://us.automation.camozzi.com/">Camozzi</BrandList></li>
                            <li><BrandList href="https://www.casappa.com/eng/home.htm">Casappa</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://cervisinc.com/">Cervis</BrandList></li>
                            <li><BrandList href="https://www.cgimotion.com/">CGI</BrandList></li>
                            <li><BrandList href="/brands/featured/clippard">Clippard</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.contrinex.com/en-us/">Contrinex</BrandList></li>
                            <li><BrandList href="https://www.copleycontrols.com/en/">Copley Controls</BrandList></li>
                            <li><BrandList href="https://www.cylval.com/">Cylinders &amp; Valves</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href=""/></li>
                            <li><BrandList href=""/></li>
                            <li><BrandList href=""/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>D</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.daman.com/" target="_blank" rel="noopener noreferrer">Daman Manifolds</BrandList></li>
                            <li><BrandList href="https://www.global.weir/brands/delta-industrial/">Delta Power</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://deltrolfluid.com/">Deltrol</BrandList></li>
                            <li><BrandList href="https://dixonvalve.com/division/dixon-quick-coupling">Dixon Quick Disconnect Couplings</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.dmic.com/">DMIC Ball Valves</BrandList></li>
                            <li><BrandList href="https://www.regalrexnord.com/Brands/Durst">Durst</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://www.dynamicfc.com/">Dynamic Gauges</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>E</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/brands/featured/eaton">Eaton Bussmann</BrandList></li>
                            <li><BrandList href="https://www.eaton.com/us/en-us/products/wiring-devices-connectivity/arrow-hart.html">Eaton Cooper Arrow Hart</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.edriveactuators.com/">E-Drive</BrandList></li>
                            <li><BrandList href="https://epson.com/industrial-robots-factory-automation">Epson Robots</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.nvent.com/en-us/our-brands/ERICO">Erico</BrandList></li>
                            <li><BrandList href="https://www.eskridgeinc.com/">Eskridge</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>F</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.fiboxusa.com/" target="_blank" rel="noopener noreferrer">Fibox</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.flexa.de/home/EN_index_1000.html">Flexa Conduit</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.flowezyfilters.com/">Flow Ezy Strainers</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.fulflo.com/">Fulflo Valves</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>G</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.gamweb.com/" target="_blank" rel="noopener noreferrer">GAM</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://www.geartek.com/">Geartek</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.graceport.com/">Grace</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://gsmotion.de/de/">GSM</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>H</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://www.hammondmfg.com/" target="_blank" rel="noopener noreferrer">Hammond Manufacturing</BrandList></li>
                            <li><BrandList href="https://americas.hammondpowersolutions.com/" target="_blank" rel="noopener noreferrer">Hammond Power Solutions</BrandList></li>
                            <li><BrandList href="http://www.hannacylinders.com/" target="_blank" rel="noopener noreferrer">Hanna</BrandList></li>
                            <li><BrandList href="https://www.hannay.com/en-US/" target="_blank" rel="noopener noreferrer">Hannay Reels</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/brands/featured/haskel">Haskel</BrandList></li>
                            <li><BrandList href="http://www.hecogear.com/">Heco Gear</BrandList></li>
                            <li><BrandList href="https://www.instrumart.com/brands/1007/hedland?gclid=Cj0KCQiAtJeNBhCVARIsANJUJ2G2xhp1b3GT4tIEbKm1LdEycu6GRXMxffL0J85uIL8e2xYWk8snzjMaAhGvEALw_wcB">Hedland</BrandList></li>
                            <li><BrandList href="https://www.enovationcontrols.com/hctmerge">High Country Tek</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://www.honorpumps.com/">Honor Pumps USA</BrandList></li>
                            <li><BrandList href="/brands/featured/hydac">HYDAC</BrandList></li>
                            <li><BrandList href="http://www.hydratechcylinders.com/">Hydratech Industries</BrandList></li>
                            <li><BrandList href="https://hydroleduc.com/">Hydro Leduc</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.hypercyl.com/">HyperCyl</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>I</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/pages/brands/icotek" target="_blank" rel="noopener noreferrer">Icotek</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://us.idec.com/idec-us/en/USD/">IDEC</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.ingersollrand.com/en-us/air-compressor">Ingersoll Rand</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href=""/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>K</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.kpm-usa.com/" target="_blank" rel="noopener noreferrer">Kawasaki</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.kobelt.com/">Kobelt</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.kybfluidpower.com/">KYB (Hydrostar)</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href=""/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>L</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://lehighfluidpower.com/" target="_blank" rel="noopener noreferrer">Lehigh Fluid Power</BrandList></li>
                            <li><BrandList href="https://www.lexairinc.com/">Lexair</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://www.linktechcouplings.com/">LinkTech</BrandList></li>
                            <li><BrandList href="https://www.littelfuse.com/">Littelfuse</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.lutze.com/">Lutze</BrandList></li>
                            <li><BrandList href="http://www.lynair.com/">Lynair</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href=""/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>M</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://magnom.com/" target="_blank" rel="noopener noreferrer">Magnom Filters</BrandList></li>
                            <li><BrandList href="https://www.maplesystems.com/" target="_blank" rel="noopener noreferrer">Maple Systems</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://meltric.com/" target="_blank" rel="noopener noreferrer">Meltric</BrandList></li>
                            <li><BrandList href="http://www.milagon.com/" target="_blank" rel="noopener noreferrer">Milagon</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.milwaukeecylinder.com/" target="_blank" rel="noopener noreferrer">Milwaukee Cylinder</BrandList></li>
                            <li><BrandList href="https://www.murrinc.com/us/" target="_blank" rel="noopener noreferrer">Murr</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>N</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.nasonptc.com/" target="_blank" rel="noopener noreferrer">Nason</BrandList></li>
                            <li><BrandList href="https://www.newageindustries.com/" target="_blank" rel="noopener noreferrer">New Age Industries</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/pages/brands/nvent-eriflex" target="_blank" rel="noopener noreferrer">nVent ERIFLEX</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.noshok.com/" target="_blank" rel="noopener noreferrer">NoShok</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>O</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.oemcontrols.com/" target="_blank" rel="noopener noreferrer">OEM Controls</BrandList></li>
                            <li><BrandList href="http://www.offpeak-solutions.com/" target="_blank" rel="noopener noreferrer">OffPeak Technologies</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.omnicable.com/" target="_blank" rel="noopener noreferrer">Omni Cable</BrandList></li>
                            <li><BrandList href="https://www.opto22.com/" target="_blank" rel="noopener noreferrer">Opto 22</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/brands/featured/omron" target="_blank" rel="noopener noreferrer">Omron</BrandList></li>
                            <li><BrandList href="/brands/featured/oriental-motor" target="_blank" rel="noopener noreferrer">Oriental Motor</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>p</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/Brands/featured/paccar" target="_blank" rel="noopener noreferrer">Paccar (Braden)</BrandList></li>
                            <li><BrandList href="/Brands/featured/parker" target="_blank" rel="noopener noreferrer">Parker</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/brands/featured/phoenix-contact" target="_blank" rel="noopener noreferrer">Phoenix Contact</BrandList></li>
                            <li><BrandList href="https://www.pepperl-fuchs.com/usa/en/index.htm" target="_blank" rel="noopener noreferrer">Pepperl &amp; Fuchs</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.permco.com/" target="_blank" rel="noopener noreferrer">Permco</BrandList></li>
                            <li><BrandList href="https://profaceamerica.com/" target="_blank" rel="noopener noreferrer">Pro-Face</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://powerside.com/" target="_blank" rel="noopener noreferrer">PSL</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>q</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://qcconveyors.com/" target="_blank" rel="noopener noreferrer">QC Industries</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>R</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/pages/rittal" target="_blank" rel="noopener noreferrer">Rittal</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/brands/featured/ross" target="_blank" rel="noopener noreferrer">Ross Controls</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>S</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/Brands/featured/schmersal" target="_blank" rel="noopener noreferrer">Schmersal</BrandList></li>
                            <li><BrandList href="https://www.settima.it/" target="_blank" rel="noopener noreferrer">Settima</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/brands/featured/lincoln" target="_blank" rel="noopener noreferrer">SKF (Lincoln)</BrandList></li>
                            <li><BrandList href="/brands/featured/smc" target="_blank" rel="noopener noreferrer">SMC</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.starhyd.com/index.html" target="_blank" rel="noopener noreferrer">Star Hydraulics</BrandList></li>
                            <li><BrandList href="https://www.stcvalve.com/" target="_blank" rel="noopener noreferrer">STC</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://superswivels.com/" target="_blank" rel="noopener noreferrer">Super Swivels</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>T</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.taimi.ca/" target="_blank" rel="noopener noreferrer">Taimi</BrandList></li>
                            <li><BrandList href="/pages/brands/temposonics" target="_blank" rel="noopener noreferrer">Temposonics</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.thermaltransfer.com/" target="_blank" rel="noopener noreferrer">Thermal Transfer (API Heat Transfer)</BrandList></li>
                            <li><BrandList href="https://www.tompkinsind.com/" target="_blank" rel="noopener noreferrer">Tompkins</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/pages/brands/turck" target="_blank" rel="noopener noreferrer">Turck</BrandList></li>
                            <li><BrandList href="https://twgdev.com/" target="_blank" rel="noopener noreferrer">TWG</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.twintecinc.com/" target="_blank" rel="noopener noreferrer">Twintec</BrandList></li>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>U</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.unitronics.com/" target="_blank" rel="noopener noreferrer">Unitronics</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>V</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.vacuforce.com/" target="_blank" rel="noopener noreferrer">Vacuforce</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://voith.com/corp-en/index.html" target="_blank" rel="noopener noreferrer">Voith</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>W</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.weg.net/institutional/US/en/" target="_blank" rel="noopener noreferrer">WEG</BrandList></li>
                            <li><BrandList href="https://www.wittenstein-us.com/" target="_blank" rel="noopener noreferrer">Wittenstein</BrandList></li>

                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="/pages/werma" target="_blank" rel="noopener noreferrer">Werma</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="http://www.walvoil.com/" target="_blank" rel="noopener noreferrer">Walvoil Fluid Power</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.whitedriveproducts.com/" target="_blank" rel="noopener noreferrer">White Drive Products</BrandList></li>
                        </Ul>
                    </ListDiv>
                </Div>
                <LongBorderLine/>
                <Div>
                    <LetterDiv>
                        <H6>Y</H6>
                    </LetterDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="https://www.yatesind.com/" target="_blank" rel="noopener noreferrer">Yates</BrandList></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                    <ListDiv>
                        <Ul>
                            <li><BrandList href="" target="_blank" rel="noopener noreferrer"/></li>
                        </Ul>
                    </ListDiv>
                </Div>
            </Container>
        </>
    )
}


