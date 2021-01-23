import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'
import ServiceHome from '../uiComponents/service'
import SubDetail from '../uiComponents/subDetail'
import ServiceLayout from '../uiComponents/serviceLayout'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Service = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 20px 0;
`
export default function subAssemblies() {
  return (
    <>
      <Header text="Sub-Assemblies" />
      <Container>
        <ServiceHome text="Sub-Assemblies" />
        <SubDetail
          text="Looking for one source to supply your finished components, pre-assembled and ready to use? Airline’s Sub-Assembly Department has the ISO 9001:2008 certified facilities, equipment, experienced personnel and quality processes to pre-assemble, calibrate, and test your hydraulic, pneumatic or electrical components prior to shipping.Relying on Airline for all your sub-assembly needs saves time and money by eliminating purchasing, coordinating, inspecting and inventorying costs. When multiplied by the number of individual items per product assembled, these savings can be substantial in the long run.In addition, using pre-assembled components improves efficiency by significantly reducing manufacturing complexity. Also, less packaging and energy is used to ship individual components, which reduces environmental impact. Our sub-assemblies can be utilized in many fields and applications."
        />
        <Service>
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/Hydraulic.png"
            title="Hydraulic"
            text={(
              <div>
                <ul>
                  <li>Manifold assemblies</li>
                  <li>Hydraulic power units</li>
                  <li>Valve stands</li>
                  <li>Conditioning (filtration/cooling) skids</li>
                  <li>Cylinder assemblies</li>
                  <li>Accumulator stands</li>
                </ul>
              </div>
            )}
          />
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/Pneumatic.png"
            title="Pneumatic"
            text={(
              <div>
                <ul>
                  <li>Develop concept based on needs</li>
                  <li>Specify pneumatic components</li>
                  <li>Design and assembly</li>
                  <li>Extensive QA inspection</li>
                </ul>
              </div>
            )}
          />
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/Electrical.png"
            title="Electrical"
            text={(
              <div>
                <ul>
                  <li>Electro-mechanical assembly area of over 35,000 square feet</li>
                  <li>UL508A certified & ISO 9001:2008 certified</li>
                  <li>Electrical design utilizing AutoCAD electric</li>
                  <li>Build to print or full turn-key system integration</li>
                  <li>CE / CSA approval support</li>
                </ul>
              </div>
            )}
          />
        </Service>
      </Container>
    </>
  )
}
