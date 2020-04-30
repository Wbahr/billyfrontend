import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import RittalLogo from '../../imgs/PowerDistributionPage/rittal-logo.jpg'
import Food from '../../imgs/powerDistributionPage/food and bev.png'
import PowerGeneration from '../../imgs/powerDistributionPage/power generation.png'
import OEMDrives from '../../imgs/powerDistributionPage/OEM drives.jpg'
import GeneralPurpose from '../../imgs/powerDistributionPage/General purpose drives.jpg'
import HVAC from '../../imgs/powerDistributionPage/HVAC drives.jpg'
import StandardEnclosed from '../../imgs/powerDistributionPage/Standard enclosed drives.jpg'
import FlexCenter from '../../imgs/powerDistributionPage/Flex Center.jpg'
import AdvancedVFD from '../../imgs/powerDistributionPage/Advanced VFD solutions.jpg'
import XTContactor from '../../imgs/powerDistributionPage/XT contactors.jpg'
import XTManual from '../../imgs/powerDistributionPage/XT manual motor.jpg'
import EMS from '../../imgs/powerDistributionPage/EMS.jpg'
import NEMA from '../../imgs/powerDistributionPage/NEMA power control.jpg'
import PowerControl from '../../imgs/powerDistributionPage/Specialty power control.jpg'
import SolidState from '../../imgs/powerDistributionPage/Solid-state.jpg'
import MotorProtection from '../../imgs/powerDistributionPage/Motor protection.jpg'
import Enclosed from '../../imgs/powerDistributionPage/Enclosed control1.jpg'
import Aftermarke from '../../imgs/powerDistributionPage/Aftermarket.jpg'
import Industrial from '../../imgs/powerDistributionPage/Industrial relays.jpg'
import Programmable from '../../imgs/powerDistributionPage/Programmable.jpg'
import Operator from '../../imgs/powerDistributionPage/Operator interface.jpg'
import Intelligent from '../../imgs/powerDistributionPage/Intelligent wiring solutions.jpg'
import SafetyProducts from '../../imgs/powerDistributionPage/Safety products.jpg'
import TerminalBlocks from '../../imgs/powerDistributionPage/Terminal blocks.jpg'
import PilotDevices from '../../imgs/powerDistributionPage/Pilot devices.jpg'
import ControlStations from '../../imgs/powerDistributionPage/Control stations.jpg'
import ControlPower from '../../imgs/powerDistributionPage/Control power.jpg'
import Sensors from '../../imgs/powerDistributionPage/Sensors.jpg'
import SignalTowers from '../../imgs/powerDistributionPage/Signal towers.jpg'
import PowerDefense from '../../imgs/powerDistributionPage/Power Defense.jpg'
import Bussmann from '../../imgs/powerDistributionPage/Bussmann.jpg'
import Distribution from '../../imgs/powerDistributionPage/Distribution Transformers.jpg'
import LVMedium from '../../imgs/powerDistributionPage/LV medium-low-voltage.jpg'
import LvMotorControl from '../../imgs/powerDistributionPage/LV motor control.jpg'
import LvDrive from '../../imgs/powerDistributionPage/LV Drive.jpg'
import LvCapacitor from '../../imgs/powerDistributionPage/LV capacitor banks.jpg'
import LvEHouse from '../../imgs/powerDistributionPage/LV house.jpg'
import Wallmount from '../../imgs/powerDistributionPage/Wallmount.jpg'
import Freestanding from '../../imgs/powerDistributionPage/Freestanding.jpg'
import Floormount from '../../imgs/powerDistributionPage/Floormount Disconnect.jpg'
import Fan from '../../imgs/powerDistributionPage/Fan.jpg'
import Roofmount from '../../imgs/powerDistributionPage/Roofmount Air Conditioner.jpg'
import PushButton from '../../imgs/powerDistributionPage/Push Button Box.jpg'
import WallmountAir from '../../imgs/powerDistributionPage/Wallmount Air Conditioner.jpg'
import Hygienic from '../../imgs/powerDistributionPage/Hygienic Design.jpg'
import Modular from '../../imgs/powerDistributionPage/Modular Enclosures.jpg'
import HMI from '../../imgs/powerDistributionPage/HMI.png'

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`
const FeaturedBrandLogo = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 200px 0;
    background-image: url('https://media.istockphoto.com/photos/fiberglass-production-industry-equipment-at-manufacture-background-picture-id1130458099?s=2048x2048');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `
