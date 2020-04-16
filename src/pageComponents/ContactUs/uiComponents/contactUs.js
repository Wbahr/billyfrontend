import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from '../_common/sectionHeader'
import Button from '../_common/button'
import ContactUsForm from './contactUsForm'
import HQMap from '../../imgs/airline/Headquarters_Map_2017.png'

const DivContainer = styled.div`
  display: flex;
`

const DivContainerCol1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
`

const DivContainerCol2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 100px;
`

const DivBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const DivLinks = styled.div`
  display: flex;
`

const Aemail = styled.a`
  display: flex;
  align-items: center;
  font-size: 11px;
  height: 25px;
  border: 1px grey solid;
  padding: 0 15px;
  color: #0070C0;
  line-height: 30px;
`

const Alink = styled.a`
  color: #0070C0;
  font-size: 13px;
`

const DivEmail = styled.div`
    background-color: #818286;
    line-height: 25px;
    height: 25px;
    padding-left: 10px;
    font-size: 14px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    color: #fff;
`

class ContactUs extends React.Component {

	render() {
    return(
			<DivContainer>
				<DivContainerCol1>
          <DivBlock>
						<AccountSectionHeader text={'Contact Info'}/>
            <a href="tel:1-800-999-7378">1-800-999-7378</a>
            <a href="mail:customer.service@airlinehyd.com">Email Customer Service</a>
            <DivEmail>Customer Service</DivEmail>
            <Aemail href="mail:customer.service@airlinehyd.com">customer.service@airlinehyd.com</Aemail>
            <DivEmail>Gov Sales</DivEmail>
            <Aemail href="mail:govsales@airlinehyd.com">govsales@airlinehyd.com</Aemail>
            <DivEmail>Credit</DivEmail>
            <Aemail href="mail:credit@airlinehyd.com">credit@airlinehyd.com</Aemail>
            <DivEmail>Marketing</DivEmail>
            <Aemail href="mail:marketing@airlinehyd.com">marketing@airlinehyd.com</Aemail>
            <DivEmail>Repair</DivEmail>
            <Aemail href="mail:repair@airlinehyd.com">repair@airlinehyd.com</Aemail>
            <DivEmail>Training</DivEmail>
            <Aemail href="mail:training@airlinehyd.com">training@airlinehyd.com</Aemail>
            <DivEmail>Sales</DivEmail>
            <Aemail href="mail:sales@airlinehyd.com">sales@airlinehyd.com</Aemail>
          </DivBlock>
					<DivBlock>
						<AccountSectionHeader text={'Headquarters'} />
            <Alink href='https://goo.gl/maps/J8AydtGDQaS2' target='_blank'>3557 Progress Drive Bensalem, PA 19020</Alink>
            <p>Phone: <a href='tel:215-638-4700'>(215) 638-4700</a></p>
            <p>Fax: (215) 638-1707</p>
            <img src={HQMap} alt='office location map' width='255px' />
            <Button color='secondary' onClick={()=> location.assign(window.location.hostname + '/pages/about/locations')} text='Branch Locations'/>
					</DivBlock>
				</DivContainerCol1>
				<DivContainerCol2>
          <AccountSectionHeader text={'How can we help you?'}/>
          <ContactUsForm />
				</DivContainerCol2>
			</DivContainer>
		)
	}
}

export default ContactUs
