import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'
import SubDetail from '../uiComponents/subDetail'
import ServiceHome from '../uiComponents/service'
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
export default function automationEngineered() {
  return (
    <>
      <Header text="Automation Engineered Systems" />
      <Container>
        <ServiceHome text="Automation Engineered Systems" />
        <SubDetail
          text="Productivity requirements today are becoming increasingly demanding. Airline’s Automation Group draws upon years of experience and an expansive inventory of motion, power, control, framing and pneumatic components to deliver automation system and sub-system solutions that provide precise and reliable performance."
        />
        <Service>
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/engineer%20autmation.png"
            title="Engineering: "
            text="Our Airline Application Engineer visits your site to review project requirements and determine the optimal solution. Our Automation Engineering department then designs a cost-effective, energy-efficient system. We can provide AutoCAD drawings and electrical schematics, or support the efforts of your internal engineering resources until the project design is complete."
          />
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/fabrication.png"
            title="Fabrication: "
            text="Throughout the process, our fabrication technicians, production coordinators and engineering staff work together to keep your project on schedule and on plan. We use components from world-class manufacturers such as Bosch Rexroth structural framing, conveyors, pneumatics, linear motion, drives and controls; SMC pneumatics; Omron PLC’s, sensors and HMI’s; and Eaton drives and controls."
          />
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/programming.png"
            title="Programming, Installation, and Start-Up: "
            text="Once assembled, our programmers set up the PLC/motion programming to ensure expected performance. We then work with your personnel, either at Airline or on-site, to assist with installation, start-up, training and any troubleshooting."
          />
          <ServiceLayout
            src="https://www.airlinehyd.com/customer/aihyco/images/engineerings.png"
            title="Documentation: "
            text="Our automation systems are supplied with comprehensive documentation, including AutoCAD drawings, electrical schematics, manufacturers’ component documentation, start-up procedures, maintenance instructions and troubleshooting information."
          />
        </Service>
      </Container>
    </>
  )
}