const BrandDetailsContainer = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    flex-wrap: wrap;
    margin: 0 auto;
  `
const AirlineDistributorH1 = styled.h1`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    margin-top: 40px;
`
const AirlineDistributorH4 = styled.h4`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    margin-top: 40px;
`
const DistributorDetails = styled.div`
    display: flex;
    font-size: 18px;
    margin: 0 0 30px;
`
const ProductsTitle = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: #555555;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    flex-wrap: nowrap;
    margin-right: 40px;
    min-width: max-content;
`
const SectionDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin: 40px 0;
    align-items: center;
`
const BorderBottom = styled.div`
    display: flex;
    border-bottom: 2px solid #f2f3f4;
    flex-grow: 99;
  `
const BannerDiv = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 2px solid #f2f3f4;
`
const BannerImg = styled.img`
    width: 82%;
    height: 100%;
    object-fit: contain;
    margin-left: 19px;
`
const BrandDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const DistributorDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
`
const Industry = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    flex-direction: column;
`
const IndustryCol = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;

`
const IndustryImgDiv = styled.div`
    width: 250px;
    height 200px;
    overflow: hidden;
`
const IndustryImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const IndustryTextDiv = styled.div`
    margin: 20px 0; 
`
const IndustryText = styled.p`
    text-align: center;
    font-weight: bold;
    margin-bottom: 0;
    font-size: 20px;
    color: #555555;
`
const SubHeaderDiv = styled.div`
    margin-bottom: 30px;
`
const SubHeader = styled.p`
    margin-bottom: 0;
    font-size: 25px;   
`
const IndustryColDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const ProductDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 25px;
    width: 250px;
    align-items: center;
    justify-content: space-evenly;
`
const ProductImgDiv = styled.div`
    width: 200px;
    height: 170px;
    overflow: hidden;
`
const ProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const ProductHeaderDiv = styled.div`
    margin-top: 10px;
`
const ProductHeader = styled.p`
    margin-bottom: 0;
    font-weight: bold;
    text-align: center;
`
const ProductDetailsDiv = styled.div`
    padding: 0 5px;
`
const ProductDetails = styled.p`
    margin-bottom: 0;
    font-size: 12px;
`
const ProductSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;   
`
const ProductBtn = styled.button`
    background-color: #246696;
    color: white;
    border-radius: 13px;
    font-size: 12px;
    margin: 15px 0;
    border: 0;
    padding: 3px 18px;
`
const LogoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 260px;
    margin: 0 25px;
`
const LogoText = styled.p`
    margin-top: 10px;
    color: #B51F2B;
    font-weight: bold;
`
const BtnDiv = styled.div`
`
const LogoBtn = styled.button`
    background-color: #246696;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 5px;
`
const InfoDiv = styled.div`
    display: flex;
    margin: 20px 0 80px;
`

