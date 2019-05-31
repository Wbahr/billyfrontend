import React from 'react'
import styled from 'styled-components'
import AccountSectionHeader from '../_common/sectionHeader'
import Button from '../_common/button'
import ContactUsForm from './contactUsForm'

const DivContainer = styled.div`
  display: flex;
`

const DivContainerCol1 = styled.div`
  display: flex;
  flex-direction: column;
`

const DivContainerCol2 = styled.div`
  display: flex;
  flex-direction: column;
`

const DivBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const DivLinks = styled.div`
  display: flex;
`

class ContactUs extends React.Component {

	render() {
    return(
			<DivContainer>
				<DivContainerCol1>
          <DivBlock>
						<AccountSectionHeader text={'Contact Info'}/>
            <a href="tel:1-800-999-7378">1-800-999-7378</a>
            <a href="mail:customer.service@airlinehyd.com">customer.service@airlinehyd.com</a>
            <Button onClick={()=> location.assign(window.location.hostname + '/pages/about/locations')} text='Customer Service'/>
            <a href="mail:govsales@airlinehyd.com">govsales@airlinehyd.com</a>
            <a href="mail:credit@airlinehyd.com">credit@airlinehyd.com</a>
            <a href="mail:marketing@airlinehyd.com">marketing@airlinehyd.com</a>
            <a href="mail:repair@airlinehyd.com">repair@airlinehyd.com</a>
            <a href="mail:training@airlinehyd.com">training@airlinehyd.com</a>
            <a href="mail:sales@airlinehyd.com">sales@airlinehyd.com</a>
          </DivBlock>
					<DivBlock>
						<AccountSectionHeader text={'Headquarters'} />
            <p>3557 Progress Drive Bensalem, PA 19020</p>
            <p>Phone: <a href="tel:215-638-4700">(215) 638-4700</a></p>
            <p>Fax: (215) 638-1707</p>
            {/*<img/>*/}
            <Button color='secondary' onClick={()=> location.assign(window.location.hostname + '/pages/about/locations')} text='Branch Locations'/>
					</DivBlock>
				</DivContainerCol1>
				<DivContainerCol2>
          <DivLinks>
            <p>FAQ</p>
            <p>Knowledge Center</p>
          </DivLinks>
          <ContactUsForm />
				</DivContainerCol2>
			</DivContainer>
		)
	}
}

export default ContactUs
