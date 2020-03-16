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
    width: 80%;
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
    flex: 7;
    
`;

const Ul = styled.ul`
    list-style-type: none;
    font-weight: 200;
    width: 50%;
    // padding: 0;
`;

const CompanyList = styled.a`
    text-decoration: none;
    color: #246696;
    font-size: 12px;
    font-weight: bold;
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
    font-size: 17px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0;
    color: #555555;
`;


const ProductDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    margin: auto;
 
`;


const CompanyListDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    font-size: 11px;
    color: #555555;
    
`;

const ProductBorder = styled.div`
display: flex;
border-bottom: 1px solid #ebe7e7;
width: 70%;
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
                    <li><CompanyList href="" target="_blank">Aventics</CompanyList> - Cylinders </li>
                    <li><CompanyList href="">Bosch Rexroth</CompanyList> - Pumps, Motors, Cylinders, Valves, Filters,
Manifolds, Power Units, Controllers, Rineer Motors & Oil Control Valves</li>
                    <li><CompanyList href="">Bucher</CompanyList> - Command Controls Cartridge Valves Monarch Power Units</li>
                    <li><CompanyList href="">Casappa</CompanyList> - Piston Pumps, Gear Pumps, Flow Dividers</li>
                    <li><CompanyList href="">Cervis</CompanyList> - Controllers & Remote Controllers</li>
                    <li><CompanyList href="">Daman</CompanyList> - Bar Manifolds, Custom Manifolds & Modules</li>
                    <li><CompanyList href="">Flow Ezy</CompanyList> - Strainers</li>
                    <li><CompanyList href="">Fulflo </CompanyList> - Directional, Pressure & Flow Valves</li>
                    <li><CompanyList href="">Geartek</CompanyList> - Gear Pumps</li>
                    <li><CompanyList href="">Hanna</CompanyList> - General-Type Cylinders</li>
                    <li><CompanyList href="">Hedland</CompanyList> - Flow Meters</li>
                    <li><CompanyList href="">High Country Tek</CompanyList> - Mobile Controllers & Modules</li>
                    <li><CompanyList href="">HYDAC</CompanyList> - Accumulators, Filters, Instrumentation,
Cylinders, Cartridge Valves, Manifolds, Cooling, Diagnostics, Accessories, Bieri High-Pressure Hydraulic Components</li>
                    <li><CompanyList href="">Hydro Leduc</CompanyList> - Micro-Hydraulics, Piston Pumps, Piston Motors</li>
                   
                </Ul>


                <Ul>
                    <li><CompanyList href="">Kawasaki</CompanyList> - Staffa Piston Pumps & Piston Motors</li>
                    <li><CompanyList href="">Kobelt</CompanyList> - Controllers & Remote Controllers</li>
                    <li><CompanyList href="">KYB</CompanyList> - Hydrostar Piston Motors</li>
                    <li><CompanyList href="">Lehigh Fluid Power</CompanyList> - General-Type Cylinders</li>
                    <li><CompanyList href="">Magnom Filters</CompanyList> - Magnetic Filtration</li>
                    <li><CompanyList href="">Milwaukee Cylinder</CompanyList> - Basic & NFPA-Type Cylinders</li>
                    <li><CompanyList href="">MTS</CompanyList> - Linear Displacement Transducers</li>
                    <li><CompanyList href="">Nason</CompanyList> - Compact Hydraulic Cylinders, NFPA Cylinders</li>
                    <li><CompanyList href="">OEM Controls</CompanyList> - Joysticks & Controllers</li>
                    <li><CompanyList href="">Parker</CompanyList> - Low-Speed High-Torque Motors</li>
                    <li><CompanyList href="">Permco</CompanyList> - Gear Pumps & Motors, Vane Pumps & Motors, Flow Dividers & Intensifiers</li>
                    <li><CompanyList href="">Settima</CompanyList> - Continuum® Helical Gear Pumps & Screw Pumps</li>
                    <li><CompanyList href="">Thermal Transfer</CompanyList> - Air-to-Oil & Water-to-Oil Type Coolers </li>
                    <li><CompanyList href="">Voith</CompanyList> - Internal Gear Pumps</li>
                    <li><CompanyList href="">Walvoil </CompanyList> - Mobile Monoblock & Sectional Valves & Operators</li>
                    <li><CompanyList href="">Yates Industries</CompanyList> -General-Type Cylinders </li>


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
                <li><CompanyList href="" target="_blank">Aventics</CompanyList> - Cylinders </li>
                    <li><CompanyList href="" target="_blank">Bosch Rexroth</CompanyList> - </li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                   


                </Ul>

                <Ul>
                <li><CompanyList href="" target="_blank">Aventics</CompanyList> - Cylinders </li>
                    <li><CompanyList href="" target="_blank">Bosch Rexroth</CompanyList> - </li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                   

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
                <li><CompanyList href="" target="_blank">Aventics</CompanyList> - Cylinders </li>
                    <li><CompanyList href="" target="_blank">Bosch Rexroth</CompanyList> - </li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                   


                </Ul>

                <Ul>
                <li><CompanyList href="" target="_blank">Aventics</CompanyList> - Cylinders </li>
                    <li><CompanyList href="" target="_blank">Bosch Rexroth</CompanyList> - </li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                   

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
                        <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>

                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>


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
                        <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>

                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>


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
                        <li><CompanyList href="" target="_blank">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>

                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>

                    </Ul>
                    <Ul>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>
                        <li><CompanyList href="">Alternating Relays</CompanyList></li>


                    </Ul>
                </ListDiv>


            </Div>

            

        </Container>


    )
}