export default function PowerDistributionProducts() {
    return (

        <Container>
            <FeaturedBrandLogo>
            </FeaturedBrandLogo>
            <BrandDetailsContainer>
                <AirlineDistributorH1>Power Distribution Products and Electrical Enclosures</AirlineDistributorH1>
                <DistributorDiv>
                    <DistributorDiv>Airline can provide the service and products you need when thinking about your facilities electrical power distribution system. Airline is uniquely situated as a preferred Rittal and Eaton industrial distributor. This allows us to be committed to serving the industrial end user market. The following are some examples of the Rittal and Eaton products/solutions that we can offer as well as the capabilities of Eaton’s Engineering Services Team.
                    </DistributorDiv>
                </DistributorDiv>
                <BrandDiv>
                    <AirlineDistributorH4>Airline is an authorized distributor of quality brands such as:</AirlineDistributorH4>
                    <DistributorDetails>
                        <LogoDiv>
                            <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" /></BannerDiv>
                            <LogoText>Interested in Eaton?</LogoText>
                            <BtnDiv><LogoBtn>Request more information</LogoBtn></BtnDiv>
                        </LogoDiv>
                        <LogoDiv>
                            <BannerDiv><BannerImg src={RittalLogo} /></BannerDiv>
                            <LogoText>Interested in Rittal?</LogoText>
                            <BtnDiv><LogoBtn>Request more information</LogoBtn></BtnDiv>
                        </LogoDiv>
                    </DistributorDetails>
                </BrandDiv>

                {/*............................... INDUSTRY................................... */}

                <SectionDiv>
                    <ProductsTitle> industries</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <Industry>
                    <SubHeaderDiv>
                        <SubHeader>We serve a variety of industries such as:</SubHeader>
                    </SubHeaderDiv>
                    <IndustryColDiv>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src="https://www.rittal.us/contents/wp-content/uploads/2018/09/Plantfloor_MRO-300x189.png" />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Plant Floor/MRO</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src={PowerGeneration} />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Power Generation</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src={Food} />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Food & Beverage</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                        <IndustryCol>
                            <IndustryImgDiv>
                                <IndustryImg src="https://www.rittal.us/contents/wp-content/uploads/2018/09/Manufacturing-300x189.png" />
                            </IndustryImgDiv>
                            <IndustryTextDiv>
                                <IndustryText>Manufacturing</IndustryText>
                            </IndustryTextDiv>
                        </IndustryCol>
                    </IndustryColDiv>
                </Industry>

                {/*............................... PRODUCTS................................... */}

                <SectionDiv>
                    <ProductsTitle>Products</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <ProductSection>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={OEMDrives} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>OEM drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Unique, space-saving drives with programmable features provide valuable energy savings for OEM drives applications.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={GeneralPurpose} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>General purpose drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Engineered for today’s demanding commercial and industrial applications, these robust drives provide reliable, efficient and precise motor control.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={HVAC} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>HVAC drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Designed to significantly reduce energy consumption, these ultra-efficient drives increase cost savings for most HVAC applications.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Wallmount} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Wallmount Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>NEMA protection ratings are ensured through a secure locking system, foamed-in-place gasket and knife edge perimeter. Features include a body constructed of cold rolled steel, steel doors and zinc-plated mounting panels.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={StandardEnclosed} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Standard enclosed drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Innovative drives offer pilot devices, circuit breaker/ fused disconnects, input/output filtering and bypass capabilities.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Freestanding} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Freestanding Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Select from raised and removable 12" floor mounts or freestanding enclosures with or without base/plinth panels.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={FlexCenter} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Flex Center</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>The Drives Flex Center in Watertown, WI provides value-engineered enclosed drive solutions to fit exact specifications, from standard modifications to complete custom design/builds.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={AdvancedVFD} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Advanced VFD solutions</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Engineered-to-order configurations with motor protection relays, custom bypass, custom enclosures and harmonics mitigation.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={XTContactor} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>XT contactors and starters</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Compact, space-saving and easy-to-install XT line of IEC contactors and starters is the efficient and effective solution</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={XTManual} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>XT manual motor protectors and combination motor controllers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>XT IEC open non-reversing and reversing manual motor controllers combine a manual motor protector with an IEC contactor(s) to provide a complete motor protection solution.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={EMS} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Electronic motor starters (EMS)</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Full starter with built-in solid-state contacts and integral overload protection. Compact size and high electrical life make it an ideal replacement for traditional contactor/overload relay starter configuration.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Floormount} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Floormount Disconnect Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>These enclosures provide personnel safety, protect electrical components and support the addition of a flange-mounted disconnect handle.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={NEMA} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>NEMA power control</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Freedom NEMA-rated contactors and starters with solid-state and bi-metallic overload options; universal retrofit kits; UL listed.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={PowerControl} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Specialty power control</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Designed to deliver application versatility, simple configuration and high-performance operation.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Fan} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Fans</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Rittal filter fans are adaptable with filter blankets, hoods and louvers.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={SolidState} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Solid-state starters (soft starters)</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Control acceleration and deceleration of three-phase motors with current ranges from 0.8 A to 1000 A. Compact, multifunctional, easy to install and program.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={MotorProtection} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Motor protection</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Providing the highest level of motor protection and versatility while maximizing uptime.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Enclosed} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Enclosed control</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Expansive, flexible offering with a variety of modifications to meet your enclosed control needs.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Roofmount} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Roofmount & Wallmount Air conditioners</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails> Rittal’s roof-mounted cooling units ensures doors, side panels and escape routes are kept free. Electrical condensate evaporation, nano-coated condenser.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Aftermarke} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Aftermarket and renewal parts</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Extend the life of existing products with quality replacement parts.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={PushButton} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Push Button Boxes</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>The NEMA rated PB series pushbutton box enclosure is designed for indoor use to house pushbuttons, selector switches, and pilot lights. This enclosure protects equipment from dirt, dust, sprayed water, oil, and coolants.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Industrial} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Industrial relays</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Extensive relay line that can be customized to meet many application requirements.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src="https://www.eaton.com/content/dam/eaton/products/industrialcontrols-drives-automation-sensors/freedom-nema-an19/Easy-E4-UC-12rc1-Effortless-Control.jpg" />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Programmable logic controllers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Ideal for lighting, energy management, industrial control, irrigation, pump control and HVAC.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Operator} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Operator interface</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Features familiar, easy-to-understand control interfaces and command methods that are used in consumer electronics.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Intelligent} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Intelligent wiring solutions</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Wiring solutions for control panels and OEM drives machinery that simplifies and consolidates complex circuit wiring into a single cable.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Hygienic} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Hygienic Design Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Our Hygienic Design Solutions deliver full protection from caustic washdowns and thermal management to keep your vital equipment running.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={SafetyProducts} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Safety products</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Created to enhance machine operator safety and machine motor control.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={TerminalBlocks} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Terminal blocks</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Built for years of use under demanding conditions, these terminal blocks are available in three simple and reliable terminal connection styles with universal accessories.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={PilotDevices} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Pilot devices</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Available in many shapes and sizes, these versatile pilot devices are ideal for applications in the North American (NEMA) and global (IEC) markets.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={ControlStations} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Control stations</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>General purpose and heavy-duty options with fixed element or modular design to suit virtually any industrial or commercial application.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Modular} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Modular Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Modular enclosures provide the protection required for industrial drives, controls and other equipment. They deliver the practical flexibility to evolve with the changing demands of modern business.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={ControlPower} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Control power</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Wide selection of durable and reliable DIN rail power supplies, available in 12 and 24 Vdc, for general, compact and low-profile applications.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Sensors} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Sensors and limit switches</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Sensing option for many applications—from rugged, mechanically actuated switches to sophisticated, noncontact, sensing solutions.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={SignalTowers} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Signal towers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Provide highly versatile, completely modular signaling for key processes—and with IP66 protection, these signal towers thrive indoors and out.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={PowerDefense} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Power Defense circuit breakers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Eaton’s globally rated Power Defense circuit breakers increase personnel safety and provide a foundation for IoT, with embedded communications and metering functionality, helping to optimize your facility’s performance.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Bussmann} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Bussmann® series fuses, blocks, holders and disconnect switches</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Eaton develops and manufactures Bussmann series fusible circuit protection, power management and electrical safety products for industrial, commercial and alternative energy markets.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={Distribution} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Power and distribution transformers and busway</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={HMI} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>HMI Arm Enclosures</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails>Rittal offers HMI solutions for all types of applications: Pendant arm systems, PC enclosures, industrial workstations and consoles. All designed for user efficiency.</ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Shop products</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={LVMedium} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Medium- and low-voltage switchgear</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={LvMotorControl} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Medium- and low-voltage motor control centers</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                    <ProductDiv>
                        <ProductImgDiv>
                            <ProductImg src={LvDrive} />
                        </ProductImgDiv>
                        <ProductHeaderDiv>
                            <ProductHeader>Medium- and low-voltage drives</ProductHeader>
                        </ProductHeaderDiv>
                        <ProductDetailsDiv>
                            <ProductDetails></ProductDetails>
                        </ProductDetailsDiv>
                        <ProductBtn>Request a quote</ProductBtn>
                    </ProductDiv>
                </ProductSection>

                {/*.............................. NEED MORE INFO................................... */}

                <SectionDiv>
                    <ProductsTitle>Need more information</ProductsTitle>
                    <BorderBottom></BorderBottom>
                </SectionDiv>
                <InfoDiv>
                    <LogoDiv>
                        <BannerDiv><BannerImg src="https://www.airlinehyd.com/customer/aihyco/images/eaton_logo_new.png" /></BannerDiv>
                        <LogoText>Interested in Eaton?</LogoText>
                        <BtnDiv><LogoBtn>Request more information</LogoBtn></BtnDiv>
                    </LogoDiv>
                    <LogoDiv>
                        <BannerDiv><BannerImg src={RittalLogo} /></BannerDiv>
                        <LogoText>Interested in Rittal?</LogoText>
                        <BtnDiv><LogoBtn>Request more information</LogoBtn></BtnDiv>
                    </LogoDiv>
                </InfoDiv>
            </BrandDetailsContainer>
        </Container >

    );
}

