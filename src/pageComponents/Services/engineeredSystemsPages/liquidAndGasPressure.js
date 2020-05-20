import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'
import ServiceHome from '../uiComponents/service'
import ProductLayout from '../uiComponents/productLayout'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Div = styled.div`
    display: flex;
    margin: 20px 0;
    align-items: center;
`
const ImgDiv = styled.div`
    margin: 0 20px;
`
const Img = styled.img`
    width: 300px;
    height: 300px;
    object-fit: contain;
`
const DetailDiv = styled.div`
    margin: 20px 0;
`
export default function liquidAndGasPressure() {
	return (
		<>
			<Header text="Liquid & Gas Pressure Systems" />
			<Container>
				<ServiceHome text="Liquid & Gas Pressure Systems" />
				<DetailDiv>
					<Div>
						<ImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/DSC_4174.png" />
						</ImgDiv>
						<ProductLayout
							text={<div> When you need to boost the pressure of compressed air, liquids or gasses (such as hydrogen, oxygen or argon), Airline is your trusted source. We provide custom-designed Haskel pressure systems for a wide range of applications. Airline engineers will custom design and build turnkey booster packages including the following integrated components:
								<ul>
									<li>Haskel Air Pressure Amplifier, Liquid Pump or Gas Booster</li>
									<li>Inlet and Drive Air Controls</li>
									<li>Safety Relief Valves</li>
									<li>Inlet and Outlet Gauges</li>
									<li>Roll Bar Frame Made of Painted Steel or Stainless Steel</li>
								</ul>
                                You can count on us for fast delivery of all Haskel components or customized turnkey systems, as well as high-pressure valves and fittings (for pressures up to 100,000 psi) from Haskel’s sister company, BuTech. We also offer installation and repair on allHaskel components and systems.
							</div>}
						/>
					</Div>
					<Div>
						<ProductLayout
							title="Air pressure amplifiers"
							text={<div>
                                Haskel Air Amplifiers offer an alternative to purchasing dedicated high-pressure compressors. They are compact, require no electrical or mechanical drive connections, are powered by the same air they amplify and can be mounted in any position. Key features include:
								<ul>
									<li>Infinitely variable outlet pressure and flow capability</li>
									<li>No heat, flame or spark risk</li>
									<li>No air line lubrication required - eliminates oily exhaust</li>
									<li>Long seal life with easy maintenance</li>
									<li>Wide range of models, controls and options</li>
									<li>Wide range of standard and custom systems</li>
								</ul>
							</div>}
						/>
						<ImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/Haskel%20Air%20Amplifier%20aad-2.png" />
						</ImgDiv>
					</Div>
					<Div>
						<ImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/Haskel%20Liq%20Pump%20Cover.png" />
						</ImgDiv>
						<ProductLayout
							title="Air-driven liquid pumps"
							text={<div>
                                Air Driven Pumps are used industrially to pump a wide variety of liquids, handling a consistency range from thin and viscous to thick slurries. The pumps are ideal when flammable gas is present, requiring no electricity to work and delivering constant flow and a consistently high pressure. Liquids handled include, but are not limited to – petroleum based oils, water, diesel fuel, most phosphate-ester based fire-resistant hydraulic fluids, petroleum based solvents, Skydrol and Aerosafe fluid, deionized water and demineralized water.
							</div>}
						/>
					</Div>
					<Div>
						<ProductLayout
							title="Air & hydraulic-driven gas boosters"
							text={<div>
                                Haskel Gas Boosters are used to clean and boost the pressures — up to 39,000 psi (2690 bar) — of most types of gas, such as oxygen, argon and hydrogen. A Gas Booster eliminates the need for potentially more costly gas stored in higher-pressure supply cylinders. Instead, you will be able to boost gas repeatedly to the required pressures in a safe, reliable manner, with no heat, flame or spark risk. Gas Boosters are ideal for increasing gas pressure, transferring high-pressure gas, charging cylinders and scavenging. Key features include:
								<ul>
									<li>Air driven - no electricity required</li>
									<li>No airline lubricator required</li>
									<li>Hydrocarbon free - separation between air and gas sections</li>
									<li>Pressures to 39,000 psi (2690 bar)</li>
									<li>Wide range of models</li>
									<li>Built-in-cooling on most models</li>
									<li>Easy-to-use automatic controls</li>
									<li>Standard and custom systems available</li>
								</ul>
							</div>}
						/>
						<ImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/AG-50%20Gas%20Booster.png" />
						</ImgDiv>
					</Div>
				</DetailDiv>
			</Container>
		</>
	)
}
