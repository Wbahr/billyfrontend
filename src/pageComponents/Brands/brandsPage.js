import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faFontAwesome } from '@fortawesome/free-brands-svg-icons'



const H1Div = styled.div`
   width: 100%;
    // background-image: url('https://media.istockphoto.com/photos/abstract-background-of-polygons-on-white-background-picture-id1182309134?s=2048x2048');
    padding: 50px;
    display: flex;
    flex-direction: column;
  
`;

const H1 = styled.h1`
    display: flex;
    margin: auto;
    font-size: 45px;
`;

const H4Div = styled.div`
display: flex;
    flex-direction: column;
    width: 100%;
    padding: 100px 0 0;
`;
const H4 = styled.h4`
    display: flex;
    margin: auto;
    font-size: 25px;
`;

const BorderLine = styled.div`
  display: flex;
  border-bottom: 2px solid #ebe7e7;
  width: 10%;
  margin: auto;
  padding: 10px 0;

  `;

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    // background-color: silver;
    margin: 0 auto;
 `;

const FullBrandsDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 25px 0;
    
 `;

const BrandsImgDiv = styled.div`
    width: 150px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
   
  
 `;
const Link = styled.a`
    
 
`;

const BrandsImg = styled.img`
   width: 100%;
   align-items: center;

 `;

const AlphabetListDiv = styled.div`
 width: 100%;
 display: flex;
 margin-bottom: 10px;
 align-items: center;
 padding: 20px 0 0;
 `;

const LongBorderLine = styled.div`
 display: flex;
 border-bottom: 1px solid #ebe7e7;
 width: 90%;
 margin: 0 auto;
 margin-top: 24px;
 margin-bottom: 24px;
 `;

const H6 = styled.h6`
    display: flex;
    font-weight: bold;
    margin: 0 auto;
    color: #555555;
    letter-spacing: 10px;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 89px;
    width: 88%;
    // margin: 0 auto;
`;

const LetterDiv = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
`;

const ListDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 2;
    
`;

const Ul = styled.ul`
    list-style-type: none;
    font-weight: 200;
    // width: 50%;
    // padding: 0;
`;

const CompanyList = styled.a`
    text-decoration: none;
    color: 	#555555;
    font-size: 12px;
    font-weight: bold;
    &:hover{
        color: #007bff;
    }
`;

const CategoryDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 20px;
`;

const CategoryName = styled.div`
    display: flex;
    flex: 1;
`;

const CategoryP = styled.p`
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0;
    color: #555555;
`;


const ProductDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    margin: auto;
    
`;


const CompanyListDiv = styled.div`
    display: flex;
    flex: 1;
    font-size: 11px;
    color: #555555;
    
`;


const ProductBorder = styled.div`
display: flex;
border-bottom: 1px solid #ebe7e7;
width: 70%;
`;

const BrandList = styled.a`
    text-decoration: none;
    color: #007bff;
    font-size: 12px;
    &:hover{
        color: #246696;
    }
    
`;

const Li = styled.li`
    padding: 4px 0;
`;

