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
    text-align: center;
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

const WebBrowser = styled.a`
    font-size: 14px;
`
const MobileAppOverView = styled.div`
    padding: 0 10px;
`
export default function Apps() {
    return (
        <>
            <Container>
                <Header text="Mobile Apps" />
                <MobileAppOverView>
                    <p>Airline represents best-in-class manufacturers that provide helpful moblie applications to serve customers while out in the field. Find applications here for both IosDownload and Android devices that range from product catalogs to industry specific calculators.</p>
                </MobileAppOverView>
                <MainAppDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rexroth-Academy.png" />
                        </AppImgDiv>
                        <AppName>Rexroth Academy</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/bosch-rexroth-academy/id1479548064" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.bosch.rexrothacademy" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rexroth-Fit4Filter.png" />
                        </AppImgDiv>
                        <AppName>Rexroth Fit4Filter</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/fit4filter-by-rexroth/id589385002" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.rexroth.filterfit" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Eaton-Bussman-Fuse-Finder.png" />
                        </AppImgDiv>
                        <AppName>Eaton Fuse Finder</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/bussmann-by-eaton-fuse-finder/id609315532" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.cooperbussmann.fusefinder&hl=en" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Fault-Current-Calculator.png" />
                        </AppImgDiv>
                        <AppName>Eaton Fault Current Calculator</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/cooper-bussmann-fault-current/id647477910" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.cooperbussmann.faultcurrentcalculator&hl=en" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Murrelektronik-Online-Database.png" />
                        </AppImgDiv>
                        <AppName>Murrelektronik Online Database</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/murrelektronik/id485283655" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=de.neusta.ms.murrelektronik&hl=en" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Parker-Fitting-Finder.jpg" />
                        </AppImgDiv>
                        <AppName>Parker Fitting Finder</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/parker-fitting-finder/id573942435" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.parker.tubefitter" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-Catalog.jpg" />
                        </AppImgDiv>
                        <AppName>Phoenix Catalog</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/phoenix-contact-catalog/id426916389" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=de.innomos.pxc.catalog" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-Mini.jpg" />
                        </AppImgDiv>
                        <AppName>Phoenix MINI Analog Pro</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/mini-analog-pro-app/id943455634" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.phoenixcontact.minianalogpro" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Phoenix-Contact-Quint.jpg" />
                        </AppImgDiv>
                        <AppName>Phoenix Quint Power</AppName>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.phoenixcontact.quint4config" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/QC-Industries-Conveyor-Guide.jpg" />
                        </AppImgDiv>
                        <AppName>QC Conveyor Configurator</AppName>
                        <WebBrowser href="https://qcconfig.com/QCConfig/" target="_blank">View in Browser<br/>(registration required)</WebBrowser>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-RiTherm.jpg" />
                        </AppImgDiv>
                        <AppName>Rittal Therm</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/ritherm/id519087469" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=de.rittal.ritherm" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-RiMatrix.jpg" />
                        </AppImgDiv>
                        <AppName>Rittal Matrix S</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/rimatrix-s/id671017975" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=de.rittal.rimatrixs" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-Chiller.png" />
                        </AppImgDiv>
                        <AppName>Rittal Chiller</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/chiller/id1061065804" target="_blank">IosDownload Download</IosDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Rittal-Product-Scan.png" />
                        </AppImgDiv>
                        <AppName>Rittal Product Scan</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/product-scan/id1444750517" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.rittal.ProductScanApp" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Schmersal-Application-Finder.jpg" />
                        </AppImgDiv>
                        <AppName>Schmersal Application Finder</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/schmersal-application-finder/id627399467" target="_blank">IosDownload Download</IosDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/Schmersal-Configurator.png" />
                        </AppImgDiv>
                        <AppName>Schmersal PSC1 Configurator</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/protect-psc1-configurator/id1355610960" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.schmersal.psc1.configurator">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/SKF-Shelf.png" />
                        </AppImgDiv>
                        <AppName>SKF Shelf</AppName>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.skf.shelf3" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                    <ApplicationDiv>
                        <AppImgDiv>
                            <Img src="https://airlinemedia.airlinehyd.com/Static_pages/resources/apps/WEG-Pilot-Devices.png" />
                        </AppImgDiv>
                        <AppName>WEG Pilot Devices</AppName>
                        <IosDownload href="https://apps.apple.com/us/app/pilot-devices/id855187281" target="_blank">IosDownload Download</IosDownload>
                        <AndroidDownload href="https://play.google.com/store/apps/details?id=com.morphy.weg.comandosinalizacao" target="_blank">Android Download</AndroidDownload>
                    </ApplicationDiv>
                </MainAppDiv>
            </Container>
        </>
    )
}

