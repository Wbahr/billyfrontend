import React from 'react'
import styled from 'styled-components'
import Header from '../_common/header'

const Container = styled.div`
    max-width: 1300px;
    margin: 0px auto;
`
const MainAppDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px 0;
`
const ApplicationDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    align-items: center;
    width: 200px;
`
const AppImgDiv = styled.div`
    width: 80px;
    margin-bottom: 15px;
`
const Img = styled.img`
    width: 100%;
`
const AppName = styled.p`
    margin-bottom: 0;
    font-weight: bold;
`
const IosDownload = styled.a`
    margin-bottom: 0;
    font-size: 14px;
`
const AndroidDownload = styled.a`
    font-size: 14px;
`
export default function Apps() {
	return (
		<>
			<Container>
				<Header text="Mobile Apps" />
				<div>
					<p>Airline represents best-in-class manufacturers that provide helpful moblie applications to serve customers while out in the field. Find applications here for both IosDownload and Android devices that range from product catalogs to industry specific calculators.</p>
				</div>
				<MainAppDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rexroth-GoToProducts.jpg" />
						</AppImgDiv>
						<AppName>GoTo Product</AppName>
						<IosDownload href="https://apps.apple.com/us/app/gotoproducts/id559690249?ls=1" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.bosch.gotoapp" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rexroth-Fit4Filter.jpg" />
						</AppImgDiv>
						<AppName>Fit4Filter</AppName>
						<IosDownload href="https://apps.apple.com/us/app/fit4filter-by-rexroth/id589385002" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.rexroth.filterfit" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Banner-Mobile-Library.jpg" />
						</AppImgDiv>
						<AppName>Mobile Library</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="#" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/CooperBussman-Fuse-Finder.jpg" />
						</AppImgDiv>
						<AppName>Fuse Finder</AppName>
						<IosDownload href="https://apps.apple.com/us/app/bussmann-by-eaton-fuse-finder/id609315532" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.cooperbussmann.fusefinder&hl=en" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/CooperBussman-Fault-Current-Calculator.jpg" />
						</AppImgDiv>
						<AppName>Current Calculator</AppName>
						<IosDownload href="https://apps.apple.com/us/app/cooper-bussmann-fault-current/id647477910" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.cooperbussmann.faultcurrentcalculator&hl=en" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Eaton-Poweredge.jpg" />
						</AppImgDiv>
						<AppName>Poweredge</AppName>
						<IosDownload href="https://apps.apple.com/app/poweredge/id478301518" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Eaton-UPS.jpg" />
						</AppImgDiv>
						<AppName>UPS</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Murrelektronik-Online-Database.jpg" />
						</AppImgDiv>
						<AppName>MurrOnline Database</AppName>
						<IosDownload href="https://apps.apple.com/us/app/murrelektronik/id485283655" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=de.neusta.ms.murrelektronik&hl=en" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Parker-Fitting-Finder.jpg" />
						</AppImgDiv>
						<AppName>Fitting Finder</AppName>
						<IosDownload href="https://apps.apple.com/us/app/parker-fitting-finder/id573942435" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.parker.tubefitter" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-Catalog.jpg" />
						</AppImgDiv>
						<AppName>Phoenix Catalog</AppName>
						<IosDownload href="https://apps.apple.com/us/app/phoenix-contact-catalog/id426916389" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-USA.jpg" />
						</AppImgDiv>
						<AppName>Phoenix USA</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-Mini.jpg" />
						</AppImgDiv>
						<AppName>MINI Analog Pro</AppName>
						<IosDownload href="https://apps.apple.com/us/app/id943455634" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.phoenixcontact.minianalogpro" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-Quint.jpg" />
						</AppImgDiv>
						<AppName>Quint Power</AppName>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.phoenixcontact.quint4config" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/QC-Industries-Conveyor-Guide.jpg" />
						</AppImgDiv>
						<AppName>Conveyor Guide</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-RiTherm.jpg" />
						</AppImgDiv>
						<AppName>RiTherm</AppName>
						<IosDownload href="https://apps.apple.com/us/app/ritherm/id519087469" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=de.rittal.ritherm" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-RiMatrix.jpg" />
						</AppImgDiv>
						<AppName>RiMatrix S</AppName>
						<IosDownload href="https://apps.apple.com/us/app/rimatrix-s/id671017975" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=de.rittal.rimatrixs" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-WM-Tool.jpg" />
						</AppImgDiv>
						<AppName>WM Tool</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-TS-IT-Selector.jpg" />
						</AppImgDiv>
						<AppName>TS IT Selector</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="#" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Schmersal-Application-Finder.jpg" />
						</AppImgDiv>
						<AppName>Application Finder</AppName>
						<IosDownload href="https://apps.apple.com/us/app/schmersal-application-finder/id627399467" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/SKF-Shelf.jpg" />
						</AppImgDiv>
						<AppName>SKF Shelf</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
						<AndroidDownload href="#" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/WEG-Motor-Cross.jpg" />
						</AppImgDiv>
						<AppName>Application Finder</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/WEG-ECatalog.jpg" />
						</AppImgDiv>
						<AppName>Application Finder</AppName>
						<IosDownload href="#" target="_blank">IosDownload Download</IosDownload>
					</ApplicationDiv>
				</MainAppDiv>
			</Container>
		</>
	)
}

