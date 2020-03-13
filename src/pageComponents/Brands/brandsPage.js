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
 
 `;

const H6 = styled.h6`
    display: flex;
    font-weight: bold;
    margin: 0 auto;S
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 0;
    width: 80%;
    margin: 0 auto;
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
`;

const CompanyList = styled.a`
    text-decoration: none;
    color: black;
    font-size: 15px;
    font-weight: 400;
`;

const CategoryDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    margin: auto;
    padding-top: 50px;
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
`;



const ProductDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    margin: auto;
 
`;

const SideLogoDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
 
`;
const CompanyListDiv = styled.div`
    display: flex;
    justify-content: center;
    flex:2;
`;

const LogoDiv = styled.div`
    width: 150px;
    height: auto;
    display: flex;
    justify-content: center;

`;

const LogoImg = styled.img`
width: 70%;
margin: 10px; 

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
  
            </CategoryDiv>


            <ProductDiv>
                <SideLogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://rodavigo.net/datos/logos-marcas-png/rexroth-neumatica.png" />
                      <LogoImg src="https://1h6t0226incw29h3as373ufk-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/logo.png" />
                  
                  </LogoDiv>
                  
                  <LogoDiv> 
                      <LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/hydacweb.jpg" />
                      <LogoImg src="http://www.hydroleduc.com/images/links/page_accueil/logo.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://www.bucherhydraulics.com/docs/img/global/logo.png" />
                      <LogoImg src="http://www.walvoil.com/image/logo-walvoil.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="http://www.kobelt.com/img/logo.png" />
                      <LogoImg src="https://www.casappa.com/media/img/layout/logo_casappa_header.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://magnom.com/assets/magnom.jpg" />
                      <LogoImg src="http://static.voith.com/2.13.0/resources/img/voith.svg" />
                  
                  </LogoDiv>
                </SideLogoDiv>
               

            <CompanyListDiv>
                <Ul>
                    <li><CompanyList href="" target="_blank">Aventics</CompanyList> - Cylinders </li>
                    <li><CompanyList href="">Bosch Rexroth</CompanyList> - </li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                   


                </Ul>

                <Ul>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                  


                </Ul>
            
               
       
            </CompanyListDiv>

           
            </ProductDiv>
            
          





            <CategoryDiv>
                <CategoryName>
                    <CategoryP>HOSE, CONNECTORS & ACCESSORIES</CategoryP>

                </CategoryName>


            </CategoryDiv>


            <ProductDiv>
             
            <CompanyListDiv>
                <Ul>
                    <li><CompanyList href="" target="_blank">Alternating RelaysAlternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                   


                </Ul>

                <Ul>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                  
                </Ul>
            </CompanyListDiv>

            <SideLogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://rodavigo.net/datos/logos-marcas-png/rexroth-neumatica.png" />
                      <LogoImg src="https://1h6t0226incw29h3as373ufk-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/logo.png" />
                  
                  </LogoDiv>
                  
                  <LogoDiv> 
                      <LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/hydacweb.jpg" />
                      <LogoImg src="http://www.hydroleduc.com/images/links/page_accueil/logo.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://www.bucherhydraulics.com/docs/img/global/logo.png" />
                      <LogoImg src="http://www.walvoil.com/image/logo-walvoil.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="http://www.kobelt.com/img/logo.png" />
                      <LogoImg src="https://www.casappa.com/media/img/layout/logo_casappa_header.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://magnom.com/assets/magnom.jpg" />
                      <LogoImg src="http://static.voith.com/2.13.0/resources/img/voith.svg" />
                  
                  </LogoDiv>
                </SideLogoDiv>

           
            </ProductDiv>
            
          


            <CategoryDiv>
                <CategoryName>
                    <CategoryP>PNEUMATIC COMPONENTS</CategoryP>

                </CategoryName>


            </CategoryDiv>


            <ProductDiv>
                <SideLogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://rodavigo.net/datos/logos-marcas-png/rexroth-neumatica.png" />
                      <LogoImg src="https://1h6t0226incw29h3as373ufk-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/logo.png" />
                  
                  </LogoDiv>
                  
                  <LogoDiv> 
                      <LogoImg src="https://www.airlinehyd.com/customer/aihyco/images/hydacweb.jpg" />
                      <LogoImg src="http://www.hydroleduc.com/images/links/page_accueil/logo.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://www.bucherhydraulics.com/docs/img/global/logo.png" />
                      <LogoImg src="http://www.walvoil.com/image/logo-walvoil.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="http://www.kobelt.com/img/logo.png" />
                      <LogoImg src="https://www.casappa.com/media/img/layout/logo_casappa_header.png" />
                  
                  </LogoDiv>
                  <LogoDiv> 
                      <LogoImg src="https://magnom.com/assets/magnom.jpg" />
                      <LogoImg src="http://static.voith.com/2.13.0/resources/img/voith.svg" />
                  
                  </LogoDiv>
                </SideLogoDiv>
               

            <CompanyListDiv>
                <Ul>
                    <li><CompanyList href="" target="_blank">Alternating RelaysAlternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                   


                </Ul>

                <Ul>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                    <li><CompanyList href="">Alternating Relays</CompanyList></li>
                  


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






