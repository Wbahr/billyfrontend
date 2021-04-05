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
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/schmersal.png" />
            <Container>
                <H1 text="Schmersal"/>
                <BrandDetail
                    text=" 
					Safety requirements for workers in almost all industries have evolved to ensure that safety in the workplace is no longer an option. Government organizations around the world have made worker safety a priority for companies which has drawn even greater attention to the topic of safety. The latest product developments from the Schmersal Group have focused on advanced safety systems designed to satisfy the most current safety standards and regulations."
                />
                <ShopProductBtn
                    searchTerm="Schmersal"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/compact-safety-rated-limit-switches.png"
                    title="Compact Safety-Rated Limit Switches"
                    text="Compact safety-rated limit switches are for determining the position of movable machine components or machine guards that can be moved laterally or rotated. The compact body allows these to be used in confined spaces to monitor the position or presence of moving parts, work pieces, or conveyed materials."
                    learnMoreLink="/search?searchTerm=Compact%20Safety-Rated%20Limit%20Switches&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/safety-interlock.png"
                    title="Safety Interlock Switches"
                    text="Protects operators by not allowing a machine to start without having all switches in place closed and also powers off the machine if any switches are tripped."
                    learnMoreLink="/search?searchTerm=Schmersal%20Safety%20Interlock%20Switches&sortType=relevancy&resultPage=1"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/emergency-stop.png"
                    title="Emergency Stop Pushbuttons"
                    text="Command devices are of great importance for the man-machine interface in the area of industrial applications. For example, they are mounted in switch-boards, control panels, two-hand control panels, in lift manufacture and on materials-handling plants, including conveyors. Manual actuation of the devices starts operating sequences and functional processes or serves to bring these to an end."
                    learnMoreLink="/search?searchTerm=Schmersal%20Emergency%20Stop%20Pushbuttons&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/safety-light-curtains.png"
                    title="Safety Light Curtains"
                    text="Optoelectronic safety devices are used as entry, danger point or danger zone guards. Safety light grids and light curtains can be integrated into the safety concept of the machine or plant even under tight space conditions by virtue of their very compact design. These safety devices are also often used on presses to guard danger points or zones. Depending on the particular resolution of the safety light grids and curtains, protection of persons, hands or even fingers can be provided."
                    learnMoreLink="/search?searchTerm=Schmersal%20Safety%20Light%20Curtains&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/safety-mats.png"
                    title="Safety Mats and Edges"
                    text="Actuated by physical contact, tactile safety monitoring devices stop the hazardous movement. The diversity of applications requires constructively different devices."
                    learnMoreLink="/search?searchTerm=Schmersal%20Safety%20Mats%20and%20Edges&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/enabling-devices.png"
                    title="Enabling Devices"
                    text="Consent switches are used to protect persons from potentially hazardous situations where machine guards need to be inactivated completely or in part in special operating modes."
                    learnMoreLink="/search?searchTerm=Schmersal%20Enabling%20Devices&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/door-handle-actuator.png"
                    title="Door-handle Actuator"
                    text="The operator does not have to press a button on an external switching plate when the solenoid interlock at a safety guard needs to be unlocked. The switching function is now exactly where it is needed: On the safety door handle which is used to open the safety guard."
                    learnMoreLink="/search?searchTerm=Schmersal%20Door-handle%20Actuator&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/switches.png"
                    title="Switches"
                    text="Switches are used to give signals to start machines and to open or close electrically driven doors, gates and barriers.
					The pull-wire switches are manually operated by pulling."
                    learnMoreLink="/search?searchTerm=Schmersal%20Switches&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                    reverse
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/safety-monitoring-relays.png"
                    title="Safety Monitoring Relays"
                    text="Suitable for signal processing of potential-free outputs, e.g. emergency stop command devices, position switches and solenoid interlocks."
                    learnMoreLink="/search?searchTerm=Schmersal%20Safety%20Monitoring%20Relays&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                />
                <ProductItems
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Schmersal/programmable-safety-controllers.png"
                    title="Programmable Safety Controllers"
                    text="Safety controllers are connected between machine guarding devices such as keyed interlocks, non-contact sensors, light curtains, etc. and the machine’s stop control elements such as a motor contactor or control relay. These controllers contain redundant, self-checking monitoring circuits and positive-guided relays and/or solid state outputs. Each is designed to detect faults in the safety system’s components and interconnection wiring, and their own internal monitoring circuits and output."
                    learnMoreLink="/search?searchTerm=Schmersal%20Programmable%20Safety%20Controllers&sortType=relevancy&nonweb=false&brands=Schmersal%20Inc&resultPage=1"
                    reverse
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.schmersalusa.com/typo3temp/assets/_processed_/2/3/csm_SD-Bus-40_Inside_01_fe0d07780b.jpg"
                        text="SD-BUS 4.0 FROM SCHMERSAL NOMINATED FOR THE AUTOMATION AWARD"
                        Link="https://www.schmersalusa.com/news/detail/article/sd-bus-40-from-schmersal-nominated-for-the-automation-award/"
                        detail="The SD-Bus 4.0, an innovative safety solution from Schmersal, has been nominated for the Automation Award 2020 from German Konradin Verlag /  publishing house in the section DIGITALIZATION. Voting is now possible online until Thursday, November 26, 2020 – the publishing house will announce the winners immediately afterwards."
                    />
                    <Articles
                        src="https://www.schmersalusa.com/typo3temp/assets/_processed_/6/b/csm_SLC_BLE_300x250_94141a981b.jpg"
                        text="2021 ENGINEERS' CHOICE AWARD - HONORABLE MENTION"
                        Link="https://www.schmersalusa.com/news/detail/article/2021-engineers-choice-award-honorable-mention/"
                        detail="Safety Light Curtain with Bluetooth interface from Schmersal has received Honroable Mention in the Control Engineering 2021 Engineers’ Choice Awards, in the category: Safety – Machine Safety. "
                    />

                    <Articles
                        src="https://www.schmersalusa.com/typo3temp/assets/_processed_/f/a/csm_Logo_AA20_2020_DIGITALIZATION_Platz3_01_cbc12106ee.jpg"
                        text="SCHMERSAL AMONG THE WINNERS OF THE AUTOMATION AWARD 2020"
                        detail="The SD-Bus 4.0, an innovative safety solution from Schmersal, is one of the winners of the Automation Award 2020 from the German publishing house Konradin  in the DIGITALIZATION category."
                        Link="https://www.schmersalusa.com/news/detail/article/schmersal-among-the-winners-of-the-automation-award-2020/"
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
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="https://www.schmersalusa.com/home/"
                        text="Schmersal's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        href="/search?searchTerm=Schmersal"
                        text="Shop Schmersal Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/channel/UCSf8lW819WMJNH2Ga5JCnfA"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Schmersal Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}