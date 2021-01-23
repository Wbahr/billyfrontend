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

export default function Lincoln() {

  return (
    <>
      <FeaturedBrandLogo src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Brand-logos/Lincoln_SKF_condensed%20RGB%20nobkgrd.jpg" />
      <Container>
        <H1 text="Lincoln"/>
        <BrandDetail
          text="Poor lubrication causes about 36% of all premature bearing failures. But with the right lubrication solution you can increase uptime and productivity. Together, SKF and Lincoln offer the world’s most complete portfolio of lubrication systems and solutions. As an authorized distributor, Airline offers sales, system design, installation, service and repair of SKF and Lincoln lubrication products. Lincoln and SKF’s cost-effective lubrication components and systems can be configured for industrial, mobile, off-road and other applications requiring equipment lubrication at specific intervals to minimize friction and wear and optimize bearing and machinery service life."
        />
        <ShopProductBtn
          searchTerm="Lincoln"
          text="Shop Products"
        />
        <SectionHeader
          text="Products"
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/automatic-lubricators.png"
          text={(
            <div>
              <p>Daily lubrication is a required maintenance practice, vital to the life of the pins and bushings of your machinery. Frequent lubrication maintains the proper lubrication film to reduce wear and purge the pins and bushings of contamination. If rock dust, dirt, sand and water are allowed to work their way into these components, they will form a “grinding compound” that reduces bearing life dramatically. This will cause downtime and higher maintenance costs. Manual lubrication, done properly, can take up to 30 minutes per machine every day. Automatic lubrication systems from SKF/Lincoln optimize this process, reduce maintenance, improve productivity, enhance safety and minimize environmental impact.</p>
              <p>Advantages:</p>
              <ul>
                <li>Significant time and labor savings compared to manual lubrication</li>
                <li>Easily controls the amount of grease used in each application</li>
              </ul>
            </div>
          )}
          title="Automatic Lubricators"
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/no-image.jpg"
          title="Single-Line Systems"
          text={(
            <div>
              <p>With single-line lubrication, a central pump station automatically delivers lubricant through a single supply line to the lubricant metering device. Each metering device serves only one lubrication point and may be adjusted to deliver the precise amount of grease or oil required. Systems can service one machine, different zones on one machine or even several separate machines.</p>
              <ul>
                <li>Easy to understand, install and maintain</li>
                <li>Available in both preset and adjustable models</li>
                <li>Suitable for almost all lubricants</li>
                <li>System continues to operate if one point becomes blocked</li>
                <li>Integrated system control and monitoring</li>
                <li>Able to pump long distances and within a wide temperature range</li>
              </ul>
            </div>
          )}
          reverse
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/dual-line.png"
          title="Dual-Line Systems"
          text={(
            <div>
              <p>SKF dual-line systems, including SKF DuoFlex and Lincoln Helios, are designed for large machines with many lubrication points, long lines and harsh operating conditions. Typical applications include heavy industry, metal working plants, pulp and paper, mining, mineral processing and cement factories, deck cranes, power plants, sugar mills and more. These systems utilize two main lines that are supplied alternately with lubricant.</p>
              <p>Advantages:</p>
              <ul>
                <li>Ideal for many lubrication points over long distances</li>
                <li>Very reliable when using high-viscosity greases</li>
                <li>Flexibility in adjusting metered quantity</li>
                <li>Parallel metering device setup enables simple system design</li>
              </ul>
            </div>
          )}
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/progressive_lubrication.png"
          title="Progressive Lubrication Systems"
          text={(
            <div>
              <p>Each SKF ProFlex and Lincoln Quicklub progressive system typically dispenses small measured amounts of lubricant at frequent intervals while machines are operating. The grease flow created by the pump is proportioned by progressive metering devices and distributed to each bearing according to its needs. These systems are designed to provide a relatively simple and inexpensive method of automating the lubrication of machinery bearings, pins and bushings.</p>
              <p>Advantages:</p>
              <ul>
                <li>Delivers frequent and measured amounts of grease to each lubrication point</li>
                <li>Easy system monitoring and simple blockage control</li>
                <li>Integrated system control and monitoring</li>
              </ul>
            </div>
          )}
          reverse
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/multi-line%20lubrication.png"
          title="Multi-Line Lubrication Systems"
          text={(
            <div>
              <p>These products, including SKF MultiFlex and Lincoln 205 and 215 systems, supply lubricant directly to lube points without extra metering devices. Each lubrication point has its own pumping element. The system design is simple, accurate and reliable and is used for demanding applications in the machine tool industry, oil and gas and heavy industries. SKF and Lincoln multi-line systems include a wide range of pumps featuring one to 32 outlets and are able to generate system pressures as high as 350 bars (5,076 psi). They operate in a wide temperature range and can be used to pump greases up to NLGI #3.</p>
              <p>Advantages:</p>
              <ul>
                <li>Sturdy and durable pump series</li>
                <li>Continuous lubrication of machines that operate in harsh environments</li>
                <li>Longer maintenance intervals compared to manual lubrication</li>
              </ul>
            </div>
          )}
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/circulating%20oil%20lubracation.png"
          title="Circulating Oil Lubracation Systems"
          text={(
            <div>
              <p>An oil supply system delivers the lubricant to the metering devices with individual settings. The feed rates can be controlled visually or electronically. Monitoring systems are available for predictive maintenance. SKF CircOil systems include a wide range of customized turnkey solutions. All are simple to service and feature a modular design that can be easily expanded.</p>
              <p>Advantages:</p>
              <ul>
                <li>Patented air-removal design prolongs oil life</li>
                <li>Precise flow meter</li>
                <li>1/3 the volume compared to conventional systems –provides cost savings</li>
              </ul>
            </div>
          )}
          reverse
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/oil-and-air-lubrication.png"
          title="Oil and Air Lubrication Systems"
          text={(
            <div>
              <p>The SKF Oil+Air line and Lincoln ORSCO lubrication systems, are designed for high-speed bearings, spindles, rack pinions, chains and special applications in the steel industry. A pump, progressive feeder or single-line metering device injects a small, metered amount of oil into a mixing valve. Utilizing compressed air, the oil moves slowly to the lubrication point and provides the bearing or chain with a small, continuous stream of oil and air. SKF Oil+Air lubrication systems are designed to your specifications and utilize leading oil-streak sensor technology for monitoring.</p>
              <p>Advantages:</p>
              <ul>
                <li>Provides a continuous, finely metered oil flow</li>
                <li>Protects sensitive bearings from dirt</li>
                <li>Does not create oil mist or oil fog</li>
              </ul>
            </div>
          )}
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/MQL_MDS.png"
          title="Minimal Quantity Lubrication Systems (MQL) and Microdosage Systems (MDS)"
          text={(
            <div>
              <p>SKF MQL systems for machining processes use oil droplets finely dispersed in an air stream to provide precise, minimal quantities of lubricant between the tool and production line work piece.</p>
              <p>Advantages:</p>
              <ul>
                <li>Can help reduce overall production time by up to 30 percent and significantly increase tool life</li>
                <li>Contributes to a more precise cutting process, better surface quality and a more environmentally friendly workplace</li>
              </ul>
            </div>
          )}
          additionalText={(
            <div>
              <p>SKF MDS is an intelligent microdosage system for demanding applications. The perfectly matched components, high-precision valve, micro flow sensor and sophisticated control unit make it possible to precisely meter and monitor minute quantities of lubricant.</p>
              <p>Advantages:</p>
              <ul>
                <li>Extremely energy-efficient</li>
                <li>Considerable potential cost savings over conventional systems</li>
              </ul>
            </div>
          )}
          reverse
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/hand-held.png"
          title="Hand-Held Lubrication Equipment"
          text="Lincoln grease guns are designed with power and performance in mind. These tools are used around the world by technicians, mechanics, maintenance teams, farmers and others for almost every lubrication and preventative-maintenance task."
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/pumps-accessories.png"
          title="Pumps and Accessories"
          text="SKF offers a wide range of Lincoln medium- and high-pressure pumps used for pumping grease, oil and other fluids. We provide air-operated Series 20, 25 or 40 reciprocating pumps, diaphragm and transfer pumps, bulk oil systems and corresponding accessories to meet specific application requirements."
          reverse
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/reels-meters.png"
          title="Reels and Meters"
          text="Years of engineering, testing and experience preceded the introduction of Lincoln hose reels and meters, which are manufactured with the quality and reliability that professionals expect."
        />
        <ProductItems
          src="https://airlinemedia.airlinehyd.com/Static_pages/Brands/Lincoln/used-fluid.png"
          title="Used Fluid Systems"
          text="Portable upright drains are designed for collecting fluids under lift-mounted vehicles. All models feature a height-adjustable collection bowl and large reservoir with capacity for multiple fluid changes. A combination of two ball bearing swivel casters and two fixed-axle wheels makes them portable and easy to handle."
          reverse
        />
        <SectionHeader
          text="Articles & Videos"
        />
        <ArticlesDiv>
          <Articles
            src="https://www.skf.com/binaries/pub12/Images/0901d19680a910db-LumenRadios-reliable-wireless-mesh-technology-enables-each-sensor-to-forward-data-and-automatically-create-a-self-healing-and-building-wide-network_tcm_12-554983.jpeg"
            text="SKF collaborates with wireless specialist LumenRadio to enhance automated machine monitoring"
            Link="https://www.skf.com/group/news-and-events/news/2020/2020-04-15-skf-collaborates-with-wireless-specialist-lumenradio-to-enhance-automated-machine-monitoring"
            detail="By collaborating with wireless specialist LumenRadio, SKF has developed a new wireless sensor as part of a condition monitoring system for improving rotating equipment performance programs on a scale previously considered uneconomic.
						LumenRadio began in areas such as professional lighting, its products are used to monitor, and control sophisticated light shows remotely. The company has since expanded into IoT applications in heating, ventilation and air conditioning (HVAC) and heavy industrial applications.
						"
          />
          <Articles
            src="https://www.skf.com/binaries/pub12/Images/0901d19680a7f8f7-IMX1-Application_tcm_12-552919.jpeg"
            text="New wireless sensors enable automated machine monitoring for reliable rotation in heavy industries"
            Link="https://www.skf.com/group/news-and-events/news/2020/2020-03-27-new-wireless-sensors-enable-automated-machine-monitoring-for-reliable-rotation-in-heavy-industries"
            detail="SKF has released a compact and cost-effective vibration and temperature sensor for monitoring the condition of rotating parts on heavy industrial machinery. Designed principally for use as part of an SKF Rotating Equipment Performance (REP) solution, the sensor - called the SKF Enlight Collect IMx-1 - enables customers to reduce both expensive unplanned downtime and their maintenance costs.
						Gothenburg, Sweden, March 27th, 2020: Product Line Manager at SKF, Chris James, says: "
          />

          <Articles
            src="https://www.skf.com/binaries/pub12/Images/0901d19680a7f8f5-AlrikDanielson_Twitter_tcm_12-552918.png"
            text="Covid-19"
            detail="The world now faces an extremely challenging social and economic situation. At SKF, we are doing all we can to maintain a safe working environment for our colleagues, thereby helping to constrain the spread of the  Covid-19 virus. All of us have family members, relatives or loved ones who are part of risk groups and need to be protected."
            Link="https://www.skf.com/group/news-and-events/news/2020/2020-03-26-covid-19"

          />
        </ArticlesDiv>

        <VideoDiv>
          <Videos
            src="https://www.youtube.com/embed/ojVK00ojHCc"
          />
          <Videos
            src="https://www.youtube.com/embed/JH07Mrh8qwc"
          />
          <Videos
            src="https://www.youtube.com/embed/uoxBAL7eUOE"
          />
        </VideoDiv>
        <SectionHeader
          text="Related Links"
        />
        <RelatedLinkDiv>
          <RelatedLink
            href="http://www.skf.com/group/splash/index.html"
            text="Lincoln's Website"
            icon="globe-americas"
          />
          <RelatedLink
            href="#"
            text="Shop Lincoln Products"
            icon="shopping-cart"
          />
          <RelatedLink
            href="https://www.youtube.com/channel/UCY1bry_F50OEsLv8x9rW2Hg"
            text="Videos"
            icon={faYoutube}
          />
          <RelatedLink
            href="#"
            text="Lincoln Catalogs"
            icon="address-book"
          />
        </RelatedLinkDiv>
      </Container>
    </>
  )
}