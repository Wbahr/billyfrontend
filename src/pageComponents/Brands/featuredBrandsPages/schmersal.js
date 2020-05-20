import React from 'react'
import styled from 'styled-components'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import FeaturedBrandLogo from '../uiComponents/FeaturedBrandLogo'
import H1 from '../uiComponents/H1'
import BrandDetail from '../uiComponents/BrandDetail'
import ShopProductBtn from '../uiComponents/ShopProductBtn'
import SectionHeader from '../uiComponents/SectionHeader'
import ProductItems from '../uiComponents/ProductItems'
import Articles from '../uiComponents/Articles'
import Videos from '../uiComponents/Videos'
import RelatedLink from '../uiComponents/RelatedLink'

const Container = styled.div`
	display: flex;
	max-width: 1200px;
	width: 100%;
	flex-wrap: wrap;
	margin: 0 auto;
	`
const ArticlesDiv = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
`
const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
`
const RelatedLinkDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 220px;
	margin: 20px 0;
`

export default function Schmersal() {

	return (
		<>
			<FeaturedBrandLogo src="https://www.airlinehyd.com/customer/aihyco/images/schmersal.jpg" />
			<Container>
				<H1 text="Schmersal"
				/>
				<BrandDetail
					text=" 
					Safety requirements for workers in almost all industries have evolved to ensure that safety in the workplace is no longer an option. Government organizations around the world have made worker safety a priority for companies which has drawn even greater attention to the topic of safety. The latest product developments from the Schmersal Group have focused on advanced safety systems designed to satisfy the most current safety standards and regulations."
				/>
				<ShopProductBtn
					text="Shop for Schmersal Products"
				/>
				<SectionHeader
					text="Products" />
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/compact-safety-rated-limit-switches.png"
					title="Compact Safety-Rated Limit Switches"
					text="Compact safety-rated limit switches are for determining the position of movable machine components or machine guards that can be moved laterally or rotated. The compact body allows these to be used in confined spaces to monitor the position or presence of moving parts, work pieces, or conveyed materials."
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/safety-interlock.png"
					title="Safety Interlock Switches"
					text="Protects operators by not allowing a machine to start without having all switches in place closed and also powers off the machine if any switches are tripped."
					reverse
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/emergency-stop.png"
					title="Emergency Stop Pushbuttons"
					text="Command devices are of great importance for the man-machine interface in the area of industrial applications. For example, they are mounted in switch-boards, control panels, two-hand control panels, in lift manufacture and on materials-handling plants, including conveyors. Manual actuation of the devices starts operating sequences and functional processes or serves to bring these to an end."
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/safety-light-curtains.png"
					title="Safety Light Curtains"
					text="Optoelectronic safety devices are used as entry, danger point or danger zone guards. Safety light grids and light curtains can be integrated into the safety concept of the machine or plant even under tight space conditions by virtue of their very compact design. These safety devices are also often used on presses to guard danger points or zones. Depending on the particular resolution of the safety light grids and curtains, protection of persons, hands or even fingers can be provided."
					reverse
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/safety-mats.png"
					title="Safety Mats and Edges"
					text="Actuated by physical contact, tactile safety monitoring devices stop the hazardous movement. The diversity of applications requires constructively different devices."
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/enabling-devices.png"
					title="Enabling Devices"
					text="Consent switches are used to protect persons from potentially hazardous situations where machine guards need to be inactivated completely or in part in special operating modes."
					reverse
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/door-handle-actuator.png"
					title="Door-handle Actuator"
					text="The operator does not have to press a button on an external switching plate when the solenoid interlock at a safety guard needs to be unlocked. The switching function is now exactly where it is needed: On the safety door handle which is used to open the safety guard."
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/switches.png"
					title="Switches"
					text="Switches are used to give signals to start machines and to open or close electrically driven doors, gates and barriers.
					The pull-wire switches are manually operated by pulling."
					reverse
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/safety-monitoring-relays.png"
					title="Safety Monitoring Relays"
					text="Suitable for signal processing of potential-free outputs, e.g. emergency stop command devices, position switches and solenoid interlocks."
				/>
				<ProductItems
					src="https://www.airlinehyd.com/customer/aihyco/images/programmable-safety-controllers.png"
					title="Programmable Safety Controllers"
					text="Safety controllers are connected between machine guarding devices such as keyed interlocks, non-contact sensors, light curtains, etc. and the machine’s stop control elements such as a motor contactor or control relay. These controllers contain redundant, self-checking monitoring circuits and positive-guided relays and/or solid state outputs. Each is designed to detect faults in the safety system’s components and interconnection wiring, and their own internal monitoring circuits and output."
					reverse
				/>
				<SectionHeader
					text="Articles & Videos" />
				<ArticlesDiv>
					<Articles
						src="https://www.schmersalusa.com/typo3temp/_processed_/6/9/csm_Holding_device_9f4159811f.jpg"
						text="Safety Light Curtains with Bluetooth interface"
						Link="https://www.schmersalusa.com/news/detail/article/safety-light-curtains-with-bluetooth-interface/"
						detail="AOur SLC440 safety light curtains are now available with an integrated Bluetooth interface for data sharing with smartphones & tablets.
						Schmersal is introducing a Bluetooth interface in our Safety Light Curtains, as a standard feature, starting in March 2020 with our multifunctional SLC440 series."
					/>
					<Articles
						src="https://www.schmersalusa.com/typo3temp/_processed_/1/f/csm_OPC_2020_323b13a15f.jpg"
						text="New online product catalog"
						Link="https://www.schmersalusa.com/news/detail/article/new-online-product-catalog/"
						detail="Always available. Always up-to-date.
						The new Online Product Catalog offers a modern design which corresponds to the design of schmersalusa.com. It mirrors the previous catalog structure and provides user-friendly search and selection functions."
					/>

					<Articles
						src="https://www.schmersalusa.com/typo3temp/_processed_/a/5/csm_GatekeeperJAN20_890698ba57.jpg"
						text="The Gatekeeper: January 2020"
						detail="Check out the latest edition of the Gatekeeper Newsletter. This edition focuses on new innovations for 2020"
						Link="https://www.schmersalusa.com/news/detail/article/the-gatekeeper-january-2020/"
					/>
				</ArticlesDiv>
				<VideoDiv>
					<Videos
						src="https://www.youtube.com/embed/PQ8yhMwIMM4"
					/>
					<Videos
						src="https://www.youtube.com/embed/0mZ3CR3JutU"
					/>
					<Videos
						src="https://www.youtube.com/embed/PPjD-j23fzg"
					/>
				</VideoDiv>
				<SectionHeader
					text="Related Links" />
				<RelatedLinkDiv>
					<RelatedLink
						href="https://www.schmersalusa.com/home/"
						text="Schmersal's Website"
						icon="globe-americas"
					/>
					<RelatedLink
						href="#"
						text="Shop Schmersal Products"
						icon="shopping-cart"
					/>
					<RelatedLink
						href="https://www.youtube.com/channel/UCSf8lW819WMJNH2Ga5JCnfA"
						text="Videos"
						icon={faYoutube}
					/>
					<RelatedLink
						href="#"
						text="Schmersal Catalogs"
						icon="address-book"
					/>
				</RelatedLinkDiv>
			</Container>
		</>
	)
}