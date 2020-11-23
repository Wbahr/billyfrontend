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
const Span = styled.span`
	font-weight: bold;
`
export default function Rexroth() {

	return (
		<>
			<FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Rexroth-Logo_RGB.png" />
			<Container>
				<H1 text="Bosch Rexroth"
				/>
				<BrandDetail
					text="Bosch Rexroth is the world leader in the drive, motion and control technologies that power today’s most advanced manufacturing systems. We carry the full line of products from each of Bosch Rexroth’s technology areas: Industrial and Mobile Hydraulics, Pneumatics, Aluminum Structural Framing, Linear Motion Technologies and Electric Drives and Controls."
				/>
				<ShopProductBtn
					text="Shop Products"
				/>
				<SectionHeader
					text="Products" />
				<ProductItems
					src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Rexroth/industrial-hydraulics.png"
					title="Industrial & Mobile Hydraulics"
					text="Bosch Rexroth’s Industrial Hydraulics Division offers product solutions for the most demanding industrial applications, such as chemical processing plants, power and environmental engineering, automotive engineering, plastics processing machinery, paper industry, presses, test rigs and simulation systems, marine engineering, offshore engineering, civil/water engineering, transportation technology and machine tools. Their Mobile Hydraulics Division has a wide range of products to meet the needs of agriculture, construction, forestry, mining and oilfield applications."
					additionalText={<div>
						<ul>
							<li><Span>Pumps and Motors</Span> - Choose from bent axis, swashplate, gear, vane and radial pumps and bent axis, external gear, swashplate and vane motors. For mobile applications choose from axial piston units, external gear units or radial piston units.</li>
							<li><Span>Cylinders</Span> - Rexroth offers you a range of hydraulic cylinders conforming to NFPA, ISO, and DIN standards and 100% tested to Rexroth standards. Choose from tie rod (for operating pressures up to 3000 psi), mill type (operate up to 5000 psi continuously) or servo cylinders.</li>
							<li><Span>Valves</Span> - Bosch Rexroth offers a full array of hydraulic control valves for industrial applications, and is a full line supplier of directional (spool and poppet), pressure, flow, check, logic cartridges, "sandwich" (modular), and cartridge type valves. In addition to their standard valves, Bosch Rexroth offers the widest variety and range of proportional and servo valves, including proportional directional control, proportional relief, proportional pressure reducing, proportional flow control, proportional throttle valves and electrohydraulic servo valves.</li>
							<li><Span>Mobile Controls</Span> - Bosch Rexroth offers both standard mobile hydraulic control valves and customized solutions, including control blocks, mobile valves, pilot control devices, power brakes, steering units, central hydraulic valve components and electrohydraulic hitch controls.</li>
							<li><Span>Other Components & Solutions</Span> -For industrial applications, Rexroth offers customized manifolds, hydraulic power units and power packs, electronics, accumulators, filters and accessories. For mobile applications, count on Bosch Rexroth for compact hydraulic valve and control solutions, gear drives, mobile electronics, filters, accumulators and more</li>
						</ul>
					</div>}
				/>
				<ProductItems
					src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
					title="Aluminum Structural Framing & Assembly"
					text="Save time and money building complex guarding, machine frames, workstations and more with the simple bolt-together construction of Bosch Rexroth extruded aluminum. This high-quality structural framing material is as durable as steel, but much easier to assemble, reconfigure, and reuse. With Bosch Rexroth aluminum structural framing, there’s no welding, no painting and no waiting. It goes together quickly and can easily be modified for reuse if your requirements change. Look to Airline for fast delivery of the widest range of profile shapes, accessories, and connectors, available for every application and load requirement:"
					additionalText={<div>
						<ul>
							<li>A wide range of high-strength, anodized aluminum extrusions for every application and load requirement.</li>
							<li>Dozens of different connectors are designed to satisfy a variety of strength, ease-of-assembly and aesthetic requirements.</li>
							<li>Our broad selection of accessories enables us to add flexibility, movement, and utility to your application.</li>
							<li>EcoShape tubular framing</li>
							<li>Rexroth’s Manual Production Systems (MPS) accessories for fast setup of lean manufacturing systems and ergonomic workstations.</li>
							<li>TS assembly conveyors, VarioFlow chain conveyors, manual transfer elements and rollerbars</li>
							<li>A huge inventory of framing, connectors and accessories</li>
							<li>Complete CAD design</li>
							<li>Manufacturing options : </li>
							<ul>
								<li>Materials supplied in pre-machined kit form</li>
								<li>Fully assembled structures/systems</li>
							</ul>
							<li>Installation</li>
						</ul>
					</div>}
					reverse
				/>
				<ProductItems
					src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
					title="Linear Motion Technologies"
					text={<div>
						<p>Bosch Rexroth offers a full array of linear motion products to fit your specific automation needs. Choose from:</p>
						<ul>
							<li><Span>Ball Transfer Units</Span> - Various designs with load capacities of up to 25,000 N. Ball transfer units make light work of shifting, turning and guiding unitized loads.</li>
							<li><Span>Linear Bushings and Shafts</Span> - Available in inch & metric, standard linear bushings are made entirely of solid metal and are especially suited for applications requiring a rugged construction and a high degree of insensitivity to dirt. Long service life, precision and high efficiency are the classical features characterizing these guide elements.</li>
							<li><Span>Linear Modules & Cartesian Systems</Span> - Available with a ball screw and belt drive in lengths up to 12m, precision systems down to 26mm high and high capacity systems up to 68,000N moving load.</li>
						</ul>
					</div>}
					additionalText={<div>
						<ul>
							<li><Span>Profiled Rail Systems</Span> - Including Ball Rail®, miniature Ball Rail® and Roller Rail Systems</li>
							<li><Span>Ball Screw</Span> - Available from sizes 6mm up to 80mm diameters.</li>
							<li><Span>Planetary Screw Assemblies</Span> - Designed to provide higher thrust loads quietly, efficiently, cleanly, and with a high degree of repeatability and precision than comparable drive solutions of similar sizes.</li>
							<li><Span>Tychoway® Linear Roller Bearings</Span> - – Includes the original Tychoway® Inch Series; Spring Pad (for dynamic preload); Tycho-Gibb (for static preload and height adjustment) and Tycho II Inch Series.</li>
						</ul>
					</div>}
				/>
				<ProductItems
					src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Rexroth/electric-drives-and-controls.png"
					title="Electric Drives and Controls"
					text={<div>
						<p>Put the world’s most comprehensive, state-of-the-art drive, control and machine automation products to work for you. Enhance machine control, improve flexibility and efficiency, and increase energy efficiency with individual products and complete industrial automation systems. We offer the following drive and control system solutions from Rexroth:</p>
						<ul>
							<li><Span>CNC Systems</Span> - Choose from IndraMotion MTX micro, IndraMotion MTX standard, IndraMotion MTX performance or IndraMotion MTX advanced systems.</li>
							<li><Span>Drive Systems</Span> - Rexroth’s portfolio of drive technology includes:</li>
							<ul>
								<li>IndraDrive machine drive systems provide the intelligent drive electronics to satisfy the demands of complex single and multi-axis production systems.</li>
								<li>IndraMotion MLD combines motion and PLC functions to form a modern open automation platform for modular machine designs.</li>
								<li>IndraDriveMicombines an electronic control system and servo motor in one ultra-compact unit.</li>
								<li>Variable Frequency Drives, such as IndraDrive Fc, are economical and easy to use.</li>
							</ul>
						</ul>
					</div>}
					additionalText={<div>
						<ul>
							<li><Span>HMIs</Span> - The Rexroth IndraControl V HMI series offers operator panels, embedded PC panels, and a wide range of PC-based HMIs and industrial PCs to enhance operator control and manufacturing productivity. Rexroth’s IndraControl VSP/VPP series of PC-Based HMIs provide the full power of a PC with extra features to increase reliability, all in a smaller footprint.</li>
							<li><Span>I/O Systems</Span> - Choose from Rexroth Inline IP20, Fieldline IP67 or IndraControl Enhanced Fieldline components</li>
							<li><Span>Motors and Gearboxes</Span> - Choose from Rexroth IndraDynA asynchronous servo motors, IndraDyn H high speed synchronous motors, IndraDyn L linear motors, IndraDyn S synchronous servo motors, or IndraDyn T torque motors. Rexroth also offers standard (GTE) and high-performance (GTM) planetary gearboxes for servo motors.</li>
							<li><Span>PAC/Combined Motion-Logic Systems</Span> - In addition to their robust set of industry-specific platforms, Rexroth offers their controller-based IndraMotion MLC motion/logic system to satisfy the diverse cost, engineering and motion control and logic requirements across multiple industries.</li>
							<li><Span>PLCs</Span> - Bosch Rexroth IndraLogic PLC systems, in conjunction with Rexroth's IndraControl platform and the innovative IndraWorks engineering framework enable users to get customized PLC systems for their automation concepts.</li>
							<li><Span>Cables, Connectors, Firmware, Software and a Suite of Safety Features</Span> - Rexroth has all of the elements you need to build complete, safe machine automation solutions.</li>
						</ul>
					</div>}
					reverse
				/>
				<SectionHeader
					text="Articles & Videos" />
				<ArticlesDiv>
					<Articles
						src="https://dc-us.resource.bosch.com/media/us/press_release/2020_1/ma20002/MA20002-Rexroth-Piston-Gear-Pump_IMAGE_w176.jpg"
						text="Bosch Rexroth Launches Piston-Gear Pump Assembly with Common Suction Port"
						Link="https://www.boschrexroth.com/en/web/us/company/press/press-details-49216"
						detail="New tandem pump configuration simplifies design and installation of combined axial/gear pump systems to save space on mobile machines
						"
					/>
					<Articles
						src="https://dc-us.resource.bosch.com/media/us/press_release/2020_1/ma20014/MA20014-Rexroth-MCR8T_IMAGE_w176.jpg"
						text="The new MCR8T radial piston motor from Rexroth"
						Link="https://www.boschrexroth.com/en/web/us/company/press/press-details-49344"
						detail="As end-users demand ever higher performance from their CTLs, Rexroth has called upon its decades of industry experience and continued innovation to produce their most advanced track motor yet."
					/>

					<Articles
						src="https://dc-us.resource.bosch.com/media/us/press_release/2020_1/ma20015/MA20015-Rexroth-RM10-RM15_LSValves_IMAGE_w176.png"
						text="Bosch Rexroth launches new load sensing valves"
						detail="The RM10 and RM15 are easy to configure, compact, general purpose, multi-application valves fit for use in today’s mobile machines"
						Link="https://www.boschrexroth.com/en/web/us/company/press/press-details-49280"

					/>
				</ArticlesDiv>
				<VideoDiv>
					<Videos
						src="https://www.youtube.com/embed/N6j_0hKHAOU"
					/>
					<Videos
						src="https://www.youtube.com/embed/Pwlelk8bzyE"
					/>
					<Videos
						src="https://www.youtube.com/embed/jMwEhY8O8ik"
					/>
				</VideoDiv>
				<SectionHeader
					text="Related Links" />
				<RelatedLinkDiv>
					<RelatedLink
						href="https://www.boschrexroth.com/en/us/"
						text="Rexroth's Website"
						icon="globe-americas"
					/>
					<RelatedLink
						href="#"
						text="Shop Rexroth Products"
						icon="shopping-cart"
					/>
					<RelatedLink
						href="https://www.youtube.com/user/BoschRexrothGlobal"
						text="Videos"
						icon={faYoutube}
					/>
					<RelatedLink
						href="#"
						text="Rexroth Catalogs"
						icon="address-book"
					/>
				</RelatedLinkDiv>
			</Container>
		</>
	)
}