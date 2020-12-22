import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../pageComponents/_common/header'
import EngineerSystemsServices from './uiComponents/engineerSystemsServices'
import SubDetail from './uiComponents/subDetail'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Div = styled.a`
    display: flex;
    width: 600px;
    margin: 20px;
    &:hover{
        text-decoration: none; 
    }   
`
const ServiceDiv = styled.div`
    display: flex;
    margin: 20px 0;
    flex-wrap: wrap;
`
const ServiceHomepageDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`
const ServiceHomepage = styled.a`
    margin: 0 8px;
    font-size: 14px;
    font-weight: bold;
    color: #555555;
`
export default function engineeredSystemsAndAssemblies() {
	return (
		<>
			<Header text="Engineered Systems & Assemblies" />
			<Container>

				<SubDetail
					text="No matter your requirement - integrated component sub-assemblies or fully-engineered customized system - you can rely on Airline to deliver an innovative solution and unmatched customer service. We pride ourselves on satisfying our customers with best-in-class prodcuts built through our dedicated team of experienced sales engineers, system engineers and assembly technicians, in our ISO 9001:2015 certified facilities."
				/>

				<ServiceDiv>
					<Div href="/services/engineered-systems-and-assemblies/hydraulic-engineered-systems" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/EngineeredSystems1Mobile.png"
							title="Hydraulic Engineered Systems"
							text="We design and manufacture power units and other hydraulic systems and assemblies."
						/>
					</Div>
					<Div href="/services/engineered-systems-and-assemblies/lubrication-systems" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/EngineeredSystems2Mobile.png"
							title="Lubrication Systems"
							text="We design automated lubrication systems to increase component life and refuce repairs."
						/>
					</Div>
					<Div href="/services/engineered-systems-and-assemblies/automation-engineered-systems" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/EngineeredSystems3.png"
							title="Automation Engineered Systems"
							text="We design, build and program automation systems for precise and reliable performance."
						/>
					</Div>
					<Div href="/services/engineered-systems-and-assemblies/liquid-and-gas-pressure-systems" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/liquid-and-gas.png"
							title="Liquid & Gas Pressure Systems"
							text="We provide custom-designed pressure boosting systems for a wide range of applications."
						/>
					</Div>
					<Div href="/services/engineered-systems-and-assemblies/structural-framing-systems" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/structural-framing.png"
							title="Structural Framing Systems"
							text="We custom-build workstations, enclosures, machine bases, scaffolding and more."
						/>
					</Div>
					<Div href="/services/engineered-systems-and-assemblies/sub-assemblies" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/EngineeredSystems6.png"
							title="Sub-Assemblies"
							text="Airline can supply your finished components, pre-assembled and ready to use."
						/>
					</Div>
					<Div href="/services/engineered-systems-and-assemblies/hose-assemblies" targer="_blank">
						<EngineerSystemsServices
							src="https://airlinemedia.airlinehyd.com/Static_pages/services/engineered-systems/EngineeredSystems7.png"
							title="Hose Assemblies"
							text="Our hose fabrication shops build assemblies based on your unique parameters."
						/>
					</Div>
				</ServiceDiv>
			</Container>
		</>
	)
}