export default function BrandsPage() {

    return (
        <Container>
            <H1Div>
                <H1>Featured Manufacturers</H1>
                <BorderLine></BorderLine>
            </H1Div>


            <FullBrandsDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://rodavigo.net/datos/logos-marcas-png/rexroth-neumatica.png" />
                    </Link>

                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/Parker_web.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/butech.jpg" />
                    </Link>
                </BrandsImgDiv>


            </FullBrandsDiv>

            <FullBrandsDiv>
                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/paccar.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/haskel-logo-master.png" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/rittal.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/schmersal.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/smcweb.jpg" />
                    </Link>
                </BrandsImgDiv>
            </FullBrandsDiv>


            <FullBrandsDiv>
                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/ross.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/ABBweb.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/manufacturer_logos/Oriental_Motor.png" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/adventicsweb.png" />
                    </Link>
                </BrandsImgDiv>


            </FullBrandsDiv>

            <FullBrandsDiv>
                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/manufacturer_logos/Phoenix_Contact.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/omronweb.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/hydacweb.jpg" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/manufacturer_logos/LincolnSKFweb.png" />
                    </Link>
                </BrandsImgDiv>

                <BrandsImgDiv>
                    <Link href="#">
                        <BrandsImg src="https://www.airlinehyd.com/customer/aihyco/images/clippard.jpg" />
                    </Link>
                </BrandsImgDiv>
            </FullBrandsDiv>


            <H4Div>
                <H4>Product Categories</H4>
                <BorderLine></BorderLine>
            </H4Div>

            <CategoryDiv>
                <CategoryName>
                    <CategoryP>HYDRAULIC COMPONENTS</CategoryP>
                </CategoryName>

                <ProductBorder></ProductBorder>

            </CategoryDiv>


            <ProductDiv>

                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="https://www.aventics.com/en/" target="_blank">Aventics</CompanyList> - Cylinders </Li>
                        <Li><CompanyList href="https://www.boschrexroth.com/en/us/" target="_blank">Bosch Rexroth</CompanyList> - Pumps, Motors, Cylinders, Valves, Filters, Manifolds, Power Units, Controllers, Rineer Motors & Oil Control Valves</Li>
                        <Li><CompanyList href="https://www.bucherhydraulics.com/30971/start/start.aspx" target="_blank">Bucher</CompanyList> - Command Controls Cartridge Valves Monarch Power Units</Li>
                        <Li><CompanyList href="http://www.casappa.com/" target="_blank">Casappa</CompanyList> - Piston Pumps, Gear Pumps, Flow Dividers</Li>
                        <Li><CompanyList href="http://www.cervisinc.com/" target="_blank">Cervis</CompanyList> - Controllers & Remote Controllers</Li>
                        <Li><CompanyList href="http://www.damanifolds.com/" target="_blank">Daman</CompanyList> - Bar Manifolds, Custom Manifolds & Modules</Li>
                        <Li><CompanyList href="http://www.flowezyfilters.com/" target="_blank">Flow Ezy</CompanyList> - Strainers</Li>
                        <Li><CompanyList href="http://www.fulflo.com/" target="_blank">Fulflo </CompanyList> - Directional, Pressure & Flow Valves</Li>
                        <Li><CompanyList href="http://www.geartek.com/" target="_blank">Geartek</CompanyList> - Gear Pumps</Li>
                        <Li><CompanyList href="http://www.hannacylinders.com/" target="_blank">Hanna</CompanyList> - General-Type Cylinders</Li>
                        <Li><CompanyList href="http://www.hedland.com/" target="_blank">Hedland</CompanyList> - Flow Meters</Li>
                        <Li><CompanyList href="http://www.enovationcontrols.com/" target="_blank">High Country Tek</CompanyList> - Mobile Controllers & Modules</Li>
                        <Li><CompanyList href="http://www.hydacusa.com/" target="_blank">HYDAC</CompanyList> - Accumulators, Filters, Instrumentation, Cylinders, Cartridge Valves, Manifolds, Cooling, Diagnostics, Accessories, Bieri High-Pressure Hydraulic Components</Li>
                        <Li><CompanyList href="http://www.hydroleduc.com/en/" target="_blank">Hydro Leduc</CompanyList> - Micro-Hydraulics, Piston Pumps, Piston Motors</Li>
                        <Li><CompanyList href="http://www.kpm-usa.com/" target="_blank">Kawasaki</CompanyList> - Staffa Piston Pumps & Piston Motors</Li>

                    </Ul>
                </CompanyListDiv>
                <CompanyListDiv>

                    <Ul>
                        <Li><CompanyList href="http://www.kobelt.com/" target="_blank">Kobelt</CompanyList> - Controllers & Remote Controllers</Li>
                        <Li><CompanyList href="http://www.kybfluidpower.com/" target="_blank">KYB</CompanyList> - Hydrostar Piston Motors</Li>
                        <Li><CompanyList href="http://www.lehighfluidpower.com/" target="_blank">Lehigh Fluid Power</CompanyList> - General-Type Cylinders</Li>
                        <Li><CompanyList href="http://www.magnom.com/" target="_blank">Magnom Filters</CompanyList> - Magnetic Filtration</Li>
                        <Li><CompanyList href="http://www.milwaukeecylinder.com/" target="_blank">Milwaukee Cylinder</CompanyList> - Basic & NFPA-Type Cylinders</Li>
                        <Li><CompanyList href="http://www.mtssensors.com/" target="_blank">MTS</CompanyList> - Linear Displacement Transducers</Li>
                        <Li><CompanyList href="http://www.nasonptc.com/" target="_blank">Nason</CompanyList> - Compact Hydraulic Cylinders, NFPA Cylinders</Li>
                        <Li><CompanyList href="http://www.oemcontrols.com/" target="_blank">OEM Controls</CompanyList> - Joysticks & Controllers</Li>
                        <Li><CompanyList href="http://www.parker.com/" target="_blank">Parker</CompanyList> - Low-Speed High-Torque Motors</Li>
                        <Li><CompanyList href="http://www.permco.com/" target="_blank">Permco</CompanyList> - Gear Pumps & Motors, Vane Pumps & Motors, Flow Dividers & Intensifiers</Li>
                        <Li><CompanyList href="http://www.settimafm.com/" target="_blank">Settima</CompanyList> - Continuum® Helical Gear Pumps & Screw Pumps</Li>
                        <Li><CompanyList href="http://www.thermasys.com/" target="_blank">Thermal Transfer</CompanyList> - Air-to-Oil & Water-to-Oil Type Coolers </Li>
                        <Li><CompanyList href="http://voith.com/en/products-services/power-transmission/hydraulic-systems-and-components-10206.html" target="_blank">Voith</CompanyList> - Internal Gear Pumps</Li>
                        <Li><CompanyList href="http://www.walvoil.com/" target="_blank">Walvoil </CompanyList> - Mobile Monoblock & Sectional Valves & Operators</Li>
                        <Li><CompanyList href="http://yatesind.com/" target="_blank">Yates Industries</CompanyList> -General-Type Cylinders </Li>


                    </Ul>


                </CompanyListDiv>


            </ProductDiv>


            <CategoryDiv>
                <CategoryName>
                    <CategoryP>HOSE, CONNECTORS & ACCESSORIES</CategoryP>

                </CategoryName>

                <ProductBorder></ProductBorder>
            </CategoryDiv>


            <ProductDiv>

                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.parker.com/" target="_blank">Parker</CompanyList>  </Li>
                        <Li><CompanyList href="http://www.parker.com/indhose" target="_blank">Adaptall</CompanyList> - JIC, Seal-Lock, Pipe Adapters </Li>
                        <Li><CompanyList href="http://www.alkoncorp.com/" target="_blank">Alkon</CompanyList> - Industrial Brass</Li>
                        <Li><CompanyList href="http://www.anchorfluidpower.com/" target="_blank">Anchor</CompanyList> - Flanges & Ball Valves</Li>
                        <Li><CompanyList href="http://www.apollovalves.com/" target="_blank">Apollo</CompanyList> - Ball Valves </Li>
                        <Li><CompanyList href="http://www.aventics.com/en" target="_blank">Aventics </CompanyList> - Tubing & Push-to-Connect Fittings</Li>
                        <Li><CompanyList href="http://www.camozzi-usa.com/" target="_blank">Camozzi</CompanyList> - Nickel-Plated Brass, Tube & Pneumatic Fittings</Li>
                        <Li><CompanyList href="http://www.clippard.com/" target="_blank">Clippard</CompanyList> - Barb Fittings & Push-to-Connect Fittings</Li>
                        <Li><CompanyList href="http://www.dixonquickcoupling.com/" target="_blank">Dixon Quick Coupling</CompanyList> - Hydraulic Quick Couplings </Li>
                        <Li><CompanyList href="http://www.dmic.com/" target="_blank">DMIC</CompanyList> - Ball Valves, Check Valves, Flow Controls, Fluid Connector Systems </Li>
                        <Li><CompanyList href="http://www.dynamicfc.com/" target="_blank">Dynamic</CompanyList> - Gauges </Li>
                        <Li><CompanyList href="http://www.hannay.com/" target="_blank">Hannay Reels</CompanyList> - Hose Reels</Li>


                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.hydacusa.com/" target="_blank">HYDAC</CompanyList> - Ball Valves, Clamps, Accessories</Li>
                        <Li><CompanyList href="http://www.ldi-industries.com/" target="_blank">LDI Industries</CompanyList> - Vescor Reservoirs & Accessories </Li>
                        <Li><CompanyList href="https://linktechcouplings.com/" target="_blank">LinkTech </CompanyList> - Chrome Plated & Thermoplastic Couplings</Li>
                        <Li><CompanyList href="http://www.newageindustries.com/" target="_blank">New Age Industries</CompanyList> - Fluoropolymer & Thermoplastic Tubing</Li>
                        <Li><CompanyList href="http://www.noshok.com/" target="_blank">Noshok</CompanyList> - Instrumentation, Gauges, Valves, Accessories</Li>
                        <Li><CompanyList href="http://www.rectus.de/" target="_blank">Rectus</CompanyList> - Pneumatic Connect Couplings</Li>
                        <Li><CompanyList href="http://www.smcusa.com/" target="_blank">SMC</CompanyList> - Plastic & Metal Push-to-Connect Fittings, Full Line Teflon Compression Fittings</Li>
                        <Li><CompanyList href="http://www.stcvalve.com/" target="_blank">STC</CompanyList> - Push-to-Connect Plastic & Metal Fittings</Li>
                        <Li><CompanyList href="http://www.superswivels.com/" target="_blank">Super Swivels -</CompanyList> - Hydraulic Swivels</Li>
                        <Li><CompanyList href="http://www.snap-titequickdisconnects.com/" target="_blank">Snap-tite</CompanyList> - Quick Connect Couplings & Valves</Li>
                        <Li><CompanyList href="http://www.twintecinc.com/" target="_blank">Twintec </CompanyList> - Pneumatic & Electrical Multi-Port Manifolds, Enclosure Disconnects</Li>

                    </Ul>


                </CompanyListDiv>
            </ProductDiv>

            <CategoryDiv>
                <CategoryName>
                    <CategoryP>PNEUMATIC COMPONENTS</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>


            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.allenair.com" target="_blank">Allenair</CompanyList> - Linear, Specialty, & Engineered Cylinders </Li>
                        <Li><CompanyList href="http://www.aventics.com" target="_blank">Aventics</CompanyList> - Formerly Bosch Rexroth Actuators, Air Cylinders, Air Prep Equipment, Valves, Rotary Index Tables, Vacuum Components, Marine & Mobile Pneumatic Engine Controls</Li>
                        <Li><CompanyList href="http://www.camozzi-usa.com" target="_blank">Camozzi</CompanyList> - Nickel-Plated Push-to-Connect Fittings, Flow Controls, Valves, FRLs, Cylinders</Li>
                        <Li><CompanyList href="http://www.clippard.com" target="_blank">Clippard</CompanyList> - Actuators & Air Cylinders, Connectors, Valves, Miniature Logic Control Devices</Li>
                        <Li><CompanyList href="http://www.cylval.com" target="_blank">Cylinder & Valves</CompanyList> - Linear Cylinders</Li>
                        <Li><CompanyList href="http://www.deltrol.com" target="_blank">Deltrol</CompanyList>  - NSF Valves</Li>
                        <Li><CompanyList href="http://www.greencocylinders.com" target="_blank">Greenco Duramaster</CompanyList>- Greenco - Rodless Cylinders Duramaster - Rod-Type Cylinders, Air Over Oil Tanks</Li>
                        <Li><CompanyList href="http://www.hannacylinders.com" target="_blank">Hanna Cylinders</CompanyList> - Tie-Rod & Custom-Engineered Cylinders</Li>
                        <Li><CompanyList href="http://www.ingersollrandproducts.com" target="_blank">HyperCyl</CompanyList> - Up to 20-Ton Capacity Pneumatic Press Cylinders</Li>
                        <Li><CompanyList href="http://www.knf.com" target="_blank">KNF</CompanyList> - Compressors, Vacuum Pumps, Liquid Pumps</Li>
                        <Li><CompanyList href="http://www.lexairinc.com" target="_blank">Lexair</CompanyList> - Liquid, Mechanical, Manual, & Air Pilot Valves</Li>

                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.milwaukeecylinder.com" target="_blank">Milwaukee Cylinder</CompanyList> - Linear Cylinders</Li>
                        <Li><CompanyList href="http://www.motioncontrolsllc.com" target="_blank">Motion Controls </CompanyList> - Linear, Specialty & Engineered Cylinders</Li>
                        <Li><CompanyList href="http://www.nasonptc.com" target="_blank">Nason </CompanyList> - Pressure Switches & Transducers, NFPA & Specialty Cylinders</Li>
                        <Li><CompanyList href="http://www.parker.com" target="_blank">Parker</CompanyList> - Skinner Solenoid Valves, Media Valves</Li>
                        <Li><CompanyList href="http://www.rosscontrols.com" target="_blank">Ross Controls</CompanyList> - Manifolds, Flow Controls, FRLs, Manual Valves, Air-Piloted Valves, Safety Valves, Solenoid Valves, Check Valves, Needle Valves</Li>
                        <Li><CompanyList href="http://www.smcusa.com" target="_blank">SMC</CompanyList> - Valves, Cylinders, Connectors, FRLs, Air Dryers, Temperature Control, Grippers, Slides, Switches, Vacuum Components</Li>
                        <Li><CompanyList href="http://www.stcvalve.com" target="_blank">STC</CompanyList> - Valves, Valve Manifolds, Cylinders, Actuators, Connectors, Tube Fittings</Li>
                        <Li><CompanyList href="http://www.turck.us" target="_blank">Turck</CompanyList> - Pressure Transmitters & Sensors, Flow Monitors, Cylinder & Valve Position Sensors</Li>
                        <Li><CompanyList href="http://www.twintecinc.com" target="_blank">Twintec</CompanyList> - Multiport Pneumatic Connectors</Li>
                        <Li><CompanyList href="http://www.vacuforce.co" target="_blank">Vacuforce</CompanyList> - Suction Cups, Regenerative Blowers, VacuumPumps, Generators, Sensor Switches</Li>

                    </Ul>


                </CompanyListDiv>
            </ProductDiv>

            <CategoryDiv>
                <CategoryName>
                    <CategoryP>LUBRICATION EQUIPMENT</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>


            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.bijurdelimon.com/" target="_blank">Bijur Delimon</CompanyList> - Automatic Centralized Grease and Oil Systems,
Farval Dualine Systems, Open Gear Spray Systems, Air/Oil Systems, Programmable Controllers and Monitoring Equipment. </Li>
                        <Li><CompanyList href="http://www.lincolnindustrial.com/" target="_blank">Lincoln Lubrication</CompanyList> - Automated Lubrication Systems, Orsco Chain
Lube Systems, Construction & Mobile Vehicle Lube Systems & Lubrication Components</Li>

                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.skf.com/lubrication" target="_blank">SKF</CompanyList> - Automated Lubrication Systems, Circulating
Oil Systems, Oil & Air Lubrication Systems, Lubrication Systems for Special Applications, Construction & Mobile Vehicle Lube Systems & Lubrication Components</Li>

                    </Ul>
                </CompanyListDiv>
            </ProductDiv>



            <CategoryDiv>
                <CategoryName>
                    <CategoryP>WINCHES & GEAR DRIVES</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>

            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.paccarwinch.com/" target="_blank">Paccar</CompanyList> - Planetary & Worm Gear Winches & Gear Drives
BRANDS: Braden & Gearmatic </Li>
                        <Li><CompanyList href="http://www.team-twg.com/" target="_blank">TWG</CompanyList> - Planetary & Worm Gear Winches & Gear Drives
BRANDS: Pullmaster, DP Winch, Gear
Products, Lantec, & Tulsa Winch  </Li>
                        <Li><CompanyList href="http://www.camozzi-usa.com" target="_blank">Camozzi</CompanyList> - Nickel-Plated Push-to-Connect Fittings, Flow Controls, Valves, FRLs, Cylinders</Li>
                        <Li><CompanyList href="http://www.clippard.com" target="_blank">Clippard</CompanyList> - Actuators & Air Cylinders, Connectors, Valves, Miniature Logic Control Devices</Li>
                      
                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.paccarwinch.com/" target="_blank">Paccar</CompanyList> - Linear Cylinders</Li>
                        <Li><CompanyList href="http://www.motioncontrolsllc.com" target="_blank">Motion Controls </CompanyList> - Linear, Specialty & Engineered Cylinders</Li>
                        <Li><CompanyList href="http://www.nasonptc.com" target="_blank">Nason </CompanyList> - Pressure Switches & Transducers, NFPA & Specialty Cylinders</Li>
                        <Li><CompanyList href="http://www.parker.com" target="_blank">Parker</CompanyList> - Skinner Solenoid Valves, Media Valves</Li>
                       
                    </Ul>


                </CompanyListDiv>
            </ProductDiv>


            
            <CategoryDiv>
                <CategoryName>
                    <CategoryP>ALUMINUM STRUCTURAL FRAMING & ACCESSORIES</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>

            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.boschrexroth-us.com/" target="_blank">Bosch Rexroth </CompanyList> - Aluminum Structural Framing & Accessories
Industrial Hand Tools & Tightening Systems</Li>
                        <Li><CompanyList href="https://www.bucherhydraulics.com/34980/Products/Dyna-Lift/Applications/image.aspx" target="_blank">Bucher </CompanyList> - Ergonomic Lift Systems</Li>
                      
                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="https://gsmna.com/" target="_blank">GSM</CompanyList> - Welded Steel & Stainless Steel Machine GuardingComponents</Li>
                        <Li><CompanyList href="http://www.milagon.com/" target="_blank">Milagon </CompanyList> - Ergonomic Mats & Work Chairs</Li>  
                    </Ul>
                </CompanyListDiv>
            </ProductDiv>


            <CategoryDiv>
                <CategoryName>
                    <CategoryP>AUTOMATION & CONTROL PRODUCTS</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>


            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.abb.us/" target="_blank">ABB</CompanyList> - AC/DC VFDs, Motors </Li>
                        <Li><CompanyList href="https://automation.omron.com/en/us/products/category/robotics" target="_blank">Adept Robotics</CompanyList> - Collaborative Robots, Scara Robots, Six-Axis Robots, Parallel Robots, Mobile Robots</Li>
                        <Li><CompanyList href="http://www.applied-motion.com/" target="_blank">Applied Motion Products</CompanyList> - Stepper/Servo Drives & Motors</Li>
                        <Li><CompanyList href="http://www.asidrives.com/" target="_blank">ASI Drives</CompanyList> - Automated Guided Vehicles (AGVs)</Li>
                        <Li><CompanyList href="http://www.bannerengineering.com/" target="_blank">Banner Engineering</CompanyList> - Photoelectric Sensors, Fiber Optic Sensors,
Wireless I/O, Vision Inspection Sensors, LED Lighting & Indication</Li>
                        <Li><CompanyList href="http://www.beijerelectronics.com/" target="_blank">Beijer</CompanyList>  - HMIs & Industrial PCs</Li>
                        <Li><CompanyList href="http://www.boschrexroth-us.com/" target="_blank">Bosch Rexroth Control</CompanyList>- Rotary & Linear Servo Motors & Drives, Integrated
Motor/Drive, Motion Controllers, HMIs, Integrated Safety, I/O, Explosion-Proof Motors, Industrial Hand Tools & Tightening Systems</Li>
                        <Li><CompanyList href="http://www.boschrexroth-us.com/" target="_blank">Bosch Rexroth Linear</CompanyList> - Ball/Roller Rail, Ball/Roller Screws, Linear
Modules, Cartesian Systems, Conveyor Systems, Round Shafting & Bushings</Li>
                        <Li><CompanyList href="http://www.calamp.com/" target="_blank">CalAmp</CompanyList> - Wireless Long Haul, Cellular & LAN Communication Devices</Li>
                        <Li><CompanyList href="http://www.cgimotion.com/" target="_blank">CGI</CompanyList> - Inline & Right-Angle Precision Gear Boxes</Li>
                        <Li><CompanyList href="http://www.copleycontrols.com/" target="_blank">Copley Controls</CompanyList> - Controllers, Stepper & Servo Drives</Li>

                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">Eaton</CompanyList> - VFDs, PLCs, HMIs, HMIs with Control, Industrial
PCs, Remote I/O & Connectivity, Control Wiring Solutions, Proximity & Photo Sensors, Limit Switches, Energy Monitors</Li>
                        <Li><CompanyList href="http://www.edriveactuators.com/" target="_blank">E-Drive</CompanyList> - Precision High-Thrust Linear Actuators</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">ELPRO by Eaton</CompanyList> - Industrial Wireless Solutions</Li>
                        <Li><CompanyList href="http://www.gamweb.com/" target="_blank">GAM</CompanyList> - Gearboxes, Servo Couplings, Mounting
Accessories</Li>
                        <Li><CompanyList href="http://www.idec.com/" target="_blank">IDEC</CompanyList> - PLCs, HMIs, Controls</Li>
                        <Li><CompanyList href="http://www.joycedayton.com/" target="_blank">Joyce Dayton</CompanyList> - Jack Screws, Bellows</Li>
                        <Li><CompanyList href="http://www.maplesystems.com/" target="_blank">Maple Systems</CompanyList> - HMIs, PLCs, HMI Accessories & Software</Li>

                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="https://www.microscan.com/en-us" target="_blank">Microscan</CompanyList> - Barcode Readers, Machine Vision Technology</Li>
                        <Li><CompanyList href="http://www.mtssensors.com/" target="_blank">MTS</CompanyList> - Linear Displacement Transducers</Li>
                        <Li><CompanyList href="http://www.murrinc.com/" target="_blank">Murr</CompanyList> - IP20 & IP67 Remote I/O, Ethernet Switches</Li>
                        <Li><CompanyList href="https://automation.omron.com/en/us/" target="_blank">Omron</CompanyList> - Temperature & Process Controllers, Servo Drives
& Motors, VFDs, Photo & Proximity Sensors, Machine Automation Controllers & PLCs, Remote I/O, HMIs, Industrial PCs, Vision & Identification Sensors & Systems, Laser Marking</Li>
                        <Li><CompanyList href="http://www.opto22.com/" target="_blank">Opto 22</CompanyList> - Wireless I/O, Fieldbus/Distributed I/O, Controllers,
PACs with Open Architecture, Solid State Relays</Li>
                        <Li><CompanyList href="http://www.orientalmotor.com/" target="_blank">Oriental Motor</CompanyList> - Stepper Motors & Drives (2 and 5 Phase), Closed
Loop Steppers, AC/DC Fractional HP Motors & Drives, Electro-Mechanical Actuators, Fans</Li>
                        <Li><CompanyList href="http://www.pepperl-fuchs.us/" target="_blank">Pepperl + Fuchs</CompanyList> - Industrial Sensors, RFID Systems, Encoders,
AS-Interface Solutions</Li>
                        <Li><CompanyList href="http://www.phoenixcontact.com/us" target="_blank">Phoenix Contact</CompanyList> - Wireless I/O & Networking, IP20 & IP67 Remote
I/O, HMIs, Industrial PCs, PLCs & Programmable Relays, Ethernet & Fieldbus Cabling/Infrastructure, IIoT Solutions</Li>
                        <Li><CompanyList href="http://www.profaceamerica.com/" target="_blank">Proface</CompanyList> - HMIs, HMIs with Control, Industrial Computers</Li>
                        <Li><CompanyList href="https://qcconveyors.com/" target="_blank">QC Conveyors</CompanyList> - Conveying Systems</Li>
                        <Li><CompanyList href="https://robotiq.com/" target="_blank">Robotiq </CompanyList> - Plug + Play Grippers & Components for Collaborative Robots</Li>
                        <Li><CompanyList href="http://www.smcusa.com/" target="_blank">SMC</CompanyList> - Fieldbus/Distributed I/O, Electro-Mechanical Linear & Rotary Actuators</Li>
                        <Li><CompanyList href="https://www.turck.us/en/" target="_blank">Turck</CompanyList> - Ultrasonic & Proximity Sensors, Encoders, Fieldbus/Distributed I/O, Cables, Accessories</Li>
                        <Li><CompanyList href="http://www.unitronics.com/" target="_blank">Unitronics</CompanyList> - HMIs & HMIs with Contro</Li>
                        <Li><CompanyList href="http://www.weg.net/institutional/US/en/" target="_blank">WEG</CompanyList> - Electric Motors, Soft Starters, Industrial Controls, Variable Frequency Drives</Li>
                        <Li><CompanyList href="http://www.wittenstein-us.com/" target="_blank">Wittenstein</CompanyList> - In-Line & Right Angle Servo Gearheads, Precision Rack/Pinion, Precision Linear & Rotary Actuators</Li>

                    </Ul>
                </CompanyListDiv>
            </ProductDiv>



            <CategoryDiv>
                <CategoryName>
                    <CategoryP>ELECTRICAL COMPONENTS</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>


            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.abb.us/" target="_blank">ABB</CompanyList> - Motor Controls, Circuit Protection, Pilot Devices, Signal Converters </Li>
                        <Li><CompanyList href="http://www.aerosusa.com/" target="_blank">AerosUSA</CompanyList> - Flexible Conduit, Connectors, Cable Glands, Accessorie</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">Arrow Hart by Eaton</CompanyList> - Wiring Devices, Pin & Sleeve Connectors, Twist Lock Plugs & Receptacles</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">B-Line by Eaton</CompanyList> - Cable Tray, Enclosures, Safety Grating</Li>
                        <Li><CompanyList href="http://www.bannerengineering.com/" target="_blank">Banner Engineering</CompanyList> - Control Cabinet Lighting, LED Indicators</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">Bussmann by Eaton</CompanyList>  - Fuses, Fuse Blocks & Holders, Power Distribution</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">Crouse-Hinds by Eaton</CompanyList> - Explosion-Proof Enclosures & Accessories</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">Eaton</CompanyList> -Motor Control, Circuit Protection, Pilot Devices, VFDs, UPS Systems, Power Distribution</Li>
                        <Li><CompanyList href="https://www.hammfg.com/" target="_blank">Hammond Manufacturing</CompanyList> - Industrial & IT Enclosures, Heating Products,
Fans, Coolers</Li>
                        <Li><CompanyList href="http://www.hammondpowersolutions.com/" target="_blank">Hammond Power Solutions </CompanyList> - Reactors, Transformers, Power Distribution
& Busbar</Li>
                        <Li><CompanyList href="http://www.icotek.com/us/" target="_blank">Icotek</CompanyList> - Cable Entry Systems, Grounding Systems</Li>

                        <Li><CompanyList href="http://www.lutze.com/" target="_blank">Lutze</CompanyList> - VFD & Servo Cables, Tray Cable</Li>
                        <Li><CompanyList href="http://www.meltric.com/" target="_blank">Meltric</CompanyList>Pin & Sleeve Connectors, Switch Rated Plugs & Receptacles</Li>
                        <Li><CompanyList href="http://ep-us.mersen.com/" target="_blank">Mersen</CompanyList> - Fuses, Fuse Holders, Surge Protection</Li>

                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                    <Li><CompanyList href="http://www.meltric.com/" target="_blank">Meltric</CompanyList>Pin & Sleeve Connectors, Switch Rated Plugs & Receptacles</Li>
                        <Li><CompanyList href="http://ep-us.mersen.com/" target="_blank">Mersen</CompanyList> - Fuses, Fuse Holders, Surge Protection</Li>
                        <Li><CompanyList href="http://ep-us.mersen.com/" target="_blank">Mersen</CompanyList> - Fuses, Fuse Holders, Surge Protection</Li>
                        <Li><CompanyList href="http://www.murrinc.com/" target="_blank">Murr</CompanyList> - Cables, Connectors, 24VDC Power Distribution,
Power Supplies</Li>
                        <Li><CompanyList href="https://automation.omron.com/en/us/" target="_blank">Omron</CompanyList> - Relays, Power Supplies, Limit Switches, Timers,
Counters</Li>
                        <Li><CompanyList href="http://www.opto22.com/" target="_blank">Opto 22</CompanyList> - Solid State Relays</Li>
                        <Li><CompanyList href="http://www.orientalmotor.com/" target="_blank">Oriental Motor</CompanyList> -Fans, Blowers & Ventilation</Li>
                        <Li><CompanyList href="http://www.panduit.com/" target="_blank">Panduit</CompanyList> - Wire Duct, Terminals, Grounding Systems, Labels & Identification</Li>
                        <Li><CompanyList href="https://www.phoenixcontact.com/us" target="_blank">Phoenix Contact</CompanyList> - Terminal Blocks, Power Supplies, Sensor & Actuator Cables, 24VDC Power Distribution, Circuit Protection, Relays</Li>
                        <Li><CompanyList href="http://www.powerstandards.com/" target="_blank">PSL</CompanyList> - NIST-Cert. Power Quality Metering & Monitoring</Li>
                        <Li><CompanyList href="http://www.rittal.com/" target="_blank">Rittal</CompanyList> - Industrial & IT Enclosures, Climate Control, Busbar Systems</Li>
                        <Li><CompanyList href="http://www.turck.us/en/" target="_blank">Turck</CompanyList> - Sensor & Acutator Cables, IP67 Power Supplies </Li>
                        <Li><CompanyList href="http://www.weg.net/institutional/US/en/" target="_blank">WEG</CompanyList> - Circuit Breakers, Terminal Blocks, Contactors, Motor Starters, Overload Relays, Pilot Devices</Li>
                        <Li><CompanyList href=" www.werma.com/us" target="_blank">Werma</CompanyList> - Stack Lights, SCADA Systems</Li>
                        
                    </Ul>
                </CompanyListDiv>
            </ProductDiv>


            <CategoryDiv>
                <CategoryName>
                    <CategoryP>LIQUID & GAS PRESSURE PRODUCTS</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>

            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="https://www.haskel.com/" target="_blank">BuTech</CompanyList> - Low, Medium, & High Pressure Valves</Li>
                        <Li><CompanyList href="http://www.haskel.com/" target="_blank">Haskel </CompanyList> - Air & Hydraulic-Driven Gas Boosters, Air-Driven
Liquid Pumps & Amplifiers, Pressure Systems, Accessories, Low, Medium & High Pressure Valves</Li>
                      
                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.smcusa.com/" target="_blank">SMC</CompanyList> - Air Pressure Amplifiers, High-Pressure
Regulators, High-Purity Filters, Cryogenic Valves, Liquid Solenoid Pumps, AP Tech Regulator</Li>
                    </Ul>
                </CompanyListDiv>
            </ProductDiv>


            <CategoryDiv>
                <CategoryName>
                    <CategoryP>PROCESS CONTROL & COMPONENTS</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>

            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.psgdover.com/all-flo" target="_blank">ALL-FLO</CompanyList> -Air-Operated Double-Diaphragm (AODD) Pumps & Fluid-Handling Solutions </Li>
                        <Li><CompanyList href="http://www.hydacusa.com/" target="_blank">HYDAC </CompanyList> - Process, Water & Diesel Filtration, Coaxial & Direct-Acting Valves</Li>
                        <Li><CompanyList href="https://automation.omron.com/en/us/" target="_blank">Omron</CompanyList> - PID Controllers, Monitoring Relays, Panel Meters </Li>
                        <Li><CompanyList href="http://www.opto22.com/" target="_blank">Opto 22</CompanyList> - Wireless I/O, Fieldbus/Distributed I/O, Controllers, PACs with Open Architecture, Solid State Relays</Li>
                        <Li><CompanyList href="http://www.parker.com/" target="_blank">Parker</CompanyList> - Industrial Hose Gold Ring & Skinner Process Valves</Li>
                      
                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                    <Li><CompanyList href="http://www.pepperl-fuchs.us/" target="_blank">Pepperl + Fuchs</CompanyList> - Isolated Barriers, Purge Systems, Level Measurement </Li>
                        <Li><CompanyList href="http://www.phoenixcontact.com/us" target="_blank">Phoenix Contact</CompanyList> - Signal Conditioners, Fieldbus Barriers, Energy Monitors</Li>
                        <Li><CompanyList href="http://www.powerstandards.com/" target="_blank">PSL</CompanyList> - NIST-Certified Power Quality Metering & Monitoring</Li>
                        <Li><CompanyList href="http://www.smcusa.com/" target="_blank">SMC</CompanyList> - Pneumatic Filters, Air-Driven Pumps, Process Chillers, Pneumatic Process Valves, Air-Driven Teflon Pumps, Liquid Solenoid Pumps</Li>
                        <Li><CompanyList href="http://www.turck.us/en/" target="_blank">Turck</CompanyList> - Level/Temperature/Flow Transducers, Zener Barriers</Li>
                      
                    </Ul>
                </CompanyListDiv>
            </ProductDiv>



            <CategoryDiv>
                <CategoryName>
                    <CategoryP>MACHINE SAFETY PRODUCTS & SERVICES</CategoryP>

                </CategoryName>
                <ProductBorder></ProductBorder>

            </CategoryDiv>

            <ProductDiv>
                <CompanyListDiv>
                    <Ul>
                        <Li><CompanyList href="http://www.mpsasafety.com/" target="_blank">Airline’s Machine & Process Safety Assessment (MPSA)</CompanyList> - Machine risk assessment and safety surveys; OSHA-compliant machine guarding (with or without integrated safety controls); point-of-operation guards for machine tools; machine safety training and other safety services.</Li>
                        <Li><CompanyList href="http://new.abb.com/low-voltage/products/safety-products" target="_blank">ABB</CompanyList> - Jokab Safety Switches, Programmable Safety Controllers, Light Curtains</Li>
                        <Li><CompanyList href="http://www.bannerengineering.com/" target="_blank">Banner Engineering </CompanyList> - Programmable Safety Controllers, Safety Relays, Safety Light Curtains, Interlock Switches</Li>
                        <Li><CompanyList href="http://www.eaton.com/" target="_blank">Eaton</CompanyList> - Safety Relays, Safety Interlock Switches, Safety Position Switches Guarding Enclosure Elements</Li>
                      
                    </Ul>

                </CompanyListDiv>
                <CompanyListDiv>
                    <Ul>
                    <Li><CompanyList href="https://gsmna.com/" target="_blank">GSM</CompanyList> - Machine Guarding Enclosure Elements to Meet Robotic Asembly Cell Standards</Li>
                    <Li><CompanyList href="http://www.industrial.omron.us/" target="_blank">Omron STI</CompanyList> - Programmable Safety Controllers, Safety Relays, Safety Light Curtains & Scanners, Safety Mats, Interlock Switches</Li>
                        <Li><CompanyList href="http://www.phoenixcontact.com/us" target="_blank">Phoenix Contact</CompanyList> - Programmable Safety Controllers, Safety Relays, Safety Bridge I/O</Li>
                        <Li><CompanyList href="http://www.rosscontrols.com/" target="_blank">Ross Controls</CompanyList> - Pneumatic Safety Valves, ISO 13849 Compliant</Li>
                        <Li><CompanyList href="http://www.schmersalusa.com/" target="_blank">Schmersal</CompanyList> - Safety Sensors & Switches, Safety Relays, Light Curtains</Li>                      
                    </Ul>
                </CompanyListDiv>
            </ProductDiv>

            {/*........................... All Manufacturers.......................................... */}

            <H4Div>
                <H4>All Manufacturers</H4>
                <BorderLine></BorderLine>
            </H4Div>

            <AlphabetListDiv>
                <H6>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z #</H6>

            </AlphabetListDiv>
            <LongBorderLine></LongBorderLine>

            <Div>
                <LetterDiv>
                    <H6>A</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/ABB.htm" target="_blank">ABB</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/abb_jokab.htm">ABB (Jokab)</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/acme_electric.htm">Acme Electric</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/adaptall.htm">Adaptall</BrandList></li>

                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/adsens.htm">Adsens</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/services.htm">Airline</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/air_starter_components.htm">Air Starter Components</BrandList></li>
                        <li><BrandList href="http://www.alkoncorp.com/">Alkon</BrandList></li>
                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/all-flo.htm">All-Flo</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/allenair.htm">Allenair</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/anchor.htm">Anchor</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/apollo_ball_valves.htm">Apollo Ball Valves	</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/applied_motion_products.htm">Applied Motion Products</BrandList></li>
                    </Ul>
                </ListDiv>


            </Div>


            <LongBorderLine></LongBorderLine>


            <Div>
                <LetterDiv>
                    <H6>B</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/banner.htm" target="_blank">Banner Engineering</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/beijer.htm">Beijer</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/bell_everman.htm">Bell-Everman</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/rexroth.htm">Bosch Rexroth</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/brennan.htm">Brennan Industries</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/bucher.htm">Bucher Hydraulics</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/BuTech.htm">BuTech</BrandList></li>

                    </Ul>

                </ListDiv>


            </Div>

            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>C</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/CalAmp.htm" target="_blank">CalAmp</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/camozzi.htm">Camozzi</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/casappa.htm">Casappa</BrandList></li>

                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/cervis.htm">Cervis</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/CGI.htm">CGI</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/Clippard.htm">Clippard</BrandList></li>

                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/contrinex.htm">Contrinex</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/copley_controls.htm">Copley Controls</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/cylinders_valves.htm">Cylinders & Valves</BrandList></li>

                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href=""></BrandList></li>
                        <li><BrandList href=""></BrandList></li>
                        <li><BrandList href=""></BrandList></li>

                    </Ul>

                </ListDiv>


            </Div>

            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>D</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/daman_manifolds.htm" target="_blank">Daman Manifolds</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/delta.htm">Delta Power</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/deltrol">Deltrol</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/dixon_quick.htm">Dixon Quick Disconnect Couplings</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/dmic_ball_valves.htm">DMIC Ball Valves</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/durst.htm">Durst</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/dynamic_gauges.htm">Dynamic Gauges</BrandList></li>
                        

                    </Ul>

                </ListDiv>


            </Div>

            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>E</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/eaton_b-line.htm" target="_blank">Daman Manifolds</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/eaton_bussmann.htm">Eaton Bussmann</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/eaton_cooper_arrow_hart.htm">Eaton Cooper Arrow Hart</BrandList></li>
                        <li><BrandList href="http://www.edriveactuators.com/">E-Drive</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="http://www.robots.epson.com/">Epson Robots</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/erico.htm">Erico</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/eskridge.htm">Eskridge</BrandList></li>
                        

                    </Ul>

                </ListDiv>
            </Div>


            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>F</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/fibox.htm" target="_blank">Fibox</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/flexa_conduit.htm">Flexa Conduit</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/flow_ezy_strainers.htm">Flow Ezy Strainers	</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/fulflo.htm">Fulflo Valves</BrandList></li>
                        
                    </Ul>

                </ListDiv>
            </Div>

            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>G</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/GAM.htm" target="_blank">GAM</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/geartek.htm">Geartek</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/grace.htm">Grace</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/GSM.htm">GSM</BrandList></li>
                        
                    </Ul>

                </ListDiv>
            </Div>


            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>H</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hammond_manufacturing.htm" target="_blank">Hammond Manufacturing</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hammond_power_solutions.htm" target="_blank">Hammond Power Solutions</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hanna.htm" target="_blank">Hanna</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hannay_reels.htm" target="_blank">Hannay Reels</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/Haskel.htm">Haskel</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/HECO.htm">Heco Gear</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hedland.htm">Hedland</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/high_country_tek.htm">High Country Tek</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/honor.htm">Honor Pumps USA</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/HYDAC.htm">HYDAC</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hydratech.htm">Hydratech Industries</BrandList></li>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hydro_leduc.htm">Hydro Leduc</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/hypercyl.htm">HyperCyl</BrandList></li>
                        
                    </Ul>

                </ListDiv>
            </Div>


            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>I</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/icotek.htm" target="_blank">Icotek</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/idec">IDEC</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/ingersoll_rand.htm">Ingersoll Rand</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href=""></BrandList></li>
                        
                    </Ul>

                </ListDiv>
            </Div>

            <LongBorderLine></LongBorderLine>
            <Div>
                <LetterDiv>
                    <H6>K</H6>
                </LetterDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/kawasaki.htm" target="_blank">Kawasaki</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/kobelt.htm">Kobelt</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href="https://www.airlinehyd.com/pages/brands/kyb.htm">KYB (Hydrostar)</BrandList></li>


                    </Ul>
                </ListDiv>
                <ListDiv>
                    <Ul>
                        <li><BrandList href=""></BrandList></li>
                        
                    </Ul>

                </ListDiv>
            </Div>




        </Container>


    )
}






