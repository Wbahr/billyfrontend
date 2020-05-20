import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Header from '../_common/header'

const Container = styled.div`
    max-width: 1300px;
    margin: 0px auto;
`
const SubHeaderDetailDiv = styled.div`
`
const Detail = styled.p`
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
const IOS = styled.a`
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
				<SubHeaderDetailDiv>
					<Detail>Airline represents best-in-class manufacturers that provide helpful moblie applications to serve customers while out in the field. Find applications here for both iOS and Android devices that range from product catalogs to industry specific calculators.</Detail>
				</SubHeaderDetailDiv>
				<MainAppDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Rexroth-GoToProducts.jpg" />
						</AppImgDiv>
						<AppName>GoTo Product</AppName>
						<IOS href="https://apps.apple.com/us/app/gotoproducts/id559690249?ls=1" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.bosch.gotoapp" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Rexroth-Fit4Filter.jpg" />
						</AppImgDiv>
						<AppName>Fit4Filter</AppName>
						<IOS href="https://apps.apple.com/us/app/fit4filter-by-rexroth/id589385002" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.rexroth.filterfit" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Banner-Mobile-Library.jpg" />
						</AppImgDiv>
						<AppName>Mobile Library</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
						<AndroidDownload href="#" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/CooperBussman-Fuse-Finder.jpg" />
						</AppImgDiv>
						<AppName>Fuse Finder</AppName>
						<IOS href="https://apps.apple.com/us/app/bussmann-by-eaton-fuse-finder/id609315532" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.cooperbussmann.fusefinder&hl=en" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/CooperBussman-Fault-Current-Calculator.jpg" />
						</AppImgDiv>
						<AppName>Current Calculator</AppName>
						<IOS href="https://apps.apple.com/us/app/cooper-bussmann-fault-current/id647477910" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.cooperbussmann.faultcurrentcalculator&hl=en" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Eaton-Poweredge.jpg" />
						</AppImgDiv>
						<AppName>Poweredge</AppName>
						<IOS href="https://apps.apple.com/app/poweredge/id478301518" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Eaton-UPS.jpg" />
						</AppImgDiv>
						<AppName>UPS</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Murrelektronik-Online-Database.jpg" />
						</AppImgDiv>
						<AppName>MurrOnline Database</AppName>
						<IOS href="https://apps.apple.com/us/app/murrelektronik/id485283655" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=de.neusta.ms.murrelektronik&hl=en" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Parker-Fitting-Finder.jpg" />
						</AppImgDiv>
						<AppName>Fitting Finder</AppName>
						<IOS href="https://apps.apple.com/us/app/parker-fitting-finder/id573942435" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.parker.tubefitter" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Phoenix-Contact-Catalog.jpg" />
						</AppImgDiv>
						<AppName>Phoenix Catalog</AppName>
						<IOS href="https://apps.apple.com/us/app/phoenix-contact-catalog/id426916389" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Phoenix-Contact-USA.jpg" />
						</AppImgDiv>
						<AppName>Phoenix USA</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Phoenix-Contact-Mini.jpg" />
						</AppImgDiv>
						<AppName>MINI Analog Pro</AppName>
						<IOS href="https://apps.apple.com/us/app/id943455634" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.phoenixcontact.minianalogpro" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Phoenix-Contact-Quint.jpg" />
						</AppImgDiv>
						<AppName>Quint Power</AppName>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=com.phoenixcontact.quint4config" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/QC-Industries-Conveyor-Guide.jpg" />
						</AppImgDiv>
						<AppName>Conveyor Guide</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Rittal-RiTherm.jpg" />
						</AppImgDiv>
						<AppName>RiTherm</AppName>
						<IOS href="https://apps.apple.com/us/app/ritherm/id519087469" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=de.rittal.ritherm" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Rittal-RiMatrix.jpg" />
						</AppImgDiv>
						<AppName>RiMatrix S</AppName>
						<IOS href="https://apps.apple.com/us/app/rimatrix-s/id671017975" target="_blank">ios Download</IOS>
						<AndroidDownload href="https://play.google.com/store/apps/details?id=de.rittal.rimatrixs" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Rittal-WM-Tool.jpg" />
						</AppImgDiv>
						<AppName>WM Tool</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Rittal-TS-IT-Selector.jpg" />
						</AppImgDiv>
						<AppName>TS IT Selector</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
						<AndroidDownload href="#" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/Schmersal-Application-Finder.jpg" />
						</AppImgDiv>
						<AppName>Application Finder</AppName>
						<IOS href="https://apps.apple.com/us/app/schmersal-application-finder/id627399467" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/SKF-Shelf.jpg" />
						</AppImgDiv>
						<AppName>SKF Shelf</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
						<AndroidDownload href="#" target="_blank">Android Download</AndroidDownload>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/WEG-Motor-Cross.jpg" />
						</AppImgDiv>
						<AppName>Application Finder</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
					</ApplicationDiv>
					<ApplicationDiv>
						<AppImgDiv>
							<Img src="https://www.airlinehyd.com/customer/aihyco/images/apps/WEG-ECatalog.jpg" />
						</AppImgDiv>
						<AppName>Application Finder</AppName>
						<IOS href="#" target="_blank">ios Download</IOS>
					</ApplicationDiv>
				</MainAppDiv>
			</Container>
		</>
	)
}

