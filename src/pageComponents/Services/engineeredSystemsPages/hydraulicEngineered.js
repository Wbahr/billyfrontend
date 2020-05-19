import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
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

export default function hydraulicEngineered() {
    return (
        <>
            <Header text="Hydraulic Engineered Systems" />
            <Container>
                <ServiceHome text="Hydraulic Engineered Systems" />
                <SubDetail
                    text="For half a century, Airline has been manufacturing hydraulic power units and building a reputation for engineering excellence. Companies across all industries and sizes, including many Fortune 500 companies, benefit from our engineering expertise. Our customers rely on this extensive experience to deliver the best solution for each unique requirement, and our OEM sub-assembly customers also enjoy significant cost savings from streamlined manufacturing processes."
                />
                <Service>
                    <ServiceLayout
                        src="https://www.airlinehyd.com/customer/aihyco/images/engineering.png"
                        title="Engineering: "
                        text="Once your system or sub-assembly is designed, we can build entirely new hydraulic systems to prints, or upgrade existing machinery to meet current needs. Our manufactured hydraulic systems use high-quality components from world-class manufacturers such as Bosch Rexroth, HYDAC and Parker."
                    />

                    <ServiceLayout
                        src="https://www.airlinehyd.com/customer/aihyco/images/DSC_41344.png"
                        title="Fabrication: "
                        text="Implementing best-in-class systems starts with our Certified Fluid Power Specialists determining which of the latest technologies and products will provide the optimal solution for your project. Then, our Hydraulic Engineering Department designs a reliable, cost-effective and energy-efficient system or customized assembly."
                    />

                    <ServiceLayout
                        src="https://www.airlinehyd.com/customer/aihyco/images/Installation.png"
                        title="Installation and Start-Up: "
                        text="We stand behind our work, aiming for 100% customer satisfaction. Once your system or sub-assembly is delivered, our hydraulic technicians are available to assist withinstallation, start-up and troubleshooting."
                    />
                    <ServiceLayout
                        src="https://www.airlinehyd.com/customer/aihyco/images/Hyd%20Test%20Rig.png"
                        title="Documentation: "
                        text="Our hydraulic systems are supplied with comprehensive documentation, including AutoCAD drawings, schematics, manufacturers’ component documentation, start-up procedures, maintenance instructions and troubleshooting information."
                    />
                </Service>
            </Container>
        </>
    )
}
