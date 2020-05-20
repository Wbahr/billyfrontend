import React from 'react'
import styled from 'styled-components'
import Header from '../../_common/header'

const Container = styled.div`
    max-width: 1300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`
const Detail = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`
const ImgDiv = styled.div`
    width: 220px;
    margin: 0 30px;
`
const Img = styled.img`
    width: 100%;
    height: 230px;
    object-fit: contain;
`
const Div = styled.div`
    display: flex;
    flex-direction: row-reverse;
`
const Div1 = styled.div`
    display: flex;
    align-items: center;
`
export default function fluidCleanliness() {
	return (
		<>
			<Header text="Fluid Cleanliness" />
			<Container>
				<Div>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/PA160065.png" />
					</ImgDiv>
					<Detail>Approximately 85% of hydraulic component failures result from contaminated oil –from both particulates and water. Contaminated hydraulic fluids can damage systems and shut down your line.Airline service professionals will work with you to analyze component or system oil samples and compare the results with manufacturer’s recommendations for ISO cleanliness levels. Where are the best sample points? How often should you be taking samples? What are the sources of contamination? We help you answer these questions and more.Whether it’s an upgrade of the current filtration system or a one-time system filtration or flush, we will recommend and implement the best option to ensure the longest and most reliable service life for your system or component.</Detail>
				</Div>
				<Div1>
					<ImgDiv>
						<Img src="https://www.airlinehyd.com/customer/aihyco/images/HYDAC%20Fluid%20Service1.png" />
					</ImgDiv>
					<Detail>In addition, we can provide a comprehensive filtration program that regularly monitors fluid contamination.
						<ul>
							<li>FREE fluid analysis</li>
							<li>Heat measurement</li>
							<li>Filter replacement</li>
							<li>Leak repair</li>
							<li>System performance analysis</li>
						</ul>
					</Detail>
				</Div1>
			</Container>
		</>
	)
}
