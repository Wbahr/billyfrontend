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
import { Helmet } from 'react-helmet'

const Container = styled.div`
	display: flex;
	max-width: 1200px;
	width: 100%;
	flex-wrap: wrap;
	margin: 0 auto;
    padding: 0 5px;
	`
const ArticlesDiv = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
`
const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 100%;
`
const RelatedLinkDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	margin: 20px 0;
`

export function orientalmotor() {
    const description = 'Oriental Motor manufactures a wide range of motion control products including; stepper motors ' +
        'and drivers, servo motors, brushless DC motors, fractional HP AC motors, linear and rotary actuators, and ' +
        'cooling fans. Since its founding in 1885, Oriental Motor has been providing the optimal motion systems as part ' +
        'of their total service, to meet the widest market demands. Oriental Motor offers an extensive product line of ' +
        'about 50,000 products that provide the optimal motion system solutions.'

    return (
        <>
            <Helmet>
                <title>Oriental Motor Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Oriental Motor products from Airline Hydraulics, a leading distributor. Find products and information on stepper motors, cooling fans, and AC motors."/>
            </Helmet>
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/oriental-motor.png" />
            <Container>
                <H1 text="Oriental Motor"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Oriental Motor"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    brand="Oriental Motor Usa Corp"
                    searchTerm="Oriental Motor"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Oriental-motor/stepper-motors.png"
                    text="Stepper motors are used to achieve precise positioning via digital control. The motor operates by accurately synchronizing with the pulse signal output from the controller to the driver. Stepper motors, with their ability to produce high torque at low speed while minimizing vibration, are ideal for applications requiring quick positioning over a short distance."
                    title="Stepper Motors"
                />
                <ProductItems
                    brand="Oriental Motor Usa Corp"
                    searchTerm="Oriental Motor"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Oriental-motor/cooling-fan.png"
                    text="Oriental Motor offers a wide range of cooling fans, including a cooling module suitable for enclosure cooling, axial flow fans for local cooling, as well as fans with low-speed or stall alarms or variable flow type."
                    title="Cooling Fans"
                    reverse
                />
                <ProductItems
                    selectedCategoryId="4264"
                    brand="Oriental Motor Usa Corp"
                    searchTerm="Oriental Motor"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Oriental-motor/ac-motors.png"
                    title="AC Motors"
                    text="Standard AC motors and gear motors operate by simply connecting a capacitor and supplying power from a commercial power supply. Standard AC motors and gear motors include the basic induction motor and reversible motor. In addition, Oriental Motor offers electromagnetic brake motors, synchronous motors, torque motors and watertight, dust-resistant motors to meet specific application requirements."
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/dg2-series-dg-b.jpg"
                        text="New DGII Series Type DG-B Rotary Actuator"
                        detail="Oriental Motor is pleased to announce the introduction of the DG-B horizontal mount type DGII Series rotary actuator.
						The DG-B saves space by having the motor mounted horizontally instead of vertically. It also provides 2nd stage of gearing, allowing for inertial matching or increased torque."
                        link="https://www.orientalmotor.com/company/pr/press-release-03-30-20-dg2-dgb-series.html"
                    />
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/dr-pkp-compact-electric-cylinders-350px.jpg"
                        text="New DR Series Compact Electric Cylinders"
                        detail="Oriental Motor is pleased to announce the introduction of the DR Series, the latest compact electric cylinder motion control products. The DR Series is available with an AZ Series or 2-phase PKP Series base motor."
                        link="https://www.orientalmotor.com/company/pr/press-release-03-23-20-new-dr-series-electric-cylinders.html"
                    />
                    <Articles
                        src="https://airlinemedia.airlinehyd.com/Static_pages/images/articles/ethercat-drivers-top-350px.jpg"
                        text="New AZ Series Drivers Available with DC Input and EtherCAT Communication"
                        detail="Oriental Motor is pleased to announce the latest addition to the AZ Series family of single axis stored data drivers, which now includes AC and DC input. Both input types are available with EtherNet/IP or EtherCAT communication."
                        link="https://www.orientalmotor.com/company/pr/press-release-03-10-20-new-az-series-ethernet-ip_ethercat_drivers.html"
                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/uGDmZ2oyn70"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/FIwupn1eoSo"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/XZzo5xR_P6I"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://orientalmotor.com/"
                        text="Oriental Motor's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Oriental Motor"
                        text="Shop Oriental Motor Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Oriental Motor Catalogs"
                        icon="address-book"
                    />
                    <RelatedLink
                        href="https://www.youtube.com/user/OrientalMotorUSA/featured"
                        text="Videos"
                        icon={faYoutube}
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}