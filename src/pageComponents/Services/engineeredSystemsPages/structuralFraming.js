import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'
import ServiceHome from '../uiComponents/service'
import SubDetail from '../uiComponents/subDetail'
import Framing from '../uiComponents/framing'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0;
`
export default function structuralFraming() {
    return (
        <>
            <Header text="Structural Framing Systems" />
            <Container>
                <ServiceHome text="Structural Framing Systems" />
                <SubDetail
                    text="Airline can design and build virtually any type of structural framing system…from ergonomic workstations and lean manufacturing cells, to machine guards and laboratory isolation enclosures. Since 1992, we have been building customized structures using Bosch Rexroth aluminum framing, including:"
                />
                <Div>
                    <Framing
                        link="http://www.mpsasafety.com/sound-abatement-machine-safeguarding/"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Machine-Guard.jpg"
                        text="Machine Guards"
                    />
                    <Framing
                        link="http://www.mpsasafety.com/sound-abatement-machine-safeguarding/"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Perimeter-Fencing.jpg"
                        text="Perimeter Fences"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/fume-hoods"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Process-Isolation-Enclosure.jpg"
                        text="Isolation Enclosures/Fume Hoods"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/ergonomic-workstations"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Ergonomic-Workstation.jpg"
                        text="Ergonomic Workstations"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/lean-manufacturing-components"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Cart.jpg"
                        text="Lean Manufacturing Systems"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/machine-bases"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Machine-Bases.jpg"
                        text="Machine Bases"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/display-cases"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Display-Cases.jpg"
                        text="Display Systems"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/customized-shelving"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Custom-Shelving.jpg"
                        text="Customized Shelving"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/solar-racking"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Solar-Racking.jpg"
                        text="Solar Racking"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/cleanrooms"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Cleanroom.jpg"
                        text="Cleanrooms"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/scaffolding"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Scaffold.jpg"
                        text="Scaffolding"
                    />
                    <Framing
                        link="https://www.airlinehyd.com/pages/services/architectural-applications"
                        src="https://airlinemedia.airlinehyd.com/Graphics/images/Architectural-Framing.jpg"
                        text="Architectural Applications"
                    />
                </Div>
            </Container>
        </>
    )
}
