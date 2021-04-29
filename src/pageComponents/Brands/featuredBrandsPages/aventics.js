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

export function aventics() {
    const description = 'Aventics, formerly Bosch Rexroth Pneumatics, provides pneumatic, electro-pneumatic, and ' +
        'electronic products for industrial automation, oilfield, mobile and marine applications. Aventics has a ' +
        'sophisticated and extensive product line, offering standard products in both NPT and ISO G (BSPP) port ' +
        'configurations, as well as application-specific custom product solutions. Products include pneumatic valves ' +
        'and actuators, pneumatic and hydraulic cylinders, pneumatic fieldbus valve manifolds, electro-pneumatic valves ' +
        'and positioners, FRLs, tubing and fittings, vacuum components, industrial shock absorbers and tooth chain products.'

    return (
        <>
            <Helmet>
                <title>Aventics Authorized Distributor | Airline Hydraulics</title>
                <meta name="description" content="Shop online for Aventics products from Airline Hydraulics, an authorized distributor. Find products and information on air cylinders, air prep equipment, valves, electro-pneumatic valves, and pneumatic accessories."/>
            </Helmet>
            
            <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Aventics.png" />
            <Container>
                <H1 text="Aventics"/>
                <BrandDetail
                    text={description}
                />
                <ShopProductBtn
                    searchTerm="Aventics"
                    text="Shop Products"
                />
                <SectionHeader
                    text="Products"
                />
                <ProductItems
                    searchTerm="Aventics"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Aventics/air-cylinders.png"
                    text="NFPA steel air cylinders, rodless shuttle cylinders, round mini cylinders, aluminum cylinders, stainless steel cylinders and compact cylinders. Construction grade (cast iron) and multi-position air cylinders normally used for mobile/construction and oilfield applications, mounting bracket kits for mating to SUNSTRAND pumps."
                    title="Air Cylinders"
                />
                <ProductItems
                    searchTerm="Aventics"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Aventics/air-prep.png"
                    title="Air Prep Equipment"
                    text=" Filters, regulators and lubricators with NPT or G(ISO) BSPP ports, as well as lockout valves, slow start valves and anti-freezer units."
                    reverse
                />
                <ProductItems
                    searchTerm="Aventics"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Aventics/valves.png"
                    title="Valves"
                    text="Pneumatic directional control valves, choose from in-line valves, manual / mechanical valves, plug-in valve manifold systems or traditional valve manifold systems. AVENTICS pneumatic valves for oilfield and mobile applications have been the industry leader for decades due to their rugged, proven reliability and precise control. Graduated pneumatic pressure delivery, most often used for mobile, oilfield and marine application."
                />
                <ProductItems
                    searchTerm="Aventics"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Aventics/electrical.png"
                    title="Electrical Products"
                    text="AVENTICS electro-pneumatic (E/P) pressure control valves offer industry leading performance. The converter valves provide graduated pneumatic pressure outputs directly proportional to analog electrical signal inputs (voltage or current). AVENTICS pneumatic valves for oilfield and mobile applications have been the industry leader for decades due to their rugged, proven reliability and precise control. Graduated pneumatic pressure delivery, most often used for mobile, oilfield and marine application."
                    reverse
                />
                <ProductItems
                    searchTerm="Aventics"
                    src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Aventics/pneumatic.png"
                    title="Pneumatic Accessories"
                    text="Accessory air valves and devices such as flow control valves and quick exhaust valves, plus part present sensing, air gauges, timing volumes, shock absorbers, fittings and air line tubing."
                />
                <SectionHeader
                    text="Articles & Videos"
                />
                <ArticlesDiv>
                    <Articles
                        src="https://www.aventics.com/media/_processed_/5/5/Landingpage-ib_140d01280c.jpg"
                        text="The Internet of Things"
                        link="https://www.aventics.com/us/en/industries-trends/top-trends-and-topics/industry-40-iot/"
                        detail="Intelligent pneumatic systems build bridges to the Internet of Things, ensure system availability, and lower operating costs thanks to central analysis and control electronics."
                    />
                    <Articles
                        src="https://www.aventics.com/media/_processed_/3/e/ES05_-_the_simple_solution_for_elementary_pneumatics_6319ac1552.jpg"
                        text="ES05 – the simple solution for elementary pneumatics"
                        link="https://www.aventics.com/us/en/pneumatics-shop/single-valves-pgr.256154"
                        detail="ES05 is a valve system that has been designed especially for standard pneumatics applications and industrial automation. Simple, flexible and efficient – without bells and whistles. "
                    />

                    <Articles
                        src="https://www.aventics.com/media/AVENTICS_USA/Expertise/Trends_topics/IoT/SPA_250wide.jpg"
                        text="It’s that easy: AVENTICS supplies pneumatics at the press of a button"
                        detail="You are the center of our attention. We offer fast results and reliable, simple solutions for industrial pneumatics. Based on our many years of expertise, we develop customized products for your applications, tailored to your needs and delivered just in time. Our service: We are at your service at the press of a button! Our ambition is being the smart pneumatic company that is easy to do business with: It’s that easy."                      
                    />
                </ArticlesDiv>

                <VideoDiv>
                    <Videos
                        src="https://www.youtube.com/embed/_r27LoChqMA"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/sILf43yMi3c"
                    />
                    <Videos
                        src="https://www.youtube.com/embed/H9slLX3o3KQ"
                    />
                </VideoDiv>
                <SectionHeader
                    text="Related Links"
                />
                <RelatedLinkDiv>
                    <RelatedLink
                        href="http://www.aventics.us/en/homepage/"
                        text="Aventics's Website"
                        icon="globe-americas"
                    />
                    <RelatedLink
                        searchTerm="Aventics"
                        text="Shop Aventics Products"
                        icon="shopping-cart"
                    />
                    <RelatedLink
                        href="http://www.aventics.us/en/homepage/"
                        text="Videos"
                        icon={faYoutube}
                    />
                    <RelatedLink
                        href="/pages/resources/catalog-request"
                        text="Aventics Catalogs"
                        icon="address-book"
                    />
                </RelatedLinkDiv>
            </Container>
        </>
    )
}